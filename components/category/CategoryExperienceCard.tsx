"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ProductCardVideo, {
  usePrefersReducedMotion,
} from "@/components/product/ProductCardVideo";
import { formatPriceARS } from "@/lib/format-price";
import { PRODUCT_BLUR_DATA_URL } from "@/lib/product-image-helper";
import type { ProductCardVideo as ProductCardVideoType } from "@/lib/product-types";
import CategoryEditorialButton from "./CategoryEditorialButton";

export type CategoryExperienceItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  href: string;
  bookHref: string;
  cardVideo?: ProductCardVideoType;
};

type CategoryExperienceCardProps = {
  item: CategoryExperienceItem;
  size: "featured" | "medium" | "compact";
  fromPriceLabel: string;
  viewLabel: string;
  bookLabel: string;
  index: number;
};

export default function CategoryExperienceCard({
  item,
  size,
  fromPriceLabel,
  viewLabel,
  bookLabel,
  index,
}: CategoryExperienceCardProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const showVideo =
    Boolean(item.cardVideo?.src) && !videoFailed && !prefersReducedMotion;

  const imageRadius =
    size === "featured" ? "rounded-[36px]" : "rounded-[32px]";
  const titleClass =
    size === "featured"
      ? "text-[clamp(1.75rem,3vw,2.75rem)]"
      : size === "medium"
        ? "text-[clamp(1.35rem,2.2vw,2rem)]"
        : "text-[clamp(1.15rem,1.8vw,1.5rem)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col"
    >
      <Link
        href={item.href}
        className={`relative block aspect-video overflow-hidden ${imageRadius} shadow-[0_20px_60px_rgba(26,26,26,0.08)] transition-shadow duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_28px_70px_rgba(26,26,26,0.14)]`}
      >
        {showVideo && item.cardVideo ? (
          <ProductCardVideo
            cardVideo={item.cardVideo}
            title={item.title}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            sizes={
              size === "featured"
                ? "(max-width: 1024px) 100vw, 70vw"
                : size === "medium"
                  ? "(max-width: 1024px) 100vw, 45vw"
                  : "(max-width: 1024px) 100vw, 33vw"
            }
            placeholder="blur"
            blurDataURL={PRODUCT_BLUR_DATA_URL}
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
        <h3
          className={`mt-8 font-theater font-semibold leading-[1.08] tracking-[-0.02em] text-product-card-title ${titleClass}`}
        >
          <Link
            href={item.href}
            className="text-product-card-title transition-colors hover:text-product-card-title/80"
          >
            {item.title}
          </Link>
        </h3>

        <p className="mt-3 text-base font-medium tracking-[0.02em] text-[#1a1a1a]/65 md:text-lg">
          {fromPriceLabel} {formatPriceARS(item.price)}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CategoryEditorialButton href={item.href} variant="primary">
            {viewLabel}
          </CategoryEditorialButton>
          <CategoryEditorialButton href={item.bookHref} variant="secondary">
            {bookLabel}
          </CategoryEditorialButton>
        </div>
      </div>
    </motion.article>
  );
}
