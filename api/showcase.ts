import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'contentful';

/** Allowed hostnames for Contentful CDN image assets. */
const CONTENTFUL_CDN_HOSTS = ['images.ctfassets.net', 'downloads.ctfassets.net'];

function sanitizeCdnImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (
      ['https:', 'http:'].includes(parsed.protocol) &&
      CONTENTFUL_CDN_HOSTS.some((host) => parsed.hostname === host)
    ) {
      return url;
    }
    return '';
  } catch {
    return '';
  }
}

interface ShowcaseFields {
  name?: string;
  client?: string;
  photographer?: string;
  image: { fields: { file: { url: string } } };
  order?: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    console.error('Contentful credentials not configured');
    return res.status(500).json({ error: 'CMS not configured' });
  }

  try {
    const client = createClient({ space: spaceId, accessToken });

    const response = await client.getEntries({
      content_type: 'showcaseItem',
      order: ['fields.order'],
    });

    const items = response.items.map((item) => {
      const fields = item.fields as unknown as ShowcaseFields;

      let imageUrl = '';
      if (fields.image?.fields?.file?.url) {
        let rawUrl = fields.image.fields.file.url as string;
        if (rawUrl.startsWith('//')) rawUrl = `https:${rawUrl}`;
        imageUrl = sanitizeCdnImageUrl(rawUrl);
      }

      return {
        id: item.sys.id,
        name: fields.name,
        client: fields.client,
        photographer: fields.photographer,
        image: imageUrl,
        order: fields.order,
      };
    });

    // Cache for 5 minutes, allow stale for 10 minutes
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600',
    );
    return res.status(200).json(items);
  } catch (error) {
    console.error('Failed to fetch showcase:', error);
    return res.status(500).json({ error: 'Failed to fetch showcase' });
  }
}
