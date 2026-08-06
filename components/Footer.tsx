"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import { SITE_CONFIG } from "@/lib/config";
import { CATEGORY_PAGE_BG } from "@/lib/category-page-assets";
import { LEGAL_SLUGS, type LegalPageKey } from "@/lib/seo";
import { getAboutHref, getContactHref } from "@/lib/page-slugs";

const FOOTER_LINK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "group relative text-sm text-[#1a1a1a]/70 transition-colors duration-[400ms] hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm";

  const underline = (
    <span
      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C89B3C] transition-transform duration-[400ms] group-hover:scale-x-100"
      style={{ transitionTimingFunction: FOOTER_LINK_EASE }}
      aria-hidden
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ transitionTimingFunction: FOOTER_LINK_EASE }}
      >
        {label}
        {underline}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{ transitionTimingFunction: FOOTER_LINK_EASE }}
    >
      {label}
      {underline}
    </Link>
  );
}

function buildLegalHref(key: LegalPageKey, currentLocale: Locale) {
  return `/${currentLocale}/${LEGAL_SLUGS[key][currentLocale]}`;
}

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();
  const { company, contact } = SITE_CONFIG;

  const navigationLinks = [
    { href: `/${locale}`, label: t("footer.links.home") },
    { href: `/${locale}/products`, label: t("footer.links.experiences") },
    { href: getAboutHref(locale), label: t("footer.links.about") },
    { href: getContactHref(locale), label: t("footer.links.contact") },
  ];

  const legalLinks: { key: LegalPageKey; label: string }[] = [
    { key: "legal", label: t("footer.links.legalInfo") },
    { key: "privacy", label: t("footer.links.privacy") },
    { key: "cookies", label: t("footer.links.cookies") },
    { key: "terms", label: t("footer.links.terms") },
    { key: "cancellations", label: t("footer.links.cancellations") },
  ];

  return (
    <footer
      className="mt-auto border-t border-[#1a1a1a]/8"
      style={{ backgroundColor: CATEGORY_PAGE_BG, color: "#1a1a1a" }}
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Columna 1 — Marca */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="group mb-5 inline-flex shrink-0"
              aria-label={SITE_CONFIG.name}
            >
              <img
                src={SITE_CONFIG.logo}
                alt=""
                width={240}
                height={72}
                className="h-[4.5rem] w-auto max-w-[16.5rem] object-contain object-left opacity-95 transition-transform duration-300 ease-out group-hover:scale-[1.02] sm:h-[5.25rem]"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#1a1a1a]/68">
              {t("footer.brandBlurb")}
            </p>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h2 className="mb-4 font-theater text-lg font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] sm:text-xl">
              {t("footer.navigationTitle")}
            </h2>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Legal */}
          <div>
            <h2 className="mb-4 font-theater text-lg font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] sm:text-xl">
              {t("footer.legalTitle")}
            </h2>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <FooterLink
                    href={buildLegalHref(link.key, locale)}
                    label={link.label}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto corporativo */}
          <div>
            <h2 className="mb-4 font-theater text-lg font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] sm:text-xl">
              {t("footer.contactTitle")}
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-[#1a1a1a]/72">
              <li>
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/48">
                  {t("footer.contactLabels.company")}
                </span>
                <span className="mt-1 block font-medium text-[#1a1a1a]">
                  {company.legalName}
                </span>
              </li>
              <li>
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/48">
                  {t("footer.contactLabels.legajo")}
                </span>
                <span className="mt-1 block">{company.legajo}</span>
              </li>
              <li>
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/48">
                  {t("footer.contactLabels.cuit")}
                </span>
                <span className="mt-1 block">{company.cuit}</span>
              </li>
              <li>
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[#1a1a1a]/48">
                  {t("footer.contactLabels.email")}
                </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block font-medium text-[#1a1a1a] underline-offset-4 transition hover:text-[#7A6248] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1a1a1a]/10 pt-8">
          <p className="text-center text-sm text-[#1a1a1a]/58 sm:text-left">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
