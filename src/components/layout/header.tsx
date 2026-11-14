import Link from "next/link";
import { cn } from "@/lib/cn";
import { mainNav, siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

const mobileItems = [
  ...mainNav,
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type HeaderProps = {
  /** "dark" is used on the studio service pages to set them apart. */
  tone?: "light" | "dark";
};

export function Header({ tone = "light" }: HeaderProps) {
  const dark = tone === "dark";
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-sm",
        dark ? "on-dark border-ivory/15 bg-black/95 text-ivory" : "border-beige/60 bg-ivory/95 text-charcoal",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-black focus:px-4 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ivory"
      >
        Skip to content
      </a>

      <div className="relative mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        {/* Left: secondary links on desktop, spacer on mobile to keep the logo centred */}
        <div className="flex w-11 lg:w-48">
          <nav aria-label="Secondary" className="hidden gap-7 lg:flex">
            <Link href="/about" className="link-underline text-[0.68rem] uppercase tracking-[0.24em]">
              About
            </Link>
            <Link href="/contact" className="link-underline text-[0.68rem] uppercase tracking-[0.24em]">
              Contact
            </Link>
          </nav>
        </div>

        <Link
          href="/"
          className={cn(
            "font-serif text-2xl font-medium tracking-[0.18em] lg:text-[1.7rem]",
            dark ? "text-ivory" : "text-black",
          )}
        >
          {siteConfig.name}
        </Link>

        <div className="flex w-11 justify-end lg:w-48">
          <Link
            href="/services"
            className="link-underline hidden text-[0.68rem] uppercase tracking-[0.24em] lg:inline"
          >
            Work with us
          </Link>
          <MobileNav items={mobileItems} />
        </div>
      </div>

      <nav
        aria-label="Main"
        className={cn("hidden border-t lg:block", dark ? "border-ivory/15" : "border-beige/40")}
      >
        <ul className="mx-auto flex max-w-[90rem] items-center justify-center gap-10 px-12 py-4">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-underline text-[0.68rem] uppercase tracking-[0.24em]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
