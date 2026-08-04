/**
 * Sistema visual de páginas legales — alineado al flujo editorial Edmar Travel (#F8F5EE).
 */
export const LEGAL_PAGE_WRAP =
  "category-page relative min-h-[100dvh] overflow-x-hidden bg-[#F8F5EE] text-[#1a1a1a]";

export const LEGAL_CONTAINER =
  "relative z-10 mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-8";

export const LEGAL_CONTENT_PANEL =
  "rounded-[1.25rem] border border-[#1a1a1a]/[0.07] bg-white p-6 shadow-[0_4px_24px_rgba(26,26,26,0.05)] sm:p-9 lg:p-10";

export const LEGAL_KICKER =
  "mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#7A6248]";

export const LEGAL_H1 =
  "font-theater max-w-3xl text-[2.125rem] font-semibold leading-[1.08] tracking-tight text-[#1a1a1a] sm:text-[2.375rem] lg:text-[2.75rem]";

export const LEGAL_INTRO =
  "mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[#1a1a1a]/62 sm:text-base";

export const LEGAL_UPDATED =
  "mt-3 text-sm text-[#1a1a1a]/48";

export const LEGAL_SECTION_TITLE =
  "font-theater text-xl font-semibold tracking-tight text-[#1a1a1a] md:text-[1.35rem]";

export const LEGAL_BODY =
  "text-[0.9375rem] leading-relaxed text-[#1a1a1a]/72 sm:text-base";

export const LEGAL_CLOSING = LEGAL_BODY;

export const LEGAL_CTA =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#1a1a1a] px-6 text-[0.9375rem] font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35 focus-visible:ring-offset-2";

export const LEGAL_CTA_OUTLINE =
  "inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[#1a1a1a]/15 bg-white px-6 text-[0.9375rem] font-semibold text-[#1a1a1a] transition hover:border-[#1a1a1a]/25 hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35 focus-visible:ring-offset-2";

export const legalMotion = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
} as const;
