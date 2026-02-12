/**
 * Single source of truth for allowed CORS origins.
 * Imported by token.ts and contact.ts.
 */
const isProduction = process.env.VERCEL_ENV === 'production';

const ALLOWED_HOSTS = [
  'masteryourface.cz',
  'www.masteryourface.cz',
] as const;

export function isAllowedOrigin(origin: string): boolean {
  if (!origin) return false;
  
  try {
    const url = new URL(origin);
    const hostname = url.hostname;

    // Allow production domains
    if ((ALLOWED_HOSTS as readonly string[]).includes(hostname)) return true;

    // Allow localhost in development
    if (!isProduction && (hostname === 'localhost' || hostname === '127.0.0.1')) return true;

    // Allow Vercel preview deployments
    if (hostname.endsWith('.vercel.app')) return true;

    return false;
  } catch {
    return false;
  }
}

// Keep this for legacy compatibility if needed by other files, 
// but isAllowedOrigin() is more robust.
export const ALLOWED_ORIGINS = [
  'https://masteryourface.cz',
  'https://www.masteryourface.cz',
] as const;
