import { ConsentManager } from "@/components/consent/consent-manager";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/typography";

/** Shown for any address that does not exist. Returns a 404 status. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col items-center justify-center bg-cream px-6 py-24 text-center">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 text-black">Page not found</h1>
        <p className="mt-5 max-w-md">
          The page you were looking for has moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/journal" variant="outline">
            Read the journal
          </ButtonLink>
        </div>
      </main>
      <Footer />
      <ConsentManager />
    </>
  );
}
