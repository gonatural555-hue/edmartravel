type FeaturedExperiencesSectionHeaderProps = {
  /** Coincide con `aria-labelledby` de la sección. */
  headingId: string;
  badge: string;
  headline: string;
  subheadline: string;
};

/**
 * Encabezado editorial centrado para la sección de experiencias destacadas (home).
 * Animación CSS con escalonado; respeta `prefers-reduced-motion`.
 */
export default function FeaturedExperiencesSectionHeader({
  headingId,
  badge,
  headline,
  subheadline,
}: FeaturedExperiencesSectionHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-1 text-center sm:px-2">
      <p className="featured-editorial-rise font-medium text-[10px] uppercase leading-none tracking-[0.28em] text-[#b5a990] sm:text-[11px] sm:tracking-[0.26em]">
        {badge}
      </p>
      <h2
        id={headingId}
        className="featured-editorial-rise featured-editorial-rise-delay-1 mx-auto mt-5 max-w-[min(100%,40rem)] text-balance font-theater font-bold tracking-[-0.02em] text-mist-white/95 sm:mt-6 md:mt-7 text-3xl sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
      >
        {headline}
      </h2>
      <p className="featured-editorial-rise featured-editorial-rise-delay-2 mx-auto mt-5 max-w-xl text-pretty text-base font-normal leading-relaxed text-text-muted/90 sm:mt-6 sm:max-w-2xl sm:text-lg md:mt-7 md:text-[1.0625rem] md:leading-[1.55]">
        {subheadline}
      </p>
    </header>
  );
}
