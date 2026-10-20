import fs from 'fs';
import path from 'path';
import initSqlJs, { Database } from 'sql.js';
import { events as defaultEvents } from '../lib/schedule-data/events.js';

let db: Database | null = null;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'calouros.db');

export interface ScheduleEvent {
  Data: string; // YYYY-MM-DD
  Inicio: string; // HH:MM
  Fim: string; // HH:MM
  Titulo: string;
  Descricao: string;
  Local: string;
  type: string;
}

export interface ScheduleRevision {
  id: number;
  created_at: string;
  author_email: string;
  status: 'active' | 'archived' | 'draft';
  year: number;
  events_json: string;
  notes: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  keywords: string;
  description?: string;
  updated_at?: string;
}

/**
 * Persists the current in-memory database to disk
 */
function saveDatabase() {
  if (!db) return;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const binaryArray = db.export();
  fs.writeFileSync(DB_FILE, Buffer.from(binaryArray));
}

/**
 * Initializes SQLite database using sql.js WASM
 */
export async function getDb(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    const fileBuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS schedule_revisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      author_email TEXT NOT NULL,
      status TEXT NOT NULL,
      year INTEGER NOT NULL,
      events_json TEXT NOT NULL,
      notes TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admin_allowlist (
      email TEXT PRIMARY KEY,
      role TEXT NOT NULL DEFAULT 'admin',
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin allowlist if empty
  const defaultEmails = [
    'codelab@icmc.usp.br'
  ];
  for (const email of defaultEmails) {
    db.run('INSERT OR IGNORE INTO admin_allowlist (email) VALUES (?)', [email]);
  }

  // Also clear any other pre-existing allowed admins in SQLite database so only codelab@icmc.usp.br remains
  db.run("DELETE FROM admin_allowlist WHERE LOWER(email) != 'codelab@icmc.usp.br'");

  // Seed default 2026 events if no active revision exists
  const activeCount = db.exec("SELECT COUNT(*) as count FROM schedule_revisions WHERE status = 'active'")[0]?.values[0]?.[0] as number;
  if (!activeCount || activeCount === 0) {
    db.run(
      'INSERT INTO schedule_revisions (author_email, status, year, events_json, notes) VALUES (?, ?, ?, ?, ?)',
      [
        'sistema@icmc.usp.br',
        'active',
        2026,
        JSON.stringify(defaultEvents),
        'Cronograma inicial 2026 (seed do repositório)',
      ]
    );
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS campus_locations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lat REAL NOT NULL,
      lon REAL NOT NULL,
      keywords TEXT NOT NULL,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default campus locations if empty
  const locCount = db.exec('SELECT COUNT(*) as count FROM campus_locations')[0]?.values[0]?.[0] as number;
  if (!locCount || locCount === 0) {
    const seedLocs = [
      ['biblioteca', 'Biblioteca Achille Bassi', -22.007651392315037, -47.89485555630038, 'biblioteca,achille bassi,vão da biblioteca,livros', 'Biblioteca central do ICMC USP São Carlos'],
      ['fernao', 'Auditório Prof. Fernão Stella de Rodrigues Germano', -22.0071297170172, -47.89503460681919, 'fernão,fernao,auditório fernão,auditorio fernao', 'Auditório principal do ICMC'],
      ['redondo', 'Redondo (ICMC - Bloco 4)', -22.007278766924777, -47.89451516652856, 'redondo,bloco 4,bloco-4,4-', 'Pátio central e salas do Bloco 4'],
      ['caaso', 'CAASO', -22.00686526493565, -47.89679693933321, 'caaso,palquinho,palquinho do caaso,atlética', 'Centro Acadêmico Armando de Salles Oliveira'],
      ['eventos', 'Salão de Eventos USP', -22.00498466537535, -47.896350653644944, 'eventos,salão de eventos,salao de eventos,abertura', 'Salão de Eventos do Campus USP São Carlos'],
      ['bloco-3', 'ICMC - Bloco 3', -22.007632580401413, -47.89434738232872, 'bloco 3,bloco-3,3-', 'Salas de aula e laboratórios do Bloco 3'],
      ['bloco-4', 'ICMC - Bloco 4', -22.007278766924777, -47.89451516652856, 'bloco 4,bloco-4,4-', 'Salas de aula do Bloco 4'],
      ['bloco-6', 'ICMC - Bloco 6', -22.0070097170172, -47.89499460681919, 'bloco 6,bloco-6,6-', 'Laboratórios de informática e salas do Bloco 6'],
      ['favaro', 'Auditório Fávaro', -22.007256580401413, -47.89441738232872, 'fávaro,favaro,auditório fávaro,auditorio favaro', 'Auditório do Bloco 4'],
      ['usp', 'USP São Carlos (Campus 1)', -22.00707221830916, -47.89683843242551, 'usp,campus,são carlos,sao carlos', 'Ponto central de referência do Campus 1'],
    ];

    for (const [id, name, lat, lon, keywords, description] of seedLocs) {
      db.run(
        'INSERT OR IGNORE INTO campus_locations (id, name, lat, lon, keywords, description) VALUES (?, ?, ?, ?, ?, ?)',
        [id, name, lat, lon, keywords, description]
      );
    }
  }

  saveDatabase();
  return db;
}

/**
 * Gets the current active published schedule
 */
export async function getActiveSchedule(): Promise<{ revision: ScheduleRevision; events: ScheduleEvent[] } | null> {
  const database = await getDb();
  const res = database.exec("SELECT id, created_at, author_email, status, year, events_json, notes FROM schedule_revisions WHERE status = 'active' ORDER BY id DESC LIMIT 1");
  if (!res || res.length === 0 || res[0].values.length === 0) {
    return null;
  }

  const row = res[0].values[0];
  const revision: ScheduleRevision = {
    id: row[0] as number,
    created_at: row[1] as string,
    author_email: row[2] as string,
    status: row[3] as 'active' | 'archived' | 'draft',
    year: row[4] as number,
    events_json: row[5] as string,
    notes: row[6] as string,
  };

  let events: ScheduleEvent[] = [];
  try {
    events = JSON.parse(revision.events_json);
  } catch {
    events = defaultEvents as ScheduleEvent[];
  }

  return { revision, events };
}

/**
 * Publishes a new schedule revision as the active one
 */
export async function publishSchedule(events: ScheduleEvent[], authorEmail: string, notes: string = ''): Promise<number> {
  const database = await getDb();

  // Archive previous active revisions
  database.run("UPDATE schedule_revisions SET status = 'archived' WHERE status = 'active'");

  // Insert new active revision
  database.run(
    'INSERT INTO schedule_revisions (author_email, status, year, events_json, notes) VALUES (?, ?, ?, ?, ?)',
    [
      authorEmail,
      'active',
      2026,
      JSON.stringify(events),
      notes || 'Publicação manual via painel administrativo',
    ]
  );

  saveDatabase();

  const idRes = database.exec('SELECT last_insert_rowid()');
  return (idRes[0]?.values[0]?.[0] as number) || 1;
}

/**
 * Rolls back to a specific revision by ID
 */
export async function rollbackSchedule(revisionId: number, authorEmail: string): Promise<boolean> {
  const database = await getDb();
  const res = database.exec('SELECT events_json, year, notes FROM schedule_revisions WHERE id = ?', [revisionId]);
  if (!res || res.length === 0 || res[0].values.length === 0) {
    return false;
  }

  const [eventsJson, year, notes] = res[0].values[0];

  database.run("UPDATE schedule_revisions SET status = 'archived' WHERE status = 'active'");
  database.run(
    'INSERT INTO schedule_revisions (author_email, status, year, events_json, notes) VALUES (?, ?, ?, ?, ?)',
    [
      authorEmail,
      'active',
      year as number,
      eventsJson as string,
      `Rollback para revisão #${revisionId} (${notes})`,
    ]
  );

  saveDatabase();
  return true;
}

/**
 * Lists all revisions
 */
export async function listRevisions(): Promise<ScheduleRevision[]> {
  const database = await getDb();
  const res = database.exec('SELECT id, created_at, author_email, status, year, events_json, notes FROM schedule_revisions ORDER BY id DESC LIMIT 50');
  if (!res || res.length === 0) return [];

  return res[0].values.map((row) => ({
    id: row[0] as number,
    created_at: row[1] as string,
    author_email: row[2] as string,
    status: row[3] as 'active' | 'archived' | 'draft',
    year: row[4] as number,
    events_json: row[5] as string,
    notes: row[6] as string,
  }));
}

/**
 * Manages admin allowlist
 */
export async function isEmailAllowed(email: string): Promise<boolean> {
  const database = await getDb();
  const normalized = email.trim().toLowerCase();

  // 1. Check explicit emails in database allowlist
  const res = database.exec('SELECT email FROM admin_allowlist WHERE LOWER(email) = ?', [normalized]);
  if (res && res.length > 0 && res[0].values.length > 0) {
    return true;
  }

  // 2. Check if env variable ADMIN_ALLOWED_EMAILS allows it
  const envEmails = (process.env.ADMIN_ALLOWED_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (envEmails.includes(normalized)) {
    return true;
  }

  return false;
}

export async function listAllowedAdmins(): Promise<{ email: string; added_at: string }[]> {
  const database = await getDb();
  const res = database.exec('SELECT email, added_at FROM admin_allowlist ORDER BY added_at ASC');
  if (!res || res.length === 0) return [];
  return res[0].values.map((row) => ({
    email: row[0] as string,
    added_at: row[1] as string,
  }));
}

export async function addAllowedAdmin(email: string): Promise<void> {
  const database = await getDb();
  database.run('INSERT OR REPLACE INTO admin_allowlist (email) VALUES (?)', [email.trim().toLowerCase()]);
  saveDatabase();
}

export async function removeAllowedAdmin(email: string): Promise<void> {
  const database = await getDb();
  database.run('DELETE FROM admin_allowlist WHERE LOWER(email) = ?', [email.trim().toLowerCase()]);
  saveDatabase();
}

/**
 * Campus Locations CRUD
 */
export async function listLocations(): Promise<CampusLocation[]> {
  const database = await getDb();
  const res = database.exec('SELECT id, name, lat, lon, keywords, description, updated_at FROM campus_locations ORDER BY name ASC');
  if (!res || res.length === 0) return [];
  return res[0].values.map((row) => ({
    id: row[0] as string,
    name: row[1] as string,
    lat: Number(row[2]),
    lon: Number(row[3]),
    keywords: row[4] as string,
    description: (row[5] as string) || '',
    updated_at: (row[6] as string) || '',
  }));
}

export async function saveLocation(loc: CampusLocation): Promise<void> {
  const database = await getDb();
  database.run(
    'INSERT OR REPLACE INTO campus_locations (id, name, lat, lon, keywords, description, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [
      loc.id.trim().toLowerCase(),
      loc.name.trim(),
      loc.lat,
      loc.lon,
      loc.keywords.trim(),
      loc.description?.trim() || '',
    ]
  );
  saveDatabase();
}

export async function deleteLocation(id: string): Promise<boolean> {
  const database = await getDb();
  database.run('DELETE FROM campus_locations WHERE LOWER(id) = ?', [id.trim().toLowerCase()]);
  saveDatabase();
  return true;
}
