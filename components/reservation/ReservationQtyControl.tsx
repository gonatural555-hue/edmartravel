import { BOOKING_QTY_BTN, BOOKING_QTY_CONTROL } from "@/lib/booking-ui";

type ReservationQtyControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  decreaseLabel: string;
  increaseLabel: string;
  minQuantity?: number;
};

export default function ReservationQtyControl({
  quantity,
  onDecrease,
  onIncrease,
  decreaseLabel,
  increaseLabel,
  minQuantity = 1,
}: ReservationQtyControlProps) {
  return (
    <div className={BOOKING_QTY_CONTROL}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= minQuantity}
        className={BOOKING_QTY_BTN}
        aria-label={decreaseLabel}
      >
        −
      </button>
      <span
        className="min-w-[2.75rem] border-x border-[#1a1a1a]/12 px-3 py-2 text-center text-sm font-semibold text-[#1a1a1a]"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className={BOOKING_QTY_BTN}
        aria-label={increaseLabel}
      >
        +
      </button>
    </div>
  );
}
