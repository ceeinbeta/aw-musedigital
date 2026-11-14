import { defineArrayMember, defineField, defineType } from "sanity";
import { imageWithAlt } from "./documents";
import { articleTypeOptions, editOptions } from "./shared";

/**
 * One document type covers all seven editorial templates. The "Article type"
 * field decides which template the site uses and which extra fields appear.
 */
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "products", title: "Products" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The page address. Generate it from the headline.",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "articleType",
      title: "Article type",
      type: "string",
      group: "content",
      options: { list: articleTypeOptions, layout: "radio" },
      initialValue: "lifestyle",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "edit",
      title: "Edit (category)",
      type: "string",
      group: "content",
      options: { list: editOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "One or two sentences shown on cards and under the headline.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(220),
    }),
    { ...imageWithAlt("featuredImage", "Featured image"), group: "content" },
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Sub-heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          name: "productEmbed",
          title: "Product",
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "product.title" }, prepare: ({ title }) => ({ title: title ?? "Product", subtitle: "Product card" }) },
        }),
      ],
    }),

    defineField({
      name: "takeaways",
      title: "Key takeaways",
      description: "Three to five short points summarising the article, shown at the top.",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "faq",
      title: "Frequently asked questions",
      description: "Shown at the end of the article and marked up for search engines.",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          name: "faqItem",
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      description: "Set when the article is substantially revised.",
      type: "datetime",
      group: "content",
    }),

    // Products featured at the end of the article (buying guides and others).
    defineField({
      name: "products",
      title: "Featured products",
      description: "Shown as a 'Shop the story' grid after the article.",
      type: "array",
      group: "products",
      of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
    }),

    // Review template.
    defineField({
      name: "review",
      title: "Review details",
      description: "Only write reviews of products you have actually used.",
      type: "object",
      group: "products",
      hidden: ({ document }) => document?.articleType !== "review",
      fields: [
        defineField({ name: "product", title: "Product reviewed", type: "reference", to: [{ type: "product" }] }),
        defineField({ name: "verdict", title: "Verdict", type: "text", rows: 3 }),
        defineField({ name: "pros", title: "What we liked", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "cons", title: "What could be better", type: "array", of: [defineArrayMember({ type: "string" })] }),
      ],
    }),

    // Comparison template.
    defineField({
      name: "comparison",
      title: "Comparison details",
      type: "object",
      group: "products",
      hidden: ({ document }) => document?.articleType !== "comparison",
      fields: [
        defineField({
          name: "products",
          title: "Products compared",
          description: "Two to four products, in column order.",
          type: "array",
          of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
          validation: (rule) => rule.min(2).max(4),
        }),
        defineField({
          name: "rows",
          title: "Comparison rows",
          description:
            "One row per feature. Enter one value per product, in the same order. Do not include prices or star ratings.",
          type: "array",
          of: [
            defineArrayMember({
              name: "row",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Feature", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "values", title: "Values", type: "array", of: [defineArrayMember({ type: "string" })] }),
              ],
              preview: { select: { title: "label" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "related",
      title: "Related articles",
      description: "Optional. If left empty, recent articles from the same Edit are shown.",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
      validation: (rule) => rule.max(3),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "SEO title",
          description: "Optional. Defaults to the headline.",
          type: "string",
          validation: (rule) => rule.max(65),
        }),
        defineField({
          name: "description",
          title: "Meta description",
          description: "Optional. Defaults to the excerpt.",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "noindex",
          title: "Hide from search engines",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "articleType", media: "featuredImage" },
  },
});
