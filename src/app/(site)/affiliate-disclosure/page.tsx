import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${siteConfig.name} earns money from affiliate links, including as an Amazon Associate.`,
  alternates: { canonical: "/affiliate-disclosure" },
  openGraph: { ...baseOpenGraph, title: "Affiliate Disclosure", url: "/affiliate-disclosure" },
};

/** EDITABLE TEMPLATE. Keep the required Amazon sentence exactly as written. */
export default function AffiliateDisclosurePage() {
  const sections: LegalSection[] = [
    {
      heading: "Amazon Associates",
      body: (
        <>
          {/* Required wording from the Amazon Associates Operating Agreement. */}
          <p className="font-medium text-black">{siteConfig.affiliate.disclosure}</p>
          <p>
            {siteConfig.name} takes part in the Amazon EU Associates Programme. When you buy
            something on Amazon.es after following one of our product links, we may receive a
            commission.
          </p>
        </>
      ),
    },
    {
      heading: "What it costs you",
      body: (
        <p>
          Nothing. The price you pay on Amazon is the same whether or not you arrive through one of
          our links.
        </p>
      ),
    },
    {
      heading: "How we choose what to feature",
      body: (
        <>
          <p>
            We choose products ourselves. Commissions do not decide what we recommend, and nobody
            pays us to appear in our editorial content.
          </p>
          <p>
            We only write reviews of products we have actually used. Where a page compares
            products, the comparison reflects our own view.
          </p>
        </>
      ),
    },
    {
      heading: "How affiliate links are marked",
      body: (
        <ul>
          <li>Pages that contain affiliate links carry a notice at the top.</li>
          <li>
            Product buttons read &ldquo;Check price on Amazon&rdquo; and open Amazon.es in a new
            tab.
          </li>
          <li>Every page carries this disclosure in the footer.</li>
        </ul>
      ),
    },
    {
      heading: "Prices and availability",
      body: (
        <p>
          We do not show prices, ratings or stock levels, because they change constantly. Always
          check the current details on Amazon before you buy. Amazon is responsible for the sale,
          delivery and any returns.
        </p>
      ),
    },
    {
      heading: "Questions",
      body: (
        <p>
          If anything about how we earn money is unclear, please{" "}
          <Link href="/contact">get in touch</Link>.
        </p>
      ),
    },
  ];

  return <LegalPage title="Affiliate Disclosure" sections={sections} />;
}
