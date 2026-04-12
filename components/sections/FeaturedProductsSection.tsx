"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import ProductCardSimple from "@/components/ProductCardSimple";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  products: Product[];
  locale: Locale;
  title: string;
  subtitle: string;
  labels?: {
    viewProduct?: string;
    noImage?: string;
    addToCart?: string;
  };
};

export default function FeaturedProductsSection({
  products,
  locale,
  title,
  subtitle,
  labels,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const featuredIds = [
    "cabalgata-picada-potrerillos",
    "mono-city-tour-mendoza",
    "private-winery-transfers-mendoza",
  ];

  const featured = featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  if (products.length === 0 || featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-dark-base py-24 md:py-32">
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 fade-up ${
          isVisible ? "fade-visible" : ""
        }`}
      >
        <header className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
            {title}
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl">
            {subtitle}
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCardSimple
              key={product.id}
              product={product}
              locale={locale}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

