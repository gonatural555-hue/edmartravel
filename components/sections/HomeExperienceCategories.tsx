import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { ExperienceCategory } from "@/lib/product-types";

type HomeExperienceCategoryItem = {
  slug: ExperienceCategory;
  title: string;
  image: string;
  imageAlt: string;
};

type Props = {
  locale: Locale;
  title: string;
  items: HomeExperienceCategoryItem[];
};

export default function HomeExperienceCategories({
  locale,
  title,
  items,
}: Props) {
  return (
    <section
      className="border-t border-white/5 bg-dark-base"
      aria-labelledby="home-experience-categories-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 md:py-16 lg:px-16 lg:py-20">
        <h2
          id="home-experience-categories-heading"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {title}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/${locale}/category/${item.slug}`}
              className="group relative block min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-dark-surface/40 shadow-sm transition-shadow duration-300 hover:border-white/15 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold sm:min-h-[220px] md:min-h-[260px]"
            >
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50"
                aria-hidden
              />
              <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
