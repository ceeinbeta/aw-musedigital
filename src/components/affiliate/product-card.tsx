import { Media } from "@/components/ui/media";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/content/types";
import { AmazonButton } from "./amazon-button";

export type ProductCardProps = {
  product: Product;
  /** Hide the editorial note where space is tight. */
  showNote?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Affiliate product card.
 *
 * Deliberately shows no price, rating or availability: Amazon only permits
 * those when they come live from its Product Advertising API. The optional
 * API fields can be added to the Product type when that integration exists.
 */
export function ProductCard({
  product,
  showNote = true,
  headingLevel: HeadingTag = "h3",
  className,
}: ProductCardProps) {
  return (
    <article className={cn("group flex w-full flex-col", className)}>
      <div className="overflow-hidden bg-cream">
        <Media
          image={product.image}
          label={product.imageLabel}
          ratio="square"
          tone="cream"
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.64rem] uppercase tracking-[0.28em] text-taupe-deep">
          {product.category}
        </p>
        <HeadingTag className="mt-2 font-serif text-xl font-medium leading-snug text-black">
          {product.title}
        </HeadingTag>
        {showNote && product.note ? (
          <p className="mt-3 text-sm leading-[1.7]">{product.note}</p>
        ) : null}
        <div className="mt-auto pt-5">
          <AmazonButton product={product} />
        </div>
      </div>
    </article>
  );
}

type ProductGridProps = {
  products: Product[];
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** The standard responsive grid of product cards: two across, four on desktop. */
export function ProductGrid({ products, headingLevel, className }: ProductGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8", className)}>
      {products.map((product) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
