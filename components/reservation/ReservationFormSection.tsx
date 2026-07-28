import { BOOKING_SECTION_HINT, BOOKING_SECTION_TITLE } from "@/lib/booking-ui";

type ReservationFormSectionProps = {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
};

export default function ReservationFormSection({
  title,
  hint,
  children,
  className = "",
}: ReservationFormSectionProps) {
  return (
    <section className={className}>
      <h2 className={BOOKING_SECTION_TITLE}>{title}</h2>
      {hint ? <p className={BOOKING_SECTION_HINT}>{hint}</p> : null}
      <div className="mt-7">{children}</div>
    </section>
  );
}
