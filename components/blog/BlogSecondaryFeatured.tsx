"use client";

import type { BlogPostSummary } from "@/lib/blog-utils";
import BlogEditorialArticleCard from "./BlogEditorialArticleCard";
import BlogScrollReveal from "./BlogScrollReveal";

type BlogSecondaryFeaturedProps = {
  posts: BlogPostSummary[];
  ctaLabel: string;
  formatReadingTime: (minutes: number) => string;
};

export default function BlogSecondaryFeatured({
  posts,
  ctaLabel,
  formatReadingTime,
}: BlogSecondaryFeaturedProps) {
  if (posts.length === 0) return null;

  return (
    <section className="category-page-section py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-14 md:gap-16 lg:grid-cols-3 lg:gap-12 xl:gap-16">
          {posts.map((post, index) => (
            <BlogScrollReveal key={post.slug} delay={index * 0.08}>
              <BlogEditorialArticleCard
                post={post}
                variant="secondary"
                readingTimeLabel={formatReadingTime(post.readingMinutes)}
                ctaLabel={ctaLabel}
              />
            </BlogScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
