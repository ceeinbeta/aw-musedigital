import type { Metadata } from "next";
import { baseOpenGraph } from "@/lib/seo/metadata";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getFeaturedProjects, getServices } from "@/lib/content";

const description =
  "The MUSE DIGITAL studio: event planning and styling, creative styling and direction, and boutique website design and development.";

export const metadata: Metadata = {
  title: "Our Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
      ...baseOpenGraph, title: "Our Services", description, url: "/services" },
};

const tones = ["beige", "champagne", "cream"] as const;

export default async function ServicesPage() {
  const [services, projects] = await Promise.all([getServices(), getFeaturedProjects()]);

  return (
    <>
      <section className="on-dark bg-charcoal text-ivory">
        <Container className="py-16 text-center sm:py-24">
          <p className="animate-rise text-[0.7rem] uppercase tracking-[0.32em] text-champagne">
            The Studio
          </p>
          <h1 className="animate-rise mx-auto mt-6 max-w-3xl font-serif text-5xl font-medium leading-[1.05] tracking-[-0.015em] text-balance sm:text-6xl lg:text-7xl">
            Our Services
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-[1.85] text-ivory/80">
            Alongside the magazine, we run a small creative studio. We plan and style events,
            direct the look of people and brands, and design and build websites.
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="link-underline text-[0.68rem] uppercase tracking-[0.26em] text-champagne"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {services.map((service, index) => (
        <Section
          key={service.slug}
          id={service.slug}
          tone={index % 2 === 0 ? "ivory" : "cream"}
          className="scroll-mt-24"
        >
          <Container width="wide">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <Media
                  image={service.image}
                  label={`${service.name} photograph`}
                  ratio="landscape"
                  tone={tones[index % tones.length]}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div>
                <span aria-hidden="true" className="font-serif text-xl italic text-taupe-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Heading size="xl" className="mt-3 text-black">
                  {service.name}
                </Heading>
                <p className="mt-5 max-w-lg text-base leading-[1.85]">{service.intro}</p>
                <ul className="mt-7 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 border-t border-beige pt-6">
                  {service.details.map((detail) => (
                    <li key={detail.title} className="text-[0.66rem] uppercase tracking-[0.22em]">
                      {detail.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-4">
                  <ButtonLink href={service.href}>
                    Explore<span className="sr-only"> {service.name}</span>
                  </ButtonLink>
                  <ButtonLink href={`${service.href}#enquiry`} variant="outline">
                    Enquire<span className="sr-only"> about {service.name}</span>
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* Portfolio: shown only once real projects exist. */}
      {projects.length > 0 ? (
        <Section tone="dark">
          <Container width="wide">
            <p className="text-[0.7rem] uppercase tracking-[0.32em] text-champagne">Portfolio</p>
            <Heading size="xl" className="mb-10 mt-4 text-ivory sm:mb-14">
              Featured projects
            </Heading>
            <ul className="grid gap-8 sm:grid-cols-3">
              {projects.map((project, index) => (
                <li key={project.id} className={index === 1 ? "sm:mt-12" : undefined}>
                  <Media label={project.imageLabel} ratio="portrait" tone="charcoal" />
                  <p className="mt-5 text-[0.64rem] uppercase tracking-[0.26em] text-champagne">
                    {project.discipline}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-ivory">{project.title}</h3>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tone="cream">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow>Not sure where to start?</Eyebrow>
            <Heading size="xl" className="mt-4 text-black">
              Tell us about your idea
            </Heading>
            <p className="mt-5 max-w-md text-base leading-[1.8]">
              If your project spans more than one service, or you would simply like to talk it
              through, get in touch.
            </p>
            <ButtonLink href="/contact" className="mt-9">
              Contact the studio
            </ButtonLink>
            <p className="mt-6 text-sm">
              Or read{" "}
              <Link href="/about" className="underline underline-offset-4">
                more about us
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
