import { createClient } from 'contentful';

const space = import.meta.env.CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN;

if (import.meta.env.DEV && (!space || !accessToken)) {
  console.warn(
    '[Contentful] Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN in .env',
  );
}

export const contentfulClient = createClient({
  space: space ?? '',
  accessToken: accessToken ?? '',
});
