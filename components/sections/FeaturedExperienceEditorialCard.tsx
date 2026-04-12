"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n/config";
import { useCart } from "@/context/CartContext";
import {
  getSafeLocalImageSrc,
  PRODUCT_BLUR_DATA_URL,
} from "@/lib/product-image-helper";

type Labels = {
  viewProduct: string;
  addToCart: string;
  noImage: string;
};

type Props = {
  product: Product;
  locale: Locale;
  labels: Labels;
  isActive: boolean;
  /** Al activar desde vista previa lateral */
  onActivate: () => void;
  /** Etiqueta corta para badge (p. ej. categoría traducida) */
  categoryBadge?: string;
};

function isValidImageSrc(src?: string | null) {
  return Boolean(src && src.startsWith("/"));
}

export default function FeaturedExperienceEditorialCard({
  product,
  locale,
  labels,
  isActive,
  onActivate,
  categoryBadge,
}: Props) {
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
  const [activeImg, setActiveImg] = useState(0);
  const activeImage = imageList[activeImg] || imageList[0];
  const hasValidImage = Boolean(activeImage);
  const imageSrc = getSafeLocalImageSrc(activeImage);
  const pdpHref = `/${locale}/products/${product.id}`;
  const { addItem } = useCart();

  const media = (
    <>
      <div className="absolute inset-0">
        {hasValidImage ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 92vw, 72vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            placeholder="blur"
            blurDataURL={PRODUCT_BLUR_DATA_URL}
            priority={isActive}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#2a3230] text-sm text-white/50">
            {labels.noImage}
          </div>
        )}
      </div>

      {/* Editorial overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/[0.88] via-black/35 to-black/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20"
        aria-hidden
      />

      {!isActive && (
        <div
          className="pointer-events-none absolute inset-0 bg-black/35 backdrop-blur-[1px] transition-opacity duration-500"
          aria-hidden
        />
      )}

      <div className="relative z-[2] flex h-full min-h-0 flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
        <div
          className={
            isActive
              ? "pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto"
              : "pointer-events-none"
          }
        >
          {categoryBadge ? (
            <span className="mb-3 inline-block max-w-full rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm md:text-[11px]">
              {categoryBadge}
            </span>
          ) : null}

          <h2
            className={`font-semibold tracking-tight text-white drop-shadow-sm ${
              isActive
                ? "text-2xl leading-[1.15] sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-[1.1]"
                : "text-lg leading-snug line-clamp-2 sm:text-xl"
            }`}
          >
            {title}
          </h2>

          {isActive ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:leading-relaxed line-clamp-4 md:line-clamp-5">
              {description}
            </p>
          ) : (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-sm">
              {description}
            </p>
          )}

          {isActive && imageList.length > 1 && (
            <div
              className="pointer-events-auto mt-5 flex flex-wrap gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {imageList.slice(0, 5).map((_, i) => (
                <button
                  key={`${product.id}-img-${i}`}
                  type="button"
                  aria-label={`Imagen ${i + 1}`}
                  onClick={() => setActiveImg(i)}
                  className={[
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeImg
                      ? "w-6 bg-accent-gold"
                      : "w-1.5 bg-white/40 hover:bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>
          )}

          {isActive && (
            <div className="pointer-events-auto mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-2xl font-semibold tabular-nums text-accent-gold sm:text-3xl">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={pdpHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-accent-gold/50 hover:bg-white/[0.14] hover:text-accent-gold"
                >
                  {labels.viewProduct}
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({
                      id: product.id,
                      title,
                      price: product.price,
                      image: imageSrc,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-accent-gold/50 bg-accent-gold/15 px-6 py-3 text-sm font-semibold text-accent-gold transition hover:bg-accent-gold/25"
                >
                  {labels.addToCart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const shellClass = [
    "relative h-full w-full min-h-[min(68vh,760px)] overflow-hidden rounded-2xl md:min-h-[min(74vh,840px)] md:rounded-3xl",
    "transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
    isActive
      ? "group scale-100 opacity-100 shadow-[0_28px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
      : "group scale-[0.9] opacity-[0.62] shadow-[0_12px_40px_rgba(0,0,0,0.4)] ring-1 ring-black/20 md:scale-[0.88] md:opacity-[0.58] md:hover:scale-[0.91] md:hover:opacity-[0.78]",
  ].join(" ");

  if (!isActive) {
    return (
      <button
        type="button"
        tabIndex={-1}
        onClick={onActivate}
        className={`${shellClass} relative z-[1] block h-full w-full cursor-pointer text-left focus-visible:outline focus-visible:ring-2 focus-visible:ring-accent-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base`}
        aria-label={`Ver experiencia: ${title}`}
      >
        {media}
      </button>
    );
  }

  return <div className={shellClass}>{media}</div>;
}
