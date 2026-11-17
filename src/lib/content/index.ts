import { isValidAsin } from "@/lib/affiliate/links";
import { localArticleDetail, localArticles } from "./local";
import { collections, edits, products, projects, services } from "./placeholder";
import {
  fetchArticle,
  fetchArticleSlugs,
  fetchArticles,
  fetchCollection,
  fetchCollections,
  fetchProducts,
} from "./sanity-source";
import type {
  Article,
  ArticleDetail,
  ArticleType,
  Collection,
  Edit,
  EditSlug,
  Product,
  Project,
  Service,
} from "./types";

/**
 * The data-access layer. Pages call these functions and nothing else.
 *
 * Articles come from two places, shown together: the files in
 * src/content/articles, and Sanity once it is connected. If the same slug
 * exists in both, the Sanity version wins.
 *
 * Products only appear once they are real, meaning they have an Amazon ASIN.
 * Until then every shopping section on the site stays hidden.
 */

const byDate = (a: Article, b: Article) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

async function allArticles(edit: EditSlug | null): Promise<Article[]> {
  const fromSanity = (await fetchArticles(edit, 500)) ?? [];
  const sanitySlugs = new Set(fromSanity.map((item) => item.slug));
  const local = localArticles.filter(
    (item) => !sanitySlugs.has(item.slug) && (edit === null || item.edit === edit),
  );
  return [...fromSanity, ...local].sort(byDate);
}

const isReal = (product: Product) => isValidAsin(product.asin);

export async function getEdits(): Promise<Edit[]> {
  return edits;
}

export async function getEdit(slug: EditSlug): Promise<Edit | undefined> {
  return edits.find((edit) => edit.slug === slug);
}

export async function getLatestArticles(limit = 4): Promise<Article[]> {
  return (await allArticles(null)).slice(0, limit);
}

export async function getArticlesByEdit(edit: EditSlug, limit = 3): Promise<Article[]> {
  return (await allArticles(edit)).slice(0, limit);
}

/**
 * Simple relevance search across articles. Every word must appear somewhere
 * in the title, excerpt or section; matches in the title rank higher.
 */
export async function searchArticles(query: string, limit = 30): Promise<Article[]> {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.replace(/[^\p{L}\p{N}-]/gu, ""))
    .filter((word) => word.length > 1)
    .slice(0, 8);
  if (words.length === 0) return [];
  const all = await allArticles(null);
  return all
    .map((item) => {
      const title = item.title.toLowerCase();
      const rest = `${item.excerpt} ${item.category} ${item.typeLabel}`.toLowerCase();
      let score = 0;
      for (const word of words) {
        if (title.includes(word)) score += 3;
        else if (rest.includes(word)) score += 1;
        else return null;
      }
      return { item, score };
    })
    .filter((result): result is { item: Article; score: number } => result !== null)
    .sort((a, b) => b.score - a.score || byDate(a.item, b.item))
    .slice(0, limit)
    .map((result) => result.item);
}

/** Slugs for pre-building article pages, optionally limited to some templates. */
export async function getArticleSlugs(types?: ArticleType[]): Promise<string[]> {
  const fromSanity = (await fetchArticleSlugs()) ?? [];
  const all = [
    ...fromSanity,
    ...localArticles.map(({ slug, type }) => ({ slug, type })),
  ];
  const wanted = all.filter((item) => !types || types.includes(item.type));
  return [...new Set(wanted.map((item) => item.slug))];
}

export async function getArticle(slug: string): Promise<ArticleDetail | undefined> {
  return (await fetchArticle(slug)) ?? localArticleDetail(slug);
}

export async function getProductsByEdit(edit: EditSlug, limit = 4): Promise<Product[]> {
  const source = (await fetchProducts(edit, null, limit)) ?? products;
  return source.filter((item) => item.edit === edit && isReal(item)).slice(0, limit);
}

/** Every recommended product, for the shop. */
export async function getAllProducts(): Promise<Product[]> {
  return ((await fetchProducts(null, null, 200)) ?? products).filter(isReal);
}

export async function getCollections(): Promise<Collection[]> {
  const source = (await fetchCollections()) ?? collections;
  return source
    .map((item) => ({ ...item, products: item.products.filter(isReal) }))
    .filter((item) => item.products.length > 0);
}

export async function getCollection(slug: string): Promise<Collection | undefined> {
  const found = (await fetchCollection(slug)) ?? collections.find((item) => item.slug === slug);
  if (!found) return undefined;
  const real = { ...found, products: found.products.filter(isReal) };
  return real.products.length > 0 ? real : undefined;
}

/** Whether there is anything to show in the shop yet. */
export async function hasShop(): Promise<boolean> {
  return (await getAllProducts()).length > 0;
}

/** Products for the homepage "Shop the edit" row. */
export async function getShopTheEdit(limit = 4): Promise<Product[]> {
  return ((await fetchProducts(null, "featured", limit)) ?? products).filter(isReal).slice(0, limit);
}

/** Editor-selected products for the "Trending" row. */
export async function getTrendingProducts(limit = 4): Promise<Product[]> {
  return ((await fetchProducts(null, "trending", limit)) ?? products.slice(4))
    .filter(isReal)
    .slice(0, limit);
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return services.find((service) => service.slug === slug);
}

/**
 * Portfolio projects. Empty until real projects with real photographs are
 * added, so no placeholder is ever presented as the studio's own work.
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return projects.filter((project) => project.isReal).slice(0, limit);
}

export type {
  Article,
  ArticleDetail,
  ArticleType,
  Collection,
  Edit,
  EditSlug,
  Product,
  Project,
  Service,
};
