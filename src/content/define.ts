import type { ArticleType, EditSlug } from "@/lib/content/types";
import type { PhotoKey } from "./photos";

/**
 * The shape of an article written in this folder. Each article is one file
 * in src/content/articles. When Sanity is connected, new articles can be
 * written there instead; both kinds appear on the site together.
 */
export type ArticleSource = {
  slug: string;
  title: string;
  /** Optional shorter title for search results (about 60 characters). */
  seoTitle?: string;
  /** One or two sentences: used on cards, under the headline and as the meta description. */
  excerpt: string;
  type: ArticleType;
  edit: EditSlug;
  /** ISO date, e.g. "2026-11-02". */
  publishedAt: string;
  updatedAt?: string;
  image: PhotoKey;
  tags: string[];
  takeaways: string[];
  /** The article itself, in the simple Markdown described in lib/content/markdown.ts. */
  body: string;
  faq: { question: string; answer: string }[];
};

/** Identity helper that gives each article file type checking. */
export const defineArticle = (article: ArticleSource) => article;
