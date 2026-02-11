import type { VercelRequest, VercelResponse } from '@vercel/node';
import { signTimestamp } from './_lib/hmac';

const isProduction = process.env.VERCEL_ENV === 'production';
const ALLOWED_ORIGINS = [
  'https://masteryourface.cz',
  'https://www.masteryourface.cz',
  ...(!isProduction
    ? ['http://localhost:8080', 'http://localhost:5173']
    : []),
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const ts = Date.now();
    const token = signTimestamp(ts);
    return res.status(200).json({ ts, token });
  } catch {
    return res.status(500).json({ error: 'Token service not configured' });
  }
}
