import { siteConfig } from "@/lib/site";

/**
 * Shared Open Graph fields. Next.js replaces the whole `openGraph` object
 * when a page defines its own, so every page spreads this in to keep the
 * site name and the default share image.
 */
export const baseOpenGraph = {
  type: "website" as const,
  siteName: siteConfig.name,
  locale: "en",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
};
