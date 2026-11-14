import { siteConfig } from "@/lib/site";
import type { ArticleDetail, Service } from "@/lib/content";

/**
 * Builders for schema.org structured data (JSON-LD), which helps search
 * engines understand each page.
 *
 * Deliberately absent: Product and Review markup. Google requires prices,
 * stock levels or ratings for those, and this site must not publish any of
 * them without Amazon's API. Articles are described as articles instead.
 */

type Thing = Record<string, unknown>;

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

const sameAs = () => Object.values(siteConfig.social).filter(Boolean);

export function organization(): Thing {
  return {
    "@type": "Organization",
    "@id": absolute("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: absolute("/"),
    logo: absolute("/icon.svg"),
    ...(sameAs().length > 0 ? { sameAs: sameAs() } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };
}

export function website(): Thing {
  return {
    "@type": "WebSite",
    "@id": absolute("/#website"),
    name: siteConfig.name,
    url: absolute("/"),
    inLanguage: siteConfig.locale,
    publisher: { "@id": absolute("/#organization") },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]): Thing {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function article(item: ArticleDetail): Thing {
  return {
    "@type": "Article",
    headline: item.title,
    description: item.seo?.description || item.excerpt,
    url: absolute(item.href),
    mainEntityOfPage: absolute(item.href),
    inLanguage: siteConfig.locale,
    articleSection: item.category,
    ...(item.tags.length > 0 ? { keywords: item.tags.map((tag) => tag.title).join(", ") } : {}),
    ...(item.publishedAt ? { datePublished: item.publishedAt } : {}),
    ...(item.updatedAt || item.publishedAt
      ? { dateModified: item.updatedAt ?? item.publishedAt }
      : {}),
    ...(item.image
      ? {
          image: {
            "@type": "ImageObject",
            url: item.image.url,
            caption: item.image.alt,
            ...(item.image.credit
              ? { creditText: `${item.image.credit.name} / ${item.image.credit.source}` }
              : {}),
          },
        }
      : {}),
    author: item.author
      ? { "@type": "Person", name: item.author.name }
      : { "@id": absolute("/#organization") },
    publisher: { "@id": absolute("/#organization") },
  };
}

/** Questions and answers, so search and AI engines can quote them directly. */
export function faqPage(items: { question: string; answer: string }[]): Thing {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** A list page, such as the Journal or an Edit, with its articles in order. */
export function articleList(name: string, path: string, items: { href: string; title: string }[]): Thing {
  return {
    "@type": "CollectionPage",
    name,
    url: absolute(path),
    isPartOf: { "@id": absolute("/#website") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(item.href),
        name: item.title,
      })),
    },
  };
}

export function service(item: Service): Thing {
  return {
    "@type": "Service",
    name: item.name,
    description: item.intro,
    url: absolute(item.href),
    serviceType: item.details.map((detail) => detail.title),
    provider: { "@id": absolute("/#organization") },
  };
}

/** Wraps one or more items in a single JSON-LD graph. */
export function graph(...items: Thing[]): Thing {
  return { "@context": "https://schema.org", "@graph": items };
}
