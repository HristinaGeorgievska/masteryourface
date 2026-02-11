import { createClient, ContentfulClientApi } from 'contentful';

let client: ContentfulClientApi<undefined> | null = null;

/** Returns a singleton Contentful client, reused across warm Vercel invocations. */
export function getContentfulClient(): ContentfulClientApi<undefined> {
  if (client) return client;

  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) {
    throw new Error('Contentful credentials not configured');
  }

  client = createClient({ space, accessToken });
  return client;
}
