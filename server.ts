import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getDb,
  getActiveSchedule,
  publishSchedule,
  rollbackSchedule,
  listRevisions,
  isEmailAllowed,
  listAllowedAdmins,
  addAllowedAdmin,
  removeAllowedAdmin,
  listLocations,
  saveLocation,
  deleteLocation,
  ScheduleEvent,
  CampusLocation,
} from './src/server/db';
import { inspectWorkbook, normalizeSheetToText } from './src/server/xlsx-parser';
import { parseSpreadsheetWithGemini, validateScheduleEvents } from './src/server/gemini-parser';
import { createSessionToken, verifySessionToken, requireAdminAuth, safeEqual, AdminUser } from './src/server/auth';
import { verifyGoogleIdToken, verifyGoogleAccessToken, GoogleIdentity } from './src/server/google-auth';

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production';

// Passcode login is only available when explicitly configured
const DEV_LOGIN_PASSCODE = process.env.ADMIN_DEV_PASSCODE || '';
const DEV_LOGIN_MIN_PASSCODE_LENGTH = 16;
const DEV_LOGIN_MAX_FAILURES = 5;
const DEV_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const devLoginFailures = new Map<string, { count: number; resetAt: number }>();

async function startServer() {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));
  app.use(cookieParser());

  // Behind nginx every request comes from loopback; read the client IP from X-Forwarded-For
  // (used by the dev-login rate limit) only when the direct peer is local
  app.set('trust proxy', 'loopback');

  // Upload handler in memory (up to 20MB)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
  });

  // Initialize SQLite database
  await getDb();
  console.log('✅ SQLite database initialized at data/calouros.db');

  // ==========================================
  // Public API Endpoints
  // ==========================================

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  /**
   * Returns current active schedule for public display
   */
  app.get('/api/schedule/active', async (req: Request, res: Response) => {
    // Always serve the latest published revision (no browser/proxy caching)
    res.set('Cache-Control', 'no-store');
    try {
      const active = await getActiveSchedule();
      if (!active) {
        return res.status(404).json({ error: 'Nenhum cronograma publicado encontrado.' });
      }
      res.json({
        events: active.events,
        revision: {
          id: active.revision.id,
          created_at: active.revision.created_at,
          author_email: active.revision.author_email,
          year: active.revision.year,
          notes: active.revision.notes,
        },
      });
    } catch (err: any) {
      console.error('Error fetching active schedule:', err);
      res.status(500).json({ error: 'Erro ao carregar o cronograma ativo.' });
    }
  });

  /**
   * Returns campus locations and coordinate mappings for the map
   */
  app.get('/api/locations', async (req: Request, res: Response) => {
    res.set('Cache-Control', 'no-store');
    try {
      const locations = await listLocations();
      const locationsMap: Record<string, { name: string; lat: number; lon: number; keywords: string; description?: string }> = {};
      const searchKeywords: Array<{ search: string; id: string }> = [];

      locations.forEach((loc) => {
        locationsMap[loc.id] = {
          name: loc.name,
          lat: loc.lat,
          lon: loc.lon,
          keywords: loc.keywords,
          description: loc.description,
        };
        const keys = (loc.keywords || '')
          .split(',')
          .map((k) => k.trim().toLowerCase())
          .filter(Boolean);
        keys.forEach((k) => {
          searchKeywords.push({ search: k, id: loc.id });
        });
        searchKeywords.push({ search: loc.id.toLowerCase(), id: loc.id });
        searchKeywords.push({ search: loc.name.toLowerCase(), id: loc.id });
      });

      res.json({ locations, locationsMap, searchKeywords });
    } catch (err: any) {
      console.error('Error fetching campus locations:', err);
      res.status(500).json({ error: 'Erro ao carregar locais do campus.' });
    }
  });

  // ==========================================
  // Authentication Endpoints
  // ==========================================

  /**
   * Verifies current session
   */
  app.get('/api/auth/me', async (req: Request, res: Response) => {
    const token = req.cookies?.calouros_admin_token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.json({ authenticated: false, user: null });
    }

    const user = verifySessionToken(token);
    if (!user) {
      return res.json({ authenticated: false, user: null });
    }

    const isAllowed = await isEmailAllowed(user.email);
    res.json({ authenticated: true, isAllowed, user });
  });

  /**
   * Login via Google: accepts an ID token (credential) or an OAuth access token,
   * both verified against Google before trusting the e-mail
   */
  app.post('/api/auth/google-login', async (req: Request, res: Response) => {
    try {
      const { credential, accessToken } = req.body;

      let identity: GoogleIdentity;
      try {
        if (typeof credential === 'string' && credential) {
          identity = await verifyGoogleIdToken(credential);
        } else if (typeof accessToken === 'string' && accessToken) {
          identity = await verifyGoogleAccessToken(accessToken);
        } else {
          return res.status(400).json({ error: 'Token do Google não fornecido.' });
        }
      } catch (verifyErr: any) {
        return res.status(401).json({ error: 'Falha na verificação do login Google: ' + verifyErr.message });
      }

      const userEmail = identity.email;
      const userName = identity.name || 'Administrador USP';
      const userPicture = identity.picture;

      // Allowlist verification
      const isAllowed = await isEmailAllowed(userEmail);
      if (!isAllowed) {
        return res.status(403).json({
          error: `Acesso negado: o e-mail "${userEmail}" não está na lista de administradores autorizados. Solicite liberação aos organizadores.`,
          email: userEmail,
        });
      }

      const user: AdminUser = {
        email: userEmail,
        name: userName,
        picture: userPicture,
        role: 'admin',
      };

      const token = createSessionToken(user);
      res.cookie('calouros_admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 3600 * 1000,
      });

      res.json({ success: true, user, token });
    } catch (err: any) {
      console.error('Google login error:', err);
      res.status(500).json({ error: 'Erro ao autenticar com Google: ' + err.message });
    }
  });

  /**
   * Passcode login for offline VM deployment / local testing.
   * Disabled unless ADMIN_DEV_PASSCODE is set; still requires an allowlisted e-mail.
   */
  app.post('/api/auth/dev-login', async (req: Request, res: Response) => {
    try {
      if (DEV_LOGIN_PASSCODE.length < DEV_LOGIN_MIN_PASSCODE_LENGTH) {
        return res.status(404).json({ error: 'Login por código de acesso desabilitado neste servidor.' });
      }

      const clientKey = req.ip || 'unknown';
      const now = Date.now();
      const failures = devLoginFailures.get(clientKey);
      if (failures && failures.resetAt > now && failures.count >= DEV_LOGIN_MAX_FAILURES) {
        return res.status(429).json({ error: 'Muitas tentativas inválidas. Tente novamente mais tarde.' });
      }

      const { email, passcode } = req.body;
      if (typeof passcode !== 'string' || !safeEqual(passcode, DEV_LOGIN_PASSCODE)) {
        const current = failures && failures.resetAt > now ? failures : { count: 0, resetAt: now + DEV_LOGIN_WINDOW_MS };
        current.count += 1;
        devLoginFailures.set(clientKey, current);
        return res.status(401).json({ error: 'Código de acesso inválido.' });
      }
      devLoginFailures.delete(clientKey);

      if (typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'E-mail inválido.' });
      }
      const targetEmail = email.trim().toLowerCase();

      const isAllowed = await isEmailAllowed(targetEmail);
      if (!isAllowed) {
        return res.status(403).json({
          error: `O e-mail "${targetEmail}" não está na lista de administradores autorizados.`,
          email: targetEmail,
        });
      }

      const user: AdminUser = {
        email: targetEmail,
        name: targetEmail.split('@')[0],
        role: 'admin',
      };

      const token = createSessionToken(user);
      res.cookie('calouros_admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 3600 * 1000,
      });

      res.json({ success: true, user, token });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * Logout
   */
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    res.clearCookie('calouros_admin_token');
    res.json({ success: true });
  });

  // ==========================================
  // Protected Admin Endpoints (/api/admin/*)
  // ==========================================

  /**
   * Inspects uploaded XLSX without processing, returning sheets list
   */
  app.post('/api/admin/inspect-xlsx', requireAdminAuth, upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: 'Nenhum arquivo XLSX enviado.' });
      }

      const originalName = req.file.originalname || 'planilha.xlsx';
      if (!originalName.toLowerCase().endsWith('.xlsx') && !originalName.toLowerCase().endsWith('.xls')) {
        return res.status(400).json({ error: 'O arquivo enviado deve ser no formato .xlsx ou .xls' });
      }

      const sheets = inspectWorkbook(req.file.buffer);
      res.json({
        fileName: originalName,
        fileSize: req.file.size,
        sheets,
      });
    } catch (err: any) {
      console.error('Error inspecting workbook:', err);
      res.status(500).json({ error: 'Falha ao analisar a estrutura do arquivo: ' + err.message });
    }
  });

  /**
   * Parses the selected sheet with unmerging + Gemini 2.5 Flash structured parser
   */
  app.post('/api/admin/parse-xlsx', requireAdminAuth, upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: 'Nenhum arquivo XLSX enviado.' });
      }

      const sheetName = req.body.sheetName as string | undefined;
      const customApiKey = req.body.apiKey as string | undefined;

      // 1. Normalize sheet and unmerge cells
      const { selectedSheet, textTable, rawMatrix } = normalizeSheetToText(req.file.buffer, sheetName);

      // 2. Parse with Gemini 2.5 Flash, using the published schedule as reference
      const active = await getActiveSchedule();
      const { events, rawModelOutput } = await parseSpreadsheetWithGemini(textTable, selectedSheet, customApiKey, active?.events);

      res.json({
        success: true,
        sheetName: selectedSheet,
        totalEvents: events.length,
        events,
        debug: {
          normalizedRowsCount: rawMatrix.length,
          previewText: textTable.slice(0, 1000),
        },
      });
    } catch (err: any) {
      console.error('Error parsing sheet with Gemini:', err);
      res.status(500).json({
        error: 'Erro na conversão da planilha: ' + err.message,
      });
    }
  });

  /**
   * Validates a custom/edited schedule JSON
   */
  app.post('/api/admin/validate-schedule', requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { events } = req.body;
      const validation = validateScheduleEvents(events);
      res.json(validation);
    } catch (err: any) {
      res.status(400).json({ error: 'Formato inválido: ' + err.message });
    }
  });

  /**
   * Publishes new active schedule revision
   */
  app.post('/api/admin/schedule/publish', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { events, notes } = req.body;
      const user = (req as any).user as AdminUser;

      const validation = validateScheduleEvents(events);
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'O cronograma contém inconsistências e não pode ser publicado.',
          details: validation.errors,
        });
      }

      const revisionId = await publishSchedule(validation.sanitized, user.email, notes || 'Publicação manual');
      res.json({ success: true, revisionId, totalEvents: validation.sanitized.length });
    } catch (err: any) {
      console.error('Error publishing schedule:', err);
      res.status(500).json({ error: 'Erro ao publicar cronograma: ' + err.message });
    }
  });

  /**
   * Lists all revisions
   */
  app.get('/api/admin/schedule/revisions', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const revisions = await listRevisions();
      res.json({ revisions });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * Rollback to a specific revision
   */
  app.post('/api/admin/schedule/rollback/:id', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const revisionId = parseInt(req.params.id, 10);
      const user = (req as any).user as AdminUser;
      const success = await rollbackSchedule(revisionId, user.email);

      if (!success) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }

      res.json({ success: true, message: `Revisão #${revisionId} restaurada com sucesso!` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  /**
   * Allowlist management
   */
  app.get('/api/admin/allowlist', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const list = await listAllowedAdmins();
      res.json({ allowlist: list });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/admin/allowlist', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'E-mail inválido.' });
      }
      await addAllowedAdmin(email);
      const list = await listAllowedAdmins();
      res.json({ success: true, allowlist: list, message: `Administrador "${email}" adicionado.` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  const handleRemoveAllowlist = async (req: Request, res: Response) => {
    try {
      const email = decodeURIComponent((req.params.email || req.body?.email || req.query?.email || '') as string);
      if (!email) {
        return res.status(400).json({ error: 'E-mail não fornecido para remoção.' });
      }

      const currentUser = (req as any).user;
      if (currentUser && currentUser.email && currentUser.email.toLowerCase() === email.toLowerCase()) {
        return res.status(400).json({ error: 'Você não pode remover a si mesmo da lista de administradores para evitar que o sistema fique travado sem acessos.' });
      }

      // Also ensure at least one admin remains in the allowlist
      const currentList = await listAllowedAdmins();
      if (currentList.length <= 1) {
        return res.status(400).json({ error: 'Não é possível remover o último administrador remanescente do sistema.' });
      }

      await removeAllowedAdmin(email);
      const list = await listAllowedAdmins();
      res.json({ success: true, allowlist: list, message: `Administrador "${email}" removido com sucesso.` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  app.delete('/api/admin/allowlist/:email', requireAdminAuth, handleRemoveAllowlist);
  app.delete('/api/admin/allowlist', requireAdminAuth, handleRemoveAllowlist);
  app.post('/api/admin/allowlist/remove', requireAdminAuth, handleRemoveAllowlist);

  /**
   * Campus Locations Management Endpoints
   */
  app.post('/api/admin/locations', requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const { id, name, lat, lon, keywords, description } = req.body;
      if (!id || !name || lat === undefined || lon === undefined) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes: id, name, lat e lon.' });
      }

      const numLat = parseFloat(lat);
      const numLon = parseFloat(lon);
      if (isNaN(numLat) || isNaN(numLon)) {
        return res.status(400).json({ error: 'Latitude e Longitude devem ser números válidos.' });
      }

      // Slug: no accents, spaces or symbols, so IDs stay stable and URL-safe
      const slug = String(id).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
          .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!slug) {
        return res.status(400).json({ error: 'ID do local inválido.' });
      }

      await saveLocation({
        id: slug,
        name: name.trim(),
        lat: numLat,
        lon: numLon,
        keywords: (keywords || name).trim(),
        description: description?.trim() || '',
      });

      const updatedLocations = await listLocations();
      res.json({ success: true, message: 'Local salvo com sucesso!', locations: updatedLocations });
    } catch (err: any) {
      console.error('Error saving location:', err);
      res.status(500).json({ error: 'Erro ao salvar local: ' + err.message });
    }
  });

  const handleDeleteLocation = async (req: Request, res: Response) => {
    try {
      const id = decodeURIComponent((req.params.id || req.body?.id || req.query?.id || '') as string);
      if (!id) {
        return res.status(400).json({ error: 'ID do local não fornecido.' });
      }
      await deleteLocation(id);
      const updatedLocations = await listLocations();
      res.json({ success: true, message: 'Local removido com sucesso!', locations: updatedLocations });
    } catch (err: any) {
      console.error('Error deleting location:', err);
      res.status(500).json({ error: 'Erro ao remover local: ' + err.message });
    }
  };

  app.delete('/api/admin/locations/:id', requireAdminAuth, handleDeleteLocation);
  app.delete('/api/admin/locations', requireAdminAuth, handleDeleteLocation);
  app.post('/api/admin/locations/delete', requireAdminAuth, handleDeleteLocation);

  // ==========================================
  // Vite Middleware / Static Files Serving
  // ==========================================

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT,
        hmr: false,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Unknown API routes must not fall through to index.html
    app.use('/api', (req: Request, res: Response) => {
      res.status(404).json({ error: 'Rota de API não encontrada.' });
    });
    // SPA fallback (Express 5 syntax; '*' is rejected by path-to-regexp v8)
    app.get('/{*splat}', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, (err?: Error) => {
    // A second instance must not keep running with its own in-memory copy of the database
    if (err) {
      console.error(`❌ Não foi possível escutar em ${HOST}:${PORT}:`, err.message);
      process.exit(1);
    }
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
