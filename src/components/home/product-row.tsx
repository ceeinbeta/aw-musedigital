import { DisclosureNotice } from "@/components/affiliate/disclosure-notice";
import { ProductGrid } from "@/components/affiliate/product-card";
import { Container, Section } from "@/components/ui/container";
import type { Product } from "@/lib/content";
import { SectionHeader } from "./section-header";

type ProductRowProps = {
  eyebrow: string;
  title: string;
  products: Product[];
  link: { label: string; href: string };
  tone?: "ivory" | "cream";
};

/** A row of affiliate products, always introduced by the disclosure. */
export function ProductRow({ eyebrow, title, products, link, tone = "ivory" }: ProductRowProps) {
  // Hidden entirely until there are real products to show.
  if (products.length === 0) return null;
  return (
    <Section tone={tone}>
      <Container width="wide">
        <SectionHeader eyebrow={eyebrow} title={title} link={link} className="!mb-8" />
        <DisclosureNotice className="mb-10 max-w-2xl bg-transparent px-4 py-1" />
        <ProductGrid products={products} />
      </Container>
    </Section>
  );
}
