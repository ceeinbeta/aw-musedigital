import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms that apply to using the ${siteConfig.name} website.`,
  alternates: { canonical: "/terms" },
  openGraph: { ...baseOpenGraph, title: "Terms and Conditions", url: "/terms" },
};

/**
 * EDITABLE TEMPLATE. The first section is the legal notice ("aviso legal")
 * required of websites run from Spain by LSSI-CE article 10. Studio services
 * are not sold through this website; they are agreed separately in writing.
 * Must be reviewed by a lawyer before launch.
 */
export default function TermsPage() {
  const { legal, contact } = siteConfig;

  const sections: LegalSection[] = [
    {
      heading: "Legal notice",
      body: (
        <>
          <p>This website is owned and run by:</p>
          <ul>
            <li>
              Name: <Fill value={legal.ownerName} label="Legal name" />
            </li>
            <li>
              Tax ID: <Fill value={legal.taxId} label="NIF / CIF" />
            </li>
            <li>
              Address: <Fill value={legal.address} label="Postal address" />
            </li>
            <li>
              Email: <Fill value={legal.email || contact.email} label="Contact email" />
            </li>
            <li>
              Registry details: <Fill value={legal.registry} label="Commercial registry, if a company" />
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "Using this website",
      body: (
        <p>
          By using this website you agree to these terms. Please use it lawfully and do not try to
          disrupt it, access parts of it you are not meant to, or submit false information through
          its forms.
        </p>
      ),
    },
    {
      heading: "Content and intellectual property",
      body: (
        <p>
          The text, photographs, design and brand of {siteConfig.name} belong to us or to those
          who licensed them to us. You may share links to our pages and quote short extracts with
          credit, but you may not copy or republish our content without permission.
        </p>
      ),
    },
    {
      heading: "Editorial content and recommendations",
      body: (
        <p>
          Our articles, guides and recommendations are general information and reflect our own
          opinion. They are not professional advice. Product details can change, so always check
          the current information with the retailer before buying.
        </p>
      ),
    },
    {
      heading: "Links to other websites",
      body: (
        <p>
          We link to other websites, including Amazon.es. We are not responsible for their content,
          products or policies. Purchases you make there are between you and that retailer. Read
          our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
        </p>
      ),
    },
    {
      heading: "Studio services",
      body: (
        <p>
          Sending an enquiry does not create a contract. Event planning, creative styling and
          website development are provided only under a written proposal or contract agreed with
          each client, which sets out the scope, price and terms of that work.
        </p>
      ),
    },
    {
      heading: "Liability",
      body: (
        <p>
          We take care to keep this website accurate and available, but we cannot guarantee it
          will always be error-free or uninterrupted. Nothing in these terms limits any rights you
          have as a consumer under Spanish or European law.
        </p>
      ),
    },
    {
      heading: "Applicable law",
      body: (
        <p>
          These terms are governed by Spanish law. If you are a consumer, you may bring a claim in
          the courts of the place where you live.
        </p>
      ),
    },
    {
      heading: "Changes",
      body: (
        <p>
          We may update these terms from time to time. The date at the top of this page shows when
          they last changed.
        </p>
      ),
    },
  ];

  return <LegalPage title="Terms and Conditions" sections={sections} />;
}
