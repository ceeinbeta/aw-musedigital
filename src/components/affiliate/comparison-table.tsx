import { AmazonButton } from "./amazon-button";
import type { Comparison } from "@/lib/content/types";

/**
 * Side-by-side product comparison. Products are columns, features are rows.
 * On small screens the table scrolls sideways inside its own frame, with the
 * feature column pinned, so the page itself never scrolls horizontally.
 *
 * Shows no prices or star ratings: Amazon only permits those from its API.
 */
export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const { products, rows } = comparison;
  if (products.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Product comparison table"
      tabIndex={0}
      className="relative overflow-x-auto border border-beige"
    >
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">
          Comparison of {products.map((product) => product.title).join(", ")}
        </caption>
        <thead>
          <tr className="bg-cream">
            <th scope="col" className="sticky left-0 z-10 w-36 bg-cream p-4 align-bottom">
              <span className="text-[0.62rem] font-normal uppercase tracking-[0.24em] text-taupe-deep">
                Feature
              </span>
            </th>
            {products.map((product) => (
              <th key={product.id} scope="col" className="p-4 align-bottom">
                <span className="block text-[0.6rem] font-normal uppercase tracking-[0.22em] text-taupe-deep">
                  {product.category}
                </span>
                <span className="mt-1 block font-serif text-lg font-medium leading-snug text-black">
                  {product.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-beige/70">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-ivory p-4 text-[0.68rem] font-normal uppercase tracking-[0.2em] text-charcoal"
              >
                {row.label}
              </th>
              {products.map((product, index) => (
                <td key={product.id} className="p-4 leading-relaxed">
                  {row.values[index] || "—"}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-beige/70">
            <th scope="row" className="sticky left-0 z-10 bg-ivory p-4">
              <span className="sr-only">Where to buy</span>
            </th>
            {products.map((product) => (
              <td key={product.id} className="p-4">
                <AmazonButton product={product} size="inline" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
