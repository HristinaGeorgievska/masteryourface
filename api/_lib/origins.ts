/**
 * Single source of truth for allowed CORS origins.
 * Imported by token.ts, contact.ts, and cors.ts.
 */
const isProduction = process.env.VERCEL_ENV === 'production';

export const ALLOWED_ORIGINS = [
  'https://masteryourface.cz',
  'https://www.masteryourface.cz',
  ...(!isProduction
    ? ['http://localhost:8080', 'http://localhost:5173']
    : []),
] as const;

export const ALLOWED_ORIGINS_SET = new Set<string>(ALLOWED_ORIGINS);
