import { useQuery } from "@tanstack/react-query";
import { contentfulClient } from "@/lib/contentful";

export interface ReviewItem {
  id: string;
  review: string;
  name: string;
  absolvedCourse?: string;
}

interface ReviewFields {
  reviewText?: string;
  ReviewText?: string;
  review?: string;
  name?: string;
  Name?: string;
  absolvedCourse?: string;
  AbsolvedCourse?: string;
}

function stripHtml(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

const fetchReviews = async (): Promise<ReviewItem[]> => {
  const response = await contentfulClient.getEntries({
    content_type: "reviews",
    order: ["-sys.createdAt"],
  });

  return response.items
    .map((item) => {
      const fields = item.fields as unknown as ReviewFields;
      const reviewText =
        fields.reviewText || fields.ReviewText || fields.review || "";
      const name = fields.name || fields.Name || "";
      const absolvedCourse =
        fields.absolvedCourse || fields.AbsolvedCourse || "";

      return {
        id: item.sys.id,
        review: stripHtml(reviewText),
        name: stripHtml(name),
        absolvedCourse: stripHtml(absolvedCourse) || undefined,
      };
    })
    .filter((item) => Boolean(item.review && item.name));
};

export const useReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
  });
};
