import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedEdits } from "@/components/home/featured-edits";
import { LatestJournal } from "@/components/home/latest-journal";
import { Newsletter } from "@/components/home/newsletter-social";
import { ProductRow } from "@/components/home/product-row";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { PhotoCredit } from "@/components/ui/photo-credit";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  getArticlesByEdit,
  getEdit,
  getEdits,
  getProductsByEdit,
  getService,
  type EditSlug,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { articleList, breadcrumbs, graph } from "@/lib/seo/structured-data";

/** Builds the SEO metadata for an Edit page. */
export async function editMetadata(slug: EditSlug): Promise<Metadata> {
  const edit = await getEdit(slug);
  if (!edit) return {};
  return {
    title: edit.name,
    description: edit.intro,
    alternates: { canonical: edit.href },
    openGraph: {
      ...baseOpenGraph,
      type: "website",
      siteName: siteConfig.name,
      title: `${edit.name} | ${siteConfig.name}`,
      description: edit.intro,
      url: edit.href,
    },
  };
}

/**
 * The shared template behind all four Edit pages. Each route file passes its
 * slug; everything else comes from the content layer.
 */
export async function EditPage({ slug }: { slug: EditSlug }) {
  const edit = await getEdit(slug);
  if (!edit) notFound();

  const [articles, products, allEdits, service] = await Promise.all([
    getArticlesByEdit(slug, 12),
    getProductsByEdit(slug, 4),
    getEdits(),
    getService(edit.relatedService),
  ]);
  const otherEdits = allEdits.filter((item) => item.slug !== slug);

  return (
    <>
      <JsonLd
        data={graph(
          articleList(edit.name, edit.href, articles),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: edit.name, path: edit.href },
          ]),
        )}
      />
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
                <li aria-current="page">{edit.name}</li>
              </ol>
            </nav>
            <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.03] tracking-[-0.015em] text-black sm:text-6xl xl:text-7xl">
              {edit.name}
            </h1>
            <p className="mt-7 max-w-lg font-serif text-xl leading-relaxed sm:text-2xl">
              {edit.intro}
            </p>
            <ul
              aria-label={`Topics in ${edit.name}`}
              className="mt-9 flex flex-wrap gap-x-3 gap-y-3"
            >
              {edit.topics.map((topic) => (
                <li
                  key={topic}
                  className="border border-charcoal/40 px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em]"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Media
              image={edit.image}
              label={edit.imageLabel}
              ratio="landscape"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            <PhotoCredit image={edit.image} className="mt-3 text-right" />
          </div>
        </div>
      </section>

      {articles.length > 0 ? (
        <LatestJournal
          articles={articles}
          eyebrow="Stories"
          title={`Latest from ${edit.name}`}
          link={{ label: "View all stories", href: "/journal" }}
        />
      ) : (
        <Section>
          <Container>
            <p className="text-center font-serif text-2xl">Stories for this edit are coming soon.</p>
          </Container>
        </Section>
      )}

      {products.length > 0 ? (
        <ProductRow
          tone="cream"
          eyebrow="Shop this edit"
          title="Our current selection"
          products={products}
          link={{ label: `Shop all of ${edit.name}`, href: `/shop#${edit.slug}` }}
        />
      ) : null}

      {service ? (
        <Section tone="dark">
          <Container>
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <Eyebrow onDark>From the studio</Eyebrow>
              <Heading size="xl" className="mt-4 text-ivory">
                {service.name}
              </Heading>
              <p className="mt-5 max-w-md text-ivory/80">{service.summary}</p>
              <ButtonLink href={service.href} variant="light" className="mt-9">
                Explore the service
              </ButtonLink>
            </div>
          </Container>
        </Section>
      ) : null}

      <FeaturedEdits edits={otherEdits} eyebrow="Keep exploring" title="More edits" tone="ivory" />
      <Newsletter />
    </>
  );
}
