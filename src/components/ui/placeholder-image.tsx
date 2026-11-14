import { cn } from "@/lib/cn";

type PlaceholderImageProps = {
  /** Describes the photograph that will go here, e.g. "Table styling detail". */
  label: string;
  ratio?: "portrait" | "square" | "landscape" | "wide";
  tone?: "cream" | "champagne" | "beige" | "charcoal";
  className?: string;
};

const ratios = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
};

const tones = {
  cream: "from-cream to-champagne/70 text-taupe-deep",
  champagne: "from-champagne/80 to-beige text-charcoal",
  beige: "from-beige to-taupe/60 text-charcoal",
  charcoal: "from-charcoal to-black text-champagne",
};

/**
 * Stands in for editorial photography until licensed images are supplied.
 * Swap for next/image once real photographs exist; the aspect ratios match.
 */
export function PlaceholderImage({
  label,
  ratio = "portrait",
  tone = "cream",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder for photograph: ${label}`}
      className={cn(
        "flex w-full items-end bg-gradient-to-br p-5",
        ratios[ratio],
        tones[tone],
        className,
      )}
    >
      <span className="text-[0.62rem] uppercase tracking-[0.28em]">{label}</span>
    </div>
  );
}
