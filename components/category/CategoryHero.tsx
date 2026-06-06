"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type CategoryHeroProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  scrollLabel: string;
};

export default function CategoryHero({
  title,
  imageSrc,
  imageAlt,
  scrollLabel,
}: CategoryHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] min-h-[560px] w-full overflow-hidden"
      aria-labelledby="category-hero-title"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imageScale }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-28 sm:px-10 md:pb-32 lg:px-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="mx-auto w-full max-w-6xl">
          <h1
            id="category-hero-title"
            className="max-w-5xl font-theater text-[clamp(3.75rem,11vw,10rem)] font-semibold uppercase leading-[0.88] tracking-[-0.03em] text-white"
          >
            {title}
          </h1>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] font-medium uppercase tracking-[0.28em]">
          {scrollLabel}
        </span>
        <motion.span
          className="block h-10 w-px origin-top bg-white/50"
          animate={{ scaleY: [0.35, 1, 0.35] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}
