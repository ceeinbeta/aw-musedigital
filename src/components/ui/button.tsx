import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "text";

const base =
  "inline-flex items-center justify-center gap-3 text-[0.72rem] font-normal uppercase tracking-[0.28em] transition-colors duration-500 ease-editorial disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "min-h-12 bg-black px-8 py-4 text-ivory hover:bg-charcoal",
  outline:
    "min-h-12 border border-charcoal px-8 py-4 text-charcoal hover:bg-black hover:text-ivory",
  /** For use on dark backgrounds. */
  light: "min-h-12 border border-ivory/70 px-8 py-4 text-ivory hover:bg-ivory hover:text-black",
  text: "link-underline text-charcoal",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonLinkProps = CommonProps & {
  href: string;
  /** External links open in a new tab; pass `rel` for affiliate links. */
  external?: boolean;
  rel?: string;
};

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

/** A link styled as a button. Use for navigation. */
export function ButtonLink({
  children,
  href,
  variant = "primary",
  external = false,
  rel,
  className,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel={rel ?? "noopener noreferrer"}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** A real button. Use for form submission and in-page actions. */
export function Button({ children, variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
