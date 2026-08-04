"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { LEGAL_SLUGS } from "@/lib/seo";

const STORAGE_KEY = "cookie-consent";
const STATES = {
  accepted: "accepted",
  declined: "declined",
} as const;

export default function CookieConsent() {
  const t = useTranslations();
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cookiePolicyHref = `/${locale}/${LEGAL_SLUGS.cookies[locale]}`;

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === STATES.accepted || stored === STATES.declined) {
      return;
    }
    setIsVisible(true);
    setIsMounted(true);
  }, []);

  const handleChoice = (choice: keyof typeof STATES) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, STATES[choice]);
    }
    setIsVisible(false);
  };

  const containerClass = useMemo(
    () =>
      [
        "fixed z-50",
        "left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:max-w-md",
        "rounded-2xl border border-[#1a1a1a]/10",
        "bg-white/95 backdrop-blur-md",
        "shadow-[0_12px_32px_rgba(26,26,26,0.12)]",
        "px-5 py-4",
        "text-[#1a1a1a]/72",
        "transition-opacity duration-300 ease-out",
        "motion-reduce:transition-none",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" "),
    [isVisible]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={containerClass}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <p className="text-xs leading-relaxed md:text-sm">{t("cookieConsent.text")}</p>
      <Link
        href={cookiePolicyHref}
        className="mt-2 inline-block text-xs font-medium text-[#7A6248] underline-offset-4 hover:text-[#1a1a1a] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm"
      >
        {t("cookieConsent.policyLink")}
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => handleChoice("declined")}
          className="text-xs text-[#1a1a1a]/58 transition-colors hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm md:text-sm"
        >
          {t("cookieConsent.decline")}
        </button>
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="ml-auto min-h-[40px] rounded-xl bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35 md:text-sm"
        >
          {t("cookieConsent.accept")}
        </button>
      </div>
    </div>
  );
}
