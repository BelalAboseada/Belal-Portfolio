/**
 * HMAC-SHA256 cookie auth helpers using Web Crypto API (Edge-runtime compatible).
 * No external auth library needed.
 */

export const COOKIE_NAME = 'admin_session';
const PAYLOAD = 'belal-admin-authenticated';

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Creates the HMAC signature string for the session cookie value. */
export async function signCookie(secret: string): Promise<string> {
  const key = await getKey(secret);
  const enc = new TextEncoder();
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(PAYLOAD));
  return Buffer.from(signature).toString('base64url');
}

/** Verifies the cookie value using a timing-safe HMAC verify (no string comparison). */
export async function verifyCookie(value: string, secret: string): Promise<boolean> {
  try {
    const key = await getKey(secret);
    const enc = new TextEncoder();
    const sigBytes = Buffer.from(value, 'base64url');
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(PAYLOAD));
  } catch {
    return false;
  }
}
