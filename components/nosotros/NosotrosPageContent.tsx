"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import CategoryEditorialButton from "@/components/category/CategoryEditorialButton";
import {
  BOOKING_GLASS,
  BOOKING_PAGE_KICKER,
  BOOKING_PAGE_TITLE,
  BOOKING_SECTION_TITLE,
  bookingMotion,
} from "@/lib/booking-ui";
import { LEGAL_BODY, LEGAL_CONTAINER } from "@/lib/legal-ui";

const ease = [0.22, 1, 0.36, 1] as const;

function useFadeUp() {
  const reduced = useReducedMotion();
  return (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.55, ease, delay },
        };
}

export type NosotrosCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    imageAlt: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  who: {
    title: string;
    paragraphs: string[];
    imageAlt: string;
  };
  pillars: {
    title: string;
    items: { title: string; text: string }[];
  };
  moreThan: {
    title: string;
    paragraphs: string[];
    imageAlt: string;
  };
  guides: {
    title: string;
    paragraphs: string[];
    quote: string;
    imageAlt: string;
  };
  promise: {
    title: string;
    text: string;
    points: string[];
  };
  finalCta: {
    title: string;
    text: string;
    primary: string;
    secondary: string;
  };
};

type Props = {
  copy: NosotrosCopy;
  productsHref: string;
  contactHref: string;
};

const PILLAR_ICONS = [
  (
    <svg key="people" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="map" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  (
    <svg key="guide" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v4l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg key="heart" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
];

export default function NosotrosPageContent({
  copy,
  productsHref,
  contactHref,
}: Props) {
  const fadeUp = useFadeUp();
  const { hero, who, pillars, moreThan, guides, promise, finalCta } = copy;

  return (
    <div className={BOOKING_GLASS.pageWrap}>
      <section className="relative overflow-hidden pt-[calc(var(--experience-header-height,5.5rem)+1.5rem)]">
        <div className={`${LEGAL_CONTAINER} pb-16 md:pb-20 lg:pb-24`}>
          <motion.div
            className="relative overflow-hidden rounded-[1.5rem] shadow-[0_16px_48px_rgba(26,26,26,0.12)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem]">
              <Image
                src="/assets/images/products/CabalgataPicada/cabalgatapicada.webp"
                alt={hero.imageAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 72rem"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/82 via-[#1a1a1a]/55 to-[#1a1a1a]/25" />
              <div className="relative flex min-h-[22rem] flex-col justify-end p-6 sm:min-h-[26rem] sm:p-10 lg:min-h-[32rem] lg:p-14">
                <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#C89B3C]">
                  {hero.eyebrow}
                </p>
                <h1 className="font-theater max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-[2.5rem] lg:text-[2.875rem]">
                  {hero.title}
                </h1>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white sm:text-base">
                  {hero.intro}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CategoryEditorialButton href={productsHref}>
                    {hero.ctaPrimary}
                  </CategoryEditorialButton>
                  <CategoryEditorialButton href={contactHref} variant="secondary">
                    {hero.ctaSecondary}
                  </CategoryEditorialButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="nosotros-who-heading"
        className={`${LEGAL_CONTAINER} pb-20 md:pb-28`}
      >
        <motion.div
          className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center"
          {...fadeUp(0)}
        >
          <div>
            <h2 id="nosotros-who-heading" className={BOOKING_SECTION_TITLE}>
              {who.title}
            </h2>
            <div className="mt-6 space-y-4">
              {who.paragraphs.map((p, i) => (
                <p key={i} className={LEGAL_BODY}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-[#1a1a1a]/[0.07] shadow-[0_8px_32px_rgba(26,26,26,0.08)]">
            <Image
              src="/assets/images/products/ValleDeUco/valle-uco.webp"
              alt={who.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 36rem"
            />
          </div>
        </motion.div>
      </section>

      <section
        aria-labelledby="nosotros-pillars-heading"
        className={`${LEGAL_CONTAINER} pb-20 md:pb-28`}
      >
        <motion.div {...fadeUp(0)}>
          <h2 id="nosotros-pillars-heading" className={BOOKING_SECTION_TITLE}>
            {pillars.title}
          </h2>
        </motion.div>
        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6"
          variants={bookingMotion.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {pillars.items.map((item, i) => (
            <motion.article
              key={item.title}
              variants={bookingMotion.item}
              className="group rounded-[1.125rem] border border-[#1a1a1a]/[0.07] bg-white p-6 shadow-[0_4px_20px_rgba(26,26,26,0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(26,26,26,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8F5EE] text-[#7A6248]">
                {PILLAR_ICONS[i] ?? PILLAR_ICONS[0]}
              </div>
              <h3 className="font-theater text-lg font-semibold text-[#1a1a1a]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[#1a1a1a]/68">
                {item.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section
        aria-labelledby="nosotros-more-heading"
        className={`${LEGAL_CONTAINER} pb-20 md:pb-28`}
      >
        <motion.div
          className="overflow-hidden rounded-[1.25rem] border border-[#1a1a1a]/[0.07] bg-white shadow-[0_4px_24px_rgba(26,26,26,0.05)]"
          {...fadeUp(0)}
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-9 lg:p-10">
              <h2 id="nosotros-more-heading" className={BOOKING_SECTION_TITLE}>
                {moreThan.title}
              </h2>
              <div className="mt-6 space-y-4">
                {moreThan.paragraphs.map((p, i) => (
                  <p key={i} className={LEGAL_BODY}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative min-h-[16rem] lg:min-h-full">
              <Image
                src="/assets/images/products/HighMountainTour/tour-alta-montaña.webp"
                alt={moreThan.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 36rem"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section
        aria-labelledby="nosotros-guides-heading"
        className={`${LEGAL_CONTAINER} pb-20 md:pb-28`}
      >
        <motion.div
          className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14"
          {...fadeUp(0)}
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border border-[#1a1a1a]/[0.07] shadow-[0_8px_32px_rgba(26,26,26,0.08)]">
            <Image
              src="/assets/images/products/CityTour/city-tour-2.webp"
              alt={guides.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 32rem"
            />
          </div>
          <div>
            <h2 id="nosotros-guides-heading" className={BOOKING_SECTION_TITLE}>
              {guides.title}
            </h2>
            <div className="mt-6 space-y-4">
              {guides.paragraphs.map((p, i) => (
                <p key={i} className={LEGAL_BODY}>
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-[#C89B3C] pl-5">
              <p className="font-theater text-lg italic leading-snug text-[#7A6248] sm:text-xl">
                &ldquo;{guides.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </motion.div>
      </section>

      <section
        aria-labelledby="nosotros-promise-heading"
        className={`${LEGAL_CONTAINER} pb-20 md:pb-28`}
      >
        <motion.div
          className="rounded-[1.25rem] border border-[#1a1a1a]/[0.07] bg-white p-6 sm:p-9 lg:p-10"
          {...fadeUp(0)}
        >
          <h2 id="nosotros-promise-heading" className={BOOKING_SECTION_TITLE}>
            {promise.title}
          </h2>
          <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-[#1a1a1a]/72 sm:text-base">
            {promise.text}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {promise.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl bg-[#F8F5EE] px-4 py-3.5 text-[0.9375rem] leading-snug text-[#1a1a1a]/78"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C89B3C]"
                  aria-hidden
                />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section
        aria-labelledby="nosotros-cta-heading"
        className={`${LEGAL_CONTAINER} pb-24 md:pb-32`}
      >
        <motion.div className="text-center" {...fadeUp(0)}>
          <p className={BOOKING_PAGE_KICKER}>Edmar Travel</p>
          <h2
            id="nosotros-cta-heading"
            className={`${BOOKING_PAGE_TITLE} mx-auto`}
          >
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[#1a1a1a]/62 sm:text-base">
            {finalCta.text}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CategoryEditorialButton href={productsHref}>
              {finalCta.primary}
            </CategoryEditorialButton>
            <CategoryEditorialButton href={contactHref} variant="secondary">
              {finalCta.secondary}
            </CategoryEditorialButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
