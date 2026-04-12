import { redirect } from "next/navigation";

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
  redirect(`/${locale}/auth?tab=register`);
}
