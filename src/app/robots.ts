import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** The robots.txt file. Internal pages are kept out of search results. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/style-guide", "/newsletter/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
