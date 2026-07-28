/**
 * Sistema visual del flujo de reservas (Edmar Travel) — fondo editorial #F8F5EE.
 */
import { categoryEditorialButtonClass } from "@/components/category/CategoryEditorialButton";

export const RESERVATION_FLOW_MAX_WIDTH = "max-w-[72rem]";

export const BOOKING_GLASS = {
  pageWrap:
    "category-page relative min-h-[100dvh] overflow-x-hidden bg-[#F8F5EE] text-[#1a1a1a]",
  pageBackdrop: "pointer-events-none absolute inset-0 z-0",
  container: `relative z-10 mx-auto w-full ${RESERVATION_FLOW_MAX_WIDTH} px-5 sm:px-8 lg:px-8`,
  panel:
    "rounded-[1.25rem] border border-[#1a1a1a]/[0.07] bg-white p-5 shadow-[0_4px_24px_rgba(26,26,26,0.05)] sm:p-8 lg:p-9",
  sticky:
    "rounded-[1.25rem] border border-[#1a1a1a]/[0.07] bg-white p-5 shadow-[0_4px_24px_rgba(26,26,26,0.05)] sm:p-8 lg:sticky lg:top-[calc(var(--experience-header-height,5.5rem)+1rem)] lg:max-h-[calc(100dvh-var(--experience-header-height,5.5rem)-2rem)] lg:overflow-y-auto",
  experienceCard:
    "rounded-[1.125rem] border border-[#1a1a1a]/[0.07] bg-white p-5 shadow-[0_2px_16px_rgba(26,26,26,0.04)] sm:p-6",
  primaryCta: `${categoryEditorialButtonClass("primary", "w-full !min-h-[52px] !text-[0.9375rem] !font-semibold")}`,
  secondaryCta:
    "inline-flex min-h-[52px] w-full items-center justify-center rounded-xl border border-[#1a1a1a]/15 bg-white px-6 text-[0.9375rem] font-semibold text-[#1a1a1a] transition hover:border-[#1a1a1a]/25 hover:bg-[#F8F5EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/35",
  whatsappCta:
    "inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 text-[0.9375rem] font-semibold text-[#0a0a0a] shadow-[0_6px_20px_rgba(37,211,102,0.22)] transition hover:bg-[#20BD5A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/45 disabled:cursor-not-allowed disabled:opacity-55",
  subtleLink:
    "inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a]/65 underline-offset-4 transition-colors hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A6248]/30 rounded-sm",
} as const;

export const BOOKING_INPUT_CLASS =
  "w-full max-w-full min-h-[52px] rounded-[0.6875rem] border border-[#1a1a1a]/14 bg-white px-4 py-3 text-[0.9375rem] text-[#1a1a1a] placeholder:text-[#1a1a1a]/38 transition-[border-color,box-shadow,background-color] duration-200 " +
  "hover:border-[#1a1a1a]/22 focus:border-[#7A6248]/55 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7A6248]/18 " +
  "disabled:cursor-not-allowed disabled:border-[#1a1a1a]/10 disabled:bg-[#F8F5EE]/80 disabled:text-[#1a1a1a]/45";

export const BOOKING_INPUT_ERROR_CLASS =
  "border-[#B4534A]/55 focus:border-[#B4534A]/70 focus:ring-[#B4534A]/15";

export const BOOKING_LABEL_CLASS =
  "mb-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/58";

export const BOOKING_FIELD_ERROR =
  "mt-1.5 text-xs text-[#9B3D35]";

export const BOOKING_SECTION_TITLE =
  "font-theater text-xl font-semibold tracking-tight text-[#1a1a1a] md:text-[1.35rem]";

export const BOOKING_SECTION_HINT = "mt-1.5 text-[0.9375rem] leading-relaxed text-[#1a1a1a]/58";

export const BOOKING_PAGE_KICKER =
  "mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#7A6248]";

export const BOOKING_PAGE_TITLE =
  "font-theater max-w-3xl text-[2.125rem] font-semibold leading-[1.08] tracking-tight text-[#1a1a1a] sm:text-[2.375rem] lg:text-[2.75rem]";

export const BOOKING_PAGE_INTRO =
  "mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[#1a1a1a]/62 sm:text-base";

export const BOOKING_TEXT_PRIMARY = "text-[#1a1a1a]";

export const BOOKING_TEXT_SECONDARY = "text-[#1a1a1a]/72";

export const BOOKING_TEXT_MUTED = "text-[#1a1a1a]/55";

export const BOOKING_TEXT_FAINT = "text-[#1a1a1a]/42";

export const BOOKING_BORDER = "border-[#1a1a1a]/10";

export const BOOKING_QTY_CONTROL =
  "inline-flex items-center overflow-hidden rounded-[0.625rem] border border-[#1a1a1a]/16 bg-white shadow-[0_1px_2px_rgba(26,26,26,0.04)]";

export const BOOKING_QTY_BTN =
  "flex h-10 w-10 items-center justify-center text-lg text-[#1a1a1a]/75 transition hover:bg-[#F8F5EE] hover:text-[#1a1a1a] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#7A6248]/30 disabled:cursor-not-allowed disabled:opacity-35";

export const bookingMotion = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
} as const;

export const RESERVATION_GRID =
  "grid gap-8 lg:grid-cols-[minmax(0,1.58fr)_minmax(0,1fr)] lg:gap-10 xl:gap-12";
