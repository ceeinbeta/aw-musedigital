import { cn } from "@/lib/cn";

/**
 * A plain HTML search form. It submits to /search with a normal page load,
 * so it works even before (or without) JavaScript.
 */
export function SearchForm({
  defaultValue = "",
  autoFocus = false,
  className,
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <form action="/search" method="get" role="search" className={cn("flex w-full flex-col gap-3 sm:flex-row", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search the magazine
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        // Only used on the empty search page, where typing is the visitor's next step.
        autoFocus={autoFocus}
        placeholder="Search guides, e.g. linen, table setting"
        enterKeyHint="search"
        className="min-h-12 min-w-0 flex-1 border border-charcoal/50 bg-ivory px-5 text-base text-black placeholder:text-taupe-deep focus-visible:border-black"
      />
      <button
        type="submit"
        className="min-h-12 bg-black px-6 text-[0.72rem] uppercase tracking-[0.28em] text-ivory transition-colors duration-500 ease-editorial hover:bg-charcoal"
      >
        Search
      </button>
    </form>
  );
}
