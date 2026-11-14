import { articleSources } from "@/content/articles";
import type { ArticleSource } from "@/content/define";
import { photos, type PhotoKey } from "@/content/photos";
import { articleHref, articleTypeLabels, editNames } from "./labels";
import { blocksToText, markdownToBlocks, readingMinutes } from "./markdown";
import type { Article, ArticleDetail } from "./types";

/**
 * Turns the article files in src/content/articles into the site's content
 * types. Runs once when the server starts; the results are reused.
 */

const resolvePhoto = (key: string) => photos[key as PhotoKey];

type Built = { card: Article; detail: Omit<ArticleDetail, "related"> };

function build(source: ArticleSource): Built {
  const body = markdownToBlocks(source.body, resolvePhoto);
  const card: Article = {
    slug: source.slug,
    title: source.title,
    excerpt: source.excerpt,
    type: source.type,
    typeLabel: articleTypeLabels[source.type],
    edit: source.edit,
    category: editNames[source.edit],
    image: photos[source.image],
    imageLabel: photos[source.image].alt,
    publishedAt: source.publishedAt,
    updatedAt: source.updatedAt,
    readingMinutes: readingMinutes(
      [
        blocksToText(body),
        ...source.takeaways,
        ...source.faq.flatMap((item) => [item.question, item.answer]),
      ].join(" "),
    ),
    href: articleHref(source.type, source.slug),
  };
  return {
    card,
    detail: {
      ...card,
      tags: source.tags.map((title) => ({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      })),
      body,
      products: [],
      takeaways: source.takeaways,
      faq: source.faq,
      seo: source.seoTitle ? { title: source.seoTitle } : undefined,
    },
  };
}

const built = articleSources
  .map(build)
  .sort((a, b) => (b.card.publishedAt ?? "").localeCompare(a.card.publishedAt ?? ""));

/** All local articles, newest first. */
export const localArticles: Article[] = built.map((item) => item.card);

export function localArticleDetail(slug: string): ArticleDetail | undefined {
  const found = built.find((item) => item.card.slug === slug);
  if (!found) return undefined;
  const sameEdit = localArticles.filter(
    (other) => other.edit === found.card.edit && other.slug !== slug,
  );
  const others = localArticles.filter(
    (other) => other.edit !== found.card.edit && other.slug !== slug,
  );
  return { ...found.detail, related: [...sameEdit, ...others].slice(0, 3) };
}
