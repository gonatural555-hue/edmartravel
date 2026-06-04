"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  EDITORIAL_ROTATION_MS,
  EDITORIAL_TESTIMONIAL_VIDEO,
  EDITORIAL_TESTIMONIALS,
} from "@/lib/home-editorial-testimonials";
import HomeSectionFade from "@/components/home/HomeSectionFade";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

function EditorialQuoteBlock({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}) {
  const t = EDITORIAL_TESTIMONIALS[index];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 1.1,
        ease: PREMIUM_EASE,
      }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <blockquote className="font-theater font-bold leading-[0.92] tracking-[-0.03em] text-[#F5F0E6]">
        {t.quoteLines.map((line, i) => (
          <span
            key={line}
            className={`block text-[clamp(2rem,4.2vw,3.25rem)] ${
              i > 0 ? "mt-1 text-[#F5F0E6]/95" : ""
            }`}
          >
            {line}
          </span>
        ))}
      </blockquote>

      <p className="mt-8 max-w-[36ch] font-sans text-[clamp(0.88rem,1.25vw,1rem)] leading-[1.65] text-[#E6ECE9]/72">
        {t.body}
      </p>

      <footer className="mt-10 font-sans text-[11px] leading-relaxed tracking-[0.06em] text-[#E6ECE9]/42">
        <p className="text-[#F5F0E6]/58">{t.author}</p>
        <p>{t.location}</p>
        <p className="mt-1.5 uppercase tracking-[0.14em] text-[#E6ECE9]/38">
          {t.experience}
        </p>
      </footer>
    </motion.div>
  );
}

export default function EditorialTestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    reducedMotion ? [1, 1, 1, 1] : [1, 1.015, 1.03, 1.03]
  );

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % EDITORIAL_TESTIMONIALS.length);
    }, EDITORIAL_ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative -mt-6 flex min-h-[72vh] w-full items-center overflow-hidden py-8 md:-mt-8 md:min-h-[78vh] md:py-10 lg:py-12"
      aria-label="Historias de viajeros"
    >
      <HomeSectionFade edge="top" />
      <HomeSectionFade edge="bottom" />
      <div className="relative z-10 mx-auto grid w-full max-w-[96rem] flex-1 grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,60%)_minmax(0,40%)] lg:gap-14 lg:px-12 xl:gap-20">
        {/* Video — 60% */}
        <motion.div
          className="group/video relative w-full lg:pr-4"
          initial={
            reducedMotion ? false : { opacity: 0, x: -40 }
          }
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: PREMIUM_EASE }}
        >
          <motion.div
            style={{ scale: videoScale }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] shadow-[0_32px_100px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)] transition-[box-shadow] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/video:shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
          >
            <div className="h-full w-full origin-center transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/video:scale-[1.015]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            >
              <source src={EDITORIAL_TESTIMONIAL_VIDEO} type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              aria-hidden
            />
            </div>
          </motion.div>
        </motion.div>

        {/* Editorial — 40% */}
        <motion.div
          className="relative min-h-[280px] w-full lg:min-h-[340px] lg:pl-2"
          initial={reducedMotion ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: PREMIUM_EASE, delay: 0.3 }}
        >
          <div className="relative min-h-[280px] lg:min-h-[360px]">
            <AnimatePresence mode="wait">
              <EditorialQuoteBlock
                index={activeIndex}
                reducedMotion={!!reducedMotion}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
