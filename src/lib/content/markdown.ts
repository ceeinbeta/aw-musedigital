import type { PortableTextBlock } from "next-sanity";
import type { ImageAsset } from "./types";

/**
 * Converts the simple Markdown used in src/content/articles into Portable
 * Text, the format Sanity stores. Articles written here render exactly like
 * articles written in the CMS, and can be imported into Sanity later.
 *
 * Supported:
 *   ## Heading, ### Sub-heading, > Quote, - bullet, 1. numbered,
 *   **bold**, *italic*, [link](url), and on its own line
 *   ![Caption](photoKey) to place a photo from src/content/photos.ts.
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

let counter = 0;
const key = () => `k${(counter++).toString(36)}`;

function parseInline(text: string): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) {
      children.push({ _type: "span", _key: key(), text: text.slice(last, match.index), marks: [] });
    }
    if (match[1] !== undefined) {
      children.push({ _type: "span", _key: key(), text: match[1], marks: ["strong"] });
    } else if (match[2] !== undefined) {
      children.push({ _type: "span", _key: key(), text: match[2], marks: ["em"] });
    } else {
      const def: MarkDef = { _type: "link", _key: key(), href: match[4] };
      markDefs.push(def);
      children.push({ _type: "span", _key: key(), text: match[3], marks: [def._key] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    children.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  }
  return { children, markDefs };
}

function textBlock(
  text: string,
  style: string,
  list?: { listItem: "bullet" | "number" },
): PortableTextBlock {
  const { children, markDefs } = parseInline(text);
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs,
    children,
    ...(list ? { listItem: list.listItem, level: 1 } : {}),
  } as PortableTextBlock;
}

export function markdownToBlocks(
  markdown: string,
  resolveImage: (key: string) => ImageAsset | undefined,
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const paragraphs = markdown.trim().split(/\n\s*\n/);

  for (const chunk of paragraphs) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const first = lines[0];

    const image = first.match(/^!\[(.*)\]\((.+)\)$/);
    if (image) {
      const asset = resolveImage(image[2]);
      if (!asset) throw new Error(`Unknown photo "${image[2]}" in article content.`);
      blocks.push({
        _type: "image",
        _key: key(),
        url: asset.url,
        alt: asset.alt,
        caption: image[1] || undefined,
        credit: asset.credit,
      } as unknown as PortableTextBlock);
    } else if (first.startsWith("### ")) {
      blocks.push(textBlock(first.slice(4), "h3"));
    } else if (first.startsWith("## ")) {
      blocks.push(textBlock(first.slice(3), "h2"));
    } else if (first.startsWith("> ")) {
      blocks.push(textBlock(lines.map((line) => line.replace(/^>\s?/, "")).join(" "), "blockquote"));
    } else if (/^[-*] /.test(first)) {
      for (const line of lines) {
        blocks.push(textBlock(line.replace(/^[-*] /, ""), "normal", { listItem: "bullet" }));
      }
    } else if (/^\d+\. /.test(first)) {
      for (const line of lines) {
        blocks.push(textBlock(line.replace(/^\d+\. /, ""), "normal", { listItem: "number" }));
      }
    } else {
      blocks.push(textBlock(lines.join(" "), "normal"));
    }
  }
  return blocks;
}

/** Plain text of the blocks, for word counts and reading time. */
export function blocksToText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) =>
      Array.isArray((block as { children?: Span[] }).children)
        ? (block as { children: Span[] }).children.map((child) => child.text).join("")
        : "",
    )
    .join(" ");
}

/** Reading time at a typical 200 words per minute, rounded up. */
export function readingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Same rule the article renderer uses to give each heading an anchor. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
