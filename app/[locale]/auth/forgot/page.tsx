"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  createBrowserSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setMessage("Supabase no está configurado. Revisá .env.local");
      return;
    }

    setStatus("loading");
    try {
      const supabase = createBrowserSupabaseClient();
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
        (typeof window !== "undefined" ? window.location.origin : "");
      const nextPath = `/${locale}/auth/update-password`;
      const redirectTo = `${siteUrl}/auth/callback?next=${encodeURIComponent(nextPath)}`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo }
      );

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("sent");
      setMessage(
        "Si el email existe, recibirás un enlace para restablecer la contraseña."
      );
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  return (
    <main className="min-h-[100dvh] bg-dark-base px-4 py-12 md:py-20">
      <div className="max-w-md mx-auto">
        <Link
          href={`/${locale}/auth?tab=login`}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors duration-200 mb-8"
        >
          ← Volver al inicio de sesión
        </Link>

        <div className="bg-dark-surface/40 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Recuperar contraseña
          </h1>
          <p className="text-sm text-text-muted mb-6">
            Te enviamos un enlace al correo para elegir una nueva contraseña.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-4 py-3 text-sm text-text-primary focus:border-accent-gold/60 focus:outline-none"
                placeholder="tuemail@email.com"
              />
            </div>

            {message && (
              <p
                className={`text-sm ${status === "error" ? "text-red-300" : "text-emerald-200"}`}
                role="alert"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-text-primary px-4 py-3 text-sm font-semibold text-dark-base hover:bg-white transition disabled:opacity-50"
            >
              {status === "loading" ? "Enviando…" : "Enviar enlace"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
