import crypto from 'crypto';

const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
const GOOGLE_ISSUERS = ['accounts.google.com', 'https://accounts.google.com'];
const CLOCK_SKEW_SECONDS = 60;

export interface GoogleIdentity {
  email: string;
  name?: string;
  picture?: string;
}

interface GoogleJwk {
  kid: string;
  kty: string;
  n: string;
  e: string;
  alg?: string;
}

let cachedKeys: GoogleJwk[] = [];
let cachedKeysExpireAt = 0;

/**
 * OAuth client ID that issued tokens must be addressed to
 */
function getGoogleClientId(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID não configurado no servidor.');
  }
  return clientId;
}

/**
 * Fetches (and caches) Google's public signing keys
 */
async function getGoogleKeys(forceRefresh = false): Promise<GoogleJwk[]> {
  if (!forceRefresh && cachedKeys.length > 0 && Date.now() < cachedKeysExpireAt) {
    return cachedKeys;
  }

  const res = await fetch(GOOGLE_CERTS_URL);
  if (!res.ok) {
    throw new Error(`Falha ao obter chaves públicas do Google (HTTP ${res.status}).`);
  }
  const body = (await res.json()) as { keys: GoogleJwk[] };
  const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get('cache-control') || '')?.[1] || 3600);

  cachedKeys = body.keys || [];
  cachedKeysExpireAt = Date.now() + maxAge * 1000;
  return cachedKeys;
}

/**
 * Verifies a Google ID token (JWT): RS256 signature, issuer, audience, expiry and verified e-mail
 */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleIdentity> {
  const parts = idToken.split('.');
  if (parts.length !== 3) {
    throw new Error('Token do Google malformado.');
  }
  const [headerB64, payloadB64, signatureB64] = parts;

  const header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf8'));
  if (header.alg !== 'RS256' || !header.kid) {
    throw new Error('Algoritmo de assinatura do token não suportado.');
  }

  let jwk = (await getGoogleKeys()).find((k) => k.kid === header.kid);
  if (!jwk) {
    // Google rotates keys; refresh once before giving up
    jwk = (await getGoogleKeys(true)).find((k) => k.kid === header.kid);
  }
  if (!jwk) {
    throw new Error('Chave de assinatura do token desconhecida.');
  }

  const publicKey = crypto.createPublicKey({ key: { kty: jwk.kty, n: jwk.n, e: jwk.e }, format: 'jwk' });
  const isSignatureValid = crypto.verify(
    'RSA-SHA256',
    Buffer.from(`${headerB64}.${payloadB64}`),
    publicKey,
    Buffer.from(signatureB64, 'base64url'),
  );
  if (!isSignatureValid) {
    throw new Error('Assinatura do token do Google inválida.');
  }

  const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
  const now = Math.floor(Date.now() / 1000);

  if (!GOOGLE_ISSUERS.includes(payload.iss)) {
    throw new Error('Emissor do token inválido.');
  }
  if (payload.aud !== getGoogleClientId()) {
    throw new Error('Token emitido para outro aplicativo.');
  }
  if (typeof payload.exp !== 'number' || payload.exp + CLOCK_SKEW_SECONDS < now) {
    throw new Error('Token do Google expirado.');
  }
  if (!payload.email || payload.email_verified !== true) {
    throw new Error('E-mail da conta Google não verificado.');
  }

  return { email: payload.email, name: payload.name, picture: payload.picture };
}

/**
 * Verifies a Google OAuth access token with Google itself (audience + verified e-mail)
 * and loads the profile associated with it
 */
export async function verifyGoogleAccessToken(accessToken: string): Promise<GoogleIdentity> {
  const infoRes = await fetch(GOOGLE_TOKENINFO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ access_token: accessToken }).toString(),
  });
  if (!infoRes.ok) {
    throw new Error('Token de acesso do Google inválido ou expirado.');
  }
  const info = (await infoRes.json()) as Record<string, string>;

  if (info.aud !== getGoogleClientId()) {
    throw new Error('Token emitido para outro aplicativo.');
  }
  if (!info.email || String(info.email_verified) !== 'true') {
    throw new Error('E-mail da conta Google não verificado.');
  }

  let profile: { name?: string; picture?: string } = {};
  try {
    const profileRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (profileRes.ok) {
      profile = await profileRes.json();
    }
  } catch {}

  return { email: info.email, name: profile.name, picture: profile.picture };
}
