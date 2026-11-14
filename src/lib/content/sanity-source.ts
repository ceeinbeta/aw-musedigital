import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import {
  articleBySlugQuery,
  articleSlugsQuery,
  articlesQuery,
  collectionBySlugQuery,
  collectionsQuery,
  productsQuery,
} from "@/sanity/queries";
import { articleHref, articleTypeLabels, editNames } from "./labels";
import type {
  Article,
  ArticleDetail,
  ArticleType,
  Collection,
  EditSlug,
  ImageAsset,
  Product,
} from "./types";

/**
 * Reads content from Sanity and converts it to the site's content types.
 * Every function returns null when Sanity is not configured or the request
 * fails, so the caller can fall back to placeholder content.
 *
 * Results are cached for an hour and tagged "content", so a webhook can
 * refresh them the moment something is published (wired up in Phase 9).
 */

type RawImage = { url?: string | null; alt?: string | null; width?: number | null; height?: number | null } | null;

type RawProduct = {
  id: string;
  title?: string | null;
  category?: string | null;
  edit?: string | null;
  note?: string | null;
  asin?: string | null;
  image?: RawImage;
};

type RawArticle = {
  slug: string;
  title?: string | null;
  excerpt?: string | null;
  type?: string | null;
  edit?: string | null;
  image?: RawImage;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

function toImage(raw: RawImage | undefined): ImageAsset | undefined {
  if (!raw?.url) return undefined;
  return {
    url: raw.url,
    alt: raw.alt ?? "",
    width: raw.width ?? undefined,
    height: raw.height ?? undefined,
  };
}

const isEdit = (value: unknown): value is EditSlug =>
  typeof value === "string" && value in editNames;
const isType = (value: unknown): value is ArticleType =>
  typeof value === "string" && value in articleTypeLabels;

function toProduct(raw: RawProduct): Product {
  const edit = isEdit(raw.edit) ? raw.edit : "living-edit";
  return {
    id: raw.id,
    title: raw.title ?? "Untitled product",
    category: raw.category || editNames[edit],
    edit,
    note: raw.note ?? "",
    asin: raw.asin ?? undefined,
    image: toImage(raw.image),
    imageLabel: "Product photograph",
  };
}

function toArticle(raw: RawArticle): Article {
  const type = isType(raw.type) ? raw.type : "lifestyle";
  const edit = isEdit(raw.edit) ? raw.edit : "living-edit";
  return {
    slug: raw.slug,
    title: raw.title ?? "Untitled",
    excerpt: raw.excerpt ?? "",
    type,
    typeLabel: articleTypeLabels[type],
    edit,
    category: editNames[edit],
    image: toImage(raw.image),
    imageLabel: "Featured image",
    publishedAt: raw.publishedAt ?? undefined,
    updatedAt: raw.updatedAt ?? undefined,
    href: articleHref(type, raw.slug),
  };
}

async function query<T>(groq: string, params: Record<string, unknown>): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(groq, params);
  } catch (error) {
    console.error("Sanity request failed; using placeholder content.", error);
    return null;
  }
}

export async function fetchArticles(edit: EditSlug | null, limit: number): Promise<Article[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const rows = await query<RawArticle[]>(articlesQuery, { edit, limit });
  return rows && rows.length > 0 ? rows.map(toArticle) : null;
}

export async function fetchArticleSlugs(): Promise<{ slug: string; type: ArticleType }[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const rows = await query<{ slug: string; type?: string | null }[]>(articleSlugsQuery, {});
  if (!rows || rows.length === 0) return null;
  return rows.map((row) => ({ slug: row.slug, type: isType(row.type) ? row.type : "lifestyle" }));
}

type RawDetail = RawArticle & {
  author?: { name?: string | null; slug?: string | null; role?: string | null; bio?: string | null; image?: RawImage } | null;
  tags: { title?: string | null; slug?: string | null }[];
  body: ArticleDetail["body"];
  products: RawProduct[];
  review?: { verdict?: string | null; pros: string[]; cons: string[]; product?: RawProduct | null } | null;
  comparison?: { products: RawProduct[]; rows: { label?: string | null; values: string[] }[] } | null;
  related: RawArticle[];
  takeaways: string[];
  faq: { question?: string | null; answer?: string | null }[];
  seo?: { title?: string | null; description?: string | null; noindex?: boolean | null } | null;
};

export async function fetchArticle(slug: string): Promise<ArticleDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const raw = await query<RawDetail | null>(articleBySlugQuery, { slug });
  if (!raw) return null;

  const base = toArticle(raw);
  let related = raw.related.map(toArticle);
  if (related.length === 0) {
    const sameEdit = await query<RawArticle[]>(articlesQuery, { edit: base.edit, limit: 4 });
    related = (sameEdit ?? []).map(toArticle).filter((item) => item.slug !== slug).slice(0, 3);
  }

  return {
    ...base,
    author: raw.author?.name
      ? {
          name: raw.author.name,
          slug: raw.author.slug ?? "",
          role: raw.author.role ?? undefined,
          bio: raw.author.bio ?? undefined,
          image: toImage(raw.author.image),
        }
      : undefined,
    tags: raw.tags.flatMap((tag) => (tag.title && tag.slug ? [{ title: tag.title, slug: tag.slug }] : [])),
    body: raw.body,
    products: raw.products.map(toProduct),
    review: raw.review
      ? {
          product: raw.review.product ? toProduct(raw.review.product) : undefined,
          verdict: raw.review.verdict ?? undefined,
          pros: raw.review.pros,
          cons: raw.review.cons,
        }
      : undefined,
    comparison:
      raw.comparison && raw.comparison.products.length > 0
        ? {
            products: raw.comparison.products.map(toProduct),
            rows: raw.comparison.rows.map((row) => ({ label: row.label ?? "", values: row.values })),
          }
        : undefined,
    related,
    takeaways: raw.takeaways,
    faq: raw.faq.flatMap((item) =>
      item.question && item.answer ? [{ question: item.question, answer: item.answer }] : [],
    ),
    seo: raw.seo
      ? {
          title: raw.seo.title ?? undefined,
          description: raw.seo.description ?? undefined,
          noindex: raw.seo.noindex ?? undefined,
        }
      : undefined,
  };
}

export async function fetchProducts(
  edit: EditSlug | null,
  flag: "featured" | "trending" | null,
  limit: number,
): Promise<Product[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const rows = await query<RawProduct[]>(productsQuery, { edit, flag, limit });
  return rows && rows.length > 0 ? rows.map(toProduct) : null;
}

type RawCollection = {
  slug: string;
  title?: string | null;
  description?: string | null;
  image?: RawImage;
  products: RawProduct[];
};

function toCollection(raw: RawCollection): Collection {
  return {
    slug: raw.slug,
    title: raw.title ?? "Untitled collection",
    description: raw.description ?? "",
    image: toImage(raw.image),
    imageLabel: "Collection cover photograph",
    href: `/shop/${raw.slug}`,
    products: raw.products.map(toProduct),
  };
}

export async function fetchCollections(): Promise<Collection[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const rows = await query<RawCollection[]>(collectionsQuery, {});
  return rows && rows.length > 0 ? rows.map(toCollection) : null;
}

export async function fetchCollection(slug: string): Promise<Collection | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const raw = await query<RawCollection | null>(collectionBySlugQuery, { slug });
  return raw ? toCollection(raw) : null;
}
