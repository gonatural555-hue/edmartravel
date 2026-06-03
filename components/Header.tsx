"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { useEffect, useRef, useState } from "react";
import { blogSections } from "@/lib/blog-sections";
import { locales, type Locale } from "@/lib/i18n/config";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import { PRODUCTS_DATA } from "@/lib/products-data";
import { EXPERIENCE_CATEGORY_ORDER } from "@/lib/experience-categories";
import { tourTitleForLocale } from "@/lib/tour-title-locale";
import { useHeroLogoFromStorage } from "@/components/experience-hero/director/useHeroLogoFromStorage";

function isHomePath(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname === `/${l}/`);
}

export default function Header() {
  const { totalItems } = useCart();
  const { isLoggedIn, user } = useUser();
  const { authOpen, setAuthOpen, openAuthModal, initialTab } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const [blogOpen, setBlogOpen] = useState(false);
  const blogCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openProductsMenu = () => {
    if (productsCloseTimeout.current) {
      clearTimeout(productsCloseTimeout.current);
      productsCloseTimeout.current = null;
    }
    setProductsOpen(true);
  };

  const closeProductsMenu = () => {
    if (productsCloseTimeout.current) {
      clearTimeout(productsCloseTimeout.current);
    }
    productsCloseTimeout.current = setTimeout(() => {
      setProductsOpen(false);
    }, 200);
  };

  const openBlogMenu = () => {
    if (blogCloseTimeout.current) {
      clearTimeout(blogCloseTimeout.current);
      blogCloseTimeout.current = null;
    }
    setBlogOpen(true);
  };

  const closeBlogMenu = () => {
    if (blogCloseTimeout.current) {
      clearTimeout(blogCloseTimeout.current);
    }
    blogCloseTimeout.current = setTimeout(() => {
      setBlogOpen(false);
    }, 200);
  };

  const navLinks = [
    { href: `/${locale}`, label: t("header.nav.home") },
    { href: `/${locale}/products`, label: t("header.nav.tours") },
    { href: `/${locale}/blog`, label: t("header.nav.blog") },
    { href: `/${locale}/cart`, label: t("header.nav.cart") },
    { href: `/${locale}/about`, label: t("header.nav.about") },
    { href: `/${locale}/contact`, label: t("header.nav.contact") },
  ];

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

  const logoCalibrated = useHeroLogoFromStorage();
  const isDirectorHome =
    searchParams.get("director") === "true" && isHomePath(pathname);

  if (isDirectorHome) {
    return (
      <>
        <header className="fixed top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a120f]/95 backdrop-blur-md">
          <div
            data-director-layer="logo"
            className="flex h-[var(--experience-header-height,5.25rem)] w-full items-center justify-center"
            style={{
              marginTop: logoCalibrated.marginTop,
              marginLeft: logoCalibrated.marginLeft,
            }}
          >
            <Link
              href={`/${locale}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}
              className="inline-flex items-center justify-center"
              aria-label={SITE_CONFIG.name}
              style={{
                transform: `translate(${logoCalibrated.offsetX}px, ${logoCalibrated.offsetY}px) scale(${logoCalibrated.scale})`,
              }}
            >
              <img
                src="/assets/images/logo/logo.png"
                alt={SITE_CONFIG.name}
                width={logoCalibrated.width}
                height={logoCalibrated.height}
                style={{
                  width: logoCalibrated.width,
                  height: logoCalibrated.height,
                }}
                className="object-contain brightness-110"
                decoding="async"
              />
            </Link>
          </div>
        </header>
        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          initialTab={initialTab}
        />
      </>
    );
  }

  return (
    <header
      className={[
        "fixed top-0 z-50 w-full transition-all duration-300 ease-out",
        isScrolled
          ? "bg-dark-base/80 backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4 py-2 md:py-2.5">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 text-text-muted hover:text-text-primary transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.href === `/${locale}/products`) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={openProductsMenu}
                      onMouseLeave={closeProductsMenu}
                    >
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
                        onFocus={openProductsMenu}
                        onBlur={closeProductsMenu}
                        aria-haspopup="true"
                        aria-expanded={productsOpen}
                      >
                        {t("header.nav.tours")}
                      </Link>
                      <div
                        className={[
                          "absolute left-0 top-full mt-4 w-[min(100vw-2rem,34rem)] rounded-2xl border border-white/10 bg-dark-base/95 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out",
                          productsOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none",
                        ].join(" ")}
                      >
                        <div className="relative max-h-[min(70vh,32rem)] overflow-y-auto p-2">
                          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/35 to-transparent pointer-events-none" />
                          <div className="py-2">
                            {EXPERIENCE_CATEGORY_ORDER.map((cat) => {
                              const items = PRODUCTS_DATA.filter(
                                (p) => p.category === cat
                              );
                              if (items.length === 0) return null;
                              return (
                                <div
                                  key={cat}
                                  className="border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                                >
                                  <p className="px-4 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                                    {t(`categories.names.${cat}`)}
                                  </p>
                                  <ul className="divide-y divide-white/5">
                                    {items.map((product) => (
                                      <li key={product.id}>
                                        <Link
                                          href={`/${locale}/products/${product.id}`}
                                          className="block px-4 py-3 text-[13px] font-medium leading-snug tracking-[0.02em] text-text-primary/95 transition-colors duration-200 hover:bg-white/[0.04] hover:text-accent-gold rounded-xl"
                                          onClick={() => setProductsOpen(false)}
                                        >
                                          {tourTitleForLocale(product, locale)}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                            <div className="mt-2 border-t border-white/10 pt-2">
                              <Link
                                href={`/${locale}/products`}
                                className="block px-4 py-3 text-[13px] font-semibold tracking-[0.02em] text-accent-gold/95 transition-colors hover:text-accent-gold"
                                onClick={() => setProductsOpen(false)}
                              >
                                {t("common.exploreAll")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (link.href === `/${locale}/blog`) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={openBlogMenu}
                      onMouseLeave={closeBlogMenu}
                    >
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
                        onFocus={openBlogMenu}
                        onBlur={closeBlogMenu}
                        aria-haspopup="true"
                        aria-expanded={blogOpen}
                      >
                        {link.label}
                      </Link>
                      <div
                        className={[
                          "absolute left-0 top-full mt-4 w-[min(100vw-2rem,28rem)] max-w-[92vw] rounded-2xl border border-white/10 bg-dark-base/95 backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out",
                          "max-h-[70vh] overflow-y-auto",
                          blogOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none",
                        ].join(" ")}
                      >
                        <div className="relative p-2">
                          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/35 to-transparent pointer-events-none" />
                          <ul className="py-2 divide-y divide-white/5">
                            {blogSections.map((section) => (
                              <li key={section.slug}>
                                <Link
                                  href={`/${locale}/blog/${section.slug}`}
                                  className="block px-4 py-3.5 text-[13px] leading-snug font-medium tracking-[0.02em] text-text-primary/95 hover:text-accent-gold hover:bg-white/[0.04] transition-colors duration-200 rounded-xl"
                                  onClick={() => setBlogOpen(false)}
                                >
                                  {t(
                                    `blogSections.${section.slug}.title`,
                                    section.title
                                  )}
                                </Link>
                                <div className="flex flex-col gap-2 py-2">
                                  {section.subtopics.map((subtopic) => (
                                    <Link
                                      key={subtopic.slug}
                                      href={`/${locale}/blog/${section.slug}#${subtopic.slug}`}
                                      className="block pl-8 pr-4 py-2 text-[13px] leading-snug font-medium tracking-[0.02em] text-text-muted/95 hover:text-accent-gold hover:bg-white/[0.04] transition-colors duration-200 rounded-xl"
                                      onClick={() => setBlogOpen(false)}
                                    >
                                      {t(
                                        `blogSections.${section.slug}.subtopics.${subtopic.slug}`,
                                        subtopic.label
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logo / Brand */}
          <Link 
            href={`/${locale}`}
            className="group flex shrink-0 items-center justify-self-center"
            aria-label={SITE_CONFIG.name}
          >
            <img
              src="/assets/images/logo/logo.png"
              alt={SITE_CONFIG.name}
              className="h-14 w-auto max-w-[min(12rem,48vw)] sm:h-16 md:h-20 md:max-w-[14rem] opacity-90 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Cart Icon + Mobile Menu Button */}
          <div className="flex items-center gap-4 justify-self-end">
            <div className="hidden md:flex items-center gap-3">
              {locales.map((lang) => (
                <Link
                  key={lang}
                  href={buildLocaleHref(lang)}
                  className={`text-xs font-semibold tracking-[0.12em] transition-colors duration-200 ${
                    lang === locale
                      ? "text-accent-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
            {isLoggedIn && user ? (
              <Link
                href={`/${locale}/account`}
                className="hidden md:inline text-sm font-semibold text-text-primary hover:text-accent-gold transition-colors duration-200"
              >
                {t("header.greeting")}, {user.name}
              </Link>
            ) : (
              <>
                {/* Desktop: Modal */}
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="hidden md:inline text-sm font-semibold text-text-primary hover:text-accent-gold transition-colors duration-200"
                >
                  {t("header.account")}
                </button>
                {/* Mobile: Redirect to page */}
                <Link
                  href={`/${locale}/auth?tab=login`}
                  className="md:hidden text-sm font-semibold text-text-primary hover:text-accent-gold transition-colors duration-200"
                >
                  {t("header.account")}
                </Link>
              </>
            )}
            {/* Cart Icon with Badge */}
            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center justify-center w-10 h-10 text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-label={`Cart with ${totalItems} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.277M7.5 14.25l13.5-5.25M5.106 5.277c.194-1.01.937-1.777 1.936-1.777h13.916c.999 0 1.742.767 1.936 1.777M5.106 5.277L2.25 3m0 0h18.75M2.25 3v18m18.75-18v18"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium text-dark-base bg-accent-gold rounded-full">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            {!isLoggedIn && (
              <Link
                href={`/${locale}/auth?tab=login`}
                className="md:hidden flex items-center justify-center w-10 h-10 text-text-muted hover:text-text-primary transition-colors duration-200"
                aria-label={t("header.account")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 mt-2 pt-4 bg-dark-base/95 backdrop-blur-md rounded-b-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) =>
                link.href === `/${locale}/products` ? (
                  <div key={link.href} className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="flex items-center justify-between rounded-md px-2 py-2 text-base font-medium text-text-primary transition-colors duration-200 hover:text-accent-gold"
                      onClick={() => setMobileToursOpen((open) => !open)}
                      aria-expanded={mobileToursOpen}
                      aria-controls="mobile-tours-menu"
                    >
                      <span>{link.label}</span>
                      <span className="text-sm text-text-muted">
                        {mobileToursOpen ? "−" : "+"}
                      </span>
                    </button>
                    {mobileToursOpen && (
                      <div
                        id="mobile-tours-menu"
                        className="px-2 pb-2 pt-1"
                      >
                        <Link
                          href={`/${locale}/products`}
                          className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold tracking-[0.02em] text-accent-gold hover:bg-white/[0.04]"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileToursOpen(false);
                          }}
                        >
                          {t("common.exploreAll")}
                        </Link>
                        <ul className="mt-2 divide-y divide-white/5">
                          {EXPERIENCE_CATEGORY_ORDER.map((cat) => {
                            const items = PRODUCTS_DATA.filter(
                              (p) => p.category === cat
                            );
                            if (items.length === 0) return null;
                            return (
                              <li key={cat} className="py-2">
                                <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                                  {t(`categories.names.${cat}`)}
                                </p>
                                <ul className="flex flex-col gap-0.5">
                                  {items.map((product) => (
                                    <li key={product.id}>
                                      <Link
                                        href={`/${locale}/products/${product.id}`}
                                        className="block rounded-xl px-3 py-2 text-[13px] font-medium leading-snug text-text-primary/95 hover:bg-white/[0.04] hover:text-accent-gold"
                                        onClick={() => {
                                          setMobileMenuOpen(false);
                                          setMobileToursOpen(false);
                                        }}
                                      >
                                        {tourTitleForLocale(product, locale)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : link.href === `/${locale}/blog` ? (
                  <div key={link.href} className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="flex items-center justify-between text-base font-medium text-text-primary hover:text-accent-gold transition-colors duration-200 py-2 px-2 rounded-md"
                      onClick={() => setMobileBlogOpen((open) => !open)}
                      aria-expanded={mobileBlogOpen}
                      aria-controls="mobile-blog-menu"
                    >
                      <span>{link.label}</span>
                      <span className="text-sm text-text-muted">
                        {mobileBlogOpen ? "−" : "+"}
                      </span>
                    </button>
                    {mobileBlogOpen && (
                      <div
                        id="mobile-blog-menu"
                        className="px-2 pt-1 pb-2"
                      >
                        <ul className="divide-y divide-white/5">
                          {blogSections.map((section) => (
                            <li key={section.slug} className="py-1">
                              <Link
                                href={`/${locale}/blog/${section.slug}`}
                                className="block px-3 py-2 text-[13px] leading-snug font-medium tracking-[0.02em] text-text-primary/95 hover:text-accent-gold hover:bg-white/[0.04] transition-colors duration-200 rounded-xl"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {t(
                                  `blogSections.${section.slug}.title`,
                                  section.title
                                )}
                              </Link>
                              <div className="flex flex-col gap-1 pt-1 pl-3">
                                {section.subtopics.map((subtopic) => (
                                  <Link
                                    key={subtopic.slug}
                                    href={`/${locale}/blog/${section.slug}#${subtopic.slug}`}
                                    className="block px-3 py-1.5 text-[13px] leading-snug font-medium tracking-[0.02em] text-text-muted/95 hover:text-accent-gold hover:bg-white/[0.04] transition-colors duration-200 rounded-xl"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {t(
                                      `blogSections.${section.slug}.subtopics.${subtopic.slug}`,
                                      subtopic.label
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-text-primary hover:text-accent-gold transition-colors duration-200 py-2 px-2 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex items-center gap-3 pt-2">
                {locales.map((lang) => (
                  <Link
                    key={lang}
                    href={buildLocaleHref(lang)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      lang === locale
                        ? "text-accent-gold"
                        : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
                {isLoggedIn && user ? (
                  <Link
                    href={`/${locale}/account`}
                    className="text-sm font-semibold text-text-primary hover:text-accent-gold transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t("header.greeting")}, {user.name}
                  </Link>
                ) : (
                  <Link
                    href={`/${locale}/auth?tab=login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-semibold text-text-primary hover:text-accent-gold transition-colors duration-200"
                  >
                    {t("header.account")}
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} initialTab={initialTab} />
    </header>
  );
}
