import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organization, website } from "@/lib/seo/structured-data";
import { BrandIntro } from "@/components/home/brand-intro";
import { EventInspiration } from "@/components/home/event-inspiration";
import { FeaturedEdits } from "@/components/home/featured-edits";
import { Hero } from "@/components/home/hero";
import { LatestJournal } from "@/components/home/latest-journal";
import { Newsletter, Social } from "@/components/home/newsletter-social";
import { ProductRow } from "@/components/home/product-row";
import { StudioShowcase } from "@/components/home/studio-showcase";
import {
  getArticlesByEdit,
  getEdits,
  getFeaturedProjects,
  getLatestArticles,
  getServices,
  getShopTheEdit,
  getTrendingProducts,
} from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
      ...baseOpenGraph, url: "/" },
};

export default async function Home() {
  const [edits, shopTheEdit, latest, trending, eventStories, services, projects] =
    await Promise.all([
      getEdits(),
      getShopTheEdit(),
      getLatestArticles(7),
      getTrendingProducts(),
      getArticlesByEdit("event-edit", 3),
      getServices(),
      getFeaturedProjects(),
    ]);

  return (
    <>
      <JsonLd data={graph(organization(), website())} />
      <Hero />
      <BrandIntro />
      <LatestJournal articles={latest} />
      <FeaturedEdits edits={edits} id="edits" eyebrow="The Edits" title="Explore by section" />
      <EventInspiration articles={eventStories} />
      {/* Product rows render nothing until real, linked products exist. */}
      <ProductRow
        tone="cream"
        eyebrow="Our edit"
        title="Things we love right now"
        products={shopTheEdit}
        link={{ label: "See them all", href: "/shop" }}
      />
      <ProductRow
        eyebrow="Recently added"
        title="New to the edit"
        products={trending}
        link={{ label: "See them all", href: "/shop" }}
      />
      <StudioShowcase services={services} projects={projects} />
      <Newsletter />
      <Social />
    </>
  );
}
