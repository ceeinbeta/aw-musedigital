import { siteConfig } from "@/lib/site";

/**
 * CENTRAL AFFILIATE LINK MANAGEMENT
 *
 * This is the only place Amazon links are built. Products store just their
 * ASIN (Amazon's product code); the full link, including the Associates tag,
 * is assembled here. Changing the tag or the marketplace is a single edit in
 * the site configuration and applies to every link on the site.
 *
 * Links point straight at Amazon.es. They are never cloaked, shortened or
 * redirected through this site, in line with the Associates programme rules.
 */

/** A valid ASIN is ten capital letters or digits. */
const ASIN_PATTERN = /^[A-Z0-9]{10}$/;

export function isValidAsin(asin: string | undefined): asin is string {
  return typeof asin === "string" && ASIN_PATTERN.test(asin);
}

export function buildAmazonUrl(asin?: string): string {
  const { marketplace, tag } = siteConfig.affiliate;
  const path = isValidAsin(asin) ? `/dp/${asin}` : "/";
  const url = new URL(path, `https://${marketplace}`);
  if (tag) url.searchParams.set("tag", tag);
  return url.toString();
}

/**
 * The `rel` value every affiliate link must carry: "sponsored" tells search
 * engines it is a paid link, "nofollow" is the older equivalent, and
 * "noopener" protects the visitor when the link opens in a new tab.
 */
export const AFFILIATE_REL = "sponsored nofollow noopener";

/** The wording on every recommendation button. No price claims. */
export const AFFILIATE_CTA = "Check price on Amazon";
