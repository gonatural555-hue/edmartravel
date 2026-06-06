"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPostSummary } from "@/lib/blog-utils";

const IMAGE_SHADOW =
  "shadow-[0_16px_48px_rgba(26,26,26,0.06)] transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_24px_64px_rgba(26,26,26,0.1)]";

type BlogEditorialArticleCardProps = {
  post: BlogPostSummary;
  readingTimeLabel: string;
  ctaLabel: string;
  variant?: "secondary" | "grid";
  priority?: boolean;
};

export default function BlogEditorialArticleCard({
  post,
  readingTimeLabel,
  ctaLabel,
  variant = "grid",
  priority = false,
}: BlogEditorialArticleCardProps) {
  const titleClass =
    variant === "secondary"
      ? "font-theater text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1a1a1a]"
      : "font-theater text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#1a1a1a]";

  return (
    <Link href={post.href} className="group block">
      <article>
        <div
          className={`relative aspect-video overflow-hidden ${
            variant === "secondary" ? "rounded-[28px]" : "rounded-[32px]"
          } ${IMAGE_SHADOW}`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={
              variant === "secondary"
                ? "(max-width: 1024px) 100vw, 33vw"
                : "(max-width: 1024px) 100vw, 50vw"
            }
            priority={priority}
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-6 md:mt-8">
          <h2
            className={`${titleClass} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1`}
          >
            {post.title}
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[#1a1a1a]/45">
            {readingTimeLabel}
          </p>
          <span className="mt-5 inline-flex text-sm font-medium tracking-[0.02em] text-[#1a1a1a]/70 transition-colors duration-500 group-hover:text-[#1a1a1a]">
            {ctaLabel}
          </span>
        </div>
      </article>
    </Link>
  );
}
