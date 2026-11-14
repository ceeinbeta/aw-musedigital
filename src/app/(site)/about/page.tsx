import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { PhotoCredit } from "@/components/ui/photo-credit";
import { Eyebrow, Heading, Lead, Rule } from "@/components/ui/typography";
import { photos } from "@/content/photos";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

const description =
  "MUSE DIGITAL is an independent lifestyle magazine with practical guides to home, style, hosting and creative business. How we write, and how the site is funded.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { ...baseOpenGraph, title: "About", description, url: "/about" },
};

/**
 * Describes the magazine and its editorial standards. It makes no claims about
 * people, credentials or history. To add a founder or editor biography, add a
 * section here with your real name, experience and photograph.
 */
const sections = [
  {
    title: "Home",
    href: "/living-edit",
    text: "Arranging rooms, choosing textiles and making small spaces work.",
  },
  {
    title: "Style",
    href: "/style-edit",
    text: "Building a wardrobe that lasts, and caring for the clothes in it.",
  },
  {
    title: "Hosting",
    href: "/event-edit",
    text: "Setting tables, planning gatherings and decorating for celebrations.",
  },
  {
    title: "Business",
    href: "/business-edit",
    text: "Practical help for small businesses and creatives presenting their work.",
  },
];

const standards = [
  {
    title: "Useful first",
    text: "Every guide starts from a question readers actually ask, and answers it as clearly as we can.",
  },
  {
    title: "Carefully researched",
    text: "We check our advice against established practice and update articles when it changes. Each article shows when it was last updated.",
  },
  {
    title: "Honest",
    text: "We only describe products as tested when we have used them ourselves, and we never publish invented reviews or testimonials.",
  },
  {
    title: "Independent",
    text: "Nobody pays to appear in our editorial content. Our recommendations are our own.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12 lg:py-24">
          <div className="animate-rise">
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-6 text-black text-balance">About {siteConfig.name}</h1>
            <Lead className="mt-8 max-w-lg">
              An independent lifestyle magazine for people who like things done well.
            </Lead>
          </div>
          <div>
            <Media
              image={photos.aboutDesk}
              label="Studio still life"
              ratio="landscape"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <PhotoCredit image={photos.aboutDesk} className="mt-3 text-right" />
          </div>
        </div>
      </section>

      <Section>
        <Container width="narrow">
          <Eyebrow>What we do</Eyebrow>
          <Heading size="xl" className="mt-4 text-black">
            Practical guides, beautifully made
          </Heading>
          <Rule className="mt-8" />
          <div className="mt-8 space-y-6 text-[1.05rem] leading-[1.8]">
            <p>
              {siteConfig.name} publishes clear, practical guides to the way we live: how to
              arrange a room so it feels calm, how to build a wardrobe that lasts, how to set a
              table for friends and how to present a small business with care.
            </p>
            <p>
              We write for readers who want good advice without the noise. Each guide answers a
              real question, explains the reasoning behind it and leaves out anything that does
              not help.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {sections.map((section) => (
              <li key={section.title} className="border-t border-beige pt-5">
                <h3 className="text-black">
                  <Link href={section.href} className="link-underline">
                    {section.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.75]">{section.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="cream">
        <Container width="wide">
          <Eyebrow>Editorial standards</Eyebrow>
          <Heading size="xl" className="mb-10 mt-4 text-black sm:mb-14">
            How we write
          </Heading>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {standards.map((standard, index) => (
              <li key={standard.title} className="border-t border-charcoal pt-6">
                <span aria-hidden="true" className="text-2xl italic text-taupe-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-black">{standard.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.75]">{standard.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Eyebrow>How the magazine is funded</Eyebrow>
          <Heading size="lg" className="mt-4 text-black">
            Reader-supported
          </Heading>
          <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.8]">
            <p>
              {siteConfig.name} is funded by our creative studio and, when we recommend a product,
              sometimes by a small commission from the retailer, at no extra cost to you. This
              never decides what we write about or recommend. Read our{" "}
              <Link href="/affiliate-disclosure" className="underline underline-offset-4">
                affiliate disclosure
              </Link>{" "}
              for details.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow onDark>The Studio</Eyebrow>
            <Heading size="xl" className="mt-4 text-ivory">
              Work with us
            </Heading>
            <p className="mt-5 max-w-md text-ivory/80">
              Event planning and styling, creative styling and direction, and boutique website
              design.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/services" variant="light">
                Our services
              </ButtonLink>
              <ButtonLink href="/contact" variant="light">
                Contact
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
