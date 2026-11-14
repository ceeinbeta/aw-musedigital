/**
 * Central site configuration. Every brand detail, URL and affiliate setting
 * lives here so it can be edited in one place.
 *
 * Values marked PLACEHOLDER must be replaced with real business information
 * before launch. Nothing here is invented: empty means "not supplied yet".
 */

export const siteConfig = {
  name: "MUSE DIGITAL",
  /** Brand tagline. Replace with your own wording at any time. */
  tagline: "Ideas for a beautifully considered life.",
  /** Site description, used by search engines and social previews. */
  description:
    "MUSE DIGITAL is an independent lifestyle magazine with practical guides to home, style, hosting and creative business.",
  /** Set NEXT_PUBLIC_SITE_URL once the domain is confirmed. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",

  /** Not supplied yet. Empty entries are hidden in the UI. */
  contact: {
    email: "" as string,
    phone: "" as string,
  },
  social: {
    instagram: "" as string,
    pinterest: "" as string,
    tiktok: "" as string,
  },

  /**
   * Legal identity, required on the site by Spanish law (LSSI-CE article 10)
   * and the GDPR. PLACEHOLDER: every value must be supplied by the owner.
   * Empty values show as highlighted placeholders on the legal pages.
   */
  legal: {
    /** Full legal name of the person or company that runs the site. */
    ownerName: "" as string,
    /** NIF, NIE or CIF. */
    taxId: "" as string,
    /** Registered postal address. */
    address: "" as string,
    /** Address for privacy and legal requests; falls back to contact.email. */
    email: "" as string,
    /** Commercial registry details, for a company only. */
    registry: "" as string,
    /** Date the legal texts were last reviewed, e.g. "1 March 2027". */
    lastUpdated: "" as string,
  },

  affiliate: {
    marketplace: "www.amazon.es",
    /** Amazon Associates tracking ID. Set NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG. */
    tag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG ?? "",
    /** Required wording from the Amazon Associates Operating Agreement. */
    disclosure: "As an Amazon Associate I earn from qualifying purchases.",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "The Style Edit", href: "/style-edit" },
  { label: "The Living Edit", href: "/living-edit" },
  { label: "The Event Edit", href: "/event-edit" },
  { label: "The Business Edit", href: "/business-edit" },
  { label: "The Journal", href: "/journal" },
  { label: "Our Services", href: "/services" },
];

export const serviceNav: NavItem[] = [
  { label: "Event Planning & Styling", href: "/services/event-planning" },
  { label: "Creative Styling", href: "/services/creative-styling" },
  { label: "Website Development Boutique", href: "/services/website-development" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Terms and Conditions", href: "/terms" },
];
