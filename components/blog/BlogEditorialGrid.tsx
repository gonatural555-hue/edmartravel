"use client";

import type { BlogPostSummary } from "@/lib/blog-utils";
import BlogEditorialArticleCard from "./BlogEditorialArticleCard";
import BlogScrollReveal from "./BlogScrollReveal";

type BlogEditorialGridProps = {
  posts: BlogPostSummary[];
  ctaLabel: string;
  formatReadingTime: (minutes: number) => string;
};

export default function BlogEditorialGrid({
  posts,
  ctaLabel,
  formatReadingTime,
}: BlogEditorialGridProps) {
  if (posts.length === 0) return null;

  return (
    <section className="category-page-section border-t border-[#1a1a1a]/8 pb-24 md:pb-32 lg:pb-40">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-16 md:gap-20 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-24 xl:gap-x-20">
          {posts.map((post, index) => (
            <BlogScrollReveal key={post.slug} delay={(index % 2) * 0.06}>
              <BlogEditorialArticleCard
                post={post}
                variant="grid"
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
