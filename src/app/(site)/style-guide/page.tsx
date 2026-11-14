import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DisclosureNotice } from "@/components/affiliate/disclosure-notice";
import { ProductGrid } from "@/components/affiliate/product-card";
import { ArticleCard } from "@/components/editorial/article-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Body, Eyebrow, Heading, Lead, SectionHeading } from "@/components/ui/typography";

/**
 * Internal reference page for the design system. Hidden from search engines.
 * All sample text here is placeholder content, not real articles or products.
 */
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
  alternates: { canonical: "/style-guide" },
};

const palette = [
  { name: "Ivory", hex: "#FAF7F2", swatch: "bg-ivory", use: "Page background" },
  { name: "Cream", hex: "#F3EDE3", swatch: "bg-cream", use: "Alternate sections" },
  { name: "Champagne", hex: "#E6D5B8", swatch: "bg-champagne", use: "Accents" },
  { name: "Warm beige", hex: "#D8C7AE", swatch: "bg-beige", use: "Rules and borders" },
  { name: "Taupe", hex: "#8B7E72", swatch: "bg-taupe", use: "Decorative only" },
  { name: "Deep taupe", hex: "#675C52", swatch: "bg-taupe-deep", use: "Small labels" },
  { name: "Charcoal", hex: "#2B2927", swatch: "bg-charcoal", use: "Body text" },
  { name: "Black", hex: "#0F0E0D", swatch: "bg-black", use: "Headings, buttons" },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-beige/70 py-12">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <>
      <Section tone="cream">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Phase 2"
            title="The MUSE DIGITAL design system"
            intro="Every colour, typeface and component the site is built from. All sample text and cards on this page are placeholders."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <Block title="Colour palette">
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {palette.map((colour) => (
                <li key={colour.name}>
                  <div className={`aspect-[4/3] border border-beige/70 ${colour.swatch}`} />
                  <p className="mt-3 font-serif text-lg text-black">{colour.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-taupe-deep">
                    {colour.hex}
                  </p>
                  <p className="mt-1 text-sm">{colour.use}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Typography — Inter">
            <div className="flex flex-col gap-8">
              {/* Live samples: these pick up the sitewide heading rules from globals.css. */}
              <div aria-hidden="true" className="flex flex-col gap-6">
                <h1 className="text-black">Heading 1 · 46px bold</h1>
                <h2 className="text-black">Heading 2 · 32px bold</h2>
                <h3 className="text-black">Heading 3 · 24px bold</h3>
                <h4 className="text-black">Heading 4 · 20px bold</h4>
              </div>
              <Lead>
                Lead paragraph, used to open an article or introduce a section.
              </Lead>
              <Body>
                Body text is set in Inter at 16px and regular weight, with a 1.6 line height, and is kept
                to a comfortable reading width. This paragraph is placeholder text that shows how
                longer passages of editorial copy will look on the page.
              </Body>
              <p className="text-[13px]">Small text · 13px, used for notes and captions.</p>
              <Eyebrow>Eyebrow label</Eyebrow>
            </div>
          </Block>

          <Block title="Buttons and links">
            <div className="flex flex-wrap items-center gap-6">
              <ButtonLink href="/style-guide">Primary</ButtonLink>
              <ButtonLink href="/style-guide" variant="outline">
                Outline
              </ButtonLink>
              <ButtonLink href="/style-guide" variant="text">
                Text link
              </ButtonLink>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 bg-charcoal p-8">
              <ButtonLink href="/style-guide" variant="light">
                On dark
              </ButtonLink>
            </div>
          </Block>

          <Block title="Section heading">
            <SectionHeading
              eyebrow="Eyebrow"
              title="A section title in the serif"
              intro="An optional introduction sits beneath the rule and sets up the content that follows."
            />
          </Block>

          <Block title="Image placeholders">
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              <PlaceholderImage label="Portrait 4:5" ratio="portrait" tone="cream" />
              <PlaceholderImage label="Square 1:1" ratio="square" tone="champagne" />
              <PlaceholderImage label="Landscape 3:2" ratio="landscape" tone="beige" />
              <PlaceholderImage label="Wide 16:9" ratio="wide" tone="charcoal" />
            </div>
          </Block>

          <Block title="Article cards">
            <ArticleCard
              layout="feature"
              headingLevel="h2"
              category="Sample category"
              title="Sample feature article headline goes here"
              excerpt="Placeholder excerpt. The lead story on a page uses this larger layout with the image beside the text."
              imageLabel="Feature image"
              href="/style-guide"
            />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <ArticleCard
                  key={n}
                  category="Sample category"
                  title={`Sample article headline ${n}`}
                  excerpt="Placeholder excerpt describing what the article covers."
                  imageLabel="Article image"
                  href="/style-guide"
                />
              ))}
            </div>
          </Block>

          <Block title="Affiliate product cards">
            <DisclosureNotice className="mb-10 max-w-2xl" />
            <ProductGrid
              products={[1, 2, 3, 4].map((n) => ({
                id: `sample-${n}`,
                title: `Sample product name ${n}`,
                category: "Sample category",
                edit: "living-edit" as const,
                note: "Placeholder editorial note on why we recommend it.",
                imageLabel: "Product photo",
              }))}
            />
          </Block>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-champagne">
              Studio services tone
            </p>
            <Heading as="h2" size="xl" className="text-ivory">
              A darker palette sets the studio apart
            </Heading>
            <p className="max-w-xl text-ivory/80">
              Service pages use this charcoal treatment so the creative business reads as distinct
              from the shopping edit.
            </p>
            <ButtonLink href="/style-guide" variant="light">
              Enquire
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
