/**
 * Sanity connection settings, read from environment variables.
 * Until a project ID is supplied the site runs on placeholder content.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-02-19";

export const isSanityConfigured = projectId.length > 0;
