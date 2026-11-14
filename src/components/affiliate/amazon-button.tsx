import { AFFILIATE_CTA, AFFILIATE_REL, buildAmazonUrl } from "@/lib/affiliate/links";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/content/types";

type AmazonButtonProps = {
  product: Pick<Product, "title" | "asin">;
  /** "block" fills its container (cards); "inline" sizes to its text (tables). */
  size?: "block" | "inline";
  className?: string;
};

/**
 * The product recommendation button. Every affiliate link on the site is
 * rendered by this component, so the wording, the sponsored-link marking and
 * the link itself are always consistent.
 */
export function AmazonButton({ product, size = "block", className }: AmazonButtonProps) {
  return (
    <a
      href={buildAmazonUrl(product.asin)}
      target="_blank"
      rel={AFFILIATE_REL}
      className={cn(
        "min-h-11 items-center justify-center border border-charcoal text-center uppercase text-charcoal transition-colors duration-500 ease-editorial hover:bg-black hover:text-ivory",
        size === "block"
          ? "flex w-full px-4 py-3 text-[0.66rem] tracking-[0.24em]"
          : "inline-flex px-4 py-2 text-[0.62rem] tracking-[0.2em]",
        className,
      )}
    >
      {AFFILIATE_CTA}
      <span className="sr-only">: {product.title} (affiliate link, opens in a new tab)</span>
    </a>
  );
}
