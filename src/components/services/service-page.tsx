import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow, Heading, Rule } from "@/components/ui/typography";
import { getService, getServices } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, graph, service as serviceData } from "@/lib/seo/structured-data";
import { PortfolioGallery } from "./portfolio-gallery";

/** Builds the SEO metadata for a service page. */
export async function serviceMetadata(slug: string): Promise<Metadata> {
  const service = await getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.intro,
    alternates: { canonical: service.href },
    openGraph: {
      ...baseOpenGraph,
      type: "website",
      siteName: siteConfig.name,
      title: `${service.name} | ${siteConfig.name}`,
      description: service.intro,
      url: service.href,
    },
  };
}

const number = (index: number) => String(index + 1).padStart(2, "0");

/** The shared template behind all three service landing pages. */
export async function ServicePage({ slug }: { slug: string }) {
  const [service, all] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();
  const others = all.filter((item) => item.slug !== slug);

  return (
    <>
      <JsonLd
        data={graph(
          serviceData(service),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: service.href },
          ]),
        )}
      />
      {/* Hero */}
      <section className="on-dark bg-charcoal text-ivory">
        <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-12 lg:py-24">
          <div className="animate-rise">
            <nav aria-label="Breadcrumb">
              <ol className="flex gap-3 text-[0.66rem] uppercase tracking-[0.26em] text-champagne">
                <li>
                  <Link href="/" className="link-underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/services" className="link-underline">
                    Services
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="mt-10 text-[0.7rem] uppercase tracking-[0.32em] text-champagne">
              {service.name}
            </p>
            <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1.05] tracking-[-0.015em] text-balance sm:text-6xl">
              {service.tagline}
            </h1>
            <p className="mt-7 max-w-lg text-base leading-[1.85] text-ivory/80">{service.intro}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#enquiry" variant="light">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <Media
              image={service.image}
              label={`${service.name} photograph`}
              ratio="portrait"
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* What we offer */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <Eyebrow>What we offer</Eyebrow>
              <Heading size="xl" className="mt-4 text-black">
                Services
              </Heading>
              <Rule className="mt-8" />
            </div>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {service.details.map((detail, index) => (
                <li key={detail.title} className="border-t border-beige py-7">
                  <span aria-hidden="true" className="font-serif text-lg italic text-taupe-deep">
                    {number(index)}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-medium text-black">{detail.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-[1.75]">{detail.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Portfolio: shown only once real photographs of the studio's own work exist. */}
      {service.gallery.length > 0 ? (
        <Section tone="dark">
          <Container width="wide">
            <div className="mb-10 sm:mb-14">
              <p className="text-[0.7rem] uppercase tracking-[0.32em] text-champagne">Portfolio</p>
              <Heading size="xl" className="mt-4 text-ivory">
                Selected work
              </Heading>
            </div>
            <PortfolioGallery images={service.gallery} />
          </Container>
        </Section>
      ) : null}

      {/* Process */}
      <Section>
        <Container width="wide">
          <div className="mb-10 sm:mb-14">
            <Eyebrow>How it works</Eyebrow>
            <Heading size="xl" className="mt-4 text-black">
              From first conversation to finished work
            </Heading>
          </div>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {service.process.map((step, index) => (
              <li key={step.title} className="border-t border-charcoal pt-6">
                <span aria-hidden="true" className="font-serif text-3xl italic text-taupe-deep">
                  {number(index)}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-medium text-black">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.75]">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Enquiry */}
      <Section tone="cream" id="enquiry" className="scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <Eyebrow>Enquire</Eyebrow>
              <Heading size="xl" className="mt-4 text-black">
                Tell us what you have in mind
              </Heading>
              <p className="mt-6 max-w-sm text-base leading-[1.8]">
                Share a few details and we will reply to arrange a conversation. There is no
                obligation.
              </p>
            </div>
            <EnquiryForm
              service={service.name}
              typeLabel={service.enquiry.typeLabel}
              typeOptions={service.details.map((detail) => detail.title)}
              askDate={service.enquiry.askDate}
              askWebsite={service.enquiry.askWebsite}
            />
          </div>
        </Container>
      </Section>

      {/* Other services */}
      <Section tone="dark">
        <Container width="wide">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-champagne">The Studio</p>
          <Heading size="xl" className="mb-10 mt-4 text-ivory">
            More from the studio
          </Heading>
          <ul className="grid border-t border-ivory/20 sm:grid-cols-2">
            {others.map((item) => (
              <li
                key={item.slug}
                className="group relative border-b border-ivory/20 py-10 sm:border-b-0 sm:px-10 sm:first:pl-0 sm:last:border-l sm:last:pr-0"
              >
                <h3 className="font-serif text-3xl font-medium text-ivory">
                  <Link href={item.href} className="after:absolute after:inset-0">
                    <span className="link-underline">{item.name}</span>
                  </Link>
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-[1.75] text-ivory/80">
                  {item.summary}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
