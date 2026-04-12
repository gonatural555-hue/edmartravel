import { Product } from "@/lib/products";
import ProductCardSimple from "./ProductCardSimple";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  products: Product[];
  locale: Locale;
  /** Tarjetas con sombra flotante (p. ej. sobre wine-burgundy). */
  elevatedCards?: boolean;
  /** Desde `sm`: máximo 2 columnas (p. ej. listado /products). Si es false, en `lg` hay 3 columnas. */
  twoColumnLayout?: boolean;
  /**
   * Listado principal `/products`: grid con `items-start`, gaps un poco mayores y
   * `ProductCardSimple` en variante `listing` (texto completo, media 4:3).
   */
  listingLayout?: boolean;
  labels?: {
    viewProduct?: string;
    noImage?: string;
    addToCart?: string;
  };
};

export default function ProductGridSimple({
  products,
  locale,
  elevatedCards = false,
  twoColumnLayout = false,
  listingLayout = false,
  labels,
}: Props) {
  const gridClass = (() => {
    if (listingLayout && elevatedCards && twoColumnLayout) {
      return "grid grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-9 lg:gap-11";
    }
    if (elevatedCards && twoColumnLayout) {
      return "grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:gap-10";
    }
    if (elevatedCards) {
      return "grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10";
    }
    if (twoColumnLayout) {
      return "grid grid-cols-1 gap-6 sm:grid-cols-2";
    }
    return "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";
  })();

  const cardVariant = listingLayout ? "listing" : "default";

  return (
    <section className={gridClass}>
      {products.map((product) => (
        <ProductCardSimple
          key={product.id}
          product={product}
          locale={locale}
          elevated={elevatedCards}
          cardVariant={cardVariant}
          labels={labels}
        />
      ))}
    </section>
  );
}
