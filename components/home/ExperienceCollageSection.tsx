"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import HomeCtaButton from "@/components/home/HomeCtaButton";
import HomeSectionFade from "@/components/home/HomeSectionFade";
import {
  COLLAGE_ITEMS,
  collageExperienceHref,
  collageProductHref,
  collagePushOffset,
  type CollageItemDef,
} from "@/lib/home-experience-collage";
import { formatPriceARS } from "@/lib/format-price";
import type { Locale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/localize-product";
import { getCatalogProductById } from "@/lib/products-catalog";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const MOTION_S = 1.1;
/** Mismo radio que los paneles laterales del hero */
const COLLAGE_RADIUS = "rounded-[20px]";
const CARD_BASE =
  "aspect-[16/10] overflow-hidden border border-white/[0.12] shadow-[0_24px_70px_rgba(0,0,0,0.5)]";

const CARD_DESKTOP = `${CARD_BASE} w-[clamp(200px,26vw,300px)]`;

const CARD_MOBILE = `${CARD_BASE} w-full max-w-[22rem]`;

function useCollageHeroScale() {
  const [scale, setScale] = useState(3.2);

  useEffect(() => {
    const update = () => {
      const targetW = Math.min(window.innerWidth * 0.66, 1100);
      const targetH = Math.min(window.innerHeight * 0.56, 680);
      const baseW = Math.min(300, Math.max(200, window.innerWidth * 0.26));
      const baseH = baseW * (10 / 16);
      setScale(Math.min(targetW / baseW, targetH / baseH));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scale;
}

type CollageCardCopy = {
  title: string;
  fromPriceLabel: string | null;
  priceAmount: string | null;
  cta: string;
  href: string;
  isProductLink: boolean;
};

function useCollageCardCopy(item: CollageItemDef): CollageCardCopy {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const categoryKey = item.experienceId;

  if (item.productId) {
    const product = getCatalogProductById(item.productId);
    if (product) {
      const localized = localizeProduct(product, locale);
      const fromPrice = t("experiencePage.fromPrice", "Desde");
      return {
        title: localized.title,
        fromPriceLabel: fromPrice,
        priceAmount: formatPriceARS(localized.price),
        cta: t(`home.collage.${categoryKey}.cta`),
        href: collageProductHref(locale, item.productId),
        isProductLink: true,
      };
    }
  }

  return {
    title: t(`home.collage.${categoryKey}.category`),
    fromPriceLabel: null,
    priceAmount: null,
    cta: t(`home.collage.${categoryKey}.cta`),
    href: collageExperienceHref(locale, item.experienceId),
    isProductLink: false,
  };
}

function CollageCardOverlay({
  item,
  isSelected,
  heroScale,
  compact = false,
}: {
  item: CollageItemDef;
  isSelected: boolean;
  heroScale: number;
  compact?: boolean;
}) {
  const { title, fromPriceLabel, priceAmount, cta, href, isProductLink } =
    useCollageCardCopy(item);
  const counterScale = isSelected && heroScale > 1 ? 1 / heroScale : 1;
  const titleSizeClass = isProductLink
    ? compact
      ? "text-[clamp(1.22rem,5.4vw,1.65rem)]"
      : isSelected
        ? "text-[clamp(1.58rem,3.6vw,2.48rem)]"
        : "text-[clamp(1.31rem,2.78vw,1.8rem)]"
    : compact
      ? "text-[clamp(1.41rem,6.3vw,1.92rem)]"
      : isSelected
        ? "text-[clamp(2.25rem,4.95vw,3.72rem)]"
        : "text-[clamp(1.46rem,3.15vw,2.15rem)]";

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-3 text-center sm:px-4"
      style={{ transform: `scale(${counterScale})` }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25"
        aria-hidden
      />
      <div className="pointer-events-auto relative flex max-w-[92%] flex-col items-center gap-2 sm:gap-2.5">
        <Link
          href={href}
          className={`font-theater font-bold leading-[1.02] text-[#F5F0E6] transition-colors hover:text-[#E8C98A] ${
            isProductLink
              ? "normal-case tracking-[-0.01em]"
              : "uppercase tracking-[-0.02em] leading-[0.95]"
          } ${titleSizeClass}`}
        >
          {title}
        </Link>
        {priceAmount ? (
          <p
            className={`font-sans ${
              compact
                ? "text-[clamp(1.03rem,4.2vw,1.22rem)]"
                : isSelected
                  ? "text-[clamp(1.22rem,2.33vw,1.5rem)]"
                  : "text-[clamp(1.03rem,2.03vw,1.22rem)]"
            }`}
          >
            {fromPriceLabel ? (
              <span className="mr-1.5 font-semibold tracking-[0.06em] text-[#FFD86A] drop-shadow-[0_0_14px_rgba(255,216,106,0.55)]">
                {fromPriceLabel}
              </span>
            ) : null}
            <span className="font-semibold tabular-nums tracking-[0.02em] text-[#FFD86A] drop-shadow-[0_0_14px_rgba(255,216,106,0.55)]">
              {priceAmount}
            </span>
          </p>
        ) : null}
        <HomeCtaButton
          href={href}
          variant="primary"
          className={
            compact
              ? "!min-h-[34px] !px-4 !py-2 !text-[8px] !tracking-[0.12em] sm:!text-[9px]"
              : isSelected
                ? "!min-h-[40px] !px-6 !py-2.5 !text-[10px] sm:!min-h-[44px] sm:!text-[11px]"
                : "!min-h-[34px] !px-4 !py-2 !text-[8px] !tracking-[0.12em] sm:!text-[9px]"
          }
        >
          {cta}
        </HomeCtaButton>
      </div>
    </div>
  );
}

function DesktopCollageCard({
  item,
  selectedId,
  hasSelection,
  reducedMotion,
  inView,
  staggerIndex,
  heroScale,
  onHover,
}: {
  item: CollageItemDef;
  selectedId: string | null;
  hasSelection: boolean;
  reducedMotion: boolean;
  inView: boolean;
  staggerIndex: number;
  heroScale: number;
  onHover: (id: string | null) => void;
}) {
  const isSelected = selectedId === item.id;
  const dimmed = hasSelection && !isSelected;
  const push = dimmed ? collagePushOffset(item.left, item.top, 48) : { x: 0, y: 0 };

  return (
    <motion.div
      className={`absolute ${CARD_DESKTOP} ${COLLAGE_RADIUS} will-change-[transform,opacity]`}
      initial={reducedMotion ? false : { opacity: 0, y: 40 }}
      animate={
        inView
          ? {
              left: isSelected ? "50%" : item.left,
              top: isSelected ? "50%" : item.top,
              x: isSelected ? "-50%" : push.x,
              y: isSelected ? "-50%" : push.y,
              scale: isSelected ? heroScale : dimmed ? 0.88 : 1,
              rotate: isSelected ? 0 : item.rotate,
              opacity: isSelected ? 1 : dimmed ? 0.52 : 0.9,
              zIndex: isSelected ? 60 : item.zIndex,
              borderWidth: isSelected ? 0 : 1,
              borderColor: isSelected
                ? "rgba(255,255,255,0)"
                : "rgba(255,255,255,0.12)",
              boxShadow: isSelected
                ? "0 40px 100px rgba(0,0,0,0.6)"
                : "0 24px 70px rgba(0,0,0,0.5)",
            }
          : { opacity: 0, y: 40 }
      }
      transition={{
        duration: reducedMotion ? 0 : MOTION_S,
        ease: PREMIUM_EASE,
        delay: reducedMotion ? 0 : staggerIndex * 0.07,
      }}
      onMouseEnter={() => onHover(item.id)}
      onFocus={() => onHover(item.id)}
      tabIndex={0}
      aria-label={item.alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <CollageCardOverlay
        item={item}
        isSelected={isSelected}
        heroScale={heroScale}
      />
    </motion.div>
  );
}

function MobileCollageCard({
  item,
  isSelected,
  onSelect,
  index,
  inView,
  reducedMotion,
}: {
  item: CollageItemDef;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      className={`relative ${CARD_MOBILE} ${COLLAGE_RADIUS} border transition-shadow ${
        isSelected
          ? "border-0 shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          : "border-white/[0.12]"
      }`}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={
        inView
          ? {
              scale: isSelected ? 1.02 : 1,
              opacity: isSelected ? 1 : 0.92,
              y: 0,
            }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        ease: PREMIUM_EASE,
        delay: reducedMotion ? 0 : index * 0.06,
      }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="absolute inset-0 z-[1] cursor-pointer"
        aria-pressed={isSelected}
        aria-label={item.alt}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <CollageCardOverlay
        item={item}
        isSelected={isSelected}
        heroScale={1}
        compact
      />
    </motion.div>
  );
}

export default function ExperienceCollageSection() {
  const t = useTranslations();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const clearHover = useCallback(() => setHoveredId(null), []);

  const selectedId = isCoarse ? tappedId : hoveredId;
  const hasSelection = selectedId !== null;
  const heroScale = useCollageHeroScale();

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden max-lg:min-h-0 max-lg:justify-start max-lg:pb-10 lg:-mt-[10.5rem] lg:min-h-[98dvh] lg:justify-center lg:pb-12"
      aria-label={t("home.collage.ariaLabel", "Experiencias Edmar Travel")}
      onMouseLeave={clearHover}
    >
      <div className="max-lg:hidden">
        <HomeSectionFade edge="top" />
      </div>

      <motion.header
        className="relative z-20 mb-5 max-w-[40rem] px-6 text-center max-lg:mb-4 md:mb-6"
        animate={{ opacity: hasSelection ? 0.42 : 1 }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      >
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-[#1a1a1a]/45">
          {t("home.collage.eyebrow", "Experiencias")}
        </p>
        <h2 className="mt-3 font-theater text-[clamp(1.75rem,4vw,3rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-[#1a1a1a]">
          {t(
            "home.collage.headline",
            "Elegí cómo querés descubrir Mendoza."
          )}
        </h2>
      </motion.header>

      {/* Desktop — collage absoluto */}
      <div
        className="relative z-10 hidden w-full max-w-[min(96vw,1200px)] px-4 lg:block"
        onMouseLeave={clearHover}
      >
        <div className="relative mx-auto h-[min(62vh,680px)] w-full">
          {COLLAGE_ITEMS.map((item, index) => (
            <DesktopCollageCard
              key={item.id}
              item={item}
              selectedId={selectedId}
              hasSelection={hasSelection}
              reducedMotion={!!reducedMotion}
              inView={inView}
              staggerIndex={index}
              heroScale={heroScale}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* Mobile — columna vertical */}
      <div className="relative z-10 w-full lg:hidden">
        <div className="mx-auto flex w-full max-w-[22rem] flex-col items-stretch gap-4 px-6 pb-2">
          {COLLAGE_ITEMS.map((item, index) => (
            <MobileCollageCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
              reducedMotion={!!reducedMotion}
              isSelected={tappedId === item.id}
              onSelect={() =>
                setTappedId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
