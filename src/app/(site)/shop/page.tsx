import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { CollectionCard } from "@/components/affiliate/collection-card";
import { DisclosureNotice } from "@/components/affiliate/disclosure-notice";
import { ProductFilter } from "@/components/affiliate/product-filter";
import { Newsletter } from "@/components/home/newsletter-social";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Heading, SectionHeading } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { getAllProducts, getCollections, getEdits } from "@/lib/content";

const description =
  "A curated selection of pieces for wardrobe, home, celebrations and work, chosen by the MUSE DIGITAL editors and available on Amazon.es.";

export const metadata: Metadata = {
  title: "Shop the Edit",
  description,
  alternates: { canonical: "/shop" },
  openGraph: {
      ...baseOpenGraph, title: "Shop the Edit", description, url: "/shop" },
};

export default async function ShopPage() {
  const [products, collections, edits] = await Promise.all([
    getAllProducts(),
    getCollections(),
    getEdits(),
  ]);
  // The shop stays hidden until there are real, linked products.
  if (products.length === 0) notFound();

  return (
    <>
      <Section tone="cream" className="!py-14 sm:!py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="The shopping edit"
            title="Shop the Edit"
            intro="A small, considered selection of pieces we would choose ourselves, gathered into collections and available on Amazon.es."
          />
          <DisclosureNotice className="mx-auto mt-10 max-w-2xl bg-ivory" />
        </Container>
      </Section>

      {collections.length > 0 ? (
        <Section>
          <Container width="wide">
            <Eyebrow>Curated</Eyebrow>
            <Heading size="xl" className="mb-10 mt-4 text-black sm:mb-14">
              Collections
            </Heading>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <CollectionCard collection={collection} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tone="cream" id="all">
        <Container width="wide">
          <Eyebrow>Everything we recommend</Eyebrow>
          <Heading size="xl" className="mb-10 mt-4 text-black">
            Browse by edit
          </Heading>
          <ProductFilter
            products={products}
            edits={edits.map(({ slug, name }) => ({ slug, name }))}
          />
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
