import { BOOKING_TEXT_FAINT, BOOKING_TEXT_PRIMARY, BOOKING_TEXT_SECONDARY } from "@/lib/booking-ui";

type ReservationPriceRowProps = {
  label: string;
  value: string;
  emphasis?: boolean;
};

export default function ReservationPriceRow({
  label,
  value,
  emphasis = false,
}: ReservationPriceRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span
        className={
          emphasis
            ? `text-sm font-semibold uppercase tracking-[0.12em] ${BOOKING_TEXT_PRIMARY}`
            : `text-sm ${BOOKING_TEXT_SECONDARY}`
        }
      >
        {label}
      </span>
      <span
        className={
          emphasis
            ? `text-2xl font-semibold tracking-tight ${BOOKING_TEXT_PRIMARY}`
            : `shrink-0 text-sm font-semibold ${BOOKING_TEXT_PRIMARY}`
        }
      >
        {value}
      </span>
    </div>
  );
}

export function ReservationMetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className={BOOKING_TEXT_SECONDARY}>{label}</span>
      <span className={`text-right font-medium ${BOOKING_TEXT_PRIMARY}`}>
        {value}
      </span>
    </div>
  );
}

export function ReservationSummaryNote({ children }: { children: React.ReactNode }) {
  return (
    <p className={`text-xs leading-relaxed ${BOOKING_TEXT_FAINT}`}>{children}</p>
  );
}
