import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { cs } from "date-fns/locale";
import { contentfulClient } from "@/lib/contentful";

export interface FormattedCourse {
  id: string;
  city: string;
  address?: string;
  date: string;
  timeRange: string;
  status: boolean;
  bookingUrl: string;
  heroImage?: string;
  batch?: number;
  price?: number;
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

/** Trusted booking domains — prevents open redirect if CMS is compromised. */
const TRUSTED_BOOKING_HOSTS = [
  "tidycal.com",
  "masteryourface.cz",
  "www.masteryourface.cz",
];

function isSafeBookingUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      TRUSTED_BOOKING_HOSTS.some(
        (h) => parsed.hostname === h || parsed.hostname.endsWith("." + h),
      )
    );
  } catch {
    return false;
  }
}

function stripHtml(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

interface CourseFields {
  city: string;
  adress?: string;
  date: string;
  status: boolean;
  bookingUrl: string;
  batch?: number;
  price?: number;
  hero?: { fields: { file: { url: string } } };
}

const fetchCourses = async (): Promise<FormattedCourse[]> => {
  const response = await contentfulClient.getEntries({
    content_type: "course",
    order: ["fields.date"],
  });

  return response.items.map((item) => {
    const fields = item.fields as unknown as CourseFields;
    
    // Strip timezone strings (e.g. "+01:00") to treat it as a floating local time.
    // "2026-04-15T10:00:00+01:00" -> "2026-04-15T10:00"
    const rawDateStr = fields.date ? fields.date.substring(0, 16) : new Date().toISOString();
    const dateObj = parseISO(rawDateStr);

    const formattedDate = format(dateObj, "d. MMMM yyyy", { locale: cs });
    const startTime = format(dateObj, "HH:mm");
    const endTime = format(
      new Date(dateObj.getTime() + 5 * 60 * 60 * 1000),
      "HH:mm",
    );

    let heroImage: string | undefined;
    if (fields.hero?.fields?.file?.url) {
      heroImage = sanitizeCdnImageUrl(fields.hero.fields.file.url) || undefined;
    }

    const bookingUrl = isSafeBookingUrl(fields.bookingUrl)
      ? fields.bookingUrl
      : "#";

    return {
      id: item.sys.id,
      city: stripHtml(fields.city),
      address: fields.adress ? stripHtml(fields.adress) : undefined,
      date: formattedDate,
      timeRange: `${startTime} - ${endTime}`,
      status: fields.status,
      bookingUrl,
      heroImage,
      batch: fields.batch,
      price: fields.price,
    };
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 min cache (replaces s-maxage from serverless)
  });
};
