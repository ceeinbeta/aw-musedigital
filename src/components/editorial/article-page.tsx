import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparisonTable } from "@/components/affiliate/comparison-table";
import { DisclosureNotice } from "@/components/affiliate/disclosure-notice";
import { ProductGrid } from "@/components/affiliate/product-card";
import { ReviewSummary } from "@/components/affiliate/review-summary";
import { Newsletter } from "@/components/home/newsletter-social";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getArticle, type ArticleDetail, type ArticleType } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { article as articleData, breadcrumbs, faqPage, graph } from "@/lib/seo/structured-data";
import { PhotoCredit } from "@/components/ui/photo-credit";
import { FaqSection, KeyTakeaways, TableOfContents, tableOfContents } from "./article-extras";
import { ArticleBody } from "./article-body";
import { ShareLinks } from "./share-links";
import { ArticleCard } from "./article-card";

/** The index page each template belongs under, for breadcrumbs. */
const sections: Partial<Record<ArticleType, { label: string; href: string }>> = {
  review: { label: "Reviews", href: "/journal" },
  comparison: { label: "Comparisons", href: "/journal" },
};
const journal = { label: "The Journal", href: "/journal" };

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

function hasAffiliateContent(article: ArticleDetail): boolean {
  return (
    article.products.length > 0 ||
    Boolean(article.review?.product) ||
    Boolean(article.comparison) ||
    article.body.some((block) => block._type === "productEmbed")
  );
}

/** Builds the SEO metadata for an article page. */
export async function articleMetadata(
  slug: string,
  allow: (type: ArticleType) => boolean,
): Promise<Metadata> {
  const article = await getArticle(slug);
  if (!article || !allow(article.type)) return {};
  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.excerpt;
  return {
    title,
    description,
    alternates: { canonical: article.href },
    robots: article.seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url: article.href,
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : undefined,
      ...(article.image ? { images: [{ url: article.image.url, alt: article.image.alt }] } : {}),
    },
  };
}

type ArticlePageProps = {
  slug: string;
  /** The templates this route is allowed to show; others return "not found". */
  allow: (type: ArticleType) => boolean;
};

/**
 * The single template behind every article. The article's type switches on
 * the extra blocks: a review panel, a comparison table or a product grid.
 */
export async function ArticlePage({ slug, allow }: ArticlePageProps) {
  const article = await getArticle(slug);
  if (!article || !allow(article.type)) notFound();

  const section = sections[article.type] ?? journal;
  const affiliate = hasAffiliateContent(article);
  const toc = tableOfContents(article.body);
  const absoluteUrl = new URL(article.href, siteConfig.url).toString();

  return (
    <article>
      <JsonLd
        data={graph(
          articleData(article),
          ...(article.faq.length > 0 ? [faqPage(article.faq)] : []),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: section.label, path: section.href },
            { name: article.title, path: article.href },
          ]),
        )}
      />
      <header className="bg-cream">
        <Container width="narrow" className="py-12 text-center sm:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap justify-center gap-3 text-[0.66rem] uppercase tracking-[0.26em] text-taupe-deep">
              <li>
                <Link href="/" className="link-underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={section.href} className="link-underline">
                  {section.label}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${article.edit}`} className="link-underline">
                  {article.category}
                </Link>
              </li>
            </ol>
          </nav>
          <Eyebrow className="mt-10">{article.typeLabel}</Eyebrow>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-[-0.01em] text-black text-balance sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed sm:text-2xl">
              {article.excerpt}
            </p>
          ) : null}
          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.24em] text-taupe-deep">
            By {article.author?.name ?? `the ${siteConfig.name} editors`}
            {article.updatedAt || article.publishedAt ? (
              <>
                <span aria-hidden="true"> · </span>
                {article.updatedAt ? "Updated " : null}
                <time dateTime={article.updatedAt ?? article.publishedAt}>
                  {dateFormat.format(new Date((article.updatedAt ?? article.publishedAt)!))}
                </time>
              </>
            ) : null}
            {article.readingMinutes ? (
              <>
                <span aria-hidden="true"> · </span>
                {article.readingMinutes} min read
              </>
            ) : null}
          </p>
        </Container>
      </header>

      <Container width="default" className="-mt-px">
        <Media
          image={article.image}
          label={article.imageLabel}
          ratio="wide"
          tone="champagne"
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
        />
        <PhotoCredit image={article.image} className="mt-3 text-right" />
      </Container>

      <Container width="default" className="py-12 sm:py-16">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16 xl:gap-24">
          <div className="mx-auto w-full max-w-3xl lg:mx-0">
          {affiliate ? <DisclosureNotice className="mb-10" /> : null}

          {article.review ? <div className="mb-12"><ReviewSummary review={article.review} /></div> : null}

          {article.takeaways.length > 0 ? <KeyTakeaways items={article.takeaways} /> : null}

          {toc.length >= 3 ? <TableOfContents items={toc} className="lg:hidden" /> : null}

          <ArticleBody body={article.body} />

          {article.faq.length > 0 ? <FaqSection items={article.faq} /> : null}

          <ShareLinks
            url={absoluteUrl}
            title={article.title}
            image={article.image?.url}
            className="mt-14 border-t border-beige pt-8 lg:hidden"
          />

          {article.tags.length > 0 ? (
            <ul aria-label="Tags" className="mt-14 flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <li
                  key={tag.slug}
                  className="border border-charcoal/40 px-4 py-2 text-[0.62rem] uppercase tracking-[0.22em]"
                >
                  {tag.title}
                </li>
              ))}
            </ul>
          ) : null}

          {article.author?.bio ? (
            <aside aria-label="About the author" className="mt-14 flex gap-6 border-t border-beige pt-8">
              {article.author.image ? (
                <Media
                  image={article.author.image}
                  label="Author portrait"
                  ratio="square"
                  sizes="96px"
                  className="!w-24 shrink-0"
                />
              ) : null}
              <div>
                <p className="font-serif text-xl font-medium text-black">{article.author.name}</p>
                {article.author.role ? (
                  <p className="mt-1 text-[0.64rem] uppercase tracking-[0.24em] text-taupe-deep">
                    {article.author.role}
                  </p>
                ) : null}
                <p className="mt-3 text-[0.95rem] leading-[1.75]">{article.author.bio}</p>
              </div>
            </aside>
          ) : null}
          </div>

          {/* Desktop sidebar: stays in view while the article scrolls. */}
          <aside aria-label="Article tools" className="hidden lg:block">
            <div className="sticky top-36 space-y-10">
              {toc.length >= 3 ? <TableOfContents items={toc} variant="sidebar" /> : null}
              <ShareLinks url={absoluteUrl} title={article.title} image={article.image?.url} />
              <a href="#main" className="link-underline inline-block text-[0.68rem] uppercase tracking-[0.24em]">
                Back to top
              </a>
            </div>
          </aside>
        </div>
      </Container>

      {article.comparison ? (
        <Section tone="cream" className="!py-14 sm:!py-20">
          <Container>
            <Heading size="lg" className="mb-8 text-black">
              Side by side
            </Heading>
            <div className="bg-ivory">
              <ComparisonTable comparison={article.comparison} />
            </div>
          </Container>
        </Section>
      ) : null}

      {article.products.length > 0 ? (
        <Section tone="cream" className="!py-14 sm:!py-20">
          <Container width="wide">
            <Eyebrow>Shop the story</Eyebrow>
            <Heading size="lg" className="mb-10 mt-4 text-black">
              Featured in this {article.typeLabel.toLowerCase()}
            </Heading>
            <ProductGrid products={article.products} />
          </Container>
        </Section>
      ) : null}

      {article.related.length > 0 ? (
        <Section>
          <Container width="wide">
            <Eyebrow>Keep reading</Eyebrow>
            <Heading size="xl" className="mb-10 mt-4 text-black sm:mb-14">
              Related stories
            </Heading>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {article.related.map((item) => (
                <li key={item.slug}>
                  <ArticleCard
                    title={item.title}
                    excerpt={item.excerpt}
                    category={item.category}
                    image={item.image}
                    readingMinutes={item.readingMinutes}
                    imageLabel={item.imageLabel}
                    href={item.href}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Newsletter />
    </article>
  );
}
