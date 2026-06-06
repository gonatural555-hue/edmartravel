export type BlogPostContent = {
  title: string;
  excerpt: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string;
  sections?: {
    heading?: string;
    paragraphs: string[];
    image?: string;
  }[];
  closing?: string;
};

export type BlogPostSummary = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  image: string;
  readingMinutes: number;
};

const DEFAULT_BLOG_IMAGE = "/assets/images/products/HighMountainTour/tour-alta-montaña.webp";

export function getPostHeroImage(
  post: BlogPostContent,
  fallback = DEFAULT_BLOG_IMAGE
): string {
  return post.heroImage || post.sections?.[0]?.image || fallback;
}

export function estimateReadingMinutes(post: BlogPostContent): number {
  const chunks: string[] = [];
  if (post.intro) chunks.push(post.intro);
  if (post.subtitle) chunks.push(post.subtitle);
  if (post.excerpt) chunks.push(post.excerpt);
  if (post.closing) chunks.push(post.closing);
  for (const section of post.sections ?? []) {
    if (section.heading) chunks.push(section.heading);
    chunks.push(...section.paragraphs);
  }
  const words = chunks.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function buildBlogPostSummaries(
  posts: Record<string, BlogPostContent>,
  locale: string,
  fallbackImage = DEFAULT_BLOG_IMAGE
): BlogPostSummary[] {
  return Object.entries(posts).map(([slug, post]) => ({
    slug,
    href: `/${locale}/blog/${slug}`,
    title: post.title,
    excerpt: post.excerpt,
    image: getPostHeroImage(post, fallbackImage),
    readingMinutes: estimateReadingMinutes(post),
  }));
}

export function formatReadingTime(template: string, minutes: number): string {
  return template.replace("{minutes}", String(minutes));
}
