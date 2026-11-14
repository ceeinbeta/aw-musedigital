import type { PortableTextBlock } from "next-sanity";

/**
 * Content types shared by every page. Both the placeholder source and Sanity
 * return these same shapes, so pages never need to know where content lives.
 */

export type EditSlug = "style-edit" | "living-edit" | "event-edit" | "business-edit";

export type ArticleType =
  | "buying-guide"
  | "review"
  | "comparison"
  | "lifestyle"
  | "event-inspiration"
  | "styling-guide"
  | "business-tutorial";

export type ImageAsset = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** Photographer credit, shown under large images. */
  credit?: { name: string; url: string; source: string };
};

export type Edit = {
  slug: EditSlug;
  name: string;
  description: string;
  /** Longer introduction shown at the top of the Edit's own page. */
  intro: string;
  /** Subjects the Edit covers. Become filters in Phase 6. */
  topics: string[];
  /** The studio service most relevant to readers of this Edit. */
  relatedService: string;
  href: string;
  image?: ImageAsset;
  imageLabel: string;
};

export type Author = {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  image?: ImageAsset;
};

export type Tag = { title: string; slug: string };

export type Product = {
  id: string;
  title: string;
  category: string;
  edit: EditSlug;
  /** Our own editorial note. Never copied from Amazon. */
  note: string;
  /** Amazon Standard Identification Number, once a real product is chosen. */
  asin?: string;
  /** Our own photograph. Absent until one is uploaded. */
  image?: ImageAsset;
  imageLabel: string;
};

/** A themed, hand-picked group of products, e.g. for a season or occasion. */
export type Collection = {
  slug: string;
  title: string;
  description: string;
  image?: ImageAsset;
  imageLabel: string;
  href: string;
  products: Product[];
};

export type Review = {
  product?: Product;
  verdict?: string;
  pros: string[];
  cons: string[];
};

export type Comparison = {
  products: Product[];
  /** One row per feature; `values` has one entry per product, in order. */
  rows: { label: string; values: string[] }[];
};

/** The fields needed to show an article on a card or in a list. */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  /** Display name of the template, e.g. "Buying guide". */
  typeLabel: string;
  edit: EditSlug;
  /** Display name of the category, e.g. "The Living Edit". */
  category: string;
  image?: ImageAsset;
  imageLabel: string;
  /** ISO date. Absent on placeholder content. */
  publishedAt?: string;
  /** ISO date of the last substantial update, if any. */
  updatedAt?: string;
  /** Estimated reading time in minutes. */
  readingMinutes?: number;
  href: string;
};

/** Everything needed to render an article page. */
export type ArticleDetail = Article & {
  author?: Author;
  tags: Tag[];
  body: PortableTextBlock[];
  /** Products shown after the article. */
  products: Product[];
  review?: Review;
  comparison?: Comparison;
  related: Article[];
  /** Three to five short points summarising the article, shown at the top. */
  takeaways: string[];
  /** Questions and answers shown at the end and marked up as an FAQ. */
  faq: { question: string; answer: string }[];
  seo?: { title?: string; description?: string; noindex?: boolean };
};

export type Service = {
  slug: string;
  name: string;
  /** One line shown on cards. */
  summary: string;
  /** Short list shown on cards. */
  offerings: string[];
  href: string;
  /** Headline on the service's own page. */
  tagline: string;
  /** Opening paragraph on the service's own page. */
  intro: string;
  /** Each offering in full. */
  details: { title: string; text: string }[];
  /** How an engagement runs, step by step. */
  process: { title: string; text: string }[];
  /** Mood photograph for the service page hero. Not presented as client work. */
  image?: ImageAsset;
  /** Real photographs of the studio's own projects. Empty until supplied. */
  gallery: ImageAsset[];
  enquiry: {
    /** Label for the "what do you need" dropdown. */
    typeLabel: string;
    /** Whether to ask for an event date. */
    askDate: boolean;
    /** Whether to ask for an existing website address. */
    askWebsite: boolean;
  };
};

export type Project = {
  /** False for placeholder slots; only real projects are ever shown. */
  isReal?: boolean;
  id: string;
  title: string;
  discipline: string;
  imageLabel: string;
};
