import BlogPageView from "@/components/blog/BlogPageView";
import {
  BLOG_DEFAULT_HERO_IMAGE,
  BLOG_SECONDARY_SLUGS,
} from "@/lib/blog-page-config";
import { buildBlogPostSummaries } from "@/lib/blog-utils";
import { getMessages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const seo = messages.seo?.blog;

  return buildMetadata({
    locale,
    title: seo?.title,
    description: seo?.description,
    pathByLocale: {
      en: "/en/blog",
      es: "/es/blog",
      fr: "/fr/blog",
      it: "/it/blog",
    },
    ogImage: BLOG_DEFAULT_HERO_IMAGE,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const allPosts = buildBlogPostSummaries(
    messages.blog.posts,
    locale,
    BLOG_DEFAULT_HERO_IMAGE
  );

  const secondary = BLOG_SECONDARY_SLUGS.map((slug) =>
    allPosts.find((post) => post.slug === slug)
  ).filter((post): post is NonNullable<typeof post> => Boolean(post));

  const usedSlugs = new Set(secondary.map((post) => post.slug));
  const grid = allPosts.filter((post) => !usedSlugs.has(post.slug));

  const readingTimeTemplate =
    messages.blog.readingTime ?? "{minutes} min read";
  const ctaLabel = messages.blog.readCta ?? messages.common.readArticle;

  return (
    <main className="category-page relative min-h-screen">
      <BlogPageView
        secondary={secondary}
        grid={grid}
        readingTimeTemplate={readingTimeTemplate}
        ctaLabel={ctaLabel}
      />
    </main>
  );
}
