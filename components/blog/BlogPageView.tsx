"use client";

import type { BlogPostSummary } from "@/lib/blog-utils";
import BlogFeaturedHero from "./BlogFeaturedHero";
import BlogSecondaryFeatured from "./BlogSecondaryFeatured";
import BlogEditorialGrid from "./BlogEditorialGrid";

type BlogPageViewProps = {
  featured: BlogPostSummary;
  secondary: BlogPostSummary[];
  grid: BlogPostSummary[];
  readingTimeTemplate: string;
  ctaLabel: string;
};

export default function BlogPageView({
  featured,
  secondary,
  grid,
  readingTimeTemplate,
  ctaLabel,
}: BlogPageViewProps) {
  const formatReadingTime = (minutes: number) =>
    readingTimeTemplate.replace("{minutes}", String(minutes));

  return (
    <>
      <BlogFeaturedHero
        post={featured}
        readingTimeLabel={formatReadingTime(featured.readingMinutes)}
        ctaLabel={ctaLabel}
      />
      <BlogSecondaryFeatured
        posts={secondary}
        ctaLabel={ctaLabel}
        formatReadingTime={formatReadingTime}
      />
      <BlogEditorialGrid
        posts={grid}
        ctaLabel={ctaLabel}
        formatReadingTime={formatReadingTime}
      />
    </>
  );
}
