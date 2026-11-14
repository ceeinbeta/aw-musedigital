import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  /** Optional "view all" link shown opposite the title. */
  link?: { label: string; href: string };
  onDark?: boolean;
  className?: string;
};

/** Left-aligned heading with an optional link on the right. */
export function SectionHeader({ eyebrow, title, link, onDark, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <Heading size="xl" className={cn("mt-4", onDark ? "text-ivory" : "text-black")}>
          {title}
        </Heading>
      </div>
      {link ? (
        <ButtonLink
          href={link.href}
          variant="text"
          className={cn("self-start sm:self-auto", onDark && "text-ivory")}
        >
          {link.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
