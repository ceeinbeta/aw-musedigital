/**
 * COOKIE CONSENT CONFIGURATION
 *
 * Strictly necessary storage needs no consent. Everything else (analytics,
 * advertising, embedded third-party media) must be listed here and must load
 * only through the consent manager, after the visitor agrees.
 *
 * A category appears in the banner only when the service behind it is
 * actually configured. With none configured, no banner is shown, because
 * there is nothing to ask permission for.
 */

export type OptionalCategory = "analytics";

export type CategoryInfo = {
  id: OptionalCategory;
  title: string;
  description: string;
  /** Whether the service behind this category is switched on. */
  enabled: boolean;
};

/** Google Analytics 4 measurement ID, e.g. G-XXXXXXXXXX. Leave empty to disable. */
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const optionalCategories: CategoryInfo[] = [
  {
    id: "analytics",
    title: "Analytics",
    description:
      "Helps us understand which pages are read, so we can improve the site. Uses Google Analytics, which sets its own cookies.",
    enabled: Boolean(gaMeasurementId),
  },
].filter((category) => category.enabled) as CategoryInfo[];

/**
 * Raise this when the categories or their purposes change. Stored choices
 * from an older version are discarded and the visitor is asked again.
 */
export const CONSENT_VERSION = 1;

/** Name of the cookie that remembers the visitor's choice (strictly necessary). */
export const CONSENT_COOKIE = "md_consent";

/** How long a choice is remembered before asking again: 12 months. */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
