import type { ArticleType, EditSlug } from "./types";

export const editNames: Record<EditSlug, string> = {
  "style-edit": "The Style Edit",
  "living-edit": "The Living Edit",
  "event-edit": "The Event Edit",
  "business-edit": "The Business Edit",
};

export const articleTypeLabels: Record<ArticleType, string> = {
  "buying-guide": "Buying guide",
  review: "Review",
  comparison: "Comparison",
  lifestyle: "Lifestyle",
  "event-inspiration": "Event inspiration",
  "styling-guide": "Styling guide",
  "business-tutorial": "Business tutorial",
};

/** Reviews and comparisons have their own URL sections; the rest sit in the journal. */
export function articleHref(type: ArticleType, slug: string): string {
  if (type === "review") return `/reviews/${slug}`;
  if (type === "comparison") return `/compare/${slug}`;
  return `/journal/${slug}`;
}
