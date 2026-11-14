import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/typography";

/** The pages a visitor lands on after using a link in a newsletter email. */
const pages = {
  confirmed: {
    title: "You are subscribed",
    text: "Thank you for confirming your email address. The next edition will arrive in your inbox.",
  },
  unsubscribed: {
    title: "You have been unsubscribed",
    text: "You will not receive any further newsletters from us. You are welcome back at any time.",
  },
  invalid: {
    title: "This link has expired",
    text: "The link is no longer valid or has already been used. You can subscribe again from any page.",
  },
} as const;

type Status = keyof typeof pages;
const isStatus = (value: string): value is Status => value in pages;

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

export const instant = false;

export function generateStaticParams() {
  return Object.keys(pages).map((status) => ({ status }));
}

export default async function NewsletterStatusPage({
  params,
}: PageProps<"/newsletter/[status]">) {
  const { status } = await params;
  if (!isStatus(status)) notFound();
  const page = pages[status];

  return (
    <Section tone="cream" className="flex flex-1 items-center">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <Eyebrow>The newsletter</Eyebrow>
          <Heading as="h1" size="xl" className="mt-5 text-black">
            {page.title}
          </Heading>
          <p className="mt-5 text-base leading-[1.8]">{page.text}</p>
          <ButtonLink href="/" variant="outline" className="mt-9">
            Back to the homepage
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
