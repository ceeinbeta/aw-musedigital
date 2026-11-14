import { getLatestArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * RSS feed of the latest articles at /feed.xml. Feed readers, aggregators and
 * some AI tools use it to discover new content quickly.
 */
const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const articles = await getLatestArticles(50);
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const items = articles
    .map(
      (item) => `    <item>
      <title>${escape(item.title)}</title>
      <link>${url(item.href)}</link>
      <guid isPermaLink="true">${url(item.href)}</guid>
      <description>${escape(item.excerpt)}</description>
      <category>${escape(item.category)}</category>
${item.publishedAt ? `      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>\n` : ""}    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)}</title>
    <link>${url("/")}</link>
    <description>${escape(siteConfig.description)}</description>
    <language>en</language>
    <atom:link href="${url("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
