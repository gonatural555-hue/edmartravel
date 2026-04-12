"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT_GLASS } from "@/lib/about-ui";

const ease = [0.22, 1, 0.36, 1] as const;

function useFadeUp() {
  const reduced = useReducedMotion();
  return (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.62, ease, delay },
        };
}

type AboutCopy = {
  heroTitle: string;
  heroSubtitle: string;
  whoTitle: string;
  whoParagraphs: string[];
  experiencesTitle: string;
  experiencesIntro: string;
  experienceCategories: { title: string; text: string }[];
  whyTitle: string;
  whyParagraphs: string[];
  valuesTitle: string;
  values: { title: string; text: string }[];
  testimonialsTitle: string;
  testimonials: { name: string; text: string }[];
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type Props = {
  copy: AboutCopy;
  whatsappHref: string | null;
  productsHref: string;
  contactHref: string;
  secondaryCtaClassName: string;
};

export default function AboutPageContent({
  copy: a,
  whatsappHref,
  productsHref,
  contactHref,
  secondaryCtaClassName,
}: Props) {
  const fadeUp = useFadeUp();

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 md:pb-32 md:pt-36 lg:px-12 lg:pl-14 lg:pr-10">
      <motion.header className="mb-20 md:mb-28 lg:mb-32" {...fadeUp(0)}>
        <h1 className="max-w-[18ch] text-balance text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl md:text-5xl md:leading-[1.08] lg:max-w-[22ch] lg:text-[2.75rem]">
          {a.heroTitle}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-[1.75] text-white/70 md:mt-10 md:max-w-lg md:text-lg md:leading-[1.7]">
          {a.heroSubtitle}
        </p>
      </motion.header>

      <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
        <motion.section
          aria-labelledby="about-who-heading"
          className="relative"
          {...fadeUp(0)}
        >
          <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-10">
            <div className="md:col-span-5 md:col-start-1 lg:col-span-4">
              <h2
                id="about-who-heading"
                className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl md:leading-tight"
              >
                {a.whoTitle}
              </h2>
            </div>
            <div className="mt-10 md:col-span-7 md:col-start-6 md:mt-0 lg:col-span-7 lg:col-start-6">
              <div
                className={`${ABOUT_GLASS.panel} max-w-xl px-7 py-8 md:px-9 md:py-10 lg:max-w-[26rem]`}
              >
                <div className="space-y-5 text-[0.9375rem] leading-[1.8] text-stone-200/88 md:text-base md:leading-[1.78]">
                  {a.whoParagraphs.map((p, i) => (
                    <p key={`who-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section aria-labelledby="about-exp-heading">
          <motion.div
            className="md:flex md:items-end md:justify-between md:gap-12"
            {...fadeUp(0)}
          >
            <h2
              id="about-exp-heading"
              className="max-w-xs text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
            >
              {a.experiencesTitle}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-[1.75] text-white/60 md:mt-0 md:max-w-sm md:text-right md:text-[0.9375rem]">
              {a.experiencesIntro}
            </p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:gap-7">
            {a.experienceCategories.map((cat, i) => (
              <motion.div
                key={`exp-${i}`}
                className={`${ABOUT_GLASS.card} flex flex-col gap-3 p-6 md:p-7 ${
                  i % 2 === 1 ? "sm:mt-6 lg:mt-8" : ""
                }`}
                {...fadeUp(0.06 + i * 0.07)}
              >
                <h3 className="text-[0.9375rem] font-semibold tracking-wide text-white md:text-base">
                  {cat.title}
                </h3>
                <p className="text-sm leading-[1.75] text-stone-300/82">
                  {cat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-why-heading">
          <motion.h2
            id="about-why-heading"
            className="max-w-prose text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
            {...fadeUp(0)}
          >
            {a.whyTitle}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:gap-10">
            {a.whyParagraphs.map((p, i) => (
              <motion.div
                key={`why-${i}`}
                className={`${ABOUT_GLASS.card} p-7 md:p-8 ${
                  i === 1 ? "md:translate-y-6 lg:translate-y-8" : ""
                }`}
                {...fadeUp(0.08 + i * 0.12)}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-gold/75">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-[0.9375rem] leading-[1.8] text-stone-200/88 md:text-base md:leading-[1.78]">
                  {p}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-values-heading">
          <motion.h2
            id="about-values-heading"
            className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
            {...fadeUp(0)}
          >
            {a.valuesTitle}
          </motion.h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {a.values.map((v, i) => (
              <motion.div
                key={`val-${i}`}
                className={`${ABOUT_GLASS.value} px-5 py-5 md:px-6 md:py-6`}
                {...fadeUp(0.04 + i * 0.05)}
              >
                <h3 className="text-sm font-semibold text-white/95 md:text-[0.9375rem]">
                  {v.title}
                </h3>
                <p className="mt-2 text-xs leading-[1.7] text-stone-400/95 md:text-sm md:leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-testimonials-heading">
          <motion.h2
            id="about-testimonials-heading"
            className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
            {...fadeUp(0)}
          >
            {a.testimonialsTitle}
          </motion.h2>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-7">
            {a.testimonials.map((t, i) => (
              <motion.figure
                key={`test-${i}`}
                className={`${ABOUT_GLASS.quote} flex flex-col justify-between p-6 md:p-7`}
                {...fadeUp(0.06 + i * 0.08)}
              >
                <blockquote>
                  <p className="text-[0.9375rem] font-light italic leading-[1.75] text-stone-300/88 md:text-base md:leading-[1.8]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-white/[0.06] pt-4 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  {t.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <motion.section
          className={`${ABOUT_GLASS.panel} px-7 py-10 md:px-12 md:py-14`}
          aria-labelledby="about-cta-heading"
          {...fadeUp(0)}
        >
          <div className="md:flex md:items-start md:justify-between md:gap-10">
            <div className="max-w-xl">
              <h2
                id="about-cta-heading"
                className="text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl"
              >
                {a.ctaTitle}
              </h2>
              <p className="mt-4 text-sm leading-[1.75] text-white/65 md:text-[0.9375rem] md:leading-[1.8]">
                {a.ctaParagraph}
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0 md:flex-col md:items-end lg:flex-row">
              <Link
                href={productsHref}
                className="inline-flex justify-center rounded-lg bg-accent-gold px-8 py-3.5 text-sm font-semibold text-[#1a1510] shadow-md shadow-black/25 transition hover:bg-accent-gold/90 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:ring-offset-2 focus:ring-offset-black/50"
              >
                {a.ctaPrimary}
              </Link>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryCtaClassName}
                >
                  {a.ctaSecondary}
                </a>
              ) : (
                <Link href={contactHref} className={secondaryCtaClassName}>
                  {a.ctaSecondary}
                </Link>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
