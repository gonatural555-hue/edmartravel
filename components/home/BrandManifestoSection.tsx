"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BRAND_MANIFESTO_BLOCKS,
  BRAND_MANIFESTO_TITLE_LINES,
} from "@/lib/home-brand-manifesto";
import HomeSectionFade from "@/components/home/HomeSectionFade";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const BLOCK_STAGGER = [0, 0.22, 0.44] as const;

function ManifestoBody({ text }: { text: string }) {
  const lines = text.split("\n");

  if (lines.length === 1) {
    return (
      <p className="mt-5 max-w-[28ch] font-sans text-[clamp(0.88rem,1.1vw,0.98rem)] leading-[1.7] text-[#E6ECE9]/58">
        {text}
      </p>
    );
  }

  return (
    <div className="mt-5 max-w-[28ch] space-y-1 font-sans text-[clamp(0.88rem,1.1vw,0.98rem)] leading-[1.7] text-[#E6ECE9]/58">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

export default function BrandManifestoSection() {
  const reducedMotion = useReducedMotion();

  const reveal = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 1.15, ease: PREMIUM_EASE, delay },
        };

  return (
    <section
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
      aria-label="Manifiesto Edmar Travel"
    >
      <HomeSectionFade edge="top" />
      <HomeSectionFade edge="bottom" />
      <div className="relative z-10 mx-auto flex w-full max-w-[96rem] flex-col justify-center px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <motion.header
          {...reveal(0)}
          className="max-w-[min(100%,52rem)]"
        >
          <h2 className="font-theater font-bold leading-[0.9] tracking-[-0.035em] text-[#F5F0E6]">
            {BRAND_MANIFESTO_TITLE_LINES.map((line, i) => (
              <span
                key={line}
                className={`block text-[clamp(2.35rem,6.2vw,4.75rem)] ${
                  i > 0 ? "mt-2 text-[#F5F0E6]/92" : ""
                }`}
              >
                {line}
              </span>
            ))}
          </h2>
        </motion.header>

        <div className="mt-[clamp(3.5rem,10vh,6.5rem)] flex flex-col gap-[clamp(3rem,8vh,5.5rem)] lg:mt-[clamp(4rem,12vh,7rem)] lg:flex-row lg:items-start lg:justify-between lg:gap-10 xl:gap-16">
          {BRAND_MANIFESTO_BLOCKS.map((block, i) => (
            <motion.article
              key={block.title}
              {...reveal(BLOCK_STAGGER[i])}
              className="flex-1 lg:max-w-[min(100%,22rem)] xl:max-w-[24rem]"
            >
              <h3 className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#F5F0E6]/52">
                {block.title}
              </h3>
              <ManifestoBody text={block.body} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
