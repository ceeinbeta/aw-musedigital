import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/content/types";
import { PlaceholderImage } from "./placeholder-image";

type MediaProps = {
  /** The real photograph, when one exists. */
  image?: ImageAsset;
  /** Describes the image slot; shown on the placeholder until a photo exists. */
  label: string;
  ratio?: "portrait" | "square" | "landscape" | "wide";
  tone?: "cream" | "champagne" | "beige" | "charcoal";
  /** Tells the browser how wide the image is displayed, for efficient loading. */
  sizes?: string;
  /** Set on the main image at the top of a page so it loads first. */
  priority?: boolean;
  className?: string;
};

const ratios = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
};

/**
 * Shows an optimised photograph when one has been uploaded, and the tinted
 * placeholder otherwise. Both fill the same aspect ratio, so layouts never shift.
 */
export function Media({
  image,
  label,
  ratio = "portrait",
  tone,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
}: MediaProps) {
  if (!image) {
    return <PlaceholderImage label={label} ratio={ratio} tone={tone} className={className} />;
  }
  return (
    <div className={cn("relative w-full overflow-hidden bg-cream", ratios[ratio], className)}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
