import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Rule } from "@/components/ui/typography";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    title: "The Journal",
    text: "Clear, carefully researched guides that answer the questions you actually have.",
    href: "/journal",
    cta: "Read",
  },
  {
    title: "The Edits",
    text: "Four sections on home, style, hosting and creative business, each built around practical guides.",
    href: "#edits",
    cta: "Explore",
  },
  {
    title: "The Studio",
    text: "Event styling, creative direction and boutique website design.",
    href: "/services",
    cta: "Enquire",
  },
];

/** Brand introduction. */
export function BrandIntro() {
  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>Welcome to {siteConfig.name}</Eyebrow>
          <p className="mt-8 font-serif text-3xl leading-[1.3] text-black text-balance sm:text-[2.6rem]">
            A magazine for people who like things done well: calm homes, considered wardrobes,
            generous tables and small businesses with a sense of style.
          </p>
          <Rule className="mt-10" />
        </div>

        <ul className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:mt-20 lg:gap-16">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="flex flex-col items-center text-center">
              <span className="font-serif text-lg italic text-taupe-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-serif text-2xl font-medium text-black">{pillar.title}</h2>
              <p className="mt-3 max-w-xs text-[0.95rem] leading-[1.75]">{pillar.text}</p>
              <Link
                href={pillar.href}
                className="link-underline mt-5 text-[0.68rem] uppercase tracking-[0.28em]"
              >
                {pillar.cta}
                <span className="sr-only"> — {pillar.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
