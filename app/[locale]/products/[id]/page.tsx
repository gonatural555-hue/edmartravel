import Link from "next/link";
import { getProducts, getProductById } from "@/lib/products";
import { getProductImages } from "@/lib/product-images";
import { getProductVariants } from "@/lib/product-variants";
import type { Product } from "@/lib/products";
import { getMessages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";
import { locales, type Locale } from "@/lib/i18n/config";
import { buildMetadata, formatTemplate } from "@/lib/seo";
import ProductReviews from "@/components/ProductReviews";
import { REVIEWS_SEED, getReviewsByProductSlug } from "@/lib/reviews-data";
import { SITE_CONFIG } from "@/lib/config";
import {
  getExperienceRichContent,
} from "@/lib/experience-content";
import ExperiencePageClient from "@/components/experience/ExperiencePageClient";
import RelatedExperiences from "@/components/experience/RelatedExperiences";

type Props = {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
};

export async function generateStaticParams() {
  const products = getProducts();
  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      id: product.id,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: `Edmar Travel — ${SITE_CONFIG.name}`,
    };
  }

  const messages = await getMessages(locale);
  const seo = messages.seo?.product;
  const localized = product.translations?.[locale];
  const localizedTitle = localized?.title || product.title;
  const title =
    localized?.seo?.title ||
    formatTemplate(seo?.titleTemplate || `{title} | ${SITE_CONFIG.name}`, {
      title: localizedTitle,
    });
  const description =
    localized?.seo?.description ||
    formatTemplate(
      seo?.descriptionTemplate ||
        "Experiencia {title} en Mendoza con Edmar Travel.",
      { title: localizedTitle }
    );
  const ogTitle = localized?.seo?.ogTitle || title;
  const ogDescription = localized?.seo?.ogDescription || description;
  const productImages = await getProductImages(product.id);
  const ogImage =
    productImages.featured?.[0] ||
    productImages.gallery?.[0] ||
    "/assets/images/blog/blog-hero.webp";
  const pathByLocale = locales.reduce(
    (acc, localeKey) => ({
      ...acc,
      [localeKey]: `/${localeKey}/products/${product.id}`,
    }),
    {} as Record<Locale, string>
  );

  return {
    ...buildMetadata({
      locale,
      title,
      description,
      pathByLocale,
      ogImage,
      ogTitle,
      ogDescription,
      ogType: "website",
    }),
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params;
  const product = getProductById(id);

  if (!product) {
    const messages = await getMessages(locale);
    const t = createTranslator(messages);
    return (
      <main className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-2xl font-semibold text-text-primary">
          {t("experiencePage.notFound")}
        </h1>
        <Link
          href={`/${locale}/products`}
          className="mt-6 inline-block text-accent-gold hover:underline"
        >
          {t("experiencePage.breadcrumbExperiences")}
        </Link>
      </main>
    );
  }

  const localized = product.translations?.[locale];
  const localizedProduct: Product = {
    ...product,
    title: localized?.title ?? product.title,
    description: localized?.description ?? product.description,
    shortDescription: localized?.shortDescription ?? product.shortDescription,
    longDescription: localized?.longDescription ?? product.longDescription,
    features: localized?.features ?? product.features,
  };

  const messages = await getMessages(locale);
  const t = createTranslator(messages);
  const productImages = await getProductImages(product.id);
  const variantsFromJson = await getProductVariants(product.id);
  const productVariants =
    variantsFromJson ||
    (product.variants
      ? {
          variants: Array.isArray(product.variants)
            ? product.variants
            : [product.variants],
          variantMatrix: undefined,
        }
      : null);
  const productSlug = product.slug ?? product.id;
  const reviews = getReviewsByProductSlug(productSlug);
  const reviewsAverage =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  const reviewsSchema =
    reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: localizedProduct.title,
          image: productImages.featured || product.images[0] || "",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewsAverage.toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
            },
            author: {
              "@type": "Person",
              name: review.author,
            },
            datePublished: review.date,
            reviewBody: review.comment,
            name: review.title,
          })),
        }
      : null;

  const seoH1 = localizedProduct.title;

  const relatedProducts = getProducts()
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const rich = getExperienceRichContent(product.id, locale);
  const whatsappHref =
    SITE_CONFIG.contact.whatsappPhone.length > 0
      ? `https://wa.me/${SITE_CONFIG.contact.whatsappPhone}`
      : undefined;

  const experienceLabels = {
    breadcrumbHome: t("experiencePage.breadcrumbHome"),
    breadcrumbExperiences: t("experiencePage.breadcrumbExperiences"),
    fromPrice: t("experiencePage.fromPrice"),
    perPerson: t("experiencePage.perPerson"),
    ctaReserve: t("experiencePage.ctaReserve"),
    ctaWhatsApp: t("experiencePage.ctaWhatsApp"),
    ctaWhatsAppShort: t("experiencePage.ctaWhatsAppShort"),
    quickFactsTitle: t("experiencePage.quickFactsTitle"),
    labelDuration: t("experiencePage.labelDuration"),
    labelLocation: t("experiencePage.labelLocation"),
    labelLanguage: t("experiencePage.labelLanguage"),
    labelDifficulty: t("experiencePage.labelDifficulty"),
    labelGroup: t("experiencePage.labelGroup"),
    labelSeason: t("experiencePage.labelSeason"),
    labelPickup: t("experiencePage.labelPickup"),
    labelCancellation: t("experiencePage.labelCancellation"),
    whyLoveTitle: t("experiencePage.whyLoveTitle"),
    editorialTitle: t("experiencePage.editorialTitle"),
    itineraryTitle: t("experiencePage.itineraryTitle"),
    placesTitle: t("experiencePage.placesTitle"),
    includedTitle: t("experiencePage.includedTitle"),
    excludedTitle: t("experiencePage.excludedTitle"),
    practicalTitle: t("experiencePage.practicalTitle"),
    whatToBring: t("experiencePage.whatToBring"),
    restrictions: t("experiencePage.restrictions"),
    weather: t("experiencePage.weather"),
    pickupDetails: t("experiencePage.pickupDetails"),
    faqTitle: t("experiencePage.faqTitle"),
    socialTitle: t("experiencePage.socialTitle"),
    finalCtaTitle: t("experiencePage.finalCtaTitle"),
    finalCtaSubtitle: t("experiencePage.finalCtaSubtitle"),
    finalCtaPrimary: t("experiencePage.finalCtaPrimary"),
    finalCtaSecondary: t("experiencePage.finalCtaSecondary"),
    relatedTitle: t("experiencePage.relatedTitle"),
    stickyTrust: t("experiencePage.stickyTrust"),
    difficultyEasy: t("experiencePage.difficultyEasy"),
    difficultyMedium: t("experiencePage.difficultyMedium"),
    difficultyHard: t("experiencePage.difficultyHard"),
    variantTitle: t("experiencePage.variantTitle"),
    galleryTitle: t("experiencePage.galleryTitle"),
    comingSoonBanner: t("experiencePage.comingSoonBanner"),
    comingSoonHint: t("experiencePage.comingSoonHint"),
    ctaAvailableSoon: t("experiencePage.ctaAvailableSoon"),
    finalCtaSubtitleComingSoon: t("experiencePage.finalCtaSubtitleComingSoon"),
  };

  return (
    <>
      <main className="overflow-x-hidden bg-transparent">
        <ExperiencePageClient
          locale={locale}
          product={localizedProduct}
          seoH1={seoH1}
          productImages={productImages}
          productVariants={productVariants}
          rich={rich}
          labels={experienceLabels}
          whatsappHref={whatsappHref}
          noImageLabel={t("common.noImage")}
        />

        <ProductReviews productSlug={productSlug} reviews={REVIEWS_SEED} />
        {reviewsSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
          />
        )}

        <RelatedExperiences
          title={t("experiencePage.relatedTitle")}
          items={relatedProducts}
          locale={locale}
          viewLabel={t("common.viewExperience")}
          bookLabel={t("common.bookExperience")}
          noImageLabel={t("common.noImage")}
        />
      </main>
    </>
  );
}
