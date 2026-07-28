import Link from "next/link";
import {
  BOOKING_PAGE_INTRO,
  BOOKING_PAGE_KICKER,
  BOOKING_PAGE_TITLE,
  BOOKING_GLASS,
} from "@/lib/booking-ui";

type ReservationFlowHeaderProps = {
  kicker: string;
  title: string;
  intro: string;
  backHref?: string;
  backLabel?: string;
};

export default function ReservationFlowHeader({
  kicker,
  title,
  intro,
  backHref,
  backLabel,
}: ReservationFlowHeaderProps) {
  return (
    <header className="mb-8 md:mb-10">
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className={`mb-5 inline-flex ${BOOKING_GLASS.subtleLink}`}
        >
          {backLabel}
        </Link>
      ) : null}
      <p className={BOOKING_PAGE_KICKER}>{kicker}</p>
      <h1 className={BOOKING_PAGE_TITLE}>{title}</h1>
      <p className={BOOKING_PAGE_INTRO}>{intro}</p>
    </header>
  );
}
