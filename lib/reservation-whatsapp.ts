import type { Order } from "@/context/UserContext";
import { formatPriceARS } from "@/lib/format-price";
import { bookingIdToRequestCode } from "@/lib/reservation-code";
import { splitFullName } from "@/lib/reservation-display";
import { SITE_CONFIG } from "@/lib/config";

export type WhatsAppMessageLabels = {
  greeting: string;
  codeSection: string;
  passengerSection: string;
  experiencesSection: string;
  totalSection: string;
  notesSection: string;
  closing: string;
  labelName: string;
  labelLastName: string;
  labelEmail: string;
  labelPhone: string;
  labelCountry: string;
  labelDocument: string;
  labelAccommodation: string;
  labelQuantity: string;
  labelParty: string;
  labelDate: string;
  labelTime: string;
  labelPrice: string;
  labelSubtotal: string;
  toCoordinate: string;
};

function line(label: string, value: string | undefined | null): string | null {
  const v = value?.trim();
  if (!v) return null;
  return `${label}: ${v}`;
}

function joinSections(sections: (string | null | undefined)[]): string {
  return sections.filter(Boolean).join("\n\n");
}

export function buildReservationWhatsAppMessage(
  order: Order,
  labels: WhatsAppMessageLabels
): string {
  const requestCode =
    order.requestCode ?? bookingIdToRequestCode(order.id);
  const { firstName, lastName } = splitFullName(order.address.fullName);

  const passengerLines = [
    line(labels.labelName, firstName),
    line(labels.labelLastName, lastName),
    line(labels.labelEmail, order.address.email),
    line(labels.labelPhone, order.address.phone),
    line(labels.labelCountry, order.address.country),
    line(labels.labelDocument, order.address.idDocument),
    order.address.accommodation?.trim()
      ? line(labels.labelAccommodation, order.address.accommodation)
      : null,
  ].filter(Boolean) as string[];

  const experienceBlocks = order.items.map((item, index) => {
    const lines = [
      `${index + 1}. ${item.title}`,
      `${labels.labelQuantity}: ${item.quantity}`,
    ];
    if (order.reservation?.partySize) {
      lines.push(`${labels.labelParty}: ${order.reservation.partySize}`);
    }
    const date = order.reservation?.preferredDate?.trim();
    const time = order.reservation?.preferredTime?.trim();
    lines.push(
      `${labels.labelDate}: ${date || labels.toCoordinate}`,
      `${labels.labelTime}: ${time || labels.toCoordinate}`
    );
    lines.push(
      `${labels.labelPrice}: ${formatPriceARS(item.price)}`,
      `${labels.labelSubtotal}: ${formatPriceARS(item.price * item.quantity)}`
    );
    return lines.join("\n");
  });

  const noteParts: string[] = [];
  if (order.reservation?.notes?.trim()) {
    noteParts.push(order.reservation.notes.trim());
  }
  if (order.address.checkoutNotes?.trim()) {
    noteParts.push(order.address.checkoutNotes.trim());
  }

  const sections = [
    labels.greeting,
    `${labels.codeSection}\n${requestCode}`,
    `${labels.passengerSection}\n${passengerLines.join("\n")}`,
    `${labels.experiencesSection}\n${experienceBlocks.join("\n\n")}`,
    `${labels.totalSection}\n${formatPriceARS(order.subtotal)}`,
    noteParts.length
      ? `${labels.notesSection}\n${noteParts.join("\n\n")}`
      : null,
    labels.closing,
  ];

  return joinSections(sections);
}

export function buildWhatsAppReservationUrl(
  order: Order,
  labels: WhatsAppMessageLabels
): string | null {
  const digits = SITE_CONFIG.contact.whatsappPhone;
  if (!digits) return null;
  const text = buildReservationWhatsAppMessage(order, labels);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
