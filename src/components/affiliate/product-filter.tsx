"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import type { Edit, Product } from "@/lib/content/types";
import { ProductGrid } from "./product-card";

type ProductFilterProps = {
  products: Product[];
  edits: Pick<Edit, "slug" | "name">[];
};

/**
 * The chosen Edit lives in the page address (e.g. /shop#living-edit), so a
 * filtered view can be linked to and survives a refresh. Every product is in
 * the page's HTML from the start, so search engines see the full list.
 */
function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}
const readHash = () => window.location.hash.slice(1);
const readHashOnServer = () => "";

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 border px-5 text-[0.64rem] uppercase tracking-[0.24em] transition-colors duration-500 ease-editorial",
        active
          ? "border-black bg-black text-ivory"
          : "border-charcoal/40 text-charcoal hover:border-black",
      )}
    >
      {children}
    </button>
  );
}

export function ProductFilter({ products, edits }: ProductFilterProps) {
  const hash = useSyncExternalStore(subscribe, readHash, readHashOnServer);
  const [category, setCategory] = useState("all");

  const activeEdit = edits.some((edit) => edit.slug === hash) ? hash : "all";
  const inEdit =
    activeEdit === "all" ? products : products.filter((product) => product.edit === activeEdit);

  // Category labels are only offered when the current view has more than one.
  const categories = [...new Set(inEdit.map((product) => product.category))].sort();
  const activeCategory = categories.includes(category) ? category : "all";
  const visible =
    activeCategory === "all"
      ? inEdit
      : inEdit.filter((product) => product.category === activeCategory);

  function selectEdit(slug: string) {
    const url = slug === "all" ? window.location.pathname : `#${slug}`;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    setCategory("all");
  }

  return (
    <div>
      <div role="group" aria-label="Filter by edit" className="flex flex-wrap gap-3">
        <FilterButton active={activeEdit === "all"} onClick={() => selectEdit("all")}>
          All
        </FilterButton>
        {edits.map((edit) => (
          <FilterButton
            key={edit.slug}
            active={activeEdit === edit.slug}
            onClick={() => selectEdit(edit.slug)}
          >
            {edit.name}
          </FilterButton>
        ))}
      </div>

      {categories.length > 1 ? (
        <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-3">
          <FilterButton active={activeCategory === "all"} onClick={() => setCategory("all")}>
            All categories
          </FilterButton>
          {categories.map((label) => (
            <FilterButton
              key={label}
              active={activeCategory === label}
              onClick={() => setCategory(label)}
            >
              {label}
            </FilterButton>
          ))}
        </div>
      ) : null}

      <p
        role="status"
        aria-live="polite"
        className="mt-8 text-[0.66rem] uppercase tracking-[0.24em] text-taupe-deep"
      >
        Showing {visible.length} {visible.length === 1 ? "piece" : "pieces"}
      </p>

      {visible.length > 0 ? (
        <ProductGrid products={visible} className="mt-8" />
      ) : (
        <p className="mt-10 font-serif text-2xl">Nothing here yet. New pieces are added regularly.</p>
      )}
    </div>
  );
}
