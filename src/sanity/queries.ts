import { defineQuery } from "next-sanity";

/** GROQ fragments. Field names here match the content types in lib/content. */

const image = `{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const productFields = `
  "id": _id,
  title,
  "category": coalesce(categoryLabel, ""),
  edit,
  "note": coalesce(note, ""),
  asin,
  "image": image${image}
`;

const articleCardFields = `
  "slug": slug.current,
  title,
  "excerpt": coalesce(excerpt, ""),
  "type": articleType,
  edit,
  "image": featuredImage${image},
  publishedAt,
  updatedAt
`;

const published = `_type == "article" && defined(slug.current) && publishedAt <= now()`;

export const articlesQuery = defineQuery(`
  *[${published} && (!defined($edit) || edit == $edit)]
    | order(publishedAt desc) [0...$limit] { ${articleCardFields} }
`);

export const articleSlugsQuery = defineQuery(`
  *[${published}] { "slug": slug.current, "type": articleType }
`);

export const articleBySlugQuery = defineQuery(`
  *[${published} && slug.current == $slug][0] {
    ${articleCardFields},
    author->{ name, "slug": slug.current, role, bio, "image": image${image} },
    "tags": coalesce(tags[]->{ title, "slug": slug.current }, []),
    "body": coalesce(body[]{
      ...,
      _type == "image" => { ..., "url": asset->url },
      _type == "productEmbed" => { ..., "product": product->{ ${productFields} } }
    }, []),
    "products": coalesce(products[]->{ ${productFields} }, []),
    review {
      verdict,
      "pros": coalesce(pros, []),
      "cons": coalesce(cons, []),
      "product": product->{ ${productFields} }
    },
    comparison {
      "products": coalesce(products[]->{ ${productFields} }, []),
      "rows": coalesce(rows[]{ label, "values": coalesce(values, []) }, [])
    },
    "related": coalesce(related[]->{ ${articleCardFields} }, []),
    "takeaways": coalesce(takeaways, []),
    "faq": coalesce(faq[]{ question, answer }, []),
    seo
  }
`);

export const productsQuery = defineQuery(`
  *[_type == "product"
    && (!defined($edit) || edit == $edit)
    && (!defined($flag) || ($flag == "featured" && featured == true) || ($flag == "trending" && trending == true))
  ] | order(_updatedAt desc) [0...$limit] { ${productFields} }
`);

const collectionFields = `
  "slug": slug.current,
  title,
  "description": coalesce(description, ""),
  "image": image${image},
  "products": coalesce(products[]->{ ${productFields} }, [])
`;

export const collectionsQuery = defineQuery(`
  *[_type == "collection" && defined(slug.current)]
    | order(coalesce(order, 10) asc, title asc) { ${collectionFields} }
`);

export const collectionBySlugQuery = defineQuery(`
  *[_type == "collection" && slug.current == $slug][0] { ${collectionFields} }
`);
