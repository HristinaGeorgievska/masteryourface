import { useQuery } from "@tanstack/react-query";
import { contentfulClient } from "@/lib/contentful";

export interface CoursePhotoItem {
  id: string;
  url: string;
  title?: string;
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

interface ContentfulAsset {
  sys?: { id?: string };
  fields?: {
    title?: string;
    file?: {
      url?: string;
    };
  };
}

interface CoursePhotoFields {
  title?: string;
  order?: number;
  photo?: ContentfulAsset | ContentfulAsset[];
}

const fetchCoursePhotos = async (): Promise<CoursePhotoItem[]> => {
  const response = await contentfulClient.getEntries({
    content_type: "coursePhotos",
  });

  const photos: CoursePhotoItem[] = [];

  response.items.forEach((item, itemIdx) => {
    const fields = item.fields as unknown as CoursePhotoFields;
    const order = typeof fields.order === "number" ? fields.order : itemIdx;
    const itemTitle = typeof fields.title === "string" ? stripHtml(fields.title) : undefined;

    const rawPhoto = fields.photo;
    if (!rawPhoto) return;

    // Handle case where 'photo' is an array of Assets
    if (Array.isArray(rawPhoto)) {
      rawPhoto.forEach((asset, subIdx) => {
        const rawUrl = asset?.fields?.file?.url;
        if (rawUrl) {
          const url = sanitizeCdnImageUrl(rawUrl);
          if (url) {
            const assetTitle = typeof asset.fields?.title === "string" ? stripHtml(asset.fields.title) : undefined;
            photos.push({
              id: asset.sys?.id || `${item.sys.id}-${subIdx}`,
              url,
              title: assetTitle || itemTitle,
              order,
            });
          }
        }
      });
    }
    // Handle case where 'photo' is a single Asset
    else if (rawPhoto?.fields?.file?.url) {
      const url = sanitizeCdnImageUrl(rawPhoto.fields.file.url);
      if (url) {
        const assetTitle = typeof rawPhoto.fields?.title === "string" ? stripHtml(rawPhoto.fields.title) : undefined;
        photos.push({
          id: item.sys.id,
          url,
          title: itemTitle || assetTitle,
          order,
        });
      }
    }
  });

  // Sort by order
  return photos.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const useCoursePhotos = () => {
  return useQuery({
    queryKey: ["coursePhotos"],
    queryFn: fetchCoursePhotos,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
};
