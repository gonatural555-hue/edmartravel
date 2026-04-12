import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { defaultLocale } from "@/lib/i18n/config";

/**
 * Intercambia el ?code= de Supabase (email confirm, OAuth, recovery) por sesión.
 * URL en Supabase Dashboard → Authentication → URL Configuration → Redirect URLs:
 *   http://localhost:3000/auth/callback
 *   https://TU_DOMINIO/auth/callback
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? `/${defaultLocale}/account`;
  if (!next.startsWith("/")) next = `/${next}`;

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback]", error.message);
      return NextResponse.redirect(
        `${origin}/${defaultLocale}/auth?tab=login&error=${encodeURIComponent(error.message)}`
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
