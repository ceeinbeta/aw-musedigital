import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { photos } from "@/content/photos";
import { Eyebrow, Heading } from "@/components/ui/typography";
import type { Article } from "@/lib/content";

/** Large image beside a numbered list of event stories. */
export function EventInspiration({ articles }: { articles: Article[] }) {
  return (
    <Section>
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Media
            image={photos.outdoorTable}
            label="Event tablescape photograph"
            ratio="landscape"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div>
            <Eyebrow>Event inspiration</Eyebrow>
            <Heading size="xl" className="mt-4 text-black">
              Tables, celebrations and the art of hosting
            </Heading>
            <ol className="mt-10 border-t border-beige">
              {articles.map((article, index) => (
                <li key={article.slug} className="group relative flex gap-6 border-b border-beige py-6">
                  <span aria-hidden="true" className="font-serif text-lg italic text-taupe-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl leading-snug text-black">
                    <Link href={article.href} className="after:absolute after:inset-0">
                      <span className="link-underline">{article.title}</span>
                    </Link>
                  </h3>
                </li>
              ))}
            </ol>
            <ButtonLink href="/event-edit" variant="outline" className="mt-10">
              Visit The Event Edit
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
