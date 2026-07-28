import { NextRequest, NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isAuthUiEnabled } from "@/lib/feature-flags";
import { createServiceSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { formatPriceARS } from "@/lib/format-price";

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
      `${i.quantity}× ${i.title} (${i.id}) — ${formatPriceARS(i.price * i.quantity)}`
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

type BookingInsertPayload = {
  user_id: string | null;
  status: "pending" | "confirmed";
  currency: string;
  total_amount: number;
  notes: string;
  country: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  accommodation: string | null;
  checkout_notes: string | null;
  experience_notes: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  party_size: number | null;
  payment_method: "manual" | "whatsapp" | "paypal";
};

async function insertBookingWithPassenger(
  supabase: SupabaseClient,
  payload: BookingInsertPayload,
  passenger: {
    first_name: string;
    last_name: string;
    document_id: string;
  }
): Promise<
  { ok: true; bookingId: string } | { ok: false; error: string; message: string }
> {
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert(payload)
    .select("id")
    .single();

  if (bookingError || !booking) {
    console.error("[bookings API] insert booking", bookingError);
    return {
      ok: false,
      error: "BOOKING_INSERT_FAILED",
      message: bookingError?.message ?? "No se pudo crear la reserva",
    };
  }

  const { error: passengerError } = await supabase
    .from("booking_passengers")
    .insert({
      booking_id: booking.id,
      first_name: passenger.first_name,
      last_name: passenger.last_name,
      document_id: passenger.document_id || null,
      birth_date: null,
    });

  if (passengerError) {
    console.error("[bookings API] insert passenger", passengerError);
    await supabase.from("bookings").delete().eq("id", booking.id);
    return {
      ok: false,
      error: "PASSENGER_INSERT_FAILED",
      message: passengerError.message,
    };
  }

  return { ok: true, bookingId: booking.id };
}

export async function POST(request: NextRequest) {
  try {
    const sessionSupabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await sessionSupabase.auth.getUser();

    const guestCheckoutAllowed = !isAuthUiEnabled();

    if ((authError || !user) && !guestCheckoutAllowed) {
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

    const status = paymentMethod === "paypal" ? "confirmed" : "pending";

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

    const bookingPayload: BookingInsertPayload = {
      user_id: user?.id ?? null,
      status,
      currency: "ARS",
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
    };

    let supabase: SupabaseClient;
    if (user) {
      supabase = sessionSupabase;
    } else {
      try {
        supabase = createServiceSupabaseClient();
      } catch (e) {
        console.error("[bookings API] guest checkout missing service role", e);
        return NextResponse.json(
          {
            error: "INTERNAL",
            message: "Reservas de invitado no configuradas (SUPABASE_SERVICE_ROLE_KEY)",
          },
          { status: 500 }
        );
      }
    }

    const result = await insertBookingWithPassenger(supabase, bookingPayload, {
      first_name,
      last_name,
      document_id: trimmed.idDocument,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error, message: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookingId: result.bookingId });
  } catch (e) {
    console.error("[bookings API]", e);
    return NextResponse.json(
      { error: "INTERNAL", message: "Error interno" },
      { status: 500 }
    );
  }
}
