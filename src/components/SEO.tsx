import { useHead } from "@/hooks/useHead";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

const SITE_URL = "https://masteryourface.cz";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = "Master Your Face";
const TWITTER_HANDLE = "@MasterYourFace";

export const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOProps) => {
  const fullUrl = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  useHead([
    { tag: "title", textContent: fullTitle },
    { tag: "meta", attributes: { name: "description", content: description } },
    { tag: "link", attributes: { rel: "canonical", href: fullUrl } },

    // Open Graph
    { tag: "meta", attributes: { property: "og:title", content: fullTitle } },
    { tag: "meta", attributes: { property: "og:description", content: description } },
    { tag: "meta", attributes: { property: "og:url", content: fullUrl } },
    { tag: "meta", attributes: { property: "og:type", content: type } },
    { tag: "meta", attributes: { property: "og:image", content: image } },
    { tag: "meta", attributes: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attributes: { property: "og:locale", content: "cs_CZ" } },

    // Twitter Card
    { tag: "meta", attributes: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attributes: { name: "twitter:site", content: TWITTER_HANDLE } },
    { tag: "meta", attributes: { name: "twitter:title", content: fullTitle } },
    { tag: "meta", attributes: { name: "twitter:description", content: description } },
    { tag: "meta", attributes: { name: "twitter:image", content: image } },
  ]);

  return null;
};
