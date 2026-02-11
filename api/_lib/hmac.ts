import { createHmac, timingSafeEqual } from 'crypto';

const MIN_DELAY_MS = 3_000; // 3 seconds minimum between token issue and submission
const MAX_AGE_MS = 10 * 60 * 1_000; // 10 minutes — token expires after this

function getSecret(): string {
  const secret = process.env.FORM_TOKEN_SECRET;
  if (!secret) throw new Error('FORM_TOKEN_SECRET not configured');
  return secret;
}

/** Create an HMAC-SHA256 signature for a given timestamp. */
export function signTimestamp(ts: number): string {
  return createHmac('sha256', getSecret()).update(String(ts)).digest('hex');
}

/**
 * Verify the HMAC token and enforce timing constraints.
 * Returns `null` on success or an error string on failure.
 */
export function verifyToken(ts: unknown, token: unknown): string | null {
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
    const expected = signTimestamp(ts);
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
