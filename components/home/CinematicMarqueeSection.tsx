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

const REPEAT_COUNT = 12;
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

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
};

function PinnedMarqueeRow({ segments, rowStyle, x }: PinnedMarqueeRowProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: EDGE_MASK,
        WebkitMaskImage: EDGE_MASK,
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
}: {
  row1Segments: string[];
  row2Segments: string[];
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-[clamp(3rem,7vh,5rem)] px-0">
      <div
        className="w-full -translate-y-[14%]"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
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
        className="w-full translate-y-[14%]"
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
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
        className="relative -mt-20 w-full overflow-hidden md:-mt-28"
        aria-label="Edmar Travel · Mendoza"
      >
        <div className="relative flex h-screen w-full flex-col overflow-hidden">
          <StaticMarqueeRows
            row1Segments={row1Segments}
            row2Segments={row2Segments}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={scrollRef}
      lang={locale}
      className="relative -mt-20 -mb-10 h-[100dvh] w-full md:-mt-28 md:-mb-16"
      aria-label="Edmar Travel · Mendoza"
    >
      <div className="sticky top-0 z-[5] h-screen w-full overflow-hidden">
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-[clamp(3rem,7vh,5rem)]">
            <div className="w-full -translate-y-[14%] md:-translate-y-[18%]">
              <PinnedMarqueeRow
                segments={row1Segments}
                rowStyle={ROW1_STYLE}
                x={row1X}
              />
            </div>
            <div className="w-full translate-y-[14%] md:translate-y-[18%]">
              <PinnedMarqueeRow
                segments={row2Segments}
                rowStyle={ROW2_STYLE}
                x={row2X}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
