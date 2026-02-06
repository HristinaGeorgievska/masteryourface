import { useQuery } from "@tanstack/react-query";
import { contentfulClient, ShowcaseEntry } from "../lib/contentful";
import { sanitizeCdnImageUrl } from "../lib/utils";

export interface ShowcaseItem {
  id: string;
  image: string;
  name?: string;
  client?: string;
  photographer?: string;
  order?: number;
}

const fetchShowcase = async (): Promise<ShowcaseItem[]> => {
  const response = await contentfulClient.getEntries<ShowcaseEntry>({
    content_type: "showcaseItem",
    order: ["fields.order"],
  });

  return response.items.map((item) => {
    const fields = item.fields;
    
    // Extract image URL safely and validate CDN origin
    let imageUrl = "";
    if (fields.image && fields.image.fields && fields.image.fields.file) {
      let rawUrl = fields.image.fields.file.url as string;
      // Contentful URLs sometimes miss the protocol
      if (rawUrl.startsWith("//")) {
        rawUrl = `https:${rawUrl}`;
      }
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
};

export const useShowcase = () => {
  return useQuery({
    queryKey: ["showcase"],
    queryFn: fetchShowcase,
  });
};
