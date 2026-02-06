import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://masteryourface.cz',
  'https://www.masteryourface.cz',
  'http://localhost:8080',
  'http://localhost:5173',
];

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

// Strip control characters to prevent header injection
function sanitizeInput(text: string): string {
  return text.replace(/[\r\n\t\0]/g, ' ').trim();
}

// Sliding-window rate limiting — in-memory store (resets on cold start)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 100; // max 100 requests per hour per IP
const CLEANUP_INTERVAL = 10 * 60 * 1000; // purge stale entries every 10 min

let lastCleanup = Date.now();

/** Remove timestamps older than the window and drop empty IPs. */
function pruneStore(now: number): void {
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [ip, timestamps] of rateLimitStore) {
    const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (valid.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, valid);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneStore(now);

  const timestamps = rateLimitStore.get(ip) ?? [];
  // Keep only hits within the current window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup - restrict to allowed origins
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CSRF protection — reject cross-site requests (browsers send Sec-Fetch-Site)
  const fetchSite = req.headers['sec-fetch-site'] as string | undefined;
  if (fetchSite && fetchSite !== 'same-origin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limiting — use x-real-ip (trusted on Vercel) instead of spoofable x-forwarded-for
  const clientIp = (req.headers['x-real-ip'] as string) ||
                   (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
                   req.socket?.remoteAddress || 
                   'unknown';
  
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { name, email, message, website } = req.body;

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website) {
      // Silently accept but don't send email (fool the bot)
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Input length validation
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return res.status(400).json({ error: 'Input too long' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.CONTACT_EMAIL || smtpUser || 'info@masteryourface.cz';

    if (!smtpUser || !smtpPass) {
      console.error('SMTP credentials not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Strip control characters and escape user input for HTML email
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email with escaped content
    await transporter.sendMail({
      from: `"Master Your Face" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: `Nový kontakt z webu Master Your Face - ${safeName}`,
      text: `Nový kontakt z webu\n\nJméno: ${cleanName}\nEmail: ${cleanEmail}\nZpráva:\n${cleanMessage}`,
      html: `
        <h2>Nový kontakt z webu</h2>
        <p><strong>Jméno:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Zpráva:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
