import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ContactRequestInsert } from "@/lib/supabase/database.types";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 12000;
const MAX_PHONE = 50;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || name.length > MAX_NAME) {
      return NextResponse.json({ error: "INVALID_NAME" }, { status: 400 });
    }
    if (!email || email.length > MAX_EMAIL || !isValidEmail(email)) {
      return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
    }
    if (!message || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "INVALID_MESSAGE" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const row: ContactRequestInsert = {
      name,
      email,
      message,
      phone: phoneRaw ? phoneRaw.slice(0, MAX_PHONE) : null,
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
