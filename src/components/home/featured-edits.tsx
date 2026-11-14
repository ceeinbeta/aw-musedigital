import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import type { Edit } from "@/lib/content";
import { SectionHeader } from "./section-header";

const tones = ["champagne", "cream", "beige", "charcoal"] as const;

/** The four edits, shown as tall magazine-cover tiles. */
type FeaturedEditsProps = {
  edits: Edit[];
  eyebrow?: string;
  title?: string;
  tone?: "ivory" | "cream";
  /** Anchor so other links can jump to this section. */
  id?: string;
};

export function FeaturedEdits({
  edits,
  eyebrow = "Featured categories",
  title = "Explore the edits",
  tone = "cream",
  id,
}: FeaturedEditsProps) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-24">
      <Container width="wide">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <ul
          className={`grid gap-x-5 gap-y-10 lg:gap-x-8 ${
            edits.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {edits.map((edit, index) => (
            <li key={edit.slug} className="group relative">
              <div className="overflow-hidden">
                <Media
                  image={edit.image}
                  label={edit.imageLabel}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  ratio={edits.length === 3 ? "landscape" : "portrait"}
                  tone={tones[index % tones.length]}
                  className="transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-medium text-black">
                <Link href={edit.href} className="after:absolute after:inset-0">
                  <span className="link-underline">{edit.name}</span>
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-[1.7]">{edit.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
