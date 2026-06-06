"use client";

/**
 * Marquee pinned scroll-driven — fondo unificado vía HomeAtmosphere.
 */

import { useRef, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { useHeroMobile } from "@/components/experience-hero/useHeroMobile";

const REPEAT_COUNT = 12;
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

const EDGE_MASK_MOBILE = "none";

const ROW_TYPO =
  "font-theater text-[clamp(3.2rem,6.5vw,7.5rem)] font-bold normal-case leading-[0.9] tracking-[0.04em]";

const ROW1_STYLE: CSSProperties = {
  color: "#1a1a1a",
  opacity: 0.92,
};

const ROW2_STYLE: CSSProperties = {
  color: "#7A6248",
  opacity: 0.88,
};

function repeatText(text: string, times: number) {
  return Array.from({ length: times }, () => text);
}

type PinnedMarqueeRowProps = {
  segments: string[];
  rowStyle: CSSProperties;
  x: MotionValue<string>;
  mobile?: boolean;
};

function PinnedMarqueeRow({
  segments,
  rowStyle,
  x,
  mobile = false,
}: PinnedMarqueeRowProps) {
  const edgeMask = mobile ? EDGE_MASK_MOBILE : EDGE_MASK;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: edgeMask,
        WebkitMaskImage: edgeMask,
      }}
    >
      <motion.div
        className="flex w-max min-w-[300vw] whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {segments.map((chunk, i) => (
          <span
            key={`${i}-${chunk.slice(0, 8)}`}
            className={`inline-block shrink-0 px-[0.4em] ${ROW_TYPO}`}
            style={rowStyle}
          >
            {chunk}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StaticMarqueeRows({
  row1Segments,
  row2Segments,
  mobile = false,
}: {
  row1Segments: string[];
  row2Segments: string[];
  mobile?: boolean;
}) {
  const edgeMask = mobile ? EDGE_MASK_MOBILE : EDGE_MASK;

  return (
    <div
      className={`relative z-10 flex h-full w-full flex-col items-center px-0 ${
        mobile
          ? "justify-start gap-5 pt-0"
          : "justify-center gap-[clamp(3rem,7vh,5rem)]"
      }`}
    >
      <div
        className={`w-full ${mobile ? "" : "-translate-y-[14%]"}`}
        style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
      >
        <div className="flex w-max min-w-[300vw] whitespace-nowrap">
          {row1Segments.map((chunk, i) => (
            <span
              key={`s1-${i}`}
              className={`inline-block shrink-0 px-[0.4em] ${ROW_TYPO}`}
              style={ROW1_STYLE}
            >
              {chunk}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`w-full ${mobile ? "" : "translate-y-[14%]"}`}
        style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
      >
        <div className="flex w-max min-w-[300vw] whitespace-nowrap">
          {row2Segments.map((chunk, i) => (
            <span
              key={`s2-${i}`}
              className={`inline-block shrink-0 px-[0.4em] ${ROW_TYPO}`}
              style={ROW2_STYLE}
            >
              {chunk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CinematicMarqueeSection() {
  const locale = useLocale();
  const t = useTranslations();
  const reducedMotion = useReducedMotion();
  const isMobile = useHeroMobile();
  const scrollRef = useRef<HTMLElement>(null);

  const row1Base = t("home.marquee.row1");
  const row2Base = t("home.marquee.row2");
  const row1Segments = repeatText(row1Base, REPEAT_COUNT);
  const row2Segments = repeatText(row2Base, REPEAT_COUNT);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  /** Movimiento lento: fila 1 izquierda, fila 2 derecha */
  const row1X = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["-18%", "8%"]);

  if (reducedMotion) {
    return (
      <section
        ref={scrollRef}
        lang={locale}
        className="relative max-lg:-mt-[var(--hero-mobile-marquee-pull)] w-full overflow-hidden lg:-mt-28"
        aria-label="Edmar Travel · Mendoza"
      >
        <div className="relative flex w-full flex-col overflow-hidden pb-[var(--hero-mobile-collage-gap,0.75rem)] pt-0 lg:h-screen lg:pb-0">
          <StaticMarqueeRows
            row1Segments={row1Segments}
            row2Segments={row2Segments}
            mobile={isMobile}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={scrollRef}
      lang={locale}
      className="relative max-lg:-mt-[var(--hero-mobile-marquee-pull)] max-lg:mb-0 -mb-10 h-auto w-full overflow-hidden lg:-mt-28 lg:-mb-16 lg:h-[100dvh]"
      aria-label="Edmar Travel · Mendoza"
    >
      <div className="relative z-10 h-auto w-full overflow-hidden lg:sticky lg:top-0 lg:z-[5] lg:h-screen">
        <div className="relative z-10 flex w-full flex-col items-center justify-start pb-[var(--hero-mobile-collage-gap,0.75rem)] pt-0 lg:h-full lg:justify-center lg:pb-0">
          <div className="flex w-full flex-col items-center gap-5 lg:gap-[clamp(3rem,7vh,5rem)]">
            <div className="w-full lg:-translate-y-[18%]">
              <PinnedMarqueeRow
                segments={row1Segments}
                rowStyle={ROW1_STYLE}
                x={row1X}
                mobile={isMobile}
              />
            </div>
            <div className="w-full lg:translate-y-[18%]">
              <PinnedMarqueeRow
                segments={row2Segments}
                rowStyle={ROW2_STYLE}
                x={row2X}
                mobile={isMobile}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
