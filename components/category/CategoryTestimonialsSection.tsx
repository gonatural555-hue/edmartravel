"use client";

import { motion } from "framer-motion";

export type CategoryTestimonial = {
  quote: string;
  author: string;
  location: string;
};

type CategoryTestimonialsSectionProps = {
  items: CategoryTestimonial[];
};

export default function CategoryTestimonialsSection({
  items,
}: CategoryTestimonialsSectionProps) {
  if (!items.length) return null;

  return (
    <section className="category-page-section border-t border-[#1a1a1a]/8 px-6 py-24 sm:px-10 md:py-32 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
        {items.map((item, index) => (
          <motion.blockquote
            key={`${item.author}-${index}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col"
          >
            <div className="flex gap-0.5 text-[#C89B3C]" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="mt-6 text-xl leading-relaxed tracking-[0.01em] text-[#1a1a1a]/80 md:text-[1.35rem] md:leading-[1.65]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-8 text-sm font-medium tracking-[0.06em] text-[#1a1a1a]/55">
              {item.author} — {item.location}
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
