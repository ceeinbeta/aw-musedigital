import type { ReactNode } from "react";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/typography";
import { siteConfig } from "@/lib/site";

/**
 * Shows a value from the site configuration, or a highlighted placeholder
 * if the owner has not supplied it yet, so gaps are impossible to miss.
 */
export function Fill({ value, label }: { value?: string; label: string }) {
  if (value) return <>{value}</>;
  return (
    <mark className="bg-champagne px-1 text-black">[{label}: to be supplied]</mark>
  );
}

export type LegalSection = { heading: string; body: ReactNode };

type LegalPageProps = {
  title: string;
  intro?: ReactNode;
  sections: LegalSection[];
};

/** Shared layout for the four legal pages. */
export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <>
      <Section tone="cream" className="!py-14 sm:!py-20">
        <Container width="narrow">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-5 text-black">{title}</h1>
          <p className="mt-5 text-[13px] text-taupe-deep">
            Last updated: <Fill value={siteConfig.legal.lastUpdated} label="Date" />
          </p>
          {/* Remove this notice once a lawyer has reviewed the text. */}
          <p
            role="note"
            className="mt-8 border-l-2 border-charcoal bg-ivory px-5 py-4 text-sm leading-relaxed"
          >
            Draft template. This text has not yet been reviewed by a lawyer and must be checked
            and completed before the site launches.
          </p>
        </Container>
      </Section>
      <Section>
        <Container width="narrow">
          {intro ? <div className="mb-12 text-[1.05rem] leading-[1.8]">{intro}</div> : null}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.heading} aria-labelledby={slug(section.heading)}>
                <h2 id={slug(section.heading)} className="text-black">
                  {section.heading}
                </h2>
                <div className="legal-body mt-5 space-y-4 leading-[1.8] [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
