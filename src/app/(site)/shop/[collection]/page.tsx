import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionCard } from "@/components/affiliate/collection-card";
import { DisclosureNotice } from "@/components/affiliate/disclosure-notice";
import { ProductGrid } from "@/components/affiliate/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getCollection, getCollections } from "@/lib/content";

// Collection pages wait for their content rather than streaming, so that a
// missing collection returns a true 404 status to search engines.
export const instant = false;

export async function generateStaticParams() {
  const collections = await getCollections();
  const slugs = collections.map((collection) => collection.slug);
  // Next.js needs at least one entry; an unknown slug simply renders "not found".
  return (slugs.length > 0 ? slugs : ["__placeholder__"]).map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[collection]">): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: collection.href },
    openGraph: {
      ...baseOpenGraph,
      title: collection.title,
      description: collection.description,
      url: collection.href,
      ...(collection.image
        ? { images: [{ url: collection.image.url, alt: collection.image.alt }] }
        : {}),
    },
  };
}

export default async function CollectionPage({ params }: PageProps<"/shop/[collection]">) {
  const { collection: slug } = await params;
  const [collection, all] = await Promise.all([getCollection(slug), getCollections()]);
  if (!collection) notFound();
  const others = all.filter((item) => item.slug !== collection.slug).slice(0, 3);

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-12 lg:py-20">
          <div className="animate-rise">
            <nav aria-label="Breadcrumb">
              <ol className="flex gap-3 text-[0.66rem] uppercase tracking-[0.26em] text-taupe-deep">
                <li>
                  <Link href="/" className="link-underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/shop" className="link-underline">
                    Shop
                  </Link>
                </li>
              </ol>
            </nav>
            <Eyebrow className="mt-8">Collection</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.06] tracking-[-0.01em] text-black text-balance sm:text-5xl xl:text-6xl">
              {collection.title}
            </h1>
            <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed sm:text-2xl">
              {collection.description}
            </p>
          </div>
          <Media
            image={collection.image}
            label={collection.imageLabel}
            ratio="landscape"
            tone="champagne"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </section>

      <Section>
        <Container width="wide">
          <DisclosureNotice className="mb-10 max-w-2xl" />
          {/* Keeps the heading outline in order; product names below are h3. */}
          <h2 className="sr-only">Products in this collection</h2>
          <ProductGrid products={collection.products} />
          <div className="mt-16 flex justify-center">
            <ButtonLink href="/shop" variant="outline">
              Back to the shop
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {others.length > 0 ? (
        <Section tone="cream">
          <Container width="wide">
            <Eyebrow>Keep browsing</Eyebrow>
            <Heading size="xl" className="mb-10 mt-4 text-black sm:mb-14">
              More collections
            </Heading>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <CollectionCard collection={item} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
