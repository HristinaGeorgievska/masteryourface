import type { VercelRequest, VercelResponse } from '@vercel/node';
import { format, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';
import { getContentfulClient } from './_lib/contentful';
import { enforceCors } from './_lib/cors';
import { stripHtml } from './_lib/sanitize';

/** Allowed hostnames for Contentful CDN image assets. */
const CONTENTFUL_CDN_HOSTS = ['images.ctfassets.net', 'downloads.ctfassets.net'];

function sanitizeCdnImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === 'https:' &&
      CONTENTFUL_CDN_HOSTS.some((host) => parsed.hostname === host)
    ) {
      return url;
    }
    return '';
  } catch {
    return '';
  }
}

/** Trusted booking domains — prevents open redirect if CMS is compromised. */
const TRUSTED_BOOKING_HOSTS = ['tidycal.com', 'masteryourface.cz', 'www.masteryourface.cz'];

function isSafeBookingUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' &&
      TRUSTED_BOOKING_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h));
  } catch {
    return false;
  }
}

interface CourseFields {
  city: string;
  adress: string;
  date: string;
  status: boolean;
  bookingUrl: string;
  hero?: { fields: { file: { url: string } } };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!enforceCors(req, res)) return;

  try {
    const client = getContentfulClient();

    const response = await client.getEntries({
      content_type: 'course',
      order: ['fields.date'],
    });

    const courses = response.items.map((item) => {
      const fields = item.fields as unknown as CourseFields;
      const dateObj = fields.date ? parseISO(fields.date) : new Date();

      const formattedDate = format(dateObj, 'd. MMMM yyyy', { locale: cs });
      const startTime = format(dateObj, 'HH:mm');
      const endTime = format(
        new Date(dateObj.getTime() + 5 * 60 * 60 * 1000),
        'HH:mm',
      );

      let heroImageUrl: string | undefined;
      if (fields.hero?.fields?.file?.url) {
        let rawUrl = fields.hero.fields.file.url;
        if (rawUrl.startsWith('//')) rawUrl = `https:${rawUrl}`;
        heroImageUrl = sanitizeCdnImageUrl(rawUrl) || undefined;
      }

      const safeBookingUrl = isSafeBookingUrl(fields.bookingUrl)
        ? fields.bookingUrl
        : '#';

      return {
        id: item.sys.id,
        city: stripHtml(fields.city),
        address: stripHtml(fields.adress),
        date: formattedDate,
        timeRange: `${startTime} - ${endTime}`,
        status: fields.status,
        bookingUrl: safeBookingUrl,
        heroImage: heroImageUrl,
      };
    });

    // Cache for 5 minutes, allow stale for 10 minutes
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600',
    );
    return res.status(200).json(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses' });
  }
}
