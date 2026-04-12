import ProductCardSimple from "@/components/ProductCardSimple";
import type { Product } from "@/lib/products";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  title: string;
  items: Product[];
  locale: Locale;
  viewLabel: string;
  bookLabel: string;
  noImageLabel: string;
};

export default function RelatedExperiences({
  title,
  items,
  locale,
  viewLabel,
  bookLabel,
  noImageLabel,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section
      className="border-t border-white/10 bg-dark-surface/40 py-16 md:py-20"
      aria-labelledby="related-experiences-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <h2
          id="related-experiences-heading"
          className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl"
        >
          {title}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <ProductCardSimple
              key={item.id}
              product={item}
              locale={locale}
              labels={{
                viewProduct: viewLabel,
                addToCart: bookLabel,
                noImage: noImageLabel,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
