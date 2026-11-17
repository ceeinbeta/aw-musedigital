import Link from "next/link";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { legalNav, mainNav, serviceNav, siteConfig, type NavItem } from "@/lib/site";

function FooterColumn({
  title,
  items,
  extra,
}: {
  title: string;
  items: NavItem[];
  extra?: React.ReactNode;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="heading-label text-[0.68rem] font-normal uppercase tracking-[0.28em] text-champagne">
        {title}
      </h2>
      <ul className="mt-6 flex flex-col gap-3.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline text-sm text-ivory/85">
              {item.label}
            </Link>
          </li>
        ))}
        {extra ? <li>{extra}</li> : null}
      </ul>
    </nav>
  );
}

const editNav = mainNav.filter((item) => item.href !== "/services");

const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  ...legalNav,
];

/** Social links appear only once real profile URLs are added to site.ts. */
const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url);

export function Footer() {
  return (
    <footer className="on-dark bg-black text-ivory">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-serif text-3xl font-medium tracking-[0.18em]">
              {siteConfig.name}
            </Link>
            <p className="mt-6 max-w-xs font-serif text-lg italic leading-relaxed text-ivory/80">
              {siteConfig.tagline}
            </p>
            {socialLinks.length > 0 ? (
              <ul className="mt-8 flex gap-6">
                {socialLinks.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[0.68rem] uppercase tracking-[0.24em]"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <FooterColumn title="The Edits" items={editNav} />
          <FooterColumn title="Studio Services" items={serviceNav} />
          <FooterColumn
            title="Information"
            items={companyNav}
            extra={<CookieSettingsLink className="link-underline text-left text-sm text-ivory/85" />}
          />
        </div>

        <div className="mt-16 border-t border-ivory/15 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-ivory/70">
            {siteConfig.affiliate.disclosure} Some links on this site are affiliate links, which
            means we may earn a commission at no extra cost to you.{" "}
            <Link href="/affiliate-disclosure" className="underline underline-offset-4">
              Read our affiliate disclosure
            </Link>
            .
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/70">
            <p>© {siteConfig.name}. All rights reserved.</p>
            <ul className="flex gap-6">
              <li>
                <Link href="/search" className="link-underline">
                  Search
                </Link>
              </li>
              <li>
                <a href="/feed.xml" className="link-underline">
                  RSS feed
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
