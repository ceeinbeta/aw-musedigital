import { ArticlePage, articleMetadata } from "@/components/editorial/article-page";
import { getArticleSlugs, type ArticleType } from "@/lib/content";

/** The article templates served under /compare. */
const allow = (type: ArticleType) => type === "comparison";

// Article pages wait for their content rather than streaming, so that a
// missing article returns a true 404 status to search engines.
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs(["comparison"]);
  // Next.js needs at least one entry; an unknown slug simply renders "not found".
  return (slugs.length > 0 ? slugs : ["__placeholder__"]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  return articleMetadata(slug, allow);
}

export default async function ComparisonPage({ params }: PageProps<"/compare/[slug]">) {
  const { slug } = await params;
  return <ArticlePage slug={slug} allow={allow} />;
}
