import { redirect } from "next/navigation";
import { isAuthUiEnabled } from "@/lib/feature-flags";

/**
 * Ruta de conveniencia: /{locale}/register → formulario de registro canónico.
 * El middleware también envía /register sin locale hacia /{defaultLocale}/register.
 */
export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAuthUiEnabled()) {
    redirect(`/${locale}/products`);
  }
  redirect(`/${locale}/auth?tab=register`);
}
