import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { ArticleCard } from "@/components/editorial/article-card";
import { Newsletter } from "@/components/home/newsletter-social";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/typography";
import { JsonLd } from "@/components/seo/json-ld";
import { getEdits, getLatestArticles } from "@/lib/content";
import { articleList, breadcrumbs, graph } from "@/lib/seo/structured-data";

const description =
  "Practical guides to home, style, hosting and creative business from the MUSE DIGITAL journal.";

export const metadata: Metadata = {
  title: "The Journal",
  description,
  alternates: { canonical: "/journal" },
  openGraph: {
      ...baseOpenGraph, title: "The Journal", description, url: "/journal" },
};

export default async function JournalPage() {
  const [articles, edits] = await Promise.all([getLatestArticles(48), getEdits()]);
  const [lead, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={graph(
          articleList("The Journal", "/journal", articles),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "The Journal", path: "/journal" },
          ]),
        )}
      />
      <Section tone="cream" className="!py-14 sm:!py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Stories and guides"
            title="The Journal"
            intro="Practical guides to home, style, hosting and creative business, updated as advice changes."
          />
          <nav aria-label="Browse by edit" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-3">
              {edits.map((edit) => (
                <li key={edit.slug}>
                  <Link
                    href={edit.href}
                    className="inline-flex min-h-11 items-center border border-charcoal/40 px-5 text-[0.64rem] uppercase tracking-[0.24em] transition-colors duration-500 ease-editorial hover:bg-black hover:text-ivory"
                  >
                    {edit.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          {lead ? (
            <>
              <ArticleCard
                layout="feature"
                headingLevel="h2"
                title={lead.title}
                excerpt={lead.excerpt}
                category={`${lead.category} · ${lead.typeLabel}`}
                image={lead.image}
                imageLabel={lead.imageLabel}
                href={lead.href}
              />
              <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
                {rest.map((article) => (
                  <li key={article.slug}>
                    <ArticleCard
                      headingLevel="h2"
                      title={article.title}
                      excerpt={article.excerpt}
                      category={`${article.category} · ${article.typeLabel}`}
                      image={article.image}
                      imageLabel={article.imageLabel}
                      href={article.href}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center font-serif text-2xl">The first stories are coming soon.</p>
          )}
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
