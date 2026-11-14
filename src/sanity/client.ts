import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * Read-only client for published content. It is only created once a project
 * ID exists, so the site still builds before Sanity is set up.
 */
export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" })
  : null;
