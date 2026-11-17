import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `How ${siteConfig.name} works to make this website accessible to everyone.`,
  alternates: { canonical: "/accessibility" },
  openGraph: { ...baseOpenGraph, title: "Accessibility Statement", url: "/accessibility" },
};

/**
 * EDITABLE TEMPLATE. Describes the measures actually built into the site.
 * Update the testing date whenever the site is re-audited, and list any
 * problems found. Should be reviewed alongside the other legal pages.
 */
export default function AccessibilityPage() {
  const email = siteConfig.legal.email || siteConfig.contact.email;

  const sections: LegalSection[] = [
    {
      heading: "Our commitment",
      body: (
        <p>
          We want everyone to be able to read and use {siteConfig.name}, including people who use
          screen readers, keyboard navigation, magnification or other assistive technology. We aim
          to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, the standard
          referenced by European accessibility law.
        </p>
      ),
    },
    {
      heading: "What we have done",
      body: (
        <ul>
          <li>Every page can be used with a keyboard alone, with a visible focus outline and a &ldquo;Skip to content&rdquo; link.</li>
          <li>Text and controls meet WCAG contrast requirements, including on dark sections.</li>
          <li>Pages use a logical heading structure, labelled landmarks and descriptive link text.</li>
          <li>Images have text alternatives; decorative elements are hidden from screen readers.</li>
          <li>Form fields have visible labels, and errors are announced and shown beside the field.</li>
          <li>Layouts adapt to any screen size and to text zoomed up to 200%, without sideways scrolling.</li>
          <li>Animations are switched off for visitors who ask their device to reduce motion.</li>
          <li>The current page is announced in the navigation, not just shown with styling.</li>
        </ul>
      ),
    },
    {
      heading: "How we test",
      body: (
        <p>
          Every page was checked with the axe accessibility engine against WCAG 2.2 A and AA rules
          and best practices, and reviewed at phone, tablet and desktop sizes, on{" "}
          <Fill value="" label="Date of last audit" />. We repeat these checks when we make
          significant changes.
        </p>
      ),
    },
    {
      heading: "Known limitations",
      body: (
        <p>
          Automated testing cannot catch every issue, and some content, such as photographs from
          other sources, may describe images less fully than we would like. If you find anything
          that is difficult to use, please tell us.
        </p>
      ),
    },
    {
      heading: "Feedback and contact",
      body: (
        <p>
          If you have difficulty using any part of this website, email{" "}
          <Fill value={email} label="Contact email" /> or use our{" "}
          <Link href="/contact">contact form</Link>. Tell us the page and the problem, and we will
          aim to reply within <Fill value="" label="Response time, e.g. 5 working days" /> and,
          where we can, provide the information in another format.
        </p>
      ),
    },
  ];

  return <LegalPage title="Accessibility Statement" sections={sections} />;
}
