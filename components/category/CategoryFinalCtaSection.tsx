"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CategoryEditorialButton from "./CategoryEditorialButton";

type CategoryFinalCtaSectionProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  primaryHref: string;
  secondaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
};

export default function CategoryFinalCtaSection({
  title,
  imageSrc,
  imageAlt,
  primaryHref,
  secondaryHref,
  primaryLabel,
  secondaryLabel,
}: CategoryFinalCtaSectionProps) {
  return (
    <section className="relative isolate min-h-[min(88vh,720px)] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-black/45"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[min(88vh,720px)] items-center justify-center px-6 py-24 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-center"
        >
          <h2 className="font-theater text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
            {title}
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CategoryEditorialButton
              href={primaryHref}
              variant="primary"
              className="min-w-[200px] border-white/30 bg-white text-[#1a1a1a] hover:border-white hover:bg-white hover:text-[#1a1a1a]"
            >
              {primaryLabel}
            </CategoryEditorialButton>
            <CategoryEditorialButton
              href={secondaryHref}
              variant="secondary"
              className="min-w-[200px] border-white/40 text-white hover:border-white hover:bg-white hover:text-[#1a1a1a]"
            >
              {secondaryLabel}
            </CategoryEditorialButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
