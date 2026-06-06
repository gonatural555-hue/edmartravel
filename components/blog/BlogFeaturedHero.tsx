"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryEditorialButton from "@/components/category/CategoryEditorialButton";
import type { BlogPostSummary } from "@/lib/blog-utils";
import BlogScrollReveal from "./BlogScrollReveal";

type BlogFeaturedHeroProps = {
  post: BlogPostSummary;
  readingTimeLabel: string;
  ctaLabel: string;
};

export default function BlogFeaturedHero({
  post,
  readingTimeLabel,
  ctaLabel,
}: BlogFeaturedHeroProps) {
  return (
    <section className="category-page-section pt-[var(--experience-header-height,5.5rem)]">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <BlogScrollReveal>
          <Link href={post.href} className="group block">
            <div className="relative min-h-[58vh] overflow-hidden rounded-[32px] sm:min-h-[68vh] lg:min-h-[80vh] lg:max-h-[90vh] lg:rounded-[36px]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        </BlogScrollReveal>

        <BlogScrollReveal delay={0.08} className="mx-auto max-w-4xl pt-10 md:pt-14 lg:pt-16">
          <Link href={post.href} className="group block">
            <h1 className="font-theater text-[clamp(2.75rem,7.5vw,8.75rem)] font-semibold uppercase leading-[0.92] tracking-[-0.03em] text-[#1a1a1a] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
              {post.title}
            </h1>
          </Link>

          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[#1a1a1a]/45 md:mt-6">
            {readingTimeLabel}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-[#1a1a1a]/72 md:mt-8 md:text-[1.3125rem] md:leading-[1.8]">
            {post.excerpt}
          </p>

          <div className="mt-8 md:mt-10">
            <CategoryEditorialButton href={post.href}>
              {ctaLabel}
            </CategoryEditorialButton>
          </div>
        </BlogScrollReveal>
      </div>
    </section>
  );
}
