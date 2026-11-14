import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";

/** "Photo: Name / Unsplash", linking to the original photograph. */
export function PhotoCredit({ image, className }: { image?: ImageAsset; className?: string }) {
  if (!image?.credit) return null;
  return (
    <p className={cn("text-[11px] tracking-[0.04em] text-taupe-deep", className)}>
      Photo:{" "}
      <a
        href={image.credit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-beige underline-offset-2 hover:decoration-charcoal"
      >
        {image.credit.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>{" "}
      / {image.credit.source}
    </p>
  );
}
