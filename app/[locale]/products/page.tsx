import ProductGridSimple from "@/components/ProductGridSimple";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { getProducts } from "@/lib/products";
import { EXPERIENCE_CATEGORY_ORDER } from "@/lib/experience-categories";
import { PRODUCTS_LISTING_NOISE_BG } from "@/lib/constants/products-listing-surface";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const seo = messages.seo?.products;

  return buildMetadata({
    locale,
    title: seo?.title,
    description: seo?.description,
    pathByLocale: {
      en: "/en/products",
      es: "/es/products",
      fr: "/fr/products",
      it: "/it/products",
    },
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = createTranslator(messages);
  const products = getProducts();

  return (
    <main className="relative isolate min-h-[60vh] overflow-hidden bg-wine-burgundy">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-24 sm:px-10 md:pb-16 md:pt-28 lg:px-16 lg:pt-32">
        <div aria-labelledby="products-page-heading" className="text-center">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 md:mb-7 md:text-xs">
            {t("productsPage.eyebrow")}
          </p>
          <div
            className="mx-auto mb-9 h-px max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent md:mb-11"
            aria-hidden
          />

          <header className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-black/15 px-6 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:px-10 md:py-11">
            <h1
              id="products-page-heading"
              className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]"
            >
              {t("productsPage.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/88 md:mt-6 md:text-lg">
              {t("productsPage.subtitle")}
            </p>
          </header>
        </div>

        <div className="mt-10 space-y-14 md:mt-12 md:space-y-16">
          {EXPERIENCE_CATEGORY_ORDER.map((catSlug) => {
            const inCategory = products.filter((p) => p.category === catSlug);
            if (inCategory.length === 0) return null;
            return (
              <section
                key={catSlug}
                aria-labelledby={`products-cat-${catSlug}`}
              >
                <h2
                  id={`products-cat-${catSlug}`}
                  className="mb-8 text-2xl font-semibold tracking-tight text-white md:mb-10 md:text-3xl"
                >
                  {t(`categories.names.${catSlug}`)}
                </h2>
                <ProductGridSimple
                  products={inCategory}
                  locale={locale}
                  elevatedCards
                  twoColumnLayout
                  listingLayout
                  labels={{
                    viewProduct: t("common.viewProduct"),
                    addToCart: t("common.addToCart"),
                    noImage: t("common.noImage"),
                  }}
                />
              </section>
            );
          })}

          {products.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-dark-surface/40 px-6 py-12 text-center md:py-16">
              <p className="text-lg font-medium text-text-primary">
                {t("categoriesPage.emptyTitle")}
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-text-muted">
                {t("categoriesPage.emptyText")}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
