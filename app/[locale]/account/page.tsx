import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import AccountPageClient from "@/components/AccountPageClient";
import { locales, type Locale } from "@/lib/i18n/config";
import type { ProfileRow } from "@/lib/auth/profile";

/**
 * Server Component: verifica sesión con cookies y lee `profiles` antes de hidratar el cliente.
 * Segunda capa respecto al middleware (`lib/supabase/middleware.ts`).
 */
export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return (
      <AccountPageClient
        locale={locale}
        initialProfile={null}
        supabaseMissing
      />
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/${locale}/auth?tab=login&next=${encodeURIComponent(`/${locale}/account`)}`
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,first_name,last_name,phone")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <AccountPageClient
      locale={locale}
      initialProfile={profile as ProfileRow | null}
    />
  );
}
