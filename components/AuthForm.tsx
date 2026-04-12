"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Tab = "login" | "register";

type Props = {
  initialTab?: Tab;
  onSuccess?: () => void;
  isPage?: boolean;
  /** Tras login/registro en página completa (ruta interna, ej. /es/account). */
  redirectNext?: string | null;
  /** Mensaje de error desde URL (p. ej. auth/callback fallido). */
  callbackError?: string | null;
};

export default function AuthForm({
  initialTab = "login",
  onSuccess,
  isPage = false,
  redirectNext,
  callbackError,
}: Props) {
  const { login, register } = useUser();
  const router = useRouter();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setError(null);
    setInfo(null);
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (callbackError) setError(callbackError);
  }, [callbackError]);

  const subtitle = useMemo(() => {
    if (activeTab === "login") {
      return "Accedé a tu cuenta para ver pedidos y guardar datos";
    }
    return "Creá tu cuenta para acelerar futuras compras";
  }, [activeTab]);

  const postAuthPath = useMemo(() => {
    if (redirectNext && redirectNext.startsWith("/")) return redirectNext;
    return `/${locale}/account`;
  }, [redirectNext, locale]);

  const handleInputFocus = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    if (inputRef.current && isPage) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          inputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }, 300);
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    try {
      if (activeTab === "login") {
        const { error: err } = await login({
          email,
          password,
        });
        if (err) {
          setError(err);
          return;
        }
        if (isPage) {
          router.push(postAuthPath);
          router.refresh();
        } else if (onSuccess) {
          onSuccess();
        }
        return;
      }

      const { error: err, needsEmailConfirmation } = await register({
        email,
        password,
        firstName,
        lastName,
        phone,
        locale,
      });

      if (err) {
        setError(err);
        return;
      }

      if (needsEmailConfirmation) {
        setInfo(
          "Te enviamos un correo para confirmar la cuenta. Abrí el enlace y luego iniciá sesión."
        );
        return;
      }

      if (isPage) {
        router.push(postAuthPath);
        router.refresh();
      } else if (onSuccess) {
        onSuccess();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-full bg-dark-surface/60 p-1">
        {(["login", "register"] as Tab[]).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setError(null);
                setInfo(null);
              }}
              className={[
                "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out",
                isActive
                  ? "bg-dark-base text-text-primary shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                  : "text-text-muted hover:text-text-primary",
              ].join(" ")}
              aria-pressed={isActive}
            >
              {tab === "login" ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-semibold text-text-primary">
          {activeTab === "login" ? "Bienvenido de nuevo" : "Creá tu cuenta"}
        </h2>
        <p className="text-sm text-text-muted">{subtitle}</p>
      </div>

      {error && (
        <div
          className="mt-4 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      {info && (
        <div
          className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-100"
          role="status"
        >
          {info}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {activeTab === "register" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Nombre
                </label>
                <input
                  ref={firstNameInputRef}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  onFocus={() => handleInputFocus(firstNameInputRef)}
                  type="text"
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-3 sm:px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent-gold/60 focus:outline-none"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  Apellido
                </label>
                <input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  onFocus={() => handleInputFocus(firstNameInputRef)}
                  type="text"
                  autoComplete="family-name"
                  className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-3 sm:px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent-gold/60 focus:outline-none"
                  placeholder="Apellido"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                Teléfono
              </label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                autoComplete="tel"
                className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-3 sm:px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent-gold/60 focus:outline-none"
                placeholder="+54 9 261 000-0000"
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
            Email
          </label>
          <input
            ref={emailInputRef}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onFocus={() => handleInputFocus(emailInputRef)}
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-3 sm:px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent-gold/60 focus:outline-none"
            placeholder="tuemail@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              Contraseña
            </label>
            {activeTab === "login" && (
              <Link
                href={`/${locale}/auth/forgot`}
                className="text-xs font-medium text-accent-gold hover:text-accent-gold/80"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            )}
          </div>
          <input
            ref={passwordInputRef}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onFocus={() => handleInputFocus(passwordInputRef)}
            type="password"
            autoComplete={
              activeTab === "login" ? "current-password" : "new-password"
            }
            className="w-full rounded-xl border border-white/10 bg-dark-surface/70 px-3 sm:px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/70 focus:border-accent-gold/60 focus:outline-none"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-text-primary px-4 py-3 text-sm font-semibold text-dark-base transition-colors duration-200 ease-out hover:bg-white disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting
            ? "Procesando…"
            : activeTab === "login"
              ? "Iniciar sesión"
              : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
