import { defineArrayMember, defineField, defineType } from "sanity";
import { editOptions } from "./shared";

/** An image with required alternative text, for accessibility and SEO. */
export const imageWithAlt = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        description: "Describe the image for people who cannot see it.",
        type: "string",
        validation: (rule) => rule.required(),
      }),
    ],
  });

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Role", type: "string", description: "For example: Editor" }),
    defineField({
      name: "bio",
      title: "Short biography",
      description: "Only include credentials and experience that are true.",
      type: "text",
      rows: 4,
    }),
    imageWithAlt("image", "Portrait"),
  ],
});

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  description: "A product we recommend, linked to Amazon.es.",
  fields: [
    defineField({
      name: "title",
      title: "Product name",
      description: "Write the name in your own words. Do not paste Amazon's listing title.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "asin",
      title: "Amazon ASIN",
      description:
        "The 10-character product code from the Amazon.es page address. The affiliate link is built from it automatically.",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[A-Z0-9]{10}$/, { name: "ASIN", invert: false }),
    }),
    defineField({
      name: "edit",
      title: "Edit",
      type: "string",
      options: { list: editOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoryLabel",
      title: "Category label",
      description: "Shown above the name, for example: Tableware.",
      type: "string",
    }),
    defineField({
      name: "note",
      title: "Editorial note",
      description:
        "Why you recommend it, in your own words. Do not include prices, star ratings or stock levels.",
      type: "text",
      rows: 3,
    }),
    imageWithAlt(
      "image",
      "Product photograph",
      "Use only your own photographs or images you are licensed to use. Never upload images copied from Amazon.",
    ),
    defineField({
      name: "featured",
      title: "Show in 'Shop the edit' on the homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "trending",
      title: "Show in 'Trending' on the homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { select: { title: "title", subtitle: "asin", media: "image" } },
});

export const collection = defineType({
  name: "collection",
  title: "Shopping collection",
  type: "document",
  description: "A themed, hand-picked group of products shown in the shop.",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    imageWithAlt("image", "Cover photograph"),
    defineField({
      name: "products",
      title: "Products",
      description: "Drag to set the order they appear in.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first in the shop.",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
