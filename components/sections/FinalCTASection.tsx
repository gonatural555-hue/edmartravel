import Link from "next/link";

type FinalCTASectionProps = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export default function FinalCTASection({
  title,
  ctaLabel,
  ctaHref,
  secondaryCta,
}: FinalCTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-dark-base py-28 md:py-36 lg:py-40">
      <div
        className="absolute inset-0 bg-[url('/assets/images/hero/home-image-1.webp')] bg-cover bg-center bg-no-repeat"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link
            href={ctaHref}
            className="inline-flex min-w-[200px] items-center justify-center rounded-md bg-accent-gold px-8 py-3.5 text-base font-semibold text-dark-base shadow-sm transition-all duration-200 ease-out hover:bg-accent-gold/90 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ctaLabel}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-md border-2 border-white/55 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-[2px] transition-all duration-200 ease-out hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
