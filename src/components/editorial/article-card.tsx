import Link from "next/link";
import { Media } from "@/components/ui/media";
import type { ImageAsset } from "@/lib/content/types";
import { cn } from "@/lib/cn";

export type ArticleCardProps = {
  title: string;
  href: string;
  category: string;
  excerpt?: string;
  /** The featured photograph, when one exists. */
  image?: ImageAsset;
  /** Describes the featured image; used by the placeholder until photos exist. */
  imageLabel: string;
  /** "feature" is the large lead story; "standard" is used in grids. */
  layout?: "standard" | "feature";
  headingLevel?: "h2" | "h3";
  className?: string;
};

export function ArticleCard({
  title,
  href,
  category,
  excerpt,
  image,
  imageLabel,
  layout = "standard",
  headingLevel: HeadingTag = "h3",
  className,
}: ArticleCardProps) {
  const feature = layout === "feature";
  return (
    <article
      className={cn(
        "group relative",
        feature && "grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14",
        className,
      )}
    >
      <div className="overflow-hidden">
        <Media
          image={image}
          label={imageLabel}
          ratio={feature ? "landscape" : "portrait"}
          sizes={feature ? "(min-width: 1024px) 55vw, 100vw" : undefined}
          className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn(feature ? "" : "mt-6")}>
        <p className="text-[0.66rem] uppercase tracking-[0.28em] text-taupe-deep">{category}</p>
        <HeadingTag
          className={cn(
            "mt-3 font-serif font-medium leading-[1.2] text-black text-balance",
            feature ? "text-3xl sm:text-4xl" : "text-2xl",
          )}
        >
          {/* The stretched link makes the whole card clickable with one tab stop. */}
          <Link href={href} className="after:absolute after:inset-0">
            <span className="link-underline">{title}</span>
          </Link>
        </HeadingTag>
        {excerpt ? (
          <p className={cn("mt-4 text-[0.95rem] leading-[1.75]", feature && "max-w-md")}>
            {excerpt}
          </p>
        ) : null}
        <p
          aria-hidden="true"
          className="mt-5 text-[0.66rem] uppercase tracking-[0.28em] text-charcoal"
        >
          Read the story
        </p>
      </div>
    </article>
  );
}
