"use client";

import type { BlogPostSummary } from "@/lib/blog-utils";
import BlogSecondaryFeatured from "./BlogSecondaryFeatured";
import BlogEditorialGrid from "./BlogEditorialGrid";

type BlogPageViewProps = {
  secondary: BlogPostSummary[];
  grid: BlogPostSummary[];
  readingTimeTemplate: string;
  ctaLabel: string;
};

export default function BlogPageView({
  secondary,
  grid,
  readingTimeTemplate,
  ctaLabel,
}: BlogPageViewProps) {
  const formatReadingTime = (minutes: number) =>
    readingTimeTemplate.replace("{minutes}", String(minutes));

  return (
    <>
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
