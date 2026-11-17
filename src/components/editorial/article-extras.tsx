import type { PortableTextBlock } from "next-sanity";
import { headingId } from "@/lib/content/markdown";

/**
 * The parts of an article that make it easy to scan, for readers and for
 * search and AI answer engines alike: a summary up front, a table of
 * contents, and direct answers to common questions at the end.
 */

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="key-takeaways" className="mb-12 bg-cream p-6 sm:p-8">
      <h2 id="key-takeaways" className="heading-label text-[0.7rem] font-normal uppercase tracking-[0.32em] text-taupe-deep">
        Key takeaways
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-3 leading-[1.7]">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-charcoal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

type TocItem = { id: string; text: string };

/** Builds the contents list from the article's main (h2) headings. */
export function tableOfContents(body: PortableTextBlock[]): TocItem[] {
  return body
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => {
      const text = ((block as { children?: { text: string }[] }).children ?? [])
        .map((child) => child.text)
        .join("");
      return { id: headingId(text), text };
    })
    .filter((item) => item.text);
}

export function TableOfContents({
  items,
  variant = "inline",
  className,
}: {
  items: TocItem[];
  /** "inline" sits in the article on phones; "sidebar" sits beside it on desktop. */
  variant?: "inline" | "sidebar";
  className?: string;
}) {
  const id = `in-this-article-${variant}`;
  return (
    <nav
      aria-labelledby={id}
      className={
        variant === "inline"
          ? `mb-12 border-y border-beige py-6 ${className ?? ""}`
          : className
      }
    >
      <h2 id={id} className="heading-label text-[0.7rem] font-normal uppercase tracking-[0.32em] text-taupe-deep">
        In this article
      </h2>
      <ol
        className={
          variant === "inline"
            ? "mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2"
            : "mt-4 space-y-3 border-l border-beige pl-4"
        }
      >
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="link-underline text-[0.95rem]">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FaqSection({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section aria-labelledby="faq" className="mt-16 border-t border-beige pt-10">
      <h2 id="faq" className="text-black">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-beige border-b border-beige">
        {items.map((item) => (
          <details key={item.question} className="group py-5" open>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
              <h3 className="text-black">{item.question}</h3>
              <span
                aria-hidden="true"
                className="mt-1 text-xl leading-none text-taupe-deep transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-[1.8]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
