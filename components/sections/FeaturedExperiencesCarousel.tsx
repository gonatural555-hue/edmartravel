"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from "react";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n/config";
import FeaturedExperienceEditorialCard from "@/components/sections/FeaturedExperienceEditorialCard";

const MD_BREAKPOINT = 768;
const GAP_NARROW = 18;
const GAP_WIDE = 36;
const SWIPE_PX = 48;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type Labels = {
  viewProduct: string;
  addToCart: string;
  noImage: string;
};

export type ExperienceBadgeLabels = Partial<
  Record<"wine" | "adventure" | "city", string>
>;

type Props = {
  products: Product[];
  locale: Locale;
  labels: Labels;
  ariaLabel: string;
  /** Badges por categoría de experiencia (traducidos desde la página). */
  badgeLabels?: ExperienceBadgeLabels;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useContainerWidth(ref: RefObject<HTMLDivElement | null>) {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

function badgeForProduct(
  product: Product,
  badgeLabels?: ExperienceBadgeLabels
): string | undefined {
  const cat = product.category as keyof ExperienceBadgeLabels;
  if (badgeLabels && cat && badgeLabels[cat]) return badgeLabels[cat];
  return undefined;
}

export default function FeaturedExperiencesCarousel({
  products,
  locale,
  labels,
  ariaLabel,
  badgeLabels,
}: Props) {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; id: number | null } | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const cw = useContainerWidth(viewportRef);
  const count = products.length;

  const isNarrow = cw > 0 && cw < MD_BREAKPOINT;
  const gap = isNarrow ? GAP_NARROW : GAP_WIDE;
  const slideW =
    cw > 0
      ? isNarrow
        ? Math.max(cw - 32, 280)
        : Math.min(820, Math.round(cw * 0.56))
      : 0;

  const translateX =
    cw > 0 && slideW > 0
      ? cw / 2 - slideW / 2 - index * (slideW + gap)
      : 0;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(Math.max(0, count - 1));
      }
    },
    [go, count]
  );

  /** No iniciar swipe si el gesto empieza en botón o enlace (el click en la tarjeta preview debe llegar al botón). */
  const isInteractiveCarouselTarget = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el?.closest) return false;
    return Boolean(
      el.closest("button, a, [role='button'], input, textarea, select")
    );
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (isInteractiveCarouselTarget(e.target)) return;
    dragRef.current = { x: e.clientX, id: e.pointerId };
  };

  const endDrag = (clientX: number, pointerId: number) => {
    const d = dragRef.current;
    if (!d || d.id !== pointerId) return;
    dragRef.current = null;
    const dx = clientX - d.x;
    if (Math.abs(dx) >= SWIPE_PX) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    endDrag(e.clientX, e.pointerId);
  };

  const onPointerCancel = () => {
    dragRef.current = null;
  };

  if (count === 0) return null;

  return (
    <section
      className="w-full"
      aria-roledescription="carrusel"
      aria-label={ariaLabel}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: "manipulation" }}
        className="relative h-[min(78vh,880px)] min-h-[420px] w-full max-w-[1600px] mx-auto overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-base md:min-h-[480px]"
      >
        {cw === 0 ? (
          <div
            className="h-full min-h-[420px] rounded-2xl bg-white/[0.04]"
            aria-hidden
          />
        ) : null}

        {cw > 0 ? (
          <div className="flex h-full items-stretch pt-2 pb-8 md:pb-10 md:pt-3">
            <div
              className="flex h-full items-stretch"
              style={{
                gap: `${gap}px`,
                transform: `translateX(${translateX}px)`,
                transition: prefersReducedMotion
                  ? "none"
                  : `transform 720ms ${EASE}`,
                willChange: prefersReducedMotion ? undefined : "transform",
              }}
            >
              {products.map((product, i) => (
                <div
                  key={product.id}
                  style={{ width: slideW }}
                  className="h-full shrink-0"
                  aria-hidden={i !== index}
                >
                  <FeaturedExperienceEditorialCard
                    product={product}
                    locale={locale}
                    labels={labels}
                    isActive={i === index}
                    onActivate={() => setIndex(i)}
                    categoryBadge={badgeForProduct(product, badgeLabels)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {cw > 0 && count > 1 && (
          <div
            className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5 md:bottom-4"
            role="group"
            aria-label="Indicadores"
          >
            {products.map((product, i) => (
              <button
                key={product.id}
                type="button"
                aria-current={i === index ? true : undefined}
                aria-label={`${i + 1} de ${count}`}
                onClick={() => setIndex(i)}
                className={[
                  "h-1 rounded-full transition-all duration-500 ease-out",
                  i === index
                    ? "w-7 bg-white"
                    : "w-1.5 bg-white/30 hover:bg-white/50",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
