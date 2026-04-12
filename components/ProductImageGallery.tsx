"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  DEFAULT_PLACEHOLDER_IMAGE_SRC,
  PRODUCT_BLUR_DATA_URL,
} from "@/lib/product-image-helper";

type Props = {
  featured: string | null;
  gallery: string[];
  title: string;
  noImageLabel?: string;
  featuredContainerClassName?: string;
  featuredImageClassName?: string;
};

export default function ProductImageGallery({
  featured,
  gallery,
  title,
  noImageLabel = "No image",
  featuredContainerClassName,
  featuredImageClassName,
}: Props) {
  const allImages = useMemo(() => {
    const combined = featured
      ? [featured, ...gallery.filter((img) => img !== featured)]
      : gallery;

    const validLocal = combined.filter(
      (img): img is string => typeof img === "string" && img.startsWith("/")
    );

    // Si no hay imágenes válidas, mostramos un placeholder fijo.
    return validLocal.length > 0 ? validLocal : [DEFAULT_PLACEHOLDER_IMAGE_SRC];
  }, [featured, gallery]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });
  const hasMultiple = allImages.length > 1;

  const syncEmblaState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [featured, gallery]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    syncEmblaState();
    emblaApi.on("select", syncEmblaState);
    emblaApi.on("reInit", syncEmblaState);
    return () => {
      emblaApi.off("select", syncEmblaState);
      emblaApi.off("reInit", syncEmblaState);
    };
  }, [emblaApi, allImages.length, syncEmblaState]);

  const goTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const goPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const goNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasMultiple) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev, hasMultiple]
  );

  const showNoImageOverlay = allImages.length === 1 && allImages[0] === DEFAULT_PLACEHOLDER_IMAGE_SRC;
  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: "easeOut" as const };
  const enterTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: "easeOut" as const };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={enterTransition}
      className="max-w-full"
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={`${title} - Galería de imágenes`}
      role="region"
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl border border-white/10 bg-dark-surface/70 mb-4",
          "aspect-[4/3] lg:aspect-[16/10]",
          featuredContainerClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full touch-pan-y">
            {allImages.map((img, index) => {
              const isPriority = index === 0;
              return (
                <div
                  key={`${img}-${index}`}
                  className="relative h-full min-w-0 flex-[0_0_100%]"
                  aria-hidden={selectedIndex !== index}
                >
                  <Image
                    src={img}
                    alt={`${title} - Vista ${index + 1}`}
                    fill
                    priority={isPriority}
                    loading={isPriority ? undefined : "lazy"}
                    placeholder="blur"
                    blurDataURL={PRODUCT_BLUR_DATA_URL}
                    className={[
                      "h-full w-full object-cover",
                      featuredImageClassName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 62vw"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {hasMultiple ? (
          <>
            <motion.button
              type="button"
              aria-label="Imagen anterior"
              onClick={goPrev}
              disabled={!canScrollPrev}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={slideTransition}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 p-2 text-white backdrop-blur-sm transition duration-200 ease-out hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 disabled:cursor-not-allowed disabled:opacity-45 md:inline-flex"
            >
              <span aria-hidden>←</span>
            </motion.button>
            <motion.button
              type="button"
              aria-label="Imagen siguiente"
              onClick={goNext}
              disabled={!canScrollNext}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={slideTransition}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 p-2 text-white backdrop-blur-sm transition duration-200 ease-out hover:bg-black/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 disabled:cursor-not-allowed disabled:opacity-45 md:inline-flex"
            >
              <span aria-hidden>→</span>
            </motion.button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

        {showNoImageOverlay ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-sm text-text-muted">{noImageLabel}</span>
          </div>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            {allImages.map((_, index) => (
              <motion.button
                key={`dot-${index}`}
                type="button"
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={selectedIndex === index}
                onClick={() => goTo(index)}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                transition={slideTransition}
                className={[
                  "h-2.5 rounded-full transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80",
                  selectedIndex === index
                    ? "w-7 bg-accent-gold"
                    : "w-2.5 bg-white/40 hover:bg-white/60",
                ].join(" ")}
              />
            ))}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {allImages.map((img, index) => {
              const isActive = selectedIndex === index;
              return (
                <motion.button
                  key={`${img}-thumb-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Seleccionar imagen ${index + 1}`}
                  aria-current={isActive}
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  transition={slideTransition}
                  className={[
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border sm:h-20 sm:w-20",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80",
                    isActive
                      ? "border-accent-gold ring-1 ring-accent-gold/70"
                      : "border-white/20 hover:border-white/40",
                  ].join(" ")}
                >
                  <Image
                    src={img}
                    alt={`${title} - Miniatura ${index + 1}`}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={PRODUCT_BLUR_DATA_URL}
                    className="h-full w-full object-cover"
                    sizes="80px"
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

