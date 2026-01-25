import { createClient, Entry, Asset } from "contentful";

export const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export interface CourseFields {
  city: string;
  adress: string;
  date: string; // ISO 8601 date string
  status: boolean;
  bookingUrl: string;
  hero?: Asset; // Made optional just in case existing entries don't have it yet, though typically it's expected
}

export type CourseEntry = Entry<CourseFields>;

export interface ShowcaseItemFields {
  name?: string;
  client?: string;
  photographer?: string;
  image: Asset;
  order?: number;
}

export type ShowcaseEntry = Entry<ShowcaseItemFields>;
