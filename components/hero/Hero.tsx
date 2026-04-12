import Link from "next/link";

type HeroProps = {
  title: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  imageAlt: string;
};

export default function Hero({
  title,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  imageAlt,
}: HeroProps) {
  return (
    <section className="relative w-full min-h-[min(100dvh,920px)] sm:min-h-[85dvh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/assets/images/home/hero-home-1.jpg"
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
          sizes="100vw"
          fetchPriority="high"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40"
        aria-hidden
      />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 py-20 sm:py-24 md:py-28">
          <div className="mx-auto max-w-3xl text-center sm:text-left">
            <h1 className="hero-fade-up text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white text-balance drop-shadow-sm">
              {title}
            </h1>
            <p className="hero-fade-up hero-delay-1 mt-5 sm:mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {subheading}
            </p>
            <div className="hero-fade-up hero-delay-2 mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start items-stretch sm:items-center">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center justify-center rounded-md bg-accent-gold px-6 py-3.5 text-sm font-semibold text-dark-base transition-all duration-300 ease-out hover:bg-accent-gold/90 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
              >
                {primaryCtaLabel}
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:bg-white/10 hover:border-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

