import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { ProductCard } from "@/components/affiliate/product-card";
import { AFFILIATE_REL } from "@/lib/affiliate/links";
import { PhotoCredit } from "@/components/ui/photo-credit";
import { headingId } from "@/lib/content/markdown";
import type { ImageAsset, Product } from "@/lib/content/types";

/** The plain text of a heading block, used to build its anchor id. */
function plainText(block: PortableTextBlock): string {
  return ((block as { children?: { text?: string }[] }).children ?? [])
    .map((child) => child.text ?? "")
    .join("");
}

/** How each kind of content written in the CMS is displayed on the page. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-[1.05rem] leading-[1.9]">{children}</p>,
    // Headings get an id so the table of contents can link to them.
    h2: ({ children, value }) => (
      <h2 id={headingId(plainText(value))} className="mt-14 scroll-mt-28 text-black">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 text-black">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-beige pl-6 text-xl italic leading-[1.6] text-black">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.05rem] leading-[1.8] marker:text-taupe">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.05rem] leading-[1.8] marker:text-taupe-deep">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-black">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const className = "underline decoration-beige decoration-1 underline-offset-4 hover:decoration-charcoal";
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      // Amazon links in body copy are affiliate links and must be marked as sponsored.
      const isAmazon = /(^|\.)amazon\.[a-z.]+$/i.test(safeHostname(href));
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel={isAmazon ? AFFILIATE_REL : "noopener noreferrer"}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string; credit?: ImageAsset["credit"] } }) =>
      value.url ? (
        <figure className="my-12">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-cream">
            <Image
              src={value.url}
              alt={value.alt ?? ""}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption || value.credit ? (
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[13px] text-taupe-deep">
              {value.caption ? <span>{value.caption}</span> : <span />}
              <PhotoCredit image={{ url: value.url, alt: value.alt ?? "", credit: value.credit }} />
            </figcaption>
          ) : null}
        </figure>
      ) : null,
    productEmbed: ({ value }: { value: { product?: Product } }) =>
      value.product ? (
        <div className="my-12 max-w-xs">
          <ProductCard product={value.product} />
        </div>
      ) : null,
  },
};

function safeHostname(href: string): string {
  try {
    return new URL(href).hostname;
  } catch {
    return "";
  }
}

export function ArticleBody({ body }: { body: PortableTextBlock[] }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <PortableText value={body} components={components} />
    </div>
  );
}
