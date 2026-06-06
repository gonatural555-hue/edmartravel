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
  collagePushOffset,
  type CollageExperienceId,
  type CollageItemDef,
} from "@/lib/home-experience-collage";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const MOTION_S = 1.1;
/** Mismo radio que los paneles laterales del hero */
const COLLAGE_RADIUS = "rounded-[20px]";
const CARD_BASE =
  "w-[clamp(200px,26vw,300px)] aspect-[16/10] overflow-hidden border border-white/[0.12] shadow-[0_24px_70px_rgba(0,0,0,0.5)]";

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

type CollageExperienceCopy = {
  title: string;
  cta: string;
  href: string;
};

function useCollageExperienceCopy(
  experienceId: CollageExperienceId
): CollageExperienceCopy {
  const locale = useLocale();
  const t = useTranslations();
  const key = experienceId;

  return {
    title: t(`home.collage.${key}.category`),
    cta: t(`home.collage.${key}.cta`),
    href: collageExperienceHref(locale, experienceId),
  };
}

function CollageCardOverlay({
  experienceId,
  isSelected,
  heroScale,
  compact = false,
}: {
  experienceId: CollageExperienceId;
  isSelected: boolean;
  heroScale: number;
  compact?: boolean;
}) {
  const { title, cta, href } = useCollageExperienceCopy(experienceId);
  const counterScale = isSelected && heroScale > 1 ? 1 / heroScale : 1;

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
          className={`font-theater font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#F5F0E6] transition-colors hover:text-[#E8C98A] ${
            compact
              ? "text-[clamp(0.62rem,2.8vw,0.85rem)]"
              : isSelected
                ? "text-[clamp(1rem,2.2vw,1.65rem)]"
                : "text-[clamp(0.65rem,1.4vw,0.95rem)]"
          }`}
        >
          {title}
        </Link>
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
      className={`absolute ${CARD_BASE} ${COLLAGE_RADIUS} will-change-[transform,opacity]`}
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
        experienceId={item.experienceId}
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
}: {
  item: CollageItemDef;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      layout
      className={`relative ${CARD_BASE} ${COLLAGE_RADIUS} shrink-0 snap-center border transition-shadow ${
        isSelected
          ? "border-0 shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          : "border-white/[0.12]"
      }`}
      animate={{
        scale: isSelected ? 1.12 : 1,
        opacity: isSelected ? 1 : 0.88,
      }}
      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
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
        experienceId={item.experienceId}
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
      className="relative -mt-28 flex min-h-[96dvh] w-full flex-col items-center justify-center overflow-hidden pb-10 md:-mt-[10.5rem] md:min-h-[98dvh] md:pb-12"
      aria-label={t("home.collage.ariaLabel", "Experiencias Edmar Travel")}
      onMouseLeave={clearHover}
    >
      <HomeSectionFade edge="top" />

      <motion.header
        className="relative z-20 mb-5 max-w-[40rem] px-6 text-center md:mb-6"
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

      {/* Desktop — collage centrado */}
      <div
        className="relative z-10 hidden w-full max-w-[min(96vw,1200px)] px-4 md:block"
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

      {/* Mobile — scroll horizontal */}
      <div className="relative z-10 w-full md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {COLLAGE_ITEMS.map((item) => (
            <MobileCollageCard
              key={item.id}
              item={item}
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
