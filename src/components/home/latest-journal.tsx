import { ArticleCard } from "@/components/editorial/article-card";
import { Container, Section } from "@/components/ui/container";
import type { Article } from "@/lib/content";
import { SectionHeader } from "./section-header";

/** One lead story followed by a row of recent articles. */
type LatestJournalProps = {
  articles: Article[];
  eyebrow?: string;
  title?: string;
  link?: { label: string; href: string };
};

export function LatestJournal({
  articles,
  eyebrow = "The Journal",
  title = "Latest stories",
  link = { label: "View all stories", href: "/journal" },
}: LatestJournalProps) {
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <Section>
      <Container width="wide">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          link={link}
        />
        <ArticleCard
          layout="feature"
          title={lead.title}
          excerpt={lead.excerpt}
          category={lead.category}
          image={lead.image}
          imageLabel={lead.imageLabel}
          href={lead.href}
        />
        {rest.length > 0 ? (
          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {rest.map((article) => (
              <li key={article.slug}>
                <ArticleCard
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  image={article.image}
                  imageLabel={article.imageLabel}
                  href={article.href}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </Section>
  );
}
