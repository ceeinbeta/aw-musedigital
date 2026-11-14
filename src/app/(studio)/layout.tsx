import { ConsentManager } from "@/components/consent/consent-manager";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/**
 * Layout for the studio service pages. The dark header marks them out as the
 * creative business, separate from the magazine and the shopping edit.
 */
export default function StudioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header tone="dark" />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <ConsentManager />
    </>
  );
}
