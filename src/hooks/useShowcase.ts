import { useQuery } from "@tanstack/react-query";

export interface ShowcaseItem {
  id: string;
  image: string;
  name?: string;
  client?: string;
  photographer?: string;
  order?: number;
}

const fetchShowcase = async (): Promise<ShowcaseItem[]> => {
  const response = await fetch("/api/showcase");
  if (!response.ok) {
    throw new Error("Failed to fetch showcase");
  }
  return response.json();
};

export const useShowcase = () => {
  return useQuery({
    queryKey: ["showcase"],
    queryFn: fetchShowcase,
  });
};
