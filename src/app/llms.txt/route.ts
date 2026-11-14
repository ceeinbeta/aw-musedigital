import { getEdits, getLatestArticles, getServices } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants and answer
 * engines, following the llms.txt proposal (llmstxt.org). It tells them what
 * the site covers and points them to the most useful pages.
 */
export async function GET() {
  const [edits, articles, services] = await Promise.all([
    getEdits(),
    getLatestArticles(200),
    getServices(),
  ]);
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const sections = edits
    .map((edit) => {
      const inEdit = articles.filter((item) => item.edit === edit.slug);
      const lines = inEdit.map((item) => `- [${item.title}](${url(item.href)}): ${item.excerpt}`);
      return `## ${edit.name}\n\n${edit.intro}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const studio = services
    .map((item) => `- [${item.name}](${url(item.href)}): ${item.summary}`)
    .join("\n");

  const text = `# ${siteConfig.name}

> ${siteConfig.description}

Articles are written in English by the ${siteConfig.name} editors, show the date they were last updated, and end with answers to common questions.

${sections}

## Studio services

${studio}

## About

- [About ${siteConfig.name}](${url("/about")}): what the magazine covers and its editorial standards.
- [Affiliate disclosure](${url("/affiliate-disclosure")}): how the site is funded.
- [Sitemap](${url("/sitemap.xml")})
- [RSS feed](${url("/feed.xml")})
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
