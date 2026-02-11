import { createHmac, timingSafeEqual } from 'crypto';

const MIN_DELAY_MS = 3_000; // 3 seconds minimum between token issue and submission
const MAX_AGE_MS = 10 * 60 * 1_000; // 10 minutes — token expires after this

function getSecret(): string {
  const secret = process.env.FORM_TOKEN_SECRET;
  if (!secret) throw new Error('FORM_TOKEN_SECRET not configured');
  return secret;
}

/**
 * Create an HMAC-SHA256 signature bound to a timestamp AND the client IP.
 * Binding to IP prevents tokens harvested from one machine being replayed
 * from another (mitigates Origin-spoofing attacks from automated tools).
 */
export function signToken(ts: number, ip: string): string {
  return createHmac('sha256', getSecret())
    .update(`${ts}:${ip}`)
    .digest('hex');
}

/**
 * Verify the HMAC token, enforce timing constraints, and confirm IP match.
 * Returns `null` on success or an error string on failure.
 */
export function verifyToken(
  ts: unknown,
  token: unknown,
  ip: string,
): string | null {
  if (typeof ts !== 'number' || typeof token !== 'string') {
    return 'Invalid token format';
  }

  const now = Date.now();
  const age = now - ts;

  if (age < MIN_DELAY_MS) {
    return 'Form submitted too quickly';
  }

  if (age > MAX_AGE_MS) {
    return 'Token expired — please reload the page';
  }

  try {
    const expected = signToken(ts, ip);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return 'Invalid token';
    }
  } catch {
    return 'Invalid token';
  }

  return null; // success
}
