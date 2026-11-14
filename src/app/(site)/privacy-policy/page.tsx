import type { Metadata } from "next";
import Link from "next/link";
import { Fill, LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { baseOpenGraph } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects personal data.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { ...baseOpenGraph, title: "Privacy Policy", url: "/privacy-policy" },
};

/**
 * EDITABLE TEMPLATE written for a site run from Spain under the GDPR and the
 * Spanish LOPDGDD. It describes what this website actually does today. If a
 * new service is added (analytics, a newsletter tool, payments), update the
 * matching section. Must be reviewed by a lawyer before launch.
 */
export default function PrivacyPolicyPage() {
  const { legal, contact } = siteConfig;
  const privacyEmail = legal.email || contact.email;

  const sections: LegalSection[] = [
    {
      heading: "Who is responsible for your data",
      body: (
        <>
          <p>The data controller is:</p>
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
              Email: <Fill value={privacyEmail} label="Privacy contact email" />
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "What data we collect and why",
      body: (
        <>
          <p>We only collect personal data you choose to give us, through these forms:</p>
          <ul>
            <li>
              <strong>Enquiry and contact forms:</strong> your name, email address, and optionally
              your phone number, event date or website, plus your message. We use them only to
              reply to you and, if you wish, to prepare a proposal. Legal basis: your consent and,
              where you ask us for a service, steps taken at your request before a contract
              (GDPR article 6(1)(a) and 6(1)(b)).
            </li>
            <li>
              <strong>Newsletter:</strong> your email address, the date you subscribed and the
              wording you agreed to. We use it only to send the newsletter. Legal basis: your
              consent (GDPR article 6(1)(a)).
            </li>
          </ul>
          <p>
            We do not sell your data, use it for automated decisions or build advertising profiles.
          </p>
        </>
      ),
    },
    {
      heading: "Who processes your data for us",
      body: (
        <>
          <p>We use these providers, each under a data processing agreement:</p>
          <ul>
            <li>
              <strong>Google (Firebase)</strong> hosts the website and stores form submissions.
            </li>
            <li>
              <strong>Resend</strong> sends enquiry notifications and newsletter confirmation
              emails, if email sending is enabled.
            </li>
            <li>
              <strong>Sanity</strong> stores the magazine content. It does not receive visitors&apos;
              personal data.
            </li>
          </ul>
          <p>
            Some of these providers may process data outside the European Economic Area. Where
            they do, transfers rely on the EU–US Data Privacy Framework or the European
            Commission&apos;s standard contractual clauses.{" "}
            <Fill value="" label="Confirm each provider's data location and transfer mechanism" />
          </p>
        </>
      ),
    },
    {
      heading: "Links to Amazon",
      body: (
        <p>
          Product links take you to Amazon.es. We do not pass any of your personal data to
          Amazon. Once you are on Amazon&apos;s website, its own privacy and cookie policies apply.
          Read our <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
        </p>
      ),
    },
    {
      heading: "How long we keep your data",
      body: (
        <ul>
          <li>
            Enquiries: for as long as needed to deal with your request, then for{" "}
            <Fill value="" label="Retention period, e.g. 12 months" />, unless it leads to a
            contract, in which case for as long as the law requires us to keep business records.
          </li>
          <li>Newsletter: until you unsubscribe. Every newsletter contains an unsubscribe link.</li>
        </ul>
      ),
    },
    {
      heading: "Your rights",
      body: (
        <>
          <p>
            You have the right to access your data, to have it corrected or deleted, to restrict
            or object to its use, to receive it in a portable format, and to withdraw your consent
            at any time without affecting what was done before. To exercise any of these rights,
            email <Fill value={privacyEmail} label="Privacy contact email" />.
          </p>
          <p>
            If you believe we have not handled your data properly, you can complain to the Spanish
            Data Protection Agency (Agencia Española de Protección de Datos) at{" "}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
              www.aepd.es
            </a>
            .
          </p>
        </>
      ),
    },
    {
      heading: "Cookies",
      body: (
        <p>
          How this site uses cookies is explained in our{" "}
          <Link href="/cookie-policy">cookie policy</Link>.
        </p>
      ),
    },
  ];

  return <LegalPage title="Privacy Policy" sections={sections} />;
}
