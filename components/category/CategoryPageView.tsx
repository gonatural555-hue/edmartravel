"use client";

import CategoryHero from "./CategoryHero";
import CategoryExperienceCollection from "./CategoryExperienceCollection";
import CategoryTestimonialsSection, {
  type CategoryTestimonial,
} from "./CategoryTestimonialsSection";
import CategoryFinalCtaSection from "./CategoryFinalCtaSection";
import type { CategoryExperienceItem } from "./CategoryExperienceCard";

export type CategoryPageCopy = {
  heroTitle: string;
  heroSubtitle: string;
  collectionTitle: string;
  finalCtaTitle: string;
  testimonials: CategoryTestimonial[];
};

export type CategoryPageLabels = {
  scrollLabel: string;
  collectionEyebrow: string;
  fromPrice: string;
  viewExperience: string;
  bookExperience: string;
  emptyTitle: string;
  emptyText: string;
  finalCtaPrimary: string;
  finalCtaSecondary: string;
  exploreAll: string;
};

type CategoryPageViewProps = {
  copy: CategoryPageCopy;
  labels: CategoryPageLabels;
  heroImage: string;
  finalCtaImage: string;
  categoryLabel: string;
  experiences: CategoryExperienceItem[];
  productsHref: string;
  bookFallbackHref: string;
};

export default function CategoryPageView({
  copy,
  labels,
  heroImage,
  finalCtaImage,
  categoryLabel,
  experiences,
  productsHref,
  bookFallbackHref,
}: CategoryPageViewProps) {
  return (
    <main className="category-page relative isolate min-h-screen overflow-x-hidden">
      <CategoryHero
        title={copy.heroTitle}
        imageSrc={heroImage}
        imageAlt={categoryLabel}
        scrollLabel={labels.scrollLabel}
      />

      <CategoryExperienceCollection
        eyebrow={labels.collectionEyebrow}
        title={copy.collectionTitle}
        items={experiences}
        fromPriceLabel={labels.fromPrice}
        viewLabel={labels.viewExperience}
        bookLabel={labels.bookExperience}
        emptyTitle={labels.emptyTitle}
        emptyText={labels.emptyText}
        productsHref={productsHref}
        exploreLabel={labels.exploreAll}
      />

      <CategoryTestimonialsSection items={copy.testimonials} />

      <CategoryFinalCtaSection
        title={copy.finalCtaTitle}
        imageSrc={finalCtaImage}
        imageAlt={copy.finalCtaTitle}
        primaryHref={productsHref}
        secondaryHref={bookFallbackHref}
        primaryLabel={labels.finalCtaPrimary}
        secondaryLabel={labels.finalCtaSecondary}
      />
    </main>
  );
}
