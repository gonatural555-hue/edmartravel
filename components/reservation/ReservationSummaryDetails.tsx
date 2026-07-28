import type { Order } from "@/context/UserContext";
import { splitFullName } from "@/lib/reservation-display";
import { formatPriceARS } from "@/lib/format-price";
import { formatReservationForLocale } from "@/lib/reservation-display";
import ReservationPriceRow, {
  ReservationMetaRow,
} from "./ReservationPriceRow";

type ReservationSummaryDetailsProps = {
  order: Order;
  locale: string;
  title: string;
  labels: {
    quantity: string;
    unitPrice: string;
    date: string;
    time: string;
    party: string;
    total: string;
    toCoordinate: string;
    undefinedDate: string;
    undefinedTime: string;
    undefinedParty: string;
  };
};

export function ReservationOrderItemsSummary({
  order,
  locale,
  title,
  labels,
}: ReservationSummaryDetailsProps) {
  const slot = formatReservationForLocale(locale, order.reservation, {
    date: labels.undefinedDate,
    time: labels.undefinedTime,
    party: labels.undefinedParty,
  });

  return (
    <section>
      <h2 className="font-theater text-xl font-semibold text-[#1a1a1a]">{title}</h2>
      <ul className="mt-6 space-y-5">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="border-b border-[#1a1a1a]/8 pb-5 last:border-0 last:pb-0"
          >
            <p className="font-semibold text-[#1a1a1a]">{item.title}</p>
            <dl className="mt-2 space-y-1.5 text-sm text-[#1a1a1a]/62">
              <div className="flex justify-between gap-3">
                <dt>{labels.quantity}</dt>
                <dd className="font-medium text-[#1a1a1a]">{item.quantity}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>{labels.unitPrice}</dt>
                <dd className="font-medium text-[#1a1a1a]">
                  {formatPriceARS(item.price)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-[#1a1a1a]">
                  {formatPriceARS(item.price * item.quantity)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-2.5 border-t border-[#1a1a1a]/8 pt-5">
        <ReservationMetaRow label={labels.date} value={slot.date} />
        <ReservationMetaRow label={labels.time} value={slot.time} />
        <ReservationMetaRow label={labels.party} value={slot.party} />
      </div>
      <div className="mt-6 border-t border-[#1a1a1a]/8 pt-5">
        <ReservationPriceRow
          label={labels.total}
          value={formatPriceARS(order.subtotal)}
          emphasis
        />
      </div>
    </section>
  );
}

type CustomerDetailsProps = {
  order: Order;
  title: string;
  labels: Record<string, string>;
};

export function ReservationCustomerDetails({
  order,
  title,
  labels,
}: CustomerDetailsProps) {
  const { firstName, lastName } = splitFullName(order.address.fullName);
  const rows: { key: string; value?: string }[] = [
    { key: labels.firstName, value: firstName },
    { key: labels.lastName, value: lastName },
    { key: labels.email, value: order.address.email },
    { key: labels.phone, value: order.address.phone },
    { key: labels.country, value: order.address.country },
    { key: labels.document, value: order.address.idDocument },
    { key: labels.accommodation, value: order.address.accommodation },
    { key: labels.notes, value: order.address.checkoutNotes },
  ].filter((r) => r.value?.trim());

  const reservationNotes = order.reservation?.notes?.trim();
  if (reservationNotes) {
    rows.push({ key: labels.experienceNotes, value: reservationNotes });
  }

  return (
    <section>
      <h2 className="font-theater text-xl font-semibold text-[#1a1a1a]">{title}</h2>
      <dl className="mt-6 space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/45">
              {row.key}
            </dt>
            <dd className="text-sm leading-relaxed text-[#1a1a1a]/78">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
