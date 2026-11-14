import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  /** "narrow" suits long-form reading; "wide" suits grids and heroes. */
  width?: "narrow" | "default" | "wide";
  className?: string;
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[90rem]",
};

export function Container({ children, width = "default", className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className)}>
      {children}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  tone?: "ivory" | "cream" | "dark";
  className?: string;
  id?: string;
};

const tones = {
  ivory: "bg-ivory text-charcoal",
  cream: "bg-cream text-charcoal",
  dark: "on-dark bg-charcoal text-ivory",
};

/** A full-width page band with generous editorial spacing. */
export function Section({ children, tone = "ivory", className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24 lg:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}
