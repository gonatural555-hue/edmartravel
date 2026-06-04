"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { SITE_CONFIG } from "@/lib/config";
import { useUser } from "@/context/UserContext";
import { IMMERSIVE_HEADER_LABELS } from "@/components/home/immersive-header-labels";

const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const NAV_LINK =
  "group relative font-theater text-[clamp(1rem,1vw,1.25rem)] font-bold uppercase tracking-[0.06em] text-[#E6ECE9]/72 transition-colors duration-[400ms] hover:text-[#F5F1E8]";

/** Utilidades derecha — glass premium (no aplicar a nav principal) */
const GLASS_PILL =
  "inline-flex items-center rounded-full px-4 py-2 font-theater text-[clamp(0.88rem,0.95vw,1rem)] font-bold uppercase tracking-[0.06em] text-[#F5F1E8]/90 transition-[background,border-color,box-shadow,color] duration-[350ms] [background:rgba(255,255,255,0.06)] [border:1px_solid_rgba(255,255,255,0.16)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(0,0,0,0.25)] hover:[background:rgba(255,255,255,0.1)] hover:[border-color:rgba(194,162,122,0.55)] hover:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.22),0_0_22px_rgba(194,162,122,0.16)] hover:text-[#F5F1E8]";

const GLASS_PANEL =
  "overflow-hidden rounded-xl py-1 [background:rgba(255,255,255,0.06)] [border:1px_solid_rgba(255,255,255,0.16)] [backdrop-filter:blur(18px)] [-webkit-backdrop-filter:blur(18px)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18),0_12px_32px_rgba(0,0,0,0.25)]";

type NavItem = { href: string; label: string; matchPrefix?: boolean };

function isNavActive(pathname: string, href: string, matchPrefix?: boolean) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  if (matchPrefix) {
    return normalized === target || normalized.startsWith(`${target}/`);
  }
  return normalized === target;
}

function PremiumNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`${NAV_LINK} ${active ? "text-[#F5F1E8]" : ""}`}
      style={{ transitionTimingFunction: PREMIUM_EASE }}
      aria-current={active ? "page" : undefined}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#C89B3C] transition-transform duration-[400ms] ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
        aria-hidden
      />
    </Link>
  );
}

function LanguageDropdown({
  locale,
  buildLocaleHref,
}: {
  locale: Locale;
  buildLocaleHref: (lang: Locale) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className={`${GLASS_PILL} gap-1.5`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {locale.toUpperCase()}
        <svg
          className={`h-3 w-3 opacity-60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 4.5L6 8.5L10 4.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={`absolute right-0 top-[calc(100%+0.5rem)] min-w-[5.5rem] ${GLASS_PANEL} transition-all duration-[350ms] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        style={{ transitionTimingFunction: PREMIUM_EASE }}
        role="listbox"
        onMouseLeave={() => setOpen(false)}
      >
        {locales.map((lang) => (
          <Link
            key={lang}
            href={buildLocaleHref(lang)}
            role="option"
            aria-selected={lang === locale}
            onClick={() => setOpen(false)}
            className={`block px-4 py-2.5 font-theater text-[0.88rem] font-bold uppercase tracking-[0.08em] transition-colors ${
              lang === locale
                ? "bg-white/[0.06] text-[#E8C98A]"
                : "text-[#E6ECE9]/65 hover:bg-white/[0.04] hover:text-[#F5F1E8]"
            }`}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ImmersiveHomeHeader() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoggedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const labels = IMMERSIVE_HEADER_LABELS[locale];
  const loginLabel = t("header.login", labels.login);
  const reservationsLabel = t("header.reservations", labels.reservations);
  const myAccountLabel = t("header.myAccount", labels.myAccount);
  const authHref = `/${locale}/auth?tab=login`;

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const homeHref = `/${locale}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const buildLocaleHref = (nextLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${nextLocale}`;
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }
    const query = searchParams.toString();
    return `/${segments.join("/")}${query ? `?${query}` : ""}`;
  };

  const navItems: NavItem[] = [
    { href: `/${locale}`, label: t("header.nav.home") },
    {
      href: `/${locale}/products`,
      label: t("header.nav.tours"),
      matchPrefix: true,
    },
    {
      href: `/${locale}/blog`,
      label: t("header.nav.blog"),
      matchPrefix: true,
    },
    { href: `/${locale}/about`, label: t("header.nav.about") },
    { href: `/${locale}/contact`, label: t("header.nav.contact") },
  ];

  const closeMenu = () => setMenuOpen(false);

  const logoImg = (
    <img
      src="/assets/images/logo/logo.png"
      alt={SITE_CONFIG.name}
      width={280}
      height={52}
      className="h-[2.35rem] w-auto max-w-[12rem] object-contain opacity-[0.97] drop-shadow-[0_0_36px_rgba(200,155,60,0.24),0_4px_16px_rgba(0,0,0,0.45)] sm:h-[2.6rem] sm:max-w-[13.5rem] lg:h-[4rem] lg:max-w-[18rem] xl:h-[4.5rem] xl:max-w-[20rem]"
      decoding="async"
    />
  );

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[var(--experience-header-height,5.5rem)] max-w-[96rem] items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:px-10 xl:gap-12">
          {/* Mobile logo */}
          <Link
            href={homeHref}
            className="pointer-events-auto inline-flex shrink-0 items-center lg:hidden"
            aria-label={SITE_CONFIG.name}
          >
            {logoImg}
          </Link>

          {/* Desktop — nav izquierda */}
          <nav
            className="pointer-events-auto hidden items-center justify-end gap-5 xl:gap-7 lg:flex"
            aria-label="Principal"
          >
            {navItems.map((item) => (
              <PremiumNavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={isNavActive(pathname, item.href, item.matchPrefix)}
              />
            ))}
          </nav>

          {/* Desktop — logo centro */}
          <Link
            href={homeHref}
            className="pointer-events-auto hidden shrink-0 items-center justify-center justify-self-center lg:inline-flex"
            aria-label={SITE_CONFIG.name}
          >
            {logoImg}
          </Link>

          {/* Desktop — utilidades derecha */}
          <div className="pointer-events-auto hidden items-center justify-start gap-2.5 lg:flex">
            <LanguageDropdown locale={locale} buildLocaleHref={buildLocaleHref} />
            {isLoggedIn ? (
              <Link href={`/${locale}/account`} className={GLASS_PILL}>
                {myAccountLabel}
              </Link>
            ) : (
              <Link href={authHref} className={GLASS_PILL}>
                {loginLabel}
              </Link>
            )}
            <Link
              href={`/${locale}/cart`}
              className={`${GLASS_PILL} hover:text-[#E8C98A]`}
            >
              {reservationsLabel}
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="premium-hover pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] bg-black/40 text-white/80 backdrop-blur-md lg:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className="relative block h-3.5 w-3.5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "top-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-px w-full bg-current ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "top-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#050606]/88 backdrop-blur-md"
            onClick={closeMenu}
            aria-label="Cerrar"
          />
          <nav
            className="relative z-10 flex flex-1 flex-col px-6 pb-10 pt-[calc(var(--experience-header-height,5.5rem)+1.5rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block py-3 font-theater text-2xl font-bold uppercase tracking-[0.04em] ${
                      isNavActive(pathname, item.href, item.matchPrefix)
                        ? "text-[#E8C98A]"
                        : "text-[#F5F0E6]/90"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/cart`}
                  onClick={closeMenu}
                  className="block py-3 font-theater text-2xl font-bold uppercase text-[#F5F0E6]/90"
                >
                  {reservationsLabel}
                </Link>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {isLoggedIn ? (
                <Link href={`/${locale}/account`} onClick={closeMenu} className={GLASS_PILL}>
                  {myAccountLabel}
                </Link>
              ) : (
                <Link href={authHref} onClick={closeMenu} className={GLASS_PILL}>
                  {loginLabel}
                </Link>
              )}
              <div className="flex gap-2">
                {locales.map((lang) => (
                  <Link
                    key={lang}
                    href={buildLocaleHref(lang)}
                    onClick={closeMenu}
                    className={`rounded-full border px-3 py-2 font-theater text-xs font-bold uppercase ${
                      lang === locale
                        ? "border-[#C89B3C]/40 text-[#E8C98A]"
                        : "border-white/10 text-white/50"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
