import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ContactRequestInsert } from "@/lib/supabase/database.types";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 12000;
const MAX_PHONE = 50;
const MAX_EXPERIENCE = 200;
const MAX_ORIGIN = 500;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: string, max: number): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").slice(0, max);
}

function buildContactMessage(payload: {
  message: string;
  phone?: string;
  experienceLabel?: string;
  approximateDate?: string;
  partySize?: number;
  originUrl?: string;
}): string {
  const lines: string[] = [payload.message.trim(), "", "---", "Datos de la consulta:"];

  if (payload.phone) lines.push(`Teléfono / WhatsApp: ${payload.phone}`);
  if (payload.experienceLabel) {
    lines.push(`Experiencia de interés: ${payload.experienceLabel}`);
  }
  if (payload.approximateDate) {
    lines.push(`Fecha aproximada: ${payload.approximateDate}`);
  }
  if (payload.partySize != null && payload.partySize > 0) {
    lines.push(`Cantidad de personas: ${payload.partySize}`);
  }
  lines.push(`Enviado: ${new Date().toISOString()}`);
  if (payload.originUrl) lines.push(`Origen: ${payload.originUrl}`);

  return lines.join("\n").slice(0, MAX_MESSAGE);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? sanitize(body.name.trim(), MAX_NAME) : "";
    const email = typeof body.email === "string" ? sanitize(body.email.trim(), MAX_EMAIL) : "";
    const messageRaw =
      typeof body.message === "string" ? sanitize(body.message.trim(), MAX_MESSAGE) : "";
    const phoneRaw =
      typeof body.phone === "string" ? sanitize(body.phone.trim(), MAX_PHONE) : "";

    const experienceLabel =
      typeof body.experienceLabel === "string"
        ? sanitize(body.experienceLabel.trim(), MAX_EXPERIENCE)
        : typeof body.experienceInterest === "string"
          ? sanitize(body.experienceInterest.trim(), MAX_EXPERIENCE)
          : "";

    const approximateDate =
      typeof body.approximateDate === "string"
        ? sanitize(body.approximateDate.trim(), 32)
        : "";

    const partySizeRaw = body.partySize;
    const partySize =
      typeof partySizeRaw === "number" && Number.isInteger(partySizeRaw) && partySizeRaw > 0
        ? partySizeRaw
        : undefined;

    const originUrl =
      typeof body.originUrl === "string"
        ? sanitize(body.originUrl.trim(), MAX_ORIGIN)
        : "";

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "INVALID_NAME" }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
    }
    if (!messageRaw || messageRaw.length < 10) {
      return NextResponse.json({ error: "INVALID_MESSAGE" }, { status: 400 });
    }

    const composedMessage = buildContactMessage({
      message: messageRaw,
      phone: phoneRaw || undefined,
      experienceLabel: experienceLabel || undefined,
      approximateDate: approximateDate || undefined,
      partySize,
      originUrl: originUrl || undefined,
    });

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const row: ContactRequestInsert = {
      name,
      email,
      message: composedMessage,
      phone: phoneRaw || null,
      profile_id: user?.id ?? null,
    };

    const { error } = await supabase.from("contact_requests").insert(row);

    if (error) {
      console.error("[contact] insert:", error);
      return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
}
