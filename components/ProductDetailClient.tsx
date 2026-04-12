"use client";

import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductImageGridDesktop from "@/components/ProductImageGridDesktop";
import VariantSelector from "@/components/VariantSelector";
import type {
  ProductImages,
  VariantImagesMap,
  VariantImagesValueMap,
  VariantImageSet,
} from "@/lib/product-images";
import type {
  ProductVariants,
  VariantDefinition,
} from "@/lib/product-variants";

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
};

const DIFFICULTY_LABEL_ES: Record<string, string> = {
  easy: "Fácil",
  medium: "Intermedio",
  hard: "Exigente",
};

/** Dificultad + itinerario (ubicación y duración van en la columna principal). */
function ExperienceItineraryBlock({ product }: { product: ProductSummary }) {
  const hasExtra =
    Boolean(product.difficulty) || (product.schedule && product.schedule.length > 0);
  if (!hasExtra) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-dark-surface/30 px-4 py-3 text-sm text-text-muted space-y-2">
      {product.difficulty && (
        <p>
          <span className="font-medium text-text-primary/90">Nivel: </span>
          {DIFFICULTY_LABEL_ES[product.difficulty] ?? product.difficulty}
        </p>
      )}
      {product.schedule && product.schedule.length > 0 && (
        <div>
          <p className="font-medium text-text-primary/90 mb-1.5">Itinerario</p>
          <ul className="list-disc list-inside space-y-1 pl-0.5">
            {product.schedule.map((line, idx) => (
              <li key={`${idx}-${line}`} className="text-xs text-text-muted/95">
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type Props = {
  product: ProductSummary;
  seoH1: string;
  productImages: ProductImages;
  productVariants: ProductVariants | null;
  ctaLabel: string;
  noImageLabel: string;
  freeShippingLabel?: string;
};

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

export default function ProductDetailClient({
  product,
  seoH1,
  productImages,
  productVariants,
  ctaLabel,
  noImageLabel,
  freeShippingLabel,
}: Props) {
  const showFullImage =
    product.id === "gn-ski-snow-pants-001";
  const baseFeatured =
    productImages.featured || product.images[0] || "";
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
      .filter(
        (entry): entry is NonNullable<typeof entry> => Boolean(entry)
      );
    return selectionsList.length ? selectionsList : undefined;
  }, [productVariants, selections]);

  const cartImage = activeImages.featured || product.images[0];
  const shortLead =
    (product.shortDescription && product.shortDescription.trim()) ||
    product.description;

  return (
    <>
      {/* Galería (izq. desktop) + ficha de experiencia (der. desktop); una columna en mobile */}
      <section className="grid max-w-full grid-cols-1 gap-8 pb-20 md:gap-10 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-12">
        {/* LEFT: galería */}
        <div className="relative z-0 min-w-0 lg:col-start-1 lg:row-start-1">
          <div className="relative overflow-x-hidden rounded-2xl bg-dark-surface/40 p-3 md:p-6 lg:hidden">
            <ProductImageGallery
              featured={activeImages.featured}
              gallery={activeImages.gallery}
              title={product.title}
              noImageLabel={noImageLabel}
              featuredContainerClassName={
                showFullImage ? "aspect-auto overflow-visible" : undefined
              }
              featuredImageClassName={
                showFullImage ? "object-contain h-auto mx-auto p-2 md:p-3" : undefined
              }
            />
          </div>
          <div className="relative hidden lg:block">
            <ProductImageGridDesktop
              featured={activeImages.featured}
              gallery={activeImages.gallery}
              title={product.title}
              noImageLabel={noImageLabel}
            />
          </div>
        </div>

        {/* RIGHT: información de la experiencia */}
        <div className="relative z-10 min-w-0 lg:col-start-2 lg:row-start-1">
          <div className="flex min-w-0 flex-col gap-5 md:gap-6 lg:sticky lg:top-24">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-4xl xl:text-5xl">
              {seoH1}
            </h1>

            {product.location ? (
              <p className="text-sm leading-relaxed text-text-muted/85 md:text-base">
                {product.location}
              </p>
            ) : null}

            {product.duration ? (
              <p className="text-sm text-text-muted md:text-base">
                <span className="font-medium text-text-primary/80">Duración: </span>
                {product.duration}
              </p>
            ) : null}

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/10 pb-5">
              <p className="text-3xl font-bold tabular-nums text-accent-gold md:text-4xl">
                ${resolvedPrice.toFixed(2)}
              </p>
              {product.freeShipping && freeShippingLabel ? (
                <span className="text-xs uppercase tracking-[0.12em] text-text-muted/80">
                  {freeShippingLabel}
                </span>
              ) : null}
            </div>

            <div className="min-w-0">
              <p className="text-base leading-relaxed text-text-muted md:text-lg">
                {shortLead}
              </p>
            </div>

            <ExperienceItineraryBlock product={product} />

            {productVariants ? (
              <div className="pt-0">
                <VariantSelector
                  variants={productVariants}
                  onChange={setSelections}
                  value={selections}
                />
              </div>
            ) : null}

            <div className="hidden pt-1 lg:block">
              <AddToCartButton
                id={product.id}
                title={product.title}
                price={product.price}
                image={cartImage}
                variantSelections={variantSelections}
                label={ctaLabel}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: Sticky CTA con microcopy */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-dark-base/98 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pt-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-full mx-auto">
          {/* Precio siempre visible en sticky */}
          <div className="mb-2 text-center">
            <p className="text-2xl font-bold text-text-primary">
              ${resolvedPrice.toFixed(2)}
            </p>
          </div>
          
          {/* CTA Button */}
          <AddToCartButton
            id={product.id}
            title={product.title}
            price={product.price}
            image={cartImage}
            variantSelections={variantSelections}
            label={ctaLabel}
            className="w-full mt-0 py-3.5 text-base"
          />

          <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-text-muted/70 leading-tight">
            <span>Reserva segura</span>
            <span aria-hidden>·</span>
            <span>Guías locales</span>
          </div>
        </div>
      </div>
    </>
  );
}

