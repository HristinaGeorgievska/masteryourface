import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID ?? '';
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ?? '';

if (!space || !accessToken) {
  console.warn(
    '[Contentful] Missing VITE_CONTENTFUL_SPACE_ID or VITE_CONTENTFUL_ACCESS_TOKEN — API calls will fail gracefully.',
  );
}

// Use a placeholder space ID when missing to prevent createClient from throwing
// at module init. Queries will still fail, but react-query handles that gracefully.
export const contentfulClient = createClient({
  space: space || 'placeholder',
  accessToken: accessToken || 'placeholder',
});

export interface ContentfulImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
}

/**
 * Appends Contentful Image API parameters to automatically resize,
 * compress, and convert images to modern formats (WebP) on the CDN edge.
 */
export function formatContentfulUrl(
  rawUrl: string,
  options: ContentfulImageOptions = {}
): string {
  if (!rawUrl) return '';
  try {
    const url = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
    const parsed = new URL(url);
    if (!['images.ctfassets.net', 'downloads.ctfassets.net'].includes(parsed.hostname)) {
      return url;
    }
    const { width, height, quality = 80, format = 'webp', fit } = options;
    parsed.searchParams.set('fm', format);
    parsed.searchParams.set('q', quality.toString());
    if (width) parsed.searchParams.set('w', width.toString());
    if (height) parsed.searchParams.set('h', height.toString());
    if (fit) parsed.searchParams.set('fit', fit);
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}
