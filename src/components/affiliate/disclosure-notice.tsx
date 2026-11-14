import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Affiliate disclosure shown above any content that contains affiliate links,
 * so readers see it before they reach the first link.
 */
export function DisclosureNotice({ className }: { className?: string }) {
  return (
    // A note, not a page landmark: it can appear more than once on a page.
    <p
      role="note"
      aria-label="Affiliate disclosure"
      className={cn(
        "border-l-2 border-beige bg-cream px-5 py-4 text-[0.82rem] leading-relaxed text-charcoal",
        className,
      )}
    >
      This page contains affiliate links. {siteConfig.affiliate.disclosure}{" "}
      <Link href="/affiliate-disclosure" className="underline underline-offset-4">
        Learn more
      </Link>
      .
    </p>
  );
}
