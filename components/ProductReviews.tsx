"use client";

import type { ReviewSeed } from "@/lib/reviews-data";

type ProductReviewsProps = {
  productSlug: string;
  reviews: ReviewSeed[];
  title: string;
  emptyText: string;
  countLabel: string;
  verifiedLabel: string;
};

function getAverageRating(reviews: ReviewSeed[]) {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return total / reviews.length;
}

function renderStars(rating: number) {
  const rounded = Math.round(rating);
  return Array.from({ length: 5 }).map((_, index) => {
    const isFilled = index < rounded;
    return (
      <svg
        key={`star-${index}`}
        viewBox="0 0 20 20"
        className={`h-4 w-4 ${isFilled ? "text-[#C89B3C]" : "text-[#1a1a1a]/15"}`}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.363 2.444a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.364-2.444a1 1 0 00-1.175 0l-3.364 2.444c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.03 9.382c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.955z" />
      </svg>
    );
  });
}

export default function ProductReviews({
  productSlug,
  reviews,
  title,
  emptyText,
  countLabel,
  verifiedLabel,
}: ProductReviewsProps) {
  const productReviews = reviews.filter(
    (review) => review.productSlug === productSlug
  );
  const average = getAverageRating(productReviews);
  const averageLabel = average.toFixed(1);

  return (
    <section className="border-t border-[#1a1a1a]/8 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <h2 className="text-2xl font-semibold text-[#1a1a1a] md:text-3xl">
          {title}
        </h2>

        {productReviews.length === 0 ? (
          <p className="mt-3 text-sm text-[#1a1a1a]/65">{emptyText}</p>
        ) : (
          <>
            <div className="mt-3 flex items-center gap-3 text-sm text-[#1a1a1a]/65">
              <div className="flex items-center gap-1">
                {renderStars(average)}
              </div>
              <span className="text-[#1a1a1a]">{averageLabel}</span>
              <span aria-hidden="true">•</span>
              <span>
                {productReviews.length} {countLabel}
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {productReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-[#1a1a1a]/8 bg-white p-5 shadow-[0_4px_24px_rgba(26,26,26,0.06)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    {review.verified ? (
                      <span className="rounded-full border border-[#1a1a1a]/10 bg-[#F8F5EE] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7A6248]">
                        {verifiedLabel}
                      </span>
                    ) : null}
                  </div>
                  {review.title ? (
                    <h3 className="mt-3 text-base font-semibold text-[#1a1a1a]">
                      {review.title}
                    </h3>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/70">
                    {review.comment}
                  </p>
                  <footer className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#1a1a1a]/50">
                    <span className="font-medium text-[#1a1a1a]/75">
                      {review.author}
                    </span>
                    {review.date ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={review.date}>{review.date}</time>
                      </>
                    ) : null}
                  </footer>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
