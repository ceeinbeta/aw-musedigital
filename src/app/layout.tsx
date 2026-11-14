import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/site";
import "./globals.css";

// Inter is bundled in src/fonts (SIL Open Font License) and served from our
// own domain, so visitors' browsers never contact a third party (GDPR).
// It is a variable font, so one file covers every weight from 100 to 900.
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/inter-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
      ...baseOpenGraph,
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en",
  },
  twitter: { card: "summary_large_image" },

};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Set here rather than in metadata so pages with their own canonical URL keep it. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS feed`}
          href="/feed.xml"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
