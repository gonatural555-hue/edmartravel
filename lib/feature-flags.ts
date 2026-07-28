/**
 * UI de login / cuenta. Default: deshabilitada (checkout como invitado).
 * Para reactivar auth: NEXT_PUBLIC_AUTH_UI_ENABLED=true en Vercel / .env.local
 */
export function isAuthUiEnabled(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_UI_ENABLED === "true";
}
