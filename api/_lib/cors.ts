import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ALLOWED_ORIGINS_SET } from './origins';

/**
 * Validates the request Origin against the shared allowed-origins list.
 * Sets CORS headers and returns `true` if the request is allowed.
 * Returns `false` (and sends 403) if the origin is disallowed.
 *
 * WARNING: When `strict` is false (default), requests WITHOUT an Origin
 * header are allowed through (e.g. curl, server-side calls, same-origin
 * navigations). For mutation endpoints (POST/PUT/DELETE), always add an
 * explicit Origin check AFTER calling enforceCors(), or pass `strict: true`.
 */
export function enforceCors(
  req: VercelRequest,
  res: VercelResponse,
  { strict = false }: { strict?: boolean } = {},
): boolean {
  const origin = req.headers.origin ?? '';

  // No Origin header — allow for public GETs, reject in strict mode
  if (!origin) {
    if (strict) {
      res.status(403).json({ error: 'Origin header required' });
      return false;
    }
    res.setHeader('Access-Control-Allow-Origin', 'https://masteryourface.cz');
    return true;
  }

  if (!ALLOWED_ORIGINS_SET.has(origin)) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  return true;
}
