import { ProductCard } from "@/components/affiliate/product-card";
import type { Review } from "@/lib/content/types";

function PointList({ title, points }: { title: string; points: string[] }) {
  if (points.length === 0) return null;
  return (
    <div>
      <h3 className="heading-label text-[0.66rem] font-normal uppercase tracking-[0.26em] text-taupe-deep">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {points.map((point, index) => (
          <li key={index} className="border-t border-beige/70 pt-3 text-[0.95rem] leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "At a glance" panel at the top of a review: the product, our verdict and
 * what we liked and did not. Carries no score, so nothing here can be mistaken
 * for an Amazon customer rating.
 */
export function ReviewSummary({ review }: { review: Review }) {
  return (
    <section aria-labelledby="review-summary" className="bg-cream p-6 sm:p-10">
      <h2 id="review-summary" className="font-serif text-3xl font-medium text-black">
        At a glance
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-[14rem_1fr]">
        {review.product ? (
          <ProductCard product={review.product} showNote={false} />
        ) : null}
        <div className="flex flex-col gap-8">
          {review.verdict ? (
            <div>
              <h3 className="heading-label text-[0.66rem] font-normal uppercase tracking-[0.26em] text-taupe-deep">
                Our verdict
              </h3>
              <p className="mt-3 font-serif text-xl leading-relaxed text-black">{review.verdict}</p>
            </div>
          ) : null}
          <div className="grid gap-8 sm:grid-cols-2">
            <PointList title="What we liked" points={review.pros} />
            <PointList title="What could be better" points={review.cons} />
          </div>
        </div>
      </div>
    </section>
  );
}
