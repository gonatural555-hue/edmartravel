"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { SITE_CONFIG } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { IMMERSIVE_HEADER_LABELS } from "@/components/home/immersive-header-labels";
import CategoryEditorialButton, {
  HEADER_UTILITY_CTA_COMPACT,
  headerUtilityCtaClass,
} from "@/components/category/CategoryEditorialButton";
import { isHomePath } from "@/lib/is-home-path";
import { useExperienceDirectorMode } from "@/components/experience-hero/director/useExperienceDirectorMode";
import { useHeaderUtilitiesFromStorage } from "@/components/experience-hero/director/useHeaderUtilitiesFromStorage";
import type {
  HeaderUtilityId,
  HeaderUtilityPositionDebugValues,
} from "@/components/experience-hero/director/experienceHeroDebugConfig";

const PREMIUM_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Tipografía unificada del header — sans geométrica, mayúsculas, tracking amplio */
const HEADER_TYPE =
  "font-header text-[clamp(0.8125rem,0.95vw,1rem)] font-semibold uppercase tracking-[0.15em] antialiased";

const NAV_LINK = `group relative ${HEADER_TYPE} text-[#F5F1E8]/78 transition-colors duration-[400ms] hover:text-[#F5F1E8]`;

const NAV_LINK_EDITORIAL = `group relative ${HEADER_TYPE} text-[#1a1a1a]/80 transition-colors duration-[400ms] hover:text-[#1a1a1a]`;

const HEADER_TYPE_MENU = `${HEADER_TYPE} text-[clamp(1.125rem,4vw,1.5rem)] tracking-[0.12em]`;

const LANGUAGE_PANEL =
  "overflow-hidden rounded-xl border border-[#1a1a1a]/10 bg-white py-1 shadow-[0_12px_32px_rgba(26,26,26,0.08)]";

function isEditorialSurface(pathname: string) {
  if (isHomePath(pathname)) return true;
  return /\/(blog|category)(\/|$)/.test(pathname);
}

function utilityPositionStyle(
  pos: HeaderUtilityPositionDebugValues,
  isDirector: boolean
) {
  return {
    marginTop: pos.marginTop,
    marginLeft: pos.marginLeft,
    transform: `translate(${pos.offsetX}px, ${pos.offsetY}px)`,
    outline: isDirector ? "1px dashed rgba(200,155,60,0.55)" : undefined,
    outlineOffset: isDirector ? 4 : undefined,
  } as const;
}

type NavItem = { href: string; label: string; matchPrefix?: boolean };

const NAV_UTILITY_IDS: HeaderUtilityId[] = ["home", "tours", "blog"];

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
  linkClass = NAV_LINK,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
  linkClass?: string;
}) {
  const activeClass =
    linkClass === NAV_LINK_EDITORIAL
      ? "text-[#1a1a1a]"
      : "text-[#F5F1E8]";

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`${linkClass} ${active ? activeClass : ""}`}
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
        className={headerUtilityCtaClass()}
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
        className={`absolute right-0 top-[calc(100%+0.5rem)] min-w-[5.5rem] ${LANGUAGE_PANEL} transition-all duration-[350ms] ${
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
            className={`block px-4 py-2.5 ${HEADER_TYPE} text-[0.8125rem] tracking-[0.14em] transition-colors ${
              lang === locale
                ? "bg-[#1a1a1a]/6 text-[#1a1a1a]"
                : "text-[#1a1a1a]/55 hover:bg-[#1a1a1a]/4 hover:text-[#1a1a1a]"
            }`}
          >
            {lang.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

type ImmersiveHomeHeaderProps = {
  variant?: "immersive" | "default";
};

export default function ImmersiveHomeHeader({
  variant = "immersive",
}: ImmersiveHomeHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations();
  const { totalItems } = useCart();
  const { isLoggedIn } = useUser();
  const isDirector = useExperienceDirectorMode();
  const headerUtilities = useHeaderUtilitiesFromStorage(isDirector);

  const isHomeEditorial = variant === "immersive";
  const isEditorialNav = isEditorialSurface(pathname);
  const isEditorialHeader = isHomeEditorial || isEditorialNav;
  const navLinkClass = isEditorialNav ? NAV_LINK_EDITORIAL : NAV_LINK;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  ];

  const closeMenu = () => setMenuOpen(false);

  const logoImg = (
    <img
      src="/assets/images/logo/logo.png"
      alt={SITE_CONFIG.name}
      width={280}
      height={52}
      className={`h-[2.35rem] w-auto max-w-[12rem] object-contain opacity-[0.97] sm:h-[2.6rem] sm:max-w-[13.5rem] lg:h-[4rem] lg:max-w-[18rem] xl:h-[4.5rem] xl:max-w-[20rem] ${
        isEditorialHeader
          ? "drop-shadow-[0_2px_12px_rgba(26,26,26,0.08)]"
          : "drop-shadow-[0_0_36px_rgba(200,155,60,0.24),0_4px_16px_rgba(0,0,0,0.45)]"
      }`}
      decoding="async"
    />
  );

  const headerShellClass = [
    "site-header pointer-events-none fixed inset-x-0 top-0 z-[100] font-header transition-[background,backdrop-filter,border-color,box-shadow] duration-[400ms]",
    isScrolled
      ? isEditorialHeader
        ? "is-scrolled bg-[#F8F5EE]/94 [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] [border-bottom:1px_solid_rgba(26,26,26,0.08)] [box-shadow:0_12px_40px_rgba(26,26,26,0.06)]"
        : "is-scrolled bg-[#050606]/78 [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] [border-bottom:1px_solid_rgba(255,255,255,0.08)] [box-shadow:0_12px_40px_rgba(0,0,0,0.35)]"
      : isEditorialHeader
        ? "bg-[#F8F5EE]/82 [backdrop-filter:blur(14px)] [-webkit-backdrop-filter:blur(14px)] [border-bottom:1px_solid_rgba(26,26,26,0.06)]"
        : "",
  ]
    .filter(Boolean)
    .join(" ");

  const chrome = (
    <>
      <header className={headerShellClass}>
        {!isScrolled && !isEditorialHeader ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--experience-header-height,5.5rem)+2rem)] bg-gradient-to-b from-[#050606]/72 via-[#050606]/28 to-transparent"
            aria-hidden
          />
        ) : null}
        <div className="relative mx-auto grid h-[var(--experience-header-height,5.5rem)] max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 sm:px-6 lg:gap-10 lg:px-10 xl:gap-12">
          {/* Mobile logo */}
          <Link
            href={homeHref}
            className="pointer-events-auto col-span-2 inline-flex shrink-0 items-center lg:col-span-1 lg:hidden"
            aria-label={SITE_CONFIG.name}
          >
            {logoImg}
          </Link>

          {/* Desktop — nav izquierda */}
          <nav
            className="pointer-events-auto hidden w-full min-w-0 items-center justify-start gap-5 xl:gap-7 lg:flex"
            aria-label="Principal"
          >
            {navItems.map((item, index) => (
              <div
                key={item.href}
                style={
                  isDirector
                    ? utilityPositionStyle(
                        headerUtilities[NAV_UTILITY_IDS[index]],
                        isDirector
                      )
                    : undefined
                }
              >
                <PremiumNavLink
                  href={item.href}
                  label={item.label}
                  active={isNavActive(pathname, item.href, item.matchPrefix)}
                  linkClass={navLinkClass}
                />
              </div>
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
          <div className="pointer-events-auto hidden w-full min-w-0 items-center justify-end gap-5 xl:gap-7 lg:flex">
            <div
              style={
                isDirector
                  ? utilityPositionStyle(headerUtilities.language, isDirector)
                  : undefined
              }
            >
              <LanguageDropdown
                locale={locale}
                buildLocaleHref={buildLocaleHref}
              />
            </div>
            <div
              style={
                isDirector
                  ? utilityPositionStyle(headerUtilities.login, isDirector)
                  : undefined
              }
            >
              {isLoggedIn ? (
                <CategoryEditorialButton
                  href={`/${locale}/account`}
                  className={HEADER_UTILITY_CTA_COMPACT}
                >
                  {myAccountLabel}
                </CategoryEditorialButton>
              ) : (
                <CategoryEditorialButton
                  href={authHref}
                  className={HEADER_UTILITY_CTA_COMPACT}
                >
                  {loginLabel}
                </CategoryEditorialButton>
              )}
            </div>
            <div
              style={
                isDirector
                  ? utilityPositionStyle(
                      headerUtilities.reservations,
                      isDirector
                    )
                  : undefined
              }
            >
              <CategoryEditorialButton
                href={`/${locale}/cart`}
                className={`relative ${HEADER_UTILITY_CTA_COMPACT}`}
              >
                {reservationsLabel}
                {totalItems > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[#C89B3C] px-1 text-[0.625rem] font-bold leading-none text-[#050606]">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                ) : null}
              </CategoryEditorialButton>
            </div>
          </div>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className={`premium-hover pointer-events-auto col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-full border backdrop-blur-md lg:hidden ${
              isEditorialHeader
                ? "border-[#1a1a1a]/14 bg-white/70 text-[#1a1a1a]/80"
                : "border-white/[0.14] bg-black/40 text-white/80"
            }`}
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
          className="fixed inset-0 z-[110] flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className={`absolute inset-0 backdrop-blur-md ${
              isEditorialHeader ? "bg-[#F8F5EE]/92" : "bg-[#050606]/88"
            }`}
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
                    className={`block py-3 ${HEADER_TYPE_MENU} ${
                      isNavActive(pathname, item.href, item.matchPrefix)
                        ? isEditorialNav
                          ? "text-[#7A6248]"
                          : "text-[#E8C98A]"
                        : isEditorialNav
                          ? "text-[#1a1a1a]/90"
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
                  className={`block py-3 ${HEADER_TYPE_MENU} ${
                    isEditorialNav ? "text-[#1a1a1a]/90" : "text-[#F5F0E6]/90"
                  }`}
                >
                  {reservationsLabel}
                </Link>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {isLoggedIn ? (
                <CategoryEditorialButton
                  href={`/${locale}/account`}
                  onClick={closeMenu}
                  className={HEADER_UTILITY_CTA_COMPACT}
                >
                  {myAccountLabel}
                </CategoryEditorialButton>
              ) : (
                <CategoryEditorialButton
                  href={authHref}
                  onClick={closeMenu}
                  className={HEADER_UTILITY_CTA_COMPACT}
                >
                  {loginLabel}
                </CategoryEditorialButton>
              )}
              <CategoryEditorialButton
                href={`/${locale}/cart`}
                onClick={closeMenu}
                className={HEADER_UTILITY_CTA_COMPACT}
              >
                {reservationsLabel}
              </CategoryEditorialButton>
              <div className="flex gap-2">
                {locales.map((lang) => (
                  <Link
                    key={lang}
                    href={buildLocaleHref(lang)}
                    onClick={closeMenu}
                    className={`rounded-full border px-3 py-2 ${HEADER_TYPE} text-[0.75rem] tracking-[0.14em] ${
                      lang === locale
                        ? isEditorialNav
                          ? "border-[#1a1a1a]/20 text-[#1a1a1a]"
                          : "border-[#C89B3C]/40 text-[#E8C98A]"
                        : isEditorialNav
                          ? "border-[#1a1a1a]/10 text-[#1a1a1a]/50"
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

  if (!mounted) {
    return chrome;
  }

  return createPortal(chrome, document.body);
}
