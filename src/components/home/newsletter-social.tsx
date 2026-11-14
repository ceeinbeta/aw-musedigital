import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Container, Section } from "@/components/ui/container";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { siteConfig } from "@/lib/site";

export function Newsletter() {
  return (
    <Section tone="cream">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>The newsletter</Eyebrow>
          <Heading size="xl" className="mt-4 text-black">
            The edit, in your inbox
          </Heading>
          <p className="mb-10 mt-5 max-w-md text-base leading-[1.8]">
            New stories, considered finds and studio news. Occasional, never crowded.
          </p>
          <NewsletterForm />
        </div>
      </Container>
    </Section>
  );
}

const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url);
const tileTones = ["cream", "champagne", "beige", "champagne", "beige", "cream"] as const;

/**
 * Social section. Uses our own images linking out to the profiles, with no
 * third-party embeds, so nothing here sets cookies or needs consent.
 */
export function Social() {
  // Hidden until real social profiles are added in src/lib/site.ts.
  if (socialLinks.length === 0) return null;
  return (
    <Section>
      <Container width="wide">
        <div className="mb-10 flex flex-col items-center text-center">
          <Eyebrow>Follow along</Eyebrow>
          <Heading size="lg" className="mt-4 text-black">
            {siteConfig.name} on social
          </Heading>
          {socialLinks.length > 0 ? (
            <ul className="mt-6 flex flex-wrap justify-center gap-8">
              {socialLinks.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[0.68rem] uppercase tracking-[0.28em]"
                  >
                    {name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm">Our social profiles are coming soon.</p>
          )}
        </div>
        <ul className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {tileTones.map((tone, index) => (
            <li key={index}>
              <PlaceholderImage label="Social image" ratio="square" tone={tone} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
