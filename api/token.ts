import type { VercelRequest, VercelResponse } from '@vercel/node';
import { signToken } from './_lib/hmac.js';
import { ALLOWED_ORIGINS } from './_lib/origins.js';
import { createRateLimiter } from './_lib/ratelimit.js';

// 20 tokens/hour/IP — generous enough for legitimate page loads + retries
const tokenRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limiting — trust only x-real-ip (set by Vercel's edge, not spoofable)
  const clientIp = (req.headers['x-real-ip'] as string) || 'unknown';
  if (tokenRateLimiter.isLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  try {
    const ts = Date.now();
    const token = signToken(ts, clientIp);
    return res.status(200).json({ ts, token });
  } catch {
    return res.status(500).json({ error: 'Token service not configured' });
  }
}
