import { useQuery } from "@tanstack/react-query";
import { contentfulClient, CourseEntry } from "../lib/contentful";
import { format, parseISO } from "date-fns";
import { cs } from "date-fns/locale";

export interface FormattedCourse {
  id: string;
  city: string;
  address: string;
  date: string;
  timeRange: string;
  status: boolean;
  bookingUrl: string;
  heroImage?: string;
}

const fetchCourses = async (): Promise<FormattedCourse[]> => {
  const response = await contentfulClient.getEntries<CourseEntry>({
    content_type: "course",
    order: "fields.date", // Sort by date ascending
  });

  return response.items.map((item) => {
    const fields = item.fields;
    const dateObj = fields.date ? parseISO(fields.date) : new Date();
    
    // Format date: "15. Března 2024"
    const formattedDate = format(dateObj, "d. MMMM yyyy", { locale: cs });
    
    // Format time: "10:00" (assuming duration is fixed or handled elsewhere, or just showing start time)
    // The plan mentioned "Includes both date and start time". 
    // If we want a range like "10:00 - 15:00", we might need to infer duration or have it in the date.
    // For now I will extract the start time from the date.
    const startTime = format(dateObj, "HH:mm");
    const endTime = format(new Date(dateObj.getTime() + 5 * 60 * 60 * 1000), "HH:mm"); // Assuming 5 hours as per original UI "cca 5 hodin"

    let heroImageUrl = undefined;
    if (fields.hero && fields.hero.fields && fields.hero.fields.file && fields.hero.fields.file.url) {
      heroImageUrl = fields.hero.fields.file.url;
      // Ensure protocol is present (Contentful often returns //domain.com)
      if (heroImageUrl.startsWith("//")) {
        heroImageUrl = `https:${heroImageUrl}`;
      }
    }

    return {
      id: item.sys.id,
      city: fields.city,
      address: fields.adress,
      date: formattedDate,
      timeRange: `${startTime} - ${endTime}`,
      status: fields.status,
      bookingUrl: fields.bookingUrl,
      heroImage: heroImageUrl,
    };
  });
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
