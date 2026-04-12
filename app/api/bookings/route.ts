import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type CartItemInput = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type TravelerInput = {
  fullName: string;
  idDocument: string;
  email: string;
  phone: string;
  country: string;
  accommodation?: string;
  checkoutNotes?: string;
};

type ReservationInput = {
  preferredDate?: string;
  preferredTime?: string;
  partySize?: number;
  notes?: string;
};

type Body = {
  traveler?: TravelerInput;
  items?: CartItemInput[];
  subtotal?: number;
  paymentMethod?: "manual" | "whatsapp" | "paypal";
  paypalOrderId?: string;
  reservation?: ReservationInput;
};

function splitFullName(full: string): { first_name: string; last_name: string } {
  const t = full.trim();
  if (!t) return { first_name: "—", last_name: "—" };
  const i = t.indexOf(" ");
  if (i === -1) return { first_name: t, last_name: "—" };
  const first = t.slice(0, i).trim();
  const rest = t.slice(i + 1).trim();
  return { first_name: first || "—", last_name: rest || "—" };
}

function buildNotes(
  items: CartItemInput[],
  paymentMethod: string,
  paypalOrderId: string | undefined,
  reservation: ReservationInput | undefined,
  travelerExtras: { accommodation?: string; checkoutNotes?: string }
): string {
  const lines = items.map(
    (i) =>
      `${i.quantity}× ${i.title} (${i.id}) — ${i.price * i.quantity} USD`
  );
  const resLines: string[] = [];
  if (reservation) {
    const d = reservation.preferredDate?.trim();
    const tm = reservation.preferredTime?.trim();
    const n = reservation.notes?.trim();
    if (d || tm) {
      resLines.push(
        `reserva: fecha ${d || "—"} · hora ${tm || "—"} · personas ${typeof reservation.partySize === "number" ? reservation.partySize : "—"}`
      );
    }
    if (n) resLines.push(`notas experiencia: ${n}`);
  }
  if (travelerExtras.accommodation?.trim()) {
    resLines.push(`alojamiento: ${travelerExtras.accommodation.trim()}`);
  }
  if (travelerExtras.checkoutNotes?.trim()) {
    resLines.push(`notas checkout: ${travelerExtras.checkoutNotes.trim()}`);
  }
  const tail = [
    `payment: ${paymentMethod}`,
    paypalOrderId ? `paypal_order_id: ${paypalOrderId}` : null,
    `participants: lead traveler only (single booking_passengers row; total spots in cart summary above).`,
  ]
    .filter(Boolean)
    .join(" | ");
  return [...lines, ...resLines, tail].join("\n");
}

function sumItems(items: CartItemInput[]): number {
  return items.reduce((acc, i) => acc + i.price * i.quantity, 0);
}

function nullIfEmpty(s: string | undefined): string | null {
  const t = s?.trim();
  return t ? t : null;
}

/** Acepta solo YYYY-MM-DD (input type=date). */
function parsePreferredDate(s: string | undefined): string | null {
  const t = s?.trim();
  if (!t || !/^\d{4}-\d{2}-\d{2}$/.test(t)) return null;
  return t;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Sesión requerida" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as Body;
    const { traveler, items, subtotal, paymentMethod, paypalOrderId, reservation } =
      body;

    if (
      !traveler ||
      typeof traveler.fullName !== "string" ||
      typeof traveler.idDocument !== "string" ||
      typeof traveler.email !== "string" ||
      typeof traveler.phone !== "string" ||
      typeof traveler.country !== "string"
    ) {
      return NextResponse.json(
        { error: "INVALID_TRAVELER", message: "Datos de viajero incompletos" },
        { status: 400 }
      );
    }

    const trimmed = {
      fullName: traveler.fullName.trim(),
      idDocument: traveler.idDocument.trim(),
      email: traveler.email.trim(),
      phone: traveler.phone.trim(),
      country: traveler.country.trim(),
    };

    if (
      !trimmed.fullName ||
      !trimmed.idDocument ||
      !trimmed.email ||
      !trimmed.phone ||
      !trimmed.country
    ) {
      return NextResponse.json(
        { error: "INVALID_TRAVELER", message: "Datos de viajero incompletos" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "INVALID_ITEMS", message: "El carrito está vacío" },
        { status: 400 }
      );
    }

    for (const it of items) {
      if (
        typeof it.id !== "string" ||
        typeof it.title !== "string" ||
        typeof it.price !== "number" ||
        typeof it.quantity !== "number" ||
        it.quantity < 1
      ) {
        return NextResponse.json(
          { error: "INVALID_ITEMS", message: "Ítems inválidos" },
          { status: 400 }
        );
      }
    }

    if (typeof subtotal !== "number" || Number.isNaN(subtotal) || subtotal < 0) {
      return NextResponse.json(
        { error: "INVALID_SUBTOTAL", message: "Subtotal inválido" },
        { status: 400 }
      );
    }

    const computed = sumItems(items);
    if (Math.abs(computed - subtotal) > 0.02) {
      return NextResponse.json(
        {
          error: "SUBTOTAL_MISMATCH",
          message: "El total no coincide con los ítems",
        },
        { status: 400 }
      );
    }

    if (
      paymentMethod !== "manual" &&
      paymentMethod !== "whatsapp" &&
      paymentMethod !== "paypal"
    ) {
      return NextResponse.json(
        { error: "INVALID_PAYMENT", message: "Método de pago inválido" },
        { status: 400 }
      );
    }

    const status =
      paymentMethod === "paypal" ? "confirmed" : "pending";

    const notes = buildNotes(items, paymentMethod, paypalOrderId, reservation, {
      accommodation:
        typeof traveler.accommodation === "string"
          ? traveler.accommodation
          : undefined,
      checkoutNotes:
        typeof traveler.checkoutNotes === "string"
          ? traveler.checkoutNotes
          : undefined,
    });

    const { first_name, last_name } = splitFullName(trimmed.fullName);

    const accommodation =
      typeof traveler.accommodation === "string"
        ? traveler.accommodation.trim()
        : "";
    const checkoutNotesRaw =
      typeof traveler.checkoutNotes === "string"
        ? traveler.checkoutNotes.trim()
        : "";

    const partySize =
      reservation &&
      typeof reservation.partySize === "number" &&
      Number.isFinite(reservation.partySize) &&
      reservation.partySize > 0
        ? Math.min(999, Math.floor(reservation.partySize))
        : null;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        status,
        currency: "USD",
        total_amount: subtotal,
        notes,
        country: nullIfEmpty(trimmed.country),
        contact_email: nullIfEmpty(trimmed.email),
        contact_phone: nullIfEmpty(trimmed.phone),
        accommodation: nullIfEmpty(accommodation),
        checkout_notes: nullIfEmpty(checkoutNotesRaw),
        experience_notes: nullIfEmpty(reservation?.notes?.trim()),
        preferred_date: parsePreferredDate(reservation?.preferredDate),
        preferred_time: nullIfEmpty(reservation?.preferredTime?.trim()),
        party_size: partySize,
        payment_method: paymentMethod,
      })
      .select("id")
      .single();

    if (bookingError || !booking) {
      console.error("[bookings API] insert booking", bookingError);
      return NextResponse.json(
        {
          error: "BOOKING_INSERT_FAILED",
          message: bookingError?.message ?? "No se pudo crear la reserva",
        },
        { status: 500 }
      );
    }

    const { error: passengerError } = await supabase
      .from("booking_passengers")
      .insert({
        booking_id: booking.id,
        first_name,
        last_name,
        document_id: trimmed.idDocument || null,
        birth_date: null,
      });

    if (passengerError) {
      console.error("[bookings API] insert passenger", passengerError);
      await supabase.from("bookings").delete().eq("id", booking.id);
      return NextResponse.json(
        {
          error: "PASSENGER_INSERT_FAILED",
          message: passengerError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookingId: booking.id });
  } catch (e) {
    console.error("[bookings API]", e);
    return NextResponse.json(
      { error: "INTERNAL", message: "Error interno" },
      { status: 500 }
    );
  }
}
