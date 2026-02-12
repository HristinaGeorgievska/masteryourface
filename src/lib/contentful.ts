import { createClient } from 'contentful';

const space = import.meta.env.CONTENTFUL_SPACE_ID ?? '';
const accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN ?? '';

if (!space || !accessToken) {
  console.warn(
    '[Contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN — API calls will fail gracefully.',
  );
}

// Use a placeholder space ID when missing to prevent createClient from throwing
// at module init. Queries will still fail, but react-query handles that gracefully.
export const contentfulClient = createClient({
  space: space || 'placeholder',
  accessToken: accessToken || 'placeholder',
});
