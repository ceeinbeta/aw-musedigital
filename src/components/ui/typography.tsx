import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextProps = { children: ReactNode; className?: string };

/** Small uppercase label that sits above a heading. */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: TextProps & {
  /** Use on charcoal or black backgrounds, where taupe would be too faint. */
  onDark?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-[0.7rem] font-normal uppercase tracking-[0.32em]",
        onDark ? "text-champagne" : "text-taupe-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}

type HeadingProps = TextProps & {
  /** The semantic level. Choose by document outline, not by size. */
  as?: "h1" | "h2" | "h3" | "h4";
  /** The visual size, independent of the semantic level. */
  size?: "display" | "xl" | "lg" | "md" | "sm";
};

const sizes = {
  display: "text-5xl leading-[1.05] sm:text-6xl lg:text-7xl",
  xl: "text-4xl leading-[1.1] sm:text-5xl",
  lg: "text-3xl leading-[1.15] sm:text-4xl",
  md: "text-2xl leading-[1.2] sm:text-[1.75rem]",
  sm: "text-xl leading-[1.25]",
};

export function Heading({ children, as: Tag = "h2", size = "lg", className }: HeadingProps) {
  return (
    <Tag className={cn("font-serif font-medium tracking-[-0.01em] text-balance", sizes[size], className)}>
      {children}
    </Tag>
  );
}

/** Larger introductory paragraph. */
export function Lead({ children, className }: TextProps) {
  return (
    <p className={cn("font-serif text-xl leading-relaxed sm:text-2xl", className)}>{children}</p>
  );
}

/** Standard body paragraph with a comfortable reading measure. */
export function Body({ children, className }: TextProps) {
  return <p className={cn("max-w-[65ch] text-base leading-[1.8]", className)}>{children}</p>;
}

/** Thin champagne rule used to separate or anchor content. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("h-px w-16 bg-beige", className)} />;
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Eyebrow + heading + optional intro, the standard opening for a section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("flex flex-col gap-5", centered && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size="xl">
        {title}
      </Heading>
      <Rule />
      {intro ? <p className="max-w-xl text-base leading-[1.8]">{intro}</p> : null}
    </div>
  );
}
