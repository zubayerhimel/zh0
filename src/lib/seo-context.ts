import { createContext } from "react";

/** Resolved head tags for one route. */
export interface SeoTags {
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

/** Provided only while prerendering, so the build can write each route's head tags into its HTML. */
export const SeoCollectorContext = createContext<((tags: SeoTags) => void) | null>(null);
