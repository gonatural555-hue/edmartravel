"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPriceARS } from "@/lib/format-price";
import { useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { useCart } from "@/context/CartContext";
import {
  getSafeLocalImageSrc,
  PRODUCT_BLUR_DATA_URL,
} from "@/lib/product-image-helper";

type Props = {
  product: Product;
  locale?: Locale;
  /** Sombra multicapa + hover flotante; usar sobre fondos oscuros (p. ej. listado productos). */
  elevated?: boolean;
  /**
   * `listing`: `/products` — proporción media más baja, texto sin truncar (título/descripción completos).
   * `default`: resto de vistas (home, categoría, relacionados).
   */
  cardVariant?: "default" | "listing";
  labels?: {
    viewProduct?: string;
    noImage?: string;
    addToCart?: string;
  };
};

function isValidImageSrc(src?: string | null) {
  if (!src) return false;
  // Solo aceptamos imágenes locales para renderizar con `next/image`
  // (sin configurar dominios remotos en `next.config.ts`).
  return src.startsWith("/");
}

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prefersReduced;
}

export default function ProductCardSimple({
  product,
  locale = defaultLocale,
  elevated = false,
  cardVariant = "default",
  labels,
}: Props) {
  const isListing = cardVariant === "listing";
  const localized = product.translations?.[locale];
  const title = localized?.title || product.title;
  const description =
    localized?.shortDescription ||
    localized?.description ||
    product.shortDescription ||
    product.description;
  const imageList = useMemo(
    () => (product.images || []).filter((src) => isValidImageSrc(src)),
    [product.images]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeImage = imageList[activeIndex] || imageList[0];
  const hasValidImage = Boolean(activeImage);
  const imageSrc = getSafeLocalImageSrc(activeImage);
  const cardVideo = product.media?.cardVideo;
  const hasValidVideo =
    !videoFailed &&
    Boolean(cardVideo?.src && cardVideo.src.startsWith("/")) &&
    !prefersReducedMotion;
  const viewProductLabel = labels?.viewProduct || "View product";
  const noImageLabel = labels?.noImage || "No image";
  const addToCartLabel = labels?.addToCart || "Agregar al carrito";
  const { addItem } = useCart();

  const articleClassName = elevated
    ? [
        "group overflow-hidden rounded-xl border border-white/25 bg-mist-white",
        "shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.14),0_22px_48px_rgba(35,18,18,0.28)]",
        "ring-1 ring-black/[0.04]",
        "transition-all duration-300 ease-out",
        prefersReducedMotion ? "" : "hover:-translate-y-1",
        "hover:shadow-[0_2px_6px_rgba(0,0,0,0.07),0_14px_36px_rgba(0,0,0,0.2),0_32px_64px_rgba(28,14,14,0.32)]",
      ]
        .filter(Boolean)
        .join(" ")
    : "group overflow-hidden rounded-xl border border-stone-200/90 bg-mist-white shadow-[0_2px_14px_rgba(28,31,29,0.08)] transition-shadow duration-300 ease-out hover:shadow-[0_10px_28px_rgba(28,31,29,0.12)]";

  const mediaAspectClass = isListing ? "aspect-[4/3]" : "aspect-square";

  const imageSizes = isListing
    ? "(max-width: 640px) 100vw, 50vw"
    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <article className={articleClassName}>
        {/* IMAGE */}
        <div
          className={`relative w-full bg-stone-200 overflow-hidden ${mediaAspectClass}`}
        >
          {hasValidVideo ? (
            <video
              src={cardVideo?.src}
              poster={cardVideo?.poster}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              aria-label={title}
            />
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes={imageSizes}
              className="object-cover w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              placeholder="blur"
              blurDataURL={PRODUCT_BLUR_DATA_URL}
            />
          )}
          {!hasValidImage && !hasValidVideo && (
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-stone-600">
              {noImageLabel}
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center">
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  addItem({
                    id: product.id,
                    title,
                    price: product.price,
                    image: imageSrc,
                  });
                }}
                className="pointer-events-auto rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 hover:border-accent-gold/60 hover:text-accent-gold/90 active:scale-[0.98]"
                aria-label={addToCartLabel}
              >
                {addToCartLabel}
              </button>
            </div>
          </div>
        </div>
        {imageList.length > 1 && (
          <div
            className="px-4 md:px-5 pb-4 md:pb-5"
            onClick={(event) => event.preventDefault()}
          >
            <div className="flex items-center gap-2">
              {imageList.slice(0, 5).map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={`${product.id}-dot-${index}`}
                    type="button"
                    aria-label={`Preview ${title} ${index + 1}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={[
                      "h-2.5 w-2.5 rounded-full border transition-colors",
                      isActive
                        ? "border-accent-gold bg-accent-gold"
                        : "border-stone-400 bg-mist-white hover:border-stone-500",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* INFO */}
        <div className="min-h-0 space-y-2 p-4 md:p-5">
          <h2
            className={`text-base font-semibold leading-snug text-[#1C1F1D] ${
              isListing ? "" : "line-clamp-2"
            }`}
          >
            {title}
          </h2>
          <p
            className={`leading-relaxed text-[#4A524E] break-words ${
              isListing ? "text-sm" : "text-xs line-clamp-2"
            }`}
          >
            {description}
          </p>
          <div className="flex items-center justify-between gap-3 pt-1.5">
            <span className="text-sm font-semibold tabular-nums text-[#1C1F1D]">
              {formatPriceARS(product.price)}
            </span>
            <span className="text-xs font-semibold text-[#8B6914] transition-colors duration-200 ease-out group-hover:text-accent-gold">
              {viewProductLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
