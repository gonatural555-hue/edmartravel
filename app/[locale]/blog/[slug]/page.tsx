import { notFound } from "next/navigation";
import BlogPostHero from "@/components/blog/BlogPostHero";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostFooter from "@/components/blog/BlogPostFooter";
import RelatedExperiencesSection from "@/components/blog/RelatedExperiencesSection";
import { BLOG_DEFAULT_HERO_IMAGE } from "@/lib/blog-page-config";
import {
  estimateReadingMinutes,
  formatReadingTime,
  getPostHeroImage,
} from "@/lib/blog-utils";
import { getMessages } from "@/lib/i18n/messages";
import { locales, type Locale } from "@/lib/i18n/config";
import { buildMetadata, formatTemplate } from "@/lib/seo";
import { getProducts } from "@/lib/products";
import { getProductImages } from "@/lib/product-images";
import { pickProductsForPost } from "@/lib/internal-links";
import { SITE_CONFIG } from "@/lib/config";

export async function generateStaticParams() {
  const messages = await getMessages("en");
  const slugs = Object.keys(messages.blog.posts);
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const messages = await getMessages(locale);
  const post = messages.blog.posts[slug];

  if (!post) {
    return {
      title: `Post no encontrado | ${SITE_CONFIG.name}`,
    };
  }

  const seo = messages.seo?.blogPost;
  const title = formatTemplate(seo?.titleTemplate || "{title} | Journal", {
    title: post.title,
  });
  const description = formatTemplate(seo?.descriptionTemplate || "{excerpt}", {
    excerpt: post.excerpt || post.subtitle || post.title,
  });
  const heroImage = getPostHeroImage(post, BLOG_DEFAULT_HERO_IMAGE);
  const pathByLocale = locales.reduce(
    (acc, localeKey) => ({
      ...acc,
      [localeKey]: `/${localeKey}/blog/${slug}`,
    }),
    {} as Record<Locale, string>
  );

  return buildMetadata({
    locale,
    title,
    description,
    pathByLocale,
    ogImage: heroImage,
    ogType: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const messages = await getMessages(locale);
  const post = messages.blog.posts[slug];
  const products = getProducts();

  if (!post) {
    notFound();
  }

  const heroImage = getPostHeroImage(post, BLOG_DEFAULT_HERO_IMAGE);
  const readingMinutes = estimateReadingMinutes(post);
  const readingTimeTemplate =
    messages.blog.readingTime ?? "{minutes} min read";
  const readingTimeLabel = formatReadingTime(
    readingTimeTemplate,
    readingMinutes
  );

  const intro = typeof post.intro === "string" ? post.intro : "";
  const sections = Array.isArray(post.sections) ? post.sections : [];
  const closing = typeof post.closing === "string" ? post.closing : "";

  const relatedProducts = pickProductsForPost(slug, post, products);
  const experienceCards = await Promise.all(
    relatedProducts.map(async (product) => {
      const images = await getProductImages(product.id);
      const image =
        images.featured?.[0] || images.gallery?.[0] || product.images?.[0] || "";
      return {
        id: product.id,
        title: product.title,
        image,
      };
    })
  );

  const relatedTitle =
    messages.blog.relatedExperiences?.title ??
    messages.blog.fieldGear?.title ??
    "Related Experiences";
  const exploreCta =
    messages.blog.relatedExperiences?.exploreCta ??
    messages.common.viewExperience ??
    "Explore experience →";

  return (
    <main className="category-page relative min-h-screen">
      <BlogPostHero
        title={post.title}
        subtitle={post.subtitle}
        image={heroImage}
        readingTimeLabel={readingTimeLabel}
      />
      <BlogPostContent
        intro={intro}
        sections={sections}
        closing={closing}
        locale={locale}
      />
      <RelatedExperiencesSection
        title={relatedTitle}
        exploreCta={exploreCta}
        locale={locale}
        experiences={experienceCards.filter((item) => item.image)}
      />
      <BlogPostFooter
        label={messages.common.backToJournal}
        href={`/${locale}/blog`}
      />
    </main>
  );
}
