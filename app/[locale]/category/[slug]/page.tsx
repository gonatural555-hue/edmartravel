import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategorySlug,
} from "@/lib/categories";
import ProductGridSimple from "@/components/ProductGridSimple";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import { locales, type Locale } from "@/lib/i18n/config";
import { buildMetadata, formatTemplate } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/config";
import { PRODUCTS_LISTING_NOISE_BG } from "@/lib/constants/products-listing-surface";
import type { ExperienceCategory } from "@/lib/product-types";

type Props = {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
};

const CATEGORY_HERO_IMAGES: Record<ExperienceCategory, string> = {
  wine: "/assets/images/products/HalfDayWine/tour-bodega-medio-dia-1.webp",
  adventure:
    "/assets/images/products/HighMountainTour/tour-alta-montaña.webp",
  city: "/assets/images/products/CityTour/city-tour-1.webp",
};

/** Anillo adventure → wine → city (en wine: izq. adventure, der. city) */
const CATEGORY_RING: ExperienceCategory[] = ["adventure", "wine", "city"];

function categoryNeighbors(slug: string): {
  prev: ExperienceCategory;
  next: ExperienceCategory;
} {
  const idx = CATEGORY_RING.indexOf(slug as ExperienceCategory);
  const i = idx >= 0 ? idx : 0;
  const len = CATEGORY_RING.length;
  return {
    prev: CATEGORY_RING[(i - 1 + len) % len],
    next: CATEGORY_RING[(i + 1) % len],
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
    CATEGORY_HERO_IMAGES[slug as ExperienceCategory] ||
    CATEGORY_HERO_IMAGES.wine;
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

function CategoryProductListing({
  slug,
  products,
  locale,
  t,
}: {
  slug: string;
  products: ReturnType<typeof getProductsByCategorySlug>;
  locale: Locale;
  t: (key: string, fallback?: string) => string;
}) {
  const labels = {
    viewProduct: t("common.viewProduct"),
    addToCart: t("common.addToCart"),
    noImage: t("common.noImage"),
  };

  if (slug === "wine") {
    return (
      <section
        className="relative isolate overflow-hidden bg-wine-burgundy py-12 md:py-16 lg:py-20"
        aria-labelledby="category-listing-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_58%_at_50%_-8%,rgba(255,255,255,0.09),transparent_58%)]" />
          <div className="absolute -left-[18%] top-[10%] h-[min(44vw,24rem)] w-[min(44vw,24rem)] rounded-full bg-[#6D3A3A]/35 blur-3xl" />
          <div className="absolute -right-[14%] bottom-[-12%] h-[min(52vw,28rem)] w-[min(52vw,28rem)] rounded-full bg-[#452020]/50 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_48%,transparent_38%,rgba(0,0,0,0.22)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
            style={{ backgroundImage: PRODUCTS_LISTING_NOISE_BG }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <h2
            id="category-listing-heading"
            className="sr-only"
          >
            {t(`categories.names.${slug}`, slug)}
          </h2>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-dark-surface/40 px-6 py-12 text-center md:py-16">
              <p className="text-lg font-medium text-white">
                {t("categoriesPage.emptyTitle")}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/75">
                {t("categoriesPage.emptyText")}
              </p>
              <Link
                href={`/${locale}/products`}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-accent-gold px-6 py-3 text-sm font-medium text-dark-base"
              >
                {t("categoriesPage.ctaButton")}
              </Link>
            </div>
          ) : (
            <ProductGridSimple
              products={products}
              locale={locale}
              elevatedCards
              twoColumnLayout
              listingLayout
              labels={labels}
            />
          )}
        </div>
      </section>
    );
  }

  if (slug === "adventure") {
    return (
      <section
        className="relative isolate overflow-hidden bg-[#fcd992] py-12 md:py-16 lg:py-20"
        aria-labelledby="category-listing-heading"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,255,255,0.85),transparent_55%)]" />
          <div className="absolute -left-[16%] top-[12%] h-[min(42vw,22rem)] w-[min(42vw,22rem)] rounded-full bg-[#fff8e8]/90 blur-3xl" />
          <div className="absolute -right-[12%] bottom-[-10%] h-[min(48vw,26rem)] w-[min(48vw,26rem)] rounded-full bg-[#ffe4b5]/70 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(120,90,40,0.08)_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.09] mix-blend-multiply"
            style={{ backgroundImage: PRODUCTS_LISTING_NOISE_BG }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <h2 id="category-listing-heading" className="sr-only">
            {t(`categories.names.${slug}`, slug)}
          </h2>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-stone-800/15 bg-white/55 px-6 py-12 text-center shadow-sm backdrop-blur-sm md:py-16">
              <p className="text-lg font-medium text-stone-900">
                {t("categoriesPage.emptyTitle")}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-stone-700">
                {t("categoriesPage.emptyText")}
              </p>
              <Link
                href={`/${locale}/products`}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-emerald-800 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-900"
              >
                {t("categoriesPage.ctaButton")}
              </Link>
            </div>
          ) : (
            <ProductGridSimple
              products={products}
              locale={locale}
              elevatedCards
              twoColumnLayout
              listingLayout
              labels={labels}
            />
          )}
        </div>
      </section>
    );
  }

  /* city */
  return (
    <section
      className="relative isolate overflow-hidden bg-[#0a1512] py-12 md:py-16 lg:py-20"
      aria-labelledby="category-listing-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_56%_at_50%_-12%,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute -left-[18%] top-[10%] h-[min(44vw,24rem)] w-[min(44vw,24rem)] rounded-full bg-[#1a332d]/45 blur-3xl" />
        <div className="absolute -right-[14%] bottom-[-12%] h-[min(52vw,28rem)] w-[min(52vw,28rem)] rounded-full bg-[#020807]/55 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_48%,transparent_36%,rgba(0,0,0,0.35)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{ backgroundImage: PRODUCTS_LISTING_NOISE_BG }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <h2 id="category-listing-heading" className="sr-only">
          {t(`categories.names.${slug}`, slug)}
        </h2>
        {products.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-dark-surface/40 px-6 py-12 text-center md:py-16">
            <p className="text-lg font-medium text-text-primary">
              {t("categoriesPage.emptyTitle")}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
              {t("categoriesPage.emptyText")}
            </p>
            <Link
              href={`/${locale}/products`}
              className="mt-8 inline-flex items-center justify-center rounded-md bg-accent-gold px-6 py-3 text-sm font-medium text-dark-base"
            >
              {t("categoriesPage.ctaButton")}
            </Link>
          </div>
        ) : (
          <ProductGridSimple
            products={products}
            locale={locale}
            elevatedCards
            twoColumnLayout
            listingLayout
            labels={labels}
          />
        )}
      </div>
    </section>
  );
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategorySlug(slug);
  const messages = await getMessages(locale);
  const t = createTranslator(messages);
  const heroImage =
    CATEGORY_HERO_IMAGES[slug as ExperienceCategory] ||
    CATEGORY_HERO_IMAGES.wine;
  const editorialIntro = category.description;

  const categoryLabel = t(`categories.names.${category.slug}`, category.name);
  const seoH1 = categoryLabel;

  const introIsLight = slug === "adventure";
  const { prev: prevSlug, next: nextSlug } = categoryNeighbors(slug);
  const prevCat = getCategoryBySlug(prevSlug);
  const nextCat = getCategoryBySlug(nextSlug);
  const prevLabel = t(
    `categories.names.${prevSlug}`,
    prevCat?.name ?? prevSlug
  );
  const nextLabel = t(
    `categories.names.${nextSlug}`,
    nextCat?.name ?? nextSlug
  );

  const neighborLinkClass = introIsLight
    ? "text-sm font-medium text-stone-800/90 underline-offset-4 transition-colors hover:text-emerald-900 hover:underline"
    : "text-sm font-medium text-text-muted underline-offset-4 transition-colors hover:text-accent-gold hover:underline";

  return (
    <main className="relative isolate bg-transparent">
      <section className="relative flex min-h-[50vh] items-end md:min-h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={`${categoryLabel} — hero`}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/60 via-dark-base/40 to-dark-base/90" />
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 pb-16 text-center sm:px-10 md:pb-20 lg:px-16">
            <h1 className="text-balance text-4xl font-semibold text-text-primary md:text-5xl">
              {seoH1}
            </h1>
          </div>
        </div>
      </section>

      <section
        className={
          introIsLight
            ? "border-t border-stone-800/10 bg-[#fcd992]/85 py-12 md:py-16"
            : "border-t border-white/5 py-12 md:py-16"
        }
      >
        <div className="mx-auto max-w-6xl px-6 text-center sm:px-10 lg:px-16">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-6 lg:gap-10">
            <div className="flex w-full justify-center md:w-[min(26%,11rem)] md:shrink-0 md:justify-start">
              <Link
                href={`/${locale}/category/${prevSlug}`}
                className={neighborLinkClass}
              >
                {prevLabel}
              </Link>
            </div>
            <p
              className={
                introIsLight
                  ? "mx-auto max-w-3xl flex-1 text-balance text-lg leading-relaxed text-stone-900 md:text-xl"
                  : "mx-auto max-w-3xl flex-1 text-balance text-lg leading-relaxed text-text-muted md:text-xl"
              }
            >
              {editorialIntro}
            </p>
            <div className="flex w-full justify-center md:w-[min(26%,11rem)] md:shrink-0 md:justify-end">
              <Link
                href={`/${locale}/category/${nextSlug}`}
                className={neighborLinkClass}
              >
                {nextLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CategoryProductListing
        slug={slug}
        products={products}
        locale={locale}
        t={t}
      />

      <section className="border-t border-white/10 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-10 lg:px-16">
          <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
            {t("categoriesPage.ctaTitle")}
          </h2>
          <div className="mt-6">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center rounded-md bg-accent-gold px-6 py-3 text-sm font-medium text-dark-base"
            >
              {t("categoriesPage.ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
