"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import AccountAddresses from "@/components/AccountAddresses";
import AccountProfileForm from "@/components/AccountProfileForm";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import type { ProfileRow } from "@/lib/auth/profile";
import { formatPriceARS } from "@/lib/format-price";

type SectionKey = "account" | "orders" | "addresses";

export type AccountPageClientProps = {
  /** Locale de la ruta (alineado con `[locale]`). */
  locale: string;
  /**
   * Fila `profiles` leída en el Server Component (opcional, UX / primera pintura).
   * La fuente de verdad interactiva sigue siendo `useUser()` en el cliente.
   */
  initialProfile: ProfileRow | null;
  /** Sin variables Supabase en el entorno (mensaje de configuración). */
  supabaseMissing?: boolean;
};

export default function AccountPageClient({
  locale: localeProp,
  initialProfile,
  supabaseMissing = false,
}: AccountPageClientProps) {
  const { isLoggedIn, user, logout, orders, authInitialized } = useUser();
  const router = useRouter();
  const localeFromContext = useLocale();
  const locale = localeProp || localeFromContext;
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState<SectionKey>("account");

  const userOrders = orders;

  /** Refuerzo: si el servidor renderizó la página con sesión pero el cliente aún no sincronizó. */
  useEffect(() => {
    if (!authInitialized) return;
    if (!isSupabaseConfigured()) return;
    if (!isLoggedIn) {
      const next = encodeURIComponent(`/${locale}/account`);
      router.replace(`/${locale}/auth?tab=login&next=${next}`);
    }
  }, [authInitialized, isLoggedIn, locale, router]);

  const displayName =
    user?.name ||
    (initialProfile
      ? [initialProfile.first_name, initialProfile.last_name]
          .filter(Boolean)
          .join(" ")
          .trim() || initialProfile.email?.split("@")[0]
      : null) ||
    t("accountPage.userLabel");

  const displayEmail =
    user?.email ?? initialProfile?.email ?? "";

  const content = useMemo(() => {
    if (activeSection === "orders") {
      if (userOrders.length === 0) {
        return (
          <div className="rounded-2xl border border-white/10 bg-dark-surface/30 p-6">
            <p className="text-sm text-text-muted">
              {t("accountPage.noOrders")}
            </p>
          </div>
        );
      }
      return (
        <div className="space-y-3">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-dark-surface/30 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {t("accountPage.orderLabel")} #{order.id}
                </p>
                <p className="text-xs text-text-muted">{order.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-text-primary">
                  {formatPriceARS(order.subtotal)}
                </span>
                <span className="text-xs uppercase tracking-[0.12em] text-text-muted">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === "addresses") {
      return <AccountAddresses />;
    }

    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-dark-surface/30 p-6">
          <p className="text-sm text-text-muted">{t("accountPage.welcomeText")}</p>
          <div className="mt-4 space-y-1">
            <p className="text-sm font-medium text-text-primary">{displayName}</p>
            <p className="text-sm text-text-muted">{displayEmail}</p>
          </div>
        </div>
        <AccountProfileForm />
      </div>
    );
  }, [
    activeSection,
    userOrders,
    user,
    t,
    displayName,
    displayEmail,
  ]);

  if (supabaseMissing) {
    return (
      <main className="min-h-[100dvh] bg-dark-base px-6 pb-16 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-dark-surface/40 p-8 text-center">
          <p className="text-sm text-text-muted">
            Configurá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en
            .env.local para usar la cuenta.
          </p>
        </div>
      </main>
    );
  }

  if (!authInitialized) {
    return (
      <main className="min-h-[100dvh] bg-dark-base px-6 pb-16 pt-24 sm:px-10 lg:px-16 flex items-center justify-center">
        <p className="text-sm text-text-muted">{t("common.loading")}</p>
      </main>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-[100dvh] bg-dark-base px-6 pb-16 pt-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-dark-surface/40 p-8 text-center">
          <p className="text-sm text-text-muted">
            Configurá NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en
            .env.local para usar la cuenta.
          </p>
        </div>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-[100dvh] bg-dark-base px-6 pb-16 pt-24 sm:px-10 lg:px-16 flex items-center justify-center">
        <p className="text-sm text-text-muted">{t("common.redirecting")}</p>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-dark-base px-6 pb-16 pt-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-text-primary">
            {t("accountPage.title")}
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            {t("accountPage.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-3">
            {[
              { key: "account", label: t("accountPage.sections.account") },
              { key: "orders", label: t("accountPage.sections.orders") },
              { key: "addresses", label: t("accountPage.sections.addresses") },
            ].map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveSection(item.key as SectionKey)}
                  className={[
                    "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 ease-out",
                    isActive
                      ? "border-accent-gold bg-dark-surface/60 text-text-primary"
                      : "border-white/10 bg-dark-surface/30 text-text-muted hover:text-text-primary",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={async () => {
                await logout();
                router.push(`/${locale}`);
                router.refresh();
              }}
              className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-semibold text-text-muted transition-colors duration-200 ease-out hover:text-text-primary"
            >
              {t("accountPage.logout")}
            </button>
          </aside>

          <section className="min-w-0">{content}</section>
        </div>
      </div>
    </main>
  );
}
