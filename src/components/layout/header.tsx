import Link from "next/link";
import { cn } from "@/lib/cn";
import { mainNav, siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";

const mobileItems = [
  ...mainNav,
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Search", href: "/search" },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" strokeLinecap="round" />
    </svg>
  );
}

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
        {/* Left: secondary links on desktop. On phones the logo sits left instead. */}
        <div className="hidden lg:flex lg:w-48">
          <nav aria-label="Secondary" className="hidden gap-7 lg:flex">
            <NavLink href="/about" className="link-underline text-[0.68rem] uppercase tracking-[0.24em]">
              About
            </NavLink>
            <NavLink href="/contact" className="link-underline text-[0.68rem] uppercase tracking-[0.24em]">
              Contact
            </NavLink>
          </nav>
        </div>

        <Link
          href="/"
          className={cn(
            "whitespace-nowrap font-serif text-xl font-medium tracking-[0.16em] sm:text-2xl sm:tracking-[0.18em] lg:text-[1.7rem]",
            dark ? "text-ivory" : "text-black",
          )}
        >
          {siteConfig.name}
        </Link>

        <div className="-mr-3 flex items-center justify-end gap-1 lg:mr-0 lg:w-48 lg:gap-6">
          <NavLink
            href="/services"
            className="link-underline hidden text-[0.68rem] uppercase tracking-[0.24em] lg:inline"
          >
            Work with us
          </NavLink>
          <Link
            href="/search"
            className="flex h-11 w-11 items-center justify-center transition-opacity hover:opacity-70"
          >
            <SearchIcon />
            <span className="sr-only">Search</span>
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
              <NavLink
                href={item.href}
                className="link-underline text-[0.68rem] uppercase tracking-[0.24em]"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
