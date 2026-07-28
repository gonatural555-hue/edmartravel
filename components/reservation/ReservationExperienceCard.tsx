import Image from "next/image";
import type { CartItem } from "@/context/CartContext";
import {
  BOOKING_GLASS,
  BOOKING_TEXT_FAINT,
  BOOKING_TEXT_MUTED,
  BOOKING_TEXT_PRIMARY,
} from "@/lib/booking-ui";
import { formatPriceARS } from "@/lib/format-price";
import ReservationQtyControl from "./ReservationQtyControl";

type ReservationExperienceCardProps = {
  item: CartItem;
  variantSummary?: string;
  regionLabel?: string;
  unitPriceLabel: string;
  subtotalLabel: string;
  removeLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export default function ReservationExperienceCard({
  item,
  variantSummary,
  regionLabel,
  unitPriceLabel,
  subtotalLabel,
  removeLabel,
  decreaseLabel,
  increaseLabel,
  onDecrease,
  onIncrease,
  onRemove,
}: ReservationExperienceCardProps) {
  const itemSubtotal = item.price * item.quantity;

  return (
    <article className={BOOKING_GLASS.experienceCard}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <div className="relative mx-auto aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border border-[#1a1a1a]/8 bg-[#F8F5EE] sm:mx-0 sm:h-36 sm:w-44 sm:aspect-auto">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 176px"
            />
          ) : (
            <div className="flex h-full min-h-[9rem] items-center justify-center text-xs text-[#1a1a1a]/35 sm:min-h-0">
              —
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-semibold leading-snug ${BOOKING_TEXT_PRIMARY}`}>
            {item.title}
          </h3>

          <div className={`mt-2 space-y-1 text-sm ${BOOKING_TEXT_MUTED}`}>
            {regionLabel ? <p>{regionLabel}</p> : null}
            {variantSummary ? <p>{variantSummary}</p> : null}
            <p>
              {unitPriceLabel}:{" "}
              <span className="font-medium text-[#1a1a1a]/78">
                {formatPriceARS(item.price)}
              </span>
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ReservationQtyControl
              quantity={item.quantity}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              decreaseLabel={decreaseLabel}
              increaseLabel={increaseLabel}
            />
            <button
              type="button"
              onClick={onRemove}
              className="text-sm font-medium text-[#1a1a1a]/58 underline-offset-4 transition hover:text-[#9B3D35] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/25 rounded-sm"
            >
              {removeLabel}
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-[#1a1a1a]/8 pt-4 sm:flex-col sm:items-end sm:border-0 sm:pt-1 sm:text-right">
          <p className={`text-xs uppercase tracking-wider ${BOOKING_TEXT_FAINT} sm:mb-1`}>
            {subtotalLabel}
          </p>
          <p className={`text-xl font-semibold ${BOOKING_TEXT_PRIMARY}`}>
            {formatPriceARS(itemSubtotal)}
          </p>
        </div>
      </div>
    </article>
  );
}
