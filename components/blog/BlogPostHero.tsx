import Image from "next/image";

type BlogPostHeroProps = {
  title: string;
  subtitle?: string;
  image: string;
  readingTimeLabel?: string;
};

export default function BlogPostHero({
  title,
  subtitle,
  image,
  readingTimeLabel,
}: BlogPostHeroProps) {
  return (
    <header className="category-page-section pt-[var(--experience-header-height,5.5rem)]">
      <div className="relative min-h-[58vh] w-full overflow-hidden sm:min-h-[68vh] lg:min-h-[78vh]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-4 pt-10 sm:px-6 md:pt-14 lg:px-10 lg:pt-16">
        <h1 className="font-theater text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold uppercase leading-[0.94] tracking-[-0.03em] text-[#1a1a1a]">
          {title}
        </h1>
        {readingTimeLabel ? (
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[#1a1a1a]/45 md:mt-6">
            {readingTimeLabel}
          </p>
        ) : null}
        {subtitle ? (
          <p className="mt-6 text-lg leading-[1.75] text-[#1a1a1a]/72 md:mt-8 md:text-[1.3125rem] md:leading-[1.8]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </header>
  );
}
