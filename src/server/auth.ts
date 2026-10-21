import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { isEmailAllowed } from './db';

const MIN_SECRET_LENGTH = 32;

/**
 * Resolves the HMAC secret used to sign admin sessions.
 * In production a strong ADMIN_JWT_SECRET is mandatory; in development a random
 * per-process secret is generated (sessions are lost on restart).
 */
function resolveJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (secret && secret.length >= MIN_SECRET_LENGTH) {
    return secret;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`ADMIN_JWT_SECRET precisa estar definido com pelo menos ${MIN_SECRET_LENGTH} caracteres em produção.`);
  }
  console.warn('⚠️  ADMIN_JWT_SECRET ausente ou curto; usando segredo aleatório temporário (sessões expiram ao reiniciar).');
  return crypto.randomBytes(48).toString('base64url');
}

const JWT_SECRET = resolveJwtSecret();

/**
 * Constant-time string comparison
 */
export function safeEqual(a: string, b: string): boolean {
  const hashA = crypto.createHash('sha256').update(a).digest();
  const hashB = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export interface AdminUser {
  email: string;
  name: string;
  picture?: string;
  role: string;
}

/**
 * Creates a signed session token
 */
export function createSessionToken(user: AdminUser): string {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 7 * 24 * 3600 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

/**
 * Verifies a session token
 */
export function verifySessionToken(token: string): AdminUser | null {
  if (!token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('base64url');

  if (!signature || !safeEqual(signature, expectedSig)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp && Date.now() > data.exp) return null;
    return {
      email: data.email,
      name: data.name,
      picture: data.picture,
      role: data.role || 'admin',
    };
  } catch {
    return null;
  }
}

/**
 * Express middleware to enforce admin authentication and allowlist
 */
export async function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.calouros_admin_token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Não autenticado. Faça login para acessar o painel administrativo.' });
  }

  const user = verifySessionToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Sessão inválida ou expirada. Faça login novamente.' });
  }

  const allowed = await isEmailAllowed(user.email);
  if (!allowed) {
    return res.status(403).json({
      error: `Acesso negado: o e-mail "${user.email}" não está na lista de administradores autorizados. Solicite liberação à coordenação da Semana de Recepção.`,
    });
  }

  (req as any).user = user;
  next();
}
