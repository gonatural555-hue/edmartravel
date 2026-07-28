import Link from "next/link";
import Image from "next/image";
import type { TourismExperience } from "@/lib/product-types";
import { formatPriceARS } from "@/lib/format-price";
import { getSafeLocalImageSrc } from "@/lib/product-image-helper";

type RecommendedExperiencesProps = {
  title: string;
  subtitle: string;
  products: TourismExperience[];
  locale: string;
  viewLabel: string;
  noImageLabel: string;
  excludeIds?: string[];
};

export default function RecommendedExperiences({
  title,
  subtitle,
  products,
  locale,
  viewLabel,
  noImageLabel,
  excludeIds = [],
}: RecommendedExperiencesProps) {
  const filtered = products
    .filter((p) => !excludeIds.includes(p.id))
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="border-t border-[#1a1a1a]/8 pt-10 md:pt-12">
      <h2 className="font-theater text-xl font-semibold uppercase tracking-wide text-[#1a1a1a] md:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1a1a1a]/55">
        {subtitle}
      </p>
      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {filtered.map((product) => {
          const img = getSafeLocalImageSrc(product.images?.[0]);
          const price =
            typeof product.price === "number" && product.price > 0
              ? formatPriceARS(product.price)
              : null;
          return (
            <article
              key={product.id}
              className="min-w-[16.5rem] shrink-0 rounded-[1.125rem] border border-[#1a1a1a]/8 bg-white p-4 shadow-[0_2px_12px_rgba(26,26,26,0.04)] md:min-w-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#F8F5EE]">
                {img ? (
                  <Image
                    src={img}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[#1a1a1a]/35">
                    {noImageLabel}
                  </div>
                )}
              </div>
              <h3 className="mt-4 line-clamp-2 text-base font-semibold leading-snug text-[#1a1a1a]">
                {product.title}
              </h3>
              {product.location ? (
                <p className="mt-1 text-xs text-[#1a1a1a]/50">{product.location}</p>
              ) : null}
              {price ? (
                <p className="mt-2 text-sm font-semibold text-[#1a1a1a]">{price}</p>
              ) : null}
              <Link
                href={`/${locale}/products/${product.id}`}
                className="mt-4 inline-flex text-sm font-medium text-[#7A6248] underline-offset-4 hover:text-[#1a1a1a]"
              >
                {viewLabel}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
