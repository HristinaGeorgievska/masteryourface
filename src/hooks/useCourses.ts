import { useQuery } from "@tanstack/react-query";

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
  const response = await fetch("/api/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
