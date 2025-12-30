import { useQuery } from "@tanstack/react-query";
import { contentfulClient, ShowcaseEntry } from "../lib/contentful";

export interface ShowcaseItem {
  id: string;
  image: string;
  name: string;
  client: string;
  photographer: string;
  order?: number;
}

const fetchShowcase = async (): Promise<ShowcaseItem[]> => {
  const response = await contentfulClient.getEntries<ShowcaseEntry>({
    content_type: "showcaseItem",
    order: "fields.order",
  } as any);

  return response.items.map((item) => {
    const fields = item.fields;
    
    // Extract image URL safely
    let imageUrl = "";
    if (fields.image && fields.image.fields && fields.image.fields.file) {
      imageUrl = fields.image.fields.file.url as string;
      // Contentful URLs sometimes miss the protocol
      if (imageUrl.startsWith("//")) {
        imageUrl = `https:${imageUrl}`;
      }
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
