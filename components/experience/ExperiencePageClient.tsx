"use client";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImageGallery from "@/components/ProductImageGallery";
import VariantSelector from "@/components/VariantSelector";
import type {
  ProductImages,
  VariantImagesMap,
  VariantImagesValueMap,
  VariantImageSet,
} from "@/lib/product-images";
import type { ProductVariants, VariantDefinition } from "@/lib/product-variants";
import type { ExperienceRichContent } from "@/lib/experience-model";
import { PRODUCT_BLUR_DATA_URL } from "@/lib/product-image-helper";
import { formatPriceARS } from "@/lib/format-price";
import {
  EditorialColumns,
  FaqAccordion,
  FinalCtaBand,
  IncludedExcluded,
  ItineraryTimeline,
  PlacesList,
  PracticalInfoBlock,
  QuickFactsGrid,
  SectionShell,
  TestimonialsMini,
  WhyLoveGrid,
} from "@/components/experience/ExperienceLayoutParts";
import { SITE_CONFIG } from "@/lib/config";

type ProductSummary = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  shortDescription?: string;
  images: string[];
  freeShipping?: boolean;
  location?: string;
  duration?: string;
  schedule?: string[];
  difficulty?: "easy" | "medium" | "hard";
  features?: string[];
  comingSoon?: boolean;
};

type Labels = Record<string, string>;

function BookingPanel({
  product,
  labels,
  productVariants,
  selections,
  setSelections,
  resolvedPrice,
  cartImage,
  variantSelections,
  whatsappLinkWithText,
  anchorId,
  className = "",
  comingSoon,
}: {
  product: ProductSummary;
  labels: Labels;
  productVariants: ProductVariants | null;
  selections: Record<string, string>;
  setSelections: Dispatch<SetStateAction<Record<string, string>>>;
  resolvedPrice: number;
  cartImage: string;
  variantSelections:
    | {
        type: string;
        typeLabel: string;
        value: string;
        label: string;
      }[]
    | undefined;
  whatsappLinkWithText: string | undefined;
  anchorId?: string;
  className?: string;
  comingSoon?: boolean;
}) {
  const isComingSoon = Boolean(comingSoon);
  return (
    <div id={anchorId} className={`scroll-mt-32 space-y-4 ${className}`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted/80">
          {labels.fromPrice}
        </p>
        <p className="mt-2 text-3xl font-bold tabular-nums text-accent-gold">
          {formatPriceARS(resolvedPrice)}
        </p>
        <p className="mt-1 text-xs text-text-muted">{labels.perPerson}</p>
      </div>
      {isComingSoon ? (
        <p className="text-xs leading-relaxed text-amber-200/90">
          {labels.comingSoonHint}
        </p>
      ) : (
        <p className="text-xs text-text-muted/90">{labels.stickyTrust}</p>
      )}
      {productVariants && !isComingSoon ? (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted/80">
            {labels.variantTitle}
          </p>
          <VariantSelector
            variants={productVariants}
            onChange={setSelections}
            value={selections}
          />
        </div>
      ) : null}
      <AddToCartButton
        id={product.id}
        title={product.title}
        price={product.price}
        image={cartImage}
        variantSelections={variantSelections}
        label={isComingSoon ? labels.ctaAvailableSoon : labels.ctaReserve}
        disabled={isComingSoon}
        className="w-full py-3.5 text-base font-semibold"
      />
      {whatsappLinkWithText ? (
        <a
          href={whatsappLinkWithText}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl border-2 border-white/30 bg-white/5 px-4 py-3 text-sm font-semibold text-text-primary transition hover:bg-white/10"
        >
          {labels.ctaWhatsApp}
        </a>
      ) : null}
    </div>
  );
}

function getDefaultSelections(variants: VariantDefinition[]) {
  const selections: Record<string, string> = {};
  variants.forEach((variant) => {
    const options = variant.options || [];
    if (options.length === 0) return;
    if (variant.default) {
      const match = options.find(
        (opt) => opt.value === variant.default || opt.label === variant.default
      );
      if (match) {
        selections[variant.type] = match.value || match.label;
        return;
      }
    }
    selections[variant.type] = options[0].value || options[0].label;
  });
  return selections;
}

function difficultyLabel(
  d: ProductSummary["difficulty"],
  L: Labels
): string | undefined {
  if (!d) return undefined;
  if (d === "easy") return L.difficultyEasy;
  if (d === "medium") return L.difficultyMedium;
  if (d === "hard") return L.difficultyHard;
  return d;
}

type Props = {
  locale: string;
  product: ProductSummary;
  seoH1: string;
  productImages: ProductImages;
  productVariants: ProductVariants | null;
  rich: ExperienceRichContent | null;
  labels: Labels;
  whatsappHref?: string;
  noImageLabel: string;
};

export default function ExperiencePageClient({
  locale,
  product,
  seoH1,
  productImages,
  productVariants,
  rich,
  labels,
  whatsappHref,
  noImageLabel,
}: Props) {
  const showFullImage = product.id === "gn-ski-snow-pants-001";
  const comingSoon = product.comingSoon === true;
  const baseFeatured = productImages.featured || product.images[0] || "";
  const baseGallery =
    productImages.gallery.length > 0
      ? productImages.gallery
      : product.images.slice(1);

  const initialSelections = useMemo(() => {
    if (!productVariants) return {};
    return getDefaultSelections(productVariants.variants);
  }, [productVariants]);

  const [selections, setSelections] = useState<Record<string, string>>(
    initialSelections
  );

  useEffect(() => {
    setSelections(initialSelections);
  }, [initialSelections]);

  const activeImages = useMemo(() => {
    const defaultImages = {
      featured: baseFeatured,
      gallery: baseGallery,
    };

    if (!productImages.variantImages || Object.keys(selections).length === 0) {
      return defaultImages;
    }

    let variant: VariantImageSet | string[] | undefined;

    if (productVariants) {
      for (const variantDef of productVariants.variants) {
        const selectedValue = selections[variantDef.type];
        if (!selectedValue) continue;

        const typedMap = (productImages.variantImages as VariantImagesMap)[
          variantDef.type
        ];
        if (typedMap && typedMap[selectedValue]) {
          variant = typedMap[selectedValue];
          break;
        }
      }
    }

    if (!variant) {
      const flatMap = productImages.variantImages as VariantImagesValueMap;
      const selectedValues = Object.values(selections);
      for (const value of selectedValues) {
        if (flatMap[value]) {
          variant = flatMap[value];
          break;
        }
      }
    }

    if (!variant) {
      return defaultImages;
    }

    if (Array.isArray(variant)) {
      return {
        featured: variant[0] ?? defaultImages.featured,
        gallery: variant.length ? variant : defaultImages.gallery,
      };
    }

    return {
      featured: variant.featured?.[0] ?? defaultImages.featured,
      gallery: variant.gallery?.length
        ? variant.gallery
        : variant.featured ?? defaultImages.gallery,
    };
  }, [
    baseFeatured,
    baseGallery,
    productImages,
    productVariants,
    selections,
  ]);

  const resolvedPrice = useMemo(() => {
    if (!productVariants) return product.price;
    let price = product.price;

    productVariants.variants.forEach((variant) => {
      const selectedValue = selections[variant.type];
      if (!selectedValue) return;
      const option = variant.options.find(
        (opt) => (opt.value || opt.label) === selectedValue
      );
      if (option && typeof option.priceModifier === "number") {
        price += option.priceModifier;
      }
    });

    return price;
  }, [product.price, productVariants, selections]);

  const variantSelections = useMemo(() => {
    if (!productVariants) return undefined;
    const selectionsList = productVariants.variants
      .map((variant) => {
        const selection = selections[variant.type];
        if (!selection) return null;
        const option = variant.options.find(
          (opt) => (opt.value || opt.label) === selection
        );
        const value = option?.value || selection;
        const label = option?.label || selection;
        return {
          type: variant.type,
          typeLabel: variant.label,
          value,
          label,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
    return selectionsList.length ? selectionsList : undefined;
  }, [productVariants, selections]);

  const cartImage = activeImages.featured || product.images[0];
  const shortLead =
    (product.shortDescription && product.shortDescription.trim()) ||
    product.description;

  const whyLove = rich?.whyLove?.length
    ? rich.whyLove
    : (product.features ?? []).slice(0, 4);
  const editorial = rich?.editorial?.length
    ? rich.editorial
    : [product.description];
  const places = rich?.places?.length ? rich.places : [];
  const included = rich?.included?.length
    ? rich.included
    : product.features ?? [];
  const excluded = rich?.excluded ?? [];
  const faq = rich?.faq ?? [];
  const testimonials = rich?.testimonials ?? [];

  const whatsappLinkWithText = whatsappHref
    ? `${whatsappHref}?text=${encodeURIComponent(
        `Hola, consulto por la experiencia: ${product.title}`
      )}`
    : undefined;

  const quickFacts = useMemo(() => {
    const rows: { label: string; value: string }[] = [];
    if (product.duration) {
      rows.push({ label: labels.labelDuration, value: product.duration });
    }
    if (product.location) {
      rows.push({ label: labels.labelLocation, value: product.location });
    }
    const lang = rich?.language;
    if (lang) rows.push({ label: labels.labelLanguage, value: lang });
    const diff = difficultyLabel(product.difficulty, labels);
    if (diff) {
      rows.push({ label: labels.labelDifficulty, value: diff });
    }
    const gs = rich?.groupSize;
    if (gs) rows.push({ label: labels.labelGroup, value: gs });
    const season = rich?.season;
    if (season) rows.push({ label: labels.labelSeason, value: season });
    const pickup = rich?.pickup;
    if (pickup) rows.push({ label: labels.labelPickup, value: pickup });
    const cancel = rich?.cancellation;
    if (cancel) {
      rows.push({ label: labels.labelCancellation, value: cancel });
    }
    return rows;
  }, [product, rich, labels]);

  const heroImage = activeImages.featured || product.images[0];

  return (
    <article className="overflow-x-hidden">
      {/* Hero inmersivo */}
      <header className="relative min-h-[min(88vh,920px)] w-full">
        <div className="absolute inset-0">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={product.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={PRODUCT_BLUR_DATA_URL}
            />
          ) : null}
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/75 to-dark-base/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(88vh,920px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20">
          <nav className="mb-8 text-xs font-medium text-white/70">
            <Link href={`/${locale}`} className="hover:text-white">
              {labels.breadcrumbHome}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <Link
              href={`/${locale}/products`}
              className="hover:text-white"
            >
              {labels.breadcrumbExperiences}
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-white/90">{product.title}</span>
          </nav>

          <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.2em] text-white/75">
            {SITE_CONFIG.tagline}
          </p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {seoH1}
          </h1>
          {rich?.subtitle ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {rich.subtitle}
            </p>
          ) : (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {shortLead}
            </p>
          )}

          {rich?.badges?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {rich.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/95 backdrop-blur-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          ) : null}

          {comingSoon ? (
            <p
              className="mt-5 max-w-xl rounded-xl border border-amber-400/40 bg-amber-500/15 px-4 py-3 text-sm font-medium leading-snug text-amber-50 shadow-sm backdrop-blur-sm"
              role="status"
            >
              {labels.comingSoonBanner}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {labels.fromPrice}
              </p>
              <p className="mt-1 text-4xl font-bold tabular-nums text-accent-gold sm:text-5xl">
                {formatPriceARS(resolvedPrice)}
              </p>
              <p className="mt-1 text-xs text-white/60">{labels.perPerson}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {comingSoon ? (
                <span className="inline-flex min-w-[200px] cursor-not-allowed items-center justify-center rounded-xl bg-accent-gold/35 px-8 py-3.5 text-sm font-semibold text-dark-base/80 shadow-lg xl:hidden">
                  {labels.ctaAvailableSoon}
                </span>
              ) : (
                <a
                  href="#experience-book"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-xl bg-accent-gold px-8 py-3.5 text-sm font-semibold text-dark-base shadow-lg transition hover:bg-accent-gold/90 xl:hidden"
                >
                  {labels.ctaReserve}
                </a>
              )}
              {comingSoon ? (
                <span className="hidden min-w-[200px] cursor-not-allowed items-center justify-center rounded-xl bg-accent-gold/35 px-8 py-3.5 text-sm font-semibold text-dark-base/80 shadow-lg xl:inline-flex">
                  {labels.ctaAvailableSoon}
                </span>
              ) : (
                <a
                  href="#experience-book-desktop"
                  className="hidden min-w-[200px] items-center justify-center rounded-xl bg-accent-gold px-8 py-3.5 text-sm font-semibold text-dark-base shadow-lg transition hover:bg-accent-gold/90 xl:inline-flex"
                >
                  {labels.ctaReserve}
                </a>
              )}
              {whatsappLinkWithText ? (
                <a
                  href={whatsappLinkWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-xl border-2 border-white/45 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  {labels.ctaWhatsApp}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Galería + sticky layout */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] xl:gap-14 xl:items-start">
          <div className="min-w-0 pb-20 xl:pb-24">
            {/* Galería */}
            {activeImages.featured || activeImages.gallery.length ? (
              <section
                className="pt-12 md:pt-16 xl:pt-0"
                aria-labelledby="gallery-heading"
              >
                <h2
                  id="gallery-heading"
                  className="text-xl font-semibold text-text-primary md:text-2xl"
                >
                  {labels.galleryTitle}
                </h2>
                <div className="relative mt-6 overflow-x-hidden rounded-2xl bg-dark-surface/40 p-3 md:p-6">
                  <ProductImageGallery
                    featured={activeImages.featured}
                    gallery={activeImages.gallery}
                    title={product.title}
                    noImageLabel={noImageLabel}
                    featuredContainerClassName={
                      showFullImage ? "aspect-auto overflow-visible" : undefined
                    }
                    featuredImageClassName={
                      showFullImage
                        ? "object-contain h-auto mx-auto p-2 md:p-3"
                        : undefined
                    }
                  />
                </div>
              </section>
            ) : null}

            {/* Reserva: visible en mobile / tablet (misma lógica que sticky desktop) */}
            <div className="xl:hidden">
              <div className="mt-10 rounded-3xl border border-white/10 bg-dark-surface/50 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <BookingPanel
                  product={product}
                  labels={labels}
                  productVariants={productVariants}
                  selections={selections}
                  setSelections={setSelections}
                  resolvedPrice={resolvedPrice}
                  cartImage={cartImage}
                  variantSelections={variantSelections}
                  whatsappLinkWithText={whatsappLinkWithText}
                  anchorId="experience-book"
                  comingSoon={comingSoon}
                />
              </div>
            </div>

            {quickFacts.length > 0 ? (
              <SectionShell id="facts" title={labels.quickFactsTitle}>
                <QuickFactsGrid items={quickFacts} />
              </SectionShell>
            ) : null}

            {whyLove.length > 0 ? (
              <SectionShell id="why" title={labels.whyLoveTitle}>
                <WhyLoveGrid items={whyLove} />
              </SectionShell>
            ) : null}

            <SectionShell id="editorial" title={labels.editorialTitle}>
              <EditorialColumns paragraphs={editorial} />
            </SectionShell>

            {product.schedule?.length ? (
              <SectionShell id="itinerary" title={labels.itineraryTitle}>
                <ItineraryTimeline lines={product.schedule} />
              </SectionShell>
            ) : null}

            {places.length > 0 ? (
              <SectionShell id="places" title={labels.placesTitle}>
                <PlacesList items={places} />
              </SectionShell>
            ) : null}

            {included.length > 0 || excluded.length > 0 ? (
              <SectionShell
                id="included"
                title={`${labels.includedTitle} · ${labels.excludedTitle}`}
              >
                <IncludedExcluded
                  included={included}
                  excluded={excluded}
                  includedTitle={labels.includedTitle}
                  excludedTitle={labels.excludedTitle}
                  hideColumnTitles
                />
              </SectionShell>
            ) : null}

            {rich ? (
              <SectionShell id="practical" title={labels.practicalTitle}>
                <PracticalInfoBlock
                  rich={rich}
                  labels={{
                    whatToBring: labels.whatToBring,
                    restrictions: labels.restrictions,
                    weather: labels.weather,
                    pickupDetails: labels.pickupDetails,
                  }}
                />
              </SectionShell>
            ) : null}

            {faq.length > 0 ? (
              <SectionShell id="faq" title={labels.faqTitle}>
                <FaqAccordion items={faq} />
              </SectionShell>
            ) : null}

            {testimonials.length > 0 ? (
              <TestimonialsMini items={testimonials} title={labels.socialTitle} />
            ) : null}

            <div className="pb-28 xl:pb-12">
              {whatsappLinkWithText ? (
                <FinalCtaBand
                  title={labels.finalCtaTitle}
                  subtitle={
                    comingSoon
                      ? labels.finalCtaSubtitleComingSoon
                      : labels.finalCtaSubtitle
                  }
                  primaryLabel={
                    comingSoon ? labels.ctaAvailableSoon : labels.finalCtaPrimary
                  }
                  secondaryLabel={labels.finalCtaSecondary}
                  primaryHrefMobile="#experience-book"
                  primaryHrefDesktop="#experience-book-desktop"
                  secondaryHref={whatsappLinkWithText}
                  primaryDisabled={comingSoon}
                />
              ) : (
                <FinalCtaBand
                  title={labels.finalCtaTitle}
                  subtitle={
                    comingSoon
                      ? labels.finalCtaSubtitleComingSoon
                      : labels.finalCtaSubtitle
                  }
                  primaryLabel={
                    comingSoon ? labels.ctaAvailableSoon : labels.finalCtaPrimary
                  }
                  secondaryLabel={labels.finalCtaSecondary}
                  primaryHrefMobile="#experience-book"
                  primaryHrefDesktop="#experience-book-desktop"
                  primaryDisabled={comingSoon}
                />
              )}
            </div>
          </div>

          {/* Sticky desktop booking */}
          <aside className="relative z-10 hidden xl:block xl:pt-14">
            <div
              id="experience-book-desktop"
              className="sticky top-28 rounded-3xl border border-white/10 bg-dark-surface/50 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              <BookingPanel
                product={product}
                labels={labels}
                productVariants={productVariants}
                selections={selections}
                setSelections={setSelections}
                resolvedPrice={resolvedPrice}
                cartImage={cartImage}
                variantSelections={variantSelections}
                whatsappLinkWithText={whatsappLinkWithText}
                comingSoon={comingSoon}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-dark-base/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md xl:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted/80">
              {labels.fromPrice}
            </p>
            <p className="truncate text-xl font-bold tabular-nums text-accent-gold">
              {formatPriceARS(resolvedPrice)}
            </p>
          </div>
          {whatsappLinkWithText ? (
            <a
              href={whatsappLinkWithText}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white"
            >
              {labels.ctaWhatsAppShort}
            </a>
          ) : null}
          {comingSoon ? (
            <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-xl bg-accent-gold/35 px-4 py-3 text-sm font-semibold text-dark-base/80">
              {labels.ctaAvailableSoon}
            </span>
          ) : (
            <a
              href="#experience-book"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent-gold px-4 py-3 text-sm font-semibold text-dark-base"
            >
              {labels.ctaReserve}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
