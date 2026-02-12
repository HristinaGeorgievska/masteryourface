import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { verifyToken } from './_lib/hmac.js';
import { ALLOWED_ORIGINS } from './_lib/origins.js';
import { createRateLimiter } from './_lib/ratelimit.js';

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

// Strip all control characters — used for name/email to prevent header injection
function sanitizeHeaderInput(text: string): string {
  return text.replace(/[\r\n\t\0]/g, ' ').trim();
}

// Preserve newlines in message body, strip other control characters
function sanitizeBodyInput(text: string): string {
  return text.replace(/[\r\t\0]/g, ' ').trim();
}

// 10 submissions/hour/IP — unchanged from original limit
const contactRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup - restrict to allowed origins
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
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

  // CSRF protection — browsers always send the Origin header on POST requests.
  // Reject requests without Origin (automated tools) or from unknown origins.
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limiting — trust only x-real-ip (set by Vercel's edge, not spoofable)
  const clientIp = (req.headers['x-real-ip'] as string) || 'unknown';

  if (contactRateLimiter.isLimited(clientIp)) {
    return res
      .status(429)
      .json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    // Body size limit — prevent oversized payloads
    const bodySize = JSON.stringify(req.body || {}).length;
    if (bodySize > 10_000) {
      return res.status(413).json({ error: 'Payload too large' });
    }

    const { name, email, message, website, _ts, _token } = req.body;

    // HMAC timestamp token verification — prevents automated submissions
    // that bypass the frontend (scripts must fetch a token, then wait ≥ 3 s).
    const tokenError = verifyToken(_ts, _token, clientIp);
    if (tokenError) {
      return res.status(403).json({ error: tokenError });
    }

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website) {
      // Silently accept but don't send email (fool the bot)
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
      });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Type guard — ensure fields are strings (prevents prototype pollution / type confusion)
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid field types' });
    }

    // Input length validation
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return res.status(400).json({ error: 'Input too long' });
    }

    // Validate email format (RFC 5322 simplified)
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const recipientEmail =
      process.env.CONTACT_EMAIL || smtpUser || 'info@masteryourface.cz';

    if (!smtpUser || !smtpPass) {
      console.error('SMTP credentials not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Strip control characters and escape user input for HTML email
    const cleanName = sanitizeHeaderInput(name);
    const cleanEmail = sanitizeHeaderInput(email);
    const cleanMessage = sanitizeBodyInput(message);

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

    // Send email with escaped content (subject uses cleanName, not safeName,
    // because email subjects don't render HTML)
    await transporter.sendMail({
      from: `"Master Your Face" <${smtpUser}>`,
      to: recipientEmail,
      replyTo: cleanEmail,
      subject: `Nový kontakt z webu Master Your Face - ${cleanName}`,
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
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
