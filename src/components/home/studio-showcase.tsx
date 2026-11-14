import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import type { Project, Service } from "@/lib/content";
import { SectionHeader } from "./section-header";

type StudioShowcaseProps = { services: Service[]; projects: Project[] };

/**
 * The studio band: services and featured projects together, in the dark
 * treatment that keeps the creative business distinct from the shopping edit.
 */
export function StudioShowcase({ services, projects }: StudioShowcaseProps) {
  return (
    <Section tone="dark">
      <Container width="wide">
        <SectionHeader
          onDark
          eyebrow="The Studio"
          title="Creative services"
          link={{ label: "All services", href: "/services" }}
        />

        <ul className="grid border-t border-ivory/20 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className="group relative border-b border-ivory/20 py-10 lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span aria-hidden="true" className="font-serif text-lg italic text-champagne">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-[1.7rem] font-medium leading-tight text-ivory">
                <Link href={service.href} className="after:absolute after:inset-0">
                  <span className="link-underline">{service.name}</span>
                </Link>
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.75] text-ivory/80">{service.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.64rem] uppercase tracking-[0.22em] text-champagne">
                {service.offerings.map((offering) => (
                  <li key={offering}>{offering}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Portfolio appears only once real projects exist. */}
        {projects.length > 0 ? (
          <div className="mt-20 lg:mt-28">
            <SectionHeader onDark eyebrow="Portfolio" title="Featured projects" />
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
            <div className="mt-14 flex justify-center">
              <ButtonLink href="/contact" variant="light">
                Start an enquiry
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-14 flex justify-center">
            <ButtonLink href="/contact" variant="light">
              Start an enquiry
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  );
}
