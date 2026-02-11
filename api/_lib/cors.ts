import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = new Set([
  'https://masteryourface.cz',
  'https://www.masteryourface.cz',
]);

/**
 * Validates the request Origin / Referer against the allowed list.
 * Sets CORS headers and returns `true` if the request is allowed.
 * Returns `false` (and sends 403) if the origin is disallowed.
 */
export function enforceCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin ?? '';

  // Allow same-origin requests (no Origin header, e.g. direct browser navigation)
  if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', 'https://masteryourface.cz');
    return true;
  }

  if (!ALLOWED_ORIGINS.has(origin)) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  return true;
}
