import Link from "next/link";
import { Media } from "@/components/ui/media";
import type { Collection } from "@/lib/content/types";

/** A collection shown as a cover image with its title and item count. */
export function CollectionCard({
  collection,
  headingLevel: HeadingTag = "h3",
}: {
  collection: Collection;
  headingLevel?: "h2" | "h3";
}) {
  const count = collection.products.length;
  return (
    <article className="group relative">
      <div className="overflow-hidden">
        <Media
          image={collection.image}
          label={collection.imageLabel}
          ratio="landscape"
          tone="champagne"
          className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-5 text-[0.64rem] uppercase tracking-[0.28em] text-taupe-deep">
        {count} {count === 1 ? "piece" : "pieces"}
      </p>
      <HeadingTag className="mt-2 font-serif text-2xl font-medium leading-snug text-black">
        <Link href={collection.href} className="after:absolute after:inset-0">
          <span className="link-underline">{collection.title}</span>
        </Link>
      </HeadingTag>
      <p className="mt-3 text-sm leading-[1.7]">{collection.description}</p>
    </article>
  );
}
