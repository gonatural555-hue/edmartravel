import type { Locale } from "@/lib/i18n/config";

export const IMMERSIVE_HEADER_LABELS: Record<
  Locale,
  { login: string; myAccount: string; reservations: string }
> = {
  es: {
    login: "Ingresar",
    myAccount: "Mi Cuenta",
    reservations: "Mis Reservas",
  },
  en: {
    login: "Login",
    myAccount: "My Account",
    reservations: "My Reservations",
  },
};
