import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategorySlug,
} from "@/lib/categories";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import { locales, type Locale } from "@/lib/i18n/config";
import { buildMetadata, formatTemplate } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/config";
import { localizeProducts } from "@/lib/localize-product";
import type { ExperienceCategory } from "@/lib/product-types";
import {
  CATEGORY_FINAL_CTA_IMAGES,
  CATEGORY_HERO_IMAGES,
} from "@/lib/category-page-assets";
import CategoryPageView, {
  type CategoryPageCopy,
} from "@/components/category/CategoryPageView";
import type { CategoryExperienceItem } from "@/components/category/CategoryExperienceCard";
import type { CategoryTestimonial } from "@/components/category/CategoryTestimonialsSection";

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

type CategorySlug = ExperienceCategory;

function getCategoryCopy(
  messages: Record<string, unknown>,
  slug: CategorySlug
): CategoryPageCopy | null {
  const page = (messages.categoriesPage ?? {}) as Record<string, unknown>;
  const block = page[slug] as Record<string, unknown> | undefined;
  if (!block) return null;

  const testimonials = (block.testimonials as CategoryTestimonial[]) ?? [];

  return {
    heroTitle: String(block.heroTitle ?? ""),
    heroSubtitle: String(block.heroSubtitle ?? ""),
    collectionTitle: String(block.collectionTitle ?? ""),
    finalCtaTitle: String(block.finalCtaTitle ?? ""),
    testimonials,
  };
}

export async function generateStaticParams() {
  const slugs = getCategorySlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: `Categoría no encontrada | ${SITE_CONFIG.name}`,
    };
  }

  const messages = await getMessages(locale);
  const t = createTranslator(messages);
  const seo = messages.seo?.category;
  const categoryLabel = t(`categories.names.${category.slug}`, category.name);
  const title = formatTemplate(
    seo?.titleTemplate || `{category} | ${SITE_CONFIG.name}`,
    { category: categoryLabel }
  );
  const description = formatTemplate(
    seo?.descriptionTemplate ||
      "Experiencias de {category} en Mendoza con guías locales.",
    { category: categoryLabel }
  );
  const heroImage =
    CATEGORY_HERO_IMAGES[slug as CategorySlug] || CATEGORY_HERO_IMAGES.wine;
  const pathByLocale = locales.reduce(
    (acc, localeKey) => ({
      ...acc,
      [localeKey]: `/${localeKey}/category/${slug}`,
    }),
    {} as Record<Locale, string>
  );

  return buildMetadata({
    locale,
    title,
    description,
    pathByLocale,
    ogImage: heroImage,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category || !["wine", "adventure", "city"].includes(slug)) {
    notFound();
  }

  const categorySlug = slug as CategorySlug;
  const messages = await getMessages(locale);
  const t = createTranslator(messages);
  const copy =
    getCategoryCopy(messages, categorySlug) ??
    (locale !== "en"
      ? getCategoryCopy(await getMessages("en"), categorySlug)
      : null);

  if (!copy) {
    notFound();
  }

  const products = localizeProducts(
    getProductsByCategorySlug(slug),
    locale
  );

  const categoryLabel = t(`categories.names.${category.slug}`, category.name);
  const heroImage = CATEGORY_HERO_IMAGES[categorySlug];
  const finalCtaImage = CATEGORY_FINAL_CTA_IMAGES[categorySlug];

  const experiences: CategoryExperienceItem[] = products.map((product) => {
    const href = `/${locale}/products/${product.id}`;
    const cardVideo = product.media?.cardVideo;
    const fallbackImage =
      cardVideo?.poster ?? product.images[0] ?? heroImage;

    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: fallbackImage,
      href,
      bookHref: `${href}#experience-book`,
      cardVideo,
    };
  });

  const productsHref = `/${locale}/products`;
  const bookFallbackHref =
    experiences[0]?.bookHref ?? productsHref;

  const pageLabels = messages.categoriesPage as Record<string, string>;

  return (
    <CategoryPageView
      copy={copy}
      labels={{
        scrollLabel: pageLabels.scrollLabel ?? "Explore",
        collectionEyebrow: pageLabels.collectionEyebrow ?? "",
        fromPrice: pageLabels.fromPrice ?? t("experiencePage.fromPrice"),
        viewExperience: t("common.viewExperience"),
        bookExperience: t("common.bookExperience"),
        emptyTitle: pageLabels.emptyTitle ?? "",
        emptyText: pageLabels.emptyText ?? "",
        finalCtaPrimary: pageLabels.finalCtaPrimary ?? "",
        finalCtaSecondary: pageLabels.finalCtaSecondary ?? "",
        exploreAll: t("hero.ctaPrimary", "Ver experiencias"),
      }}
      heroImage={heroImage}
      finalCtaImage={finalCtaImage}
      categoryLabel={categoryLabel}
      experiences={experiences}
      productsHref={productsHref}
      bookFallbackHref={bookFallbackHref}
    />
  );
}
