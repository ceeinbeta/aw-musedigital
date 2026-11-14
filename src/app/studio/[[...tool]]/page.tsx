import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";

export { metadata, viewport } from "next-sanity/studio";

/**
 * The content editing screen. It needs a Sanity project to connect to, so
 * until one is configured this page explains how to set it up.
 */
export default function StudioPage() {
  if (isSanityConfigured) return <Studio />;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-20">
      <p className="text-[0.7rem] uppercase tracking-[0.32em] text-taupe-deep">Content studio</p>
      <h1 className="mt-5 font-serif text-4xl font-medium text-black">Connect Sanity to begin</h1>
      <ol className="mt-8 list-decimal space-y-4 pl-5 leading-relaxed">
        <li>Create a free account and a new project at sanity.io/manage.</li>
        <li>
          Copy the project ID into a file named <code>.env.local</code> as{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>.
        </li>
        <li>
          In the Sanity project settings, under API, add this site&apos;s address as an allowed
          CORS origin with credentials enabled.
        </li>
        <li>Restart the site and return to this page to sign in.</li>
      </ol>
      <p className="mt-8 text-sm">
        Until then, the site shows placeholder content so every page can still be reviewed.
      </p>
    </main>
  );
}
