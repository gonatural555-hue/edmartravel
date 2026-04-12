type Testimonial = {
  name: string;
  text: string;
  rating: number;
};

type Props = {
  title: string;
  items: Testimonial[];
  /** Enlace a la ficha de reseñas en Google Maps */
  googleReviewsUrl?: string;
  googleReviewsLabel?: string;
  googleReviewsAriaLabel?: string;
};

function StarRow({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div
      className="flex gap-0.5 text-accent-gold"
      role="img"
      aria-label={`${safe} / 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < safe ? "opacity-100" : "opacity-25"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  title,
  items,
  googleReviewsUrl,
  googleReviewsLabel,
  googleReviewsAriaLabel,
}: Props) {
  const showGoogleCta = Boolean(
    googleReviewsUrl && googleReviewsLabel?.trim()
  );

  return (
    <section
      className="border-t border-white/5 bg-black-50"
      aria-labelledby="home-testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-14 md:py-16 lg:py-20">
        <h2
          id="home-testimonials-heading"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {title}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-3 border-b border-white/10 pb-10 last:border-b-0 last:pb-0 md:border-b-0 md:pb-0"
            >
              <StarRow rating={item.rating} />
              <blockquote className="text-sm leading-relaxed text-text-muted">
                <p>{item.text}</p>
              </blockquote>
              <figcaption className="text-sm font-medium text-text-primary">
                {item.name}
              </figcaption>
            </figure>
          ))}
        </div>
        {showGoogleCta && (
          <div className="mt-12 flex justify-center md:justify-end">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-accent-gold/70 bg-transparent px-6 py-3 text-sm font-semibold text-accent-gold transition hover:bg-accent-gold/10 hover:border-accent-gold focus:outline-none focus:ring-2 focus:ring-accent-gold/40 focus:ring-offset-2 focus:ring-offset-black-50"
              aria-label={
                googleReviewsAriaLabel?.trim() || googleReviewsLabel
              }
            >
              {googleReviewsLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
