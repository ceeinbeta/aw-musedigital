import { Media } from "@/components/ui/media";
import type { ImageAsset } from "@/lib/content/types";

const ratios = ["portrait", "landscape", "square", "landscape", "portrait", "square"] as const;

/**
 * Portfolio gallery in a staggered, magazine-style column layout.
 * Only ever given real photographs of the studio's own work.
 */
export function PortfolioGallery({ images }: { images: ImageAsset[] }) {
  return (
    <ul className="columns-2 gap-4 sm:gap-6 lg:columns-3">
      {images.map((image, index) => (
        <li key={`${image.url}-${index}`} className="mb-4 break-inside-avoid sm:mb-6">
          <Media
            image={image}
            label={image.alt}
            ratio={ratios[index % ratios.length]}
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
        </li>
      ))}
    </ul>
  );
}
