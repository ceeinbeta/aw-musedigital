import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Heading, Rule } from "@/components/ui/typography";
import { getServices } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const description =
  "Get in touch with MUSE DIGITAL about editorial ideas, collaborations, studio services or anything else.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
      ...baseOpenGraph, title: "Contact", description, url: "/contact" },
};

const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url);

export default async function ContactPage() {
  const services = await getServices();
  const { email, phone } = siteConfig.contact;

  return (
    <Section tone="cream" className="flex-1">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-[-0.015em] text-black sm:text-6xl">
              Contact
            </h1>
            <Rule className="mt-8" />
            <p className="mt-8 max-w-sm text-base leading-[1.8]">
              Questions, collaborations, press or a project for the studio: write to us using the
              form and we will reply as soon as we can.
            </p>

            {/* Direct contact details appear here once they are added to site.ts. */}
            {email || phone ? (
              <dl className="mt-10 space-y-5 border-t border-beige pt-8">
                {email ? (
                  <div>
                    <dt className="text-[0.66rem] uppercase tracking-[0.24em] text-taupe-deep">Email</dt>
                    <dd className="mt-1 font-serif text-xl">
                      <a href={`mailto:${email}`} className="link-underline">
                        {email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {phone ? (
                  <div>
                    <dt className="text-[0.66rem] uppercase tracking-[0.24em] text-taupe-deep">Phone</dt>
                    <dd className="mt-1 font-serif text-xl">
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="link-underline">
                        {phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}

            {socialLinks.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-6">
                {socialLinks.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[0.68rem] uppercase tracking-[0.24em]"
                    >
                      {name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-10 text-sm leading-relaxed">
              Planning an event or a new website? Each of{" "}
              <Link href="/services" className="underline underline-offset-4">
                our services
              </Link>{" "}
              has its own enquiry form with the right questions.
            </p>
          </div>

          <div>
            <Heading as="h2" size="md" className="mb-8 text-black">
              Send a message
            </Heading>
            <EnquiryForm
              service="General contact"
              typeLabel="What is your message about?"
              typeOptions={[
                "General question",
                "Collaboration or press",
                ...services.map((service) => service.name),
              ]}
              messageLabel="Your message"
              submitLabel="Send message"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
