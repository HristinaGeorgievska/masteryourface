/**
 * Server-side sanitization utilities for CMS text fields.
 * Defence-in-depth: React escapes output by default, but stripping HTML
 * on the server prevents XSS if rendering ever changes.
 */

/** Strip HTML tags from a CMS text field. Returns '' for non-string input. */
export function stripHtml(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').trim();
}
