import type { MetadataRoute } from "next";
import {
  getCollections,
  getEdits,
  getLatestArticles,
  getServices,
  hasShop,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * The XML sitemap at /sitemap.xml, listing every public page with its last
 * update date and main image. Shop pages are listed only once real products
 * exist, so search engines never index empty pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [edits, articles, services, collections, shopOpen] = await Promise.all([
    getEdits(),
    getLatestArticles(1000),
    getServices(),
    getCollections(),
    hasShop(),
  ]);
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const newest = articles[0]?.updatedAt ?? articles[0]?.publishedAt;

  const fixed: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: url("/journal"), lastModified: newest, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.5 },
    ...["/privacy-policy", "/cookie-policy", "/affiliate-disclosure", "/terms", "/accessibility"].map(
      (path) => ({ url: url(path), changeFrequency: "yearly" as const, priority: 0.2 }),
    ),
  ];

  return [
    ...fixed,
    ...edits.map((edit) => {
      const latest = articles.find((item) => item.edit === edit.slug);
      return {
        url: url(edit.href),
        lastModified: latest?.updatedAt ?? latest?.publishedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
        ...(edit.image ? { images: [edit.image.url] } : {}),
      };
    }),
    ...articles.map((item) => ({
      url: url(item.href),
      lastModified: item.updatedAt ?? item.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(item.image ? { images: [item.image.url] } : {}),
    })),
    ...services.map((item) => ({
      url: url(item.href),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(item.image ? { images: [item.image.url] } : {}),
    })),
    ...(shopOpen
      ? [
          { url: url("/shop"), changeFrequency: "weekly" as const, priority: 0.6 },
          ...collections.map((item) => ({ url: url(item.href), priority: 0.5 })),
        ]
      : []),
  ];
}
