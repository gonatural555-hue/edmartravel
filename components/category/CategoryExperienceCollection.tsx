"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CategoryExperienceCard, {
  type CategoryExperienceItem,
} from "./CategoryExperienceCard";

type CategoryExperienceCollectionProps = {
  eyebrow: string;
  title: string;
  items: CategoryExperienceItem[];
  fromPriceLabel: string;
  viewLabel: string;
  bookLabel: string;
  emptyTitle: string;
  emptyText: string;
  productsHref: string;
  exploreLabel: string;
};

export default function CategoryExperienceCollection({
  eyebrow,
  title,
  items,
  fromPriceLabel,
  viewLabel,
  bookLabel,
  emptyTitle,
  emptyText,
  productsHref,
  exploreLabel,
}: CategoryExperienceCollectionProps) {
  if (items.length === 0) {
    return (
      <section className="category-page-section px-6 pb-24 pt-12 sm:px-10 md:pt-16 lg:px-16 lg:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-theater text-2xl font-semibold text-[#1a1a1a]">
            {emptyTitle}
          </p>
          <p className="mt-4 text-lg text-[#1a1a1a]/65">{emptyText}</p>
          <Link
            href={productsHref}
            className="mt-8 inline-flex rounded-full border border-[#1a1a1a]/20 bg-white px-8 py-3 text-sm font-medium text-[#1a1a1a] transition-colors duration-500 hover:bg-[#1a1a1a] hover:text-white"
          >
            {exploreLabel}
          </Link>
        </div>
      </section>
    );
  }

  const featured = items[0];
  const medium = items.slice(1, 3);
  const compact = items.slice(3);

  return (
    <section
      className="category-page-section px-6 pb-24 pt-12 sm:px-10 md:pb-32 md:pt-16 lg:px-16 lg:pb-40 lg:pt-20"
      aria-labelledby="category-collection-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-14 lg:mb-16"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#1a1a1a]/45">
            {eyebrow}
          </p>
          <h2
            id="category-collection-heading"
            className="mt-4 font-theater text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#1a1a1a]"
          >
            {title}
          </h2>
        </motion.header>

        <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
          <div className="mx-auto w-full lg:max-w-[70%]">
            <CategoryExperienceCard
              item={featured}
              size="featured"
              fromPriceLabel={fromPriceLabel}
              viewLabel={viewLabel}
              bookLabel={bookLabel}
              index={0}
            />
          </div>

          {medium.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
              {medium.map((item, i) => (
                <CategoryExperienceCard
                  key={item.id}
                  item={item}
                  size="medium"
                  fromPriceLabel={fromPriceLabel}
                  viewLabel={viewLabel}
                  bookLabel={bookLabel}
                  index={i + 1}
                />
              ))}
            </div>
          ) : null}

          {compact.length > 0 ? (
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              {compact.map((item, i) => (
                <CategoryExperienceCard
                  key={item.id}
                  item={item}
                  size="compact"
                  fromPriceLabel={fromPriceLabel}
                  viewLabel={viewLabel}
                  bookLabel={bookLabel}
                  index={i + 3}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
