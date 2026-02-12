import { useQuery } from "@tanstack/react-query";
import { contentfulClient } from "@/lib/contentful";

export interface ShowcaseItem {
  id: string;
  image: string;
  name?: string;
  client?: string;
  photographer?: string;
  order?: number;
}

/** Allowed hostnames for Contentful CDN image assets. */
const CONTENTFUL_CDN_HOSTS = ["images.ctfassets.net", "downloads.ctfassets.net"];

function sanitizeCdnImageUrl(rawUrl: string): string {
  try {
    const url = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl;
    const parsed = new URL(url);
    if (
      parsed.protocol === "https:" &&
      CONTENTFUL_CDN_HOSTS.some((h) => parsed.hostname === h)
    ) {
      return url;
    }
    return "";
  } catch {
    return "";
  }
}

function stripHtml(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

interface ShowcaseFields {
  name?: string;
  client?: string;
  photographer?: string;
  image: { fields: { file: { url: string } } };
  order?: number;
}

const fetchShowcase = async (): Promise<ShowcaseItem[]> => {
  const response = await contentfulClient.getEntries({
    content_type: "showcaseItem",
    order: ["fields.order"],
  });

  return response.items.map((item) => {
    const fields = item.fields as unknown as ShowcaseFields;

    let imageUrl = "";
    if (fields.image?.fields?.file?.url) {
      imageUrl = sanitizeCdnImageUrl(fields.image.fields.file.url as string);
    }

    return {
      id: item.sys.id,
      name: stripHtml(fields.name),
      client: stripHtml(fields.client),
      photographer: stripHtml(fields.photographer),
      image: imageUrl,
      order: fields.order,
    };
  });
};

export const useShowcase = () => {
  return useQuery({
    queryKey: ["showcase"],
    queryFn: fetchShowcase,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
};
