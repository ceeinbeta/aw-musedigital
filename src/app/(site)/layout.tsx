import { ConsentManager } from "@/components/consent/consent-manager";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/** Layout for every public page. The Studio at /studio sits outside it. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <ConsentManager />
    </>
  );
}
