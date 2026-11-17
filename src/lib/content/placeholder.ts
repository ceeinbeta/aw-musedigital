import { photos } from "@/content/photos";
import type {
  Collection,
  Edit,
  Product,
  Project,
  Service,
} from "./types";

/**
 * SITE STRUCTURE AND PLACEHOLDER SLOTS.
 *
 * The Edits and services below are real site content. Products, collections
 * and projects are empty placeholder slots: they describe no real product,
 * client or piece of work, so the site hides them until real ones exist
 * (a product needs an Amazon ASIN; a project needs real photographs).
 *
 * Articles live in src/content/articles.
 */

export const edits: Edit[] = [
  {
    slug: "style-edit",
    name: "The Style Edit",
    description: "Wardrobe foundations, fabrics that work and how to care for them.",
    intro:
      "A considered approach to getting dressed: the foundations worth building a wardrobe around, the fabrics that suit the season, and how to make good clothes last.",
    topics: ["Wardrobe", "Fabrics", "Fabric care", "Seasonal"],
    relatedService: "creative-styling",
    href: "/style-edit",
    image: photos.styleCover,
    imageLabel: "Style edit cover",
  },
  {
    slug: "living-edit",
    name: "The Living Edit",
    description: "Arranging rooms, choosing textiles and making a home feel calm.",
    intro:
      "Ideas for a home that feels calm and finished, from the way a room is arranged to the textiles and small objects that give it character.",
    topics: ["Interiors", "Small spaces", "Bedroom", "Textiles"],
    relatedService: "event-planning",
    href: "/living-edit",
    image: photos.livingCover,
    imageLabel: "Living edit cover",
  },
  {
    slug: "event-edit",
    name: "The Event Edit",
    description: "Tablescapes, celebrations and ideas for hosting beautifully.",
    intro:
      "Inspiration for gatherings of every size: tablescapes, flowers, colour palettes and the practical details that make hosting feel effortless.",
    topics: ["Hosting", "Table setting", "Flowers", "Celebrations"],
    relatedService: "event-planning",
    href: "/event-edit",
    image: photos.eventCover,
    imageLabel: "Event edit cover",
  },
  {
    slug: "business-edit",
    name: "The Business Edit",
    description: "Websites, photography and practical guidance for small businesses.",
    intro:
      "Practical guidance for small businesses and creatives: how to present your work with care, from the words on your website to the photographs that sell it.",
    topics: ["Small business", "Websites", "Photography", "Writing"],
    relatedService: "website-development",
    href: "/business-edit",
    image: photos.businessCover,
    imageLabel: "Business edit cover",
  },
];

const editName = (slug: Edit["slug"]) => edits.find((edit) => edit.slug === slug)!.name;

const productSlot = (n: number, edit: Edit["slug"]): Product => ({
  id: `placeholder-${n}`,
  title: `Product placeholder ${n}`,
  category: editName(edit),
  edit,
  note: "Our editorial note on why we recommend this piece will appear here.",
  imageLabel: "Product photograph",
});

export const products: Product[] = [
  productSlot(1, "living-edit"),
  productSlot(2, "style-edit"),
  productSlot(3, "event-edit"),
  productSlot(4, "business-edit"),
  productSlot(5, "style-edit"),
  productSlot(6, "living-edit"),
  productSlot(7, "business-edit"),
  productSlot(8, "event-edit"),
  productSlot(9, "style-edit"),
  productSlot(10, "living-edit"),
  productSlot(11, "event-edit"),
  productSlot(12, "business-edit"),
  productSlot(13, "style-edit"),
  productSlot(14, "living-edit"),
  productSlot(15, "event-edit"),
  productSlot(16, "business-edit"),
];

const collection = (slug: string, title: string, description: string, picks: number[]): Collection => ({
  slug,
  title,
  description,
  imageLabel: "Collection cover photograph",
  href: `/shop/${slug}`,
  products: picks.map((n) => products[n - 1]),
});

export const collections: Collection[] = [
  collection(
    "sample-collection-one",
    "Sample collection: the summer table",
    "Placeholder description. A short introduction to this themed selection will appear here.",
    [1, 3, 6, 8, 10, 11, 14, 15],
  ),
  collection(
    "sample-collection-two",
    "Sample collection: the capsule wardrobe",
    "Placeholder description. A short introduction to this themed selection will appear here.",
    [2, 5, 9, 13],
  ),
  collection(
    "sample-collection-three",
    "Sample collection: the home studio",
    "Placeholder description. A short introduction to this themed selection will appear here.",
    [4, 7, 12, 16],
  ),
];

/**
 * The same four steps apply to every service. PLACEHOLDER: replace with the
 * way you actually work with clients.
 */
const process = [
  { title: "Enquiry", text: "Tell us what you have in mind using the form below." },
  { title: "Consultation", text: "We talk through your ideas, timings and practical details." },
  { title: "Proposal", text: "You receive a tailored proposal to review and approve." },
  { title: "Delivery", text: "We carry out the work and keep you informed throughout." },
];

/** Service copy is PLACEHOLDER wording built from the list of services supplied. */
export const services: Service[] = [
  {
    slug: "event-planning",
    name: "Event Planning & Styling",
    summary: "Planning, decoration and table styling for occasions worth remembering.",
    offerings: ["Weddings", "Private celebrations", "Corporate events", "Table styling"],
    href: "/services/event-planning",
    image: photos.elegantTable,
    tagline: "Occasions planned with care and styled with restraint.",
    intro:
      "From an intimate dinner to a full wedding day, we plan and style events so that every detail feels considered and the day runs calmly.",
    details: [
      { title: "Weddings", text: "Planning and styling for the ceremony, the reception and the moments in between." },
      { title: "Private celebrations", text: "Birthdays, anniversaries and gatherings at home or at a venue." },
      { title: "Corporate events", text: "Launches, dinners and company occasions that reflect your brand." },
      { title: "Event decoration", text: "Flowers, lighting and decorative details designed around your setting." },
      { title: "Table styling", text: "Linen, tableware and place settings composed for the occasion." },
    ],
    process,
    gallery: [],
    enquiry: { typeLabel: "Type of event", askDate: true, askWebsite: false },
  },
  {
    slug: "creative-styling",
    name: "Creative Styling",
    summary: "Personal and fashion styling, with creative direction for shoots and brands.",
    offerings: ["Personal styling", "Fashion styling", "Creative direction", "Visual styling"],
    href: "/services/creative-styling",
    image: photos.clothesRail,
    tagline: "A clear point of view, for people and for brands.",
    intro:
      "We style individuals and direct the look of shoots and campaigns, shaping a visual identity that feels coherent and unmistakably yours.",
    details: [
      { title: "Personal styling", text: "A wardrobe that suits your life, built around pieces you will actually wear." },
      { title: "Fashion styling", text: "Styling for editorials, lookbooks and campaigns." },
      { title: "Creative direction", text: "Concept, mood and art direction for shoots and brand projects." },
      { title: "Visual styling", text: "Props, sets and product styling for photography and content." },
    ],
    process,
    gallery: [],
    enquiry: { typeLabel: "Service of interest", askDate: false, askWebsite: false },
  },
  {
    slug: "website-development",
    name: "Website Development Boutique",
    summary: "Elegant, fast websites designed and built for small businesses and creatives.",
    offerings: ["Business websites", "Portfolio websites", "Boutique websites", "Redesign and care"],
    href: "/services/website-development",
    image: photos.websiteWorkspace,
    tagline: "Websites with the polish of a boutique and the speed of good engineering.",
    intro:
      "We design and build websites for small businesses and creatives: clear to use, quick to load and easy for you to keep up to date.",
    details: [
      { title: "Business websites", text: "A professional home for your company, built to be found and to convert." },
      { title: "Portfolio websites", text: "A considered showcase for creative and professional work." },
      { title: "Boutique websites", text: "Refined online shops and brand sites for independent labels." },
      { title: "Landing pages", text: "Focused single pages for a launch, a campaign or an offer." },
      { title: "Website redesign", text: "A fresh design and structure for a site that has fallen behind." },
      { title: "Website maintenance", text: "Ongoing updates, care and improvements after launch." },
    ],
    process,
    gallery: [],
    enquiry: { typeLabel: "Type of project", askDate: false, askWebsite: true },
  },
];

export const projects: Project[] = [
  { id: "project-1", title: "Project placeholder", discipline: "Event styling", imageLabel: "Event project photograph" },
  { id: "project-2", title: "Project placeholder", discipline: "Creative styling", imageLabel: "Styling project photograph" },
  { id: "project-3", title: "Project placeholder", discipline: "Website design", imageLabel: "Website project screenshot" },
];
