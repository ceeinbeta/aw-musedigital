import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleCard } from "@/components/editorial/article-card";
import { SearchForm } from "@/components/search/search-form";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { getEdits, searchArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the MUSE DIGITAL journal.",
  // Result pages change with every query, so search engines should not index them.
  robots: { index: false, follow: true },
};

type SearchProps = { searchParams: Promise<{ q?: string | string[] }> };

const readQuery = (q: string | string[] | undefined) =>
  (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 100) ?? "";

export default function SearchPage({ searchParams }: SearchProps) {
  return (
    <>
      <Section tone="cream" className="!py-14 sm:!py-20">
        <Container width="narrow">
          <Eyebrow>The Journal</Eyebrow>
          <h1 className="mt-5 text-black">Search</h1>
          <Suspense fallback={<SearchForm className="mt-8" />}>
            <SearchBox searchParams={searchParams} />
          </Suspense>
        </Container>
      </Section>
      <Section className="flex-1">
        <Container width="wide">
          <Suspense fallback={<p className="text-center">Searching…</p>}>
            <Results searchParams={searchParams} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}

async function SearchBox({ searchParams }: SearchProps) {
  const query = readQuery((await searchParams).q);
  return <SearchForm className="mt-8" defaultValue={query} autoFocus={!query} />;
}

async function Results({ searchParams }: SearchProps) {
  const query = readQuery((await searchParams).q);
  if (!query) return <Suggestions />;

  const results = await searchArticles(query);
  return (
    <>
      <p role="status" className="mb-10 text-[0.72rem] uppercase tracking-[0.24em] text-taupe-deep">
        {results.length === 0
          ? `No results for “${query}”`
          : `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`}
      </p>
      {results.length > 0 ? (
        <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <li key={article.slug}>
              <ArticleCard
                headingLevel="h2"
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                image={article.image}
                readingMinutes={article.readingMinutes}
                imageLabel={article.imageLabel}
                href={article.href}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Suggestions />
      )}
    </>
  );
}

async function Suggestions() {
  const edits = await getEdits();
  return (
    <div className="mx-auto max-w-xl text-center">
      <p>Try a simpler word, or browse by section:</p>
      <ul className="mt-6 flex flex-wrap justify-center gap-3">
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
    </div>
  );
}
