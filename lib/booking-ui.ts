/**
 * Sistema visual del flujo de reservas (Edmar Travel) — fondo editorial #F8F5EE.
 */
import { categoryEditorialButtonClass } from "@/components/category/CategoryEditorialButton";

export const BOOKING_GLASS = {
  pageWrap:
    "category-page relative min-h-[100dvh] overflow-x-hidden text-[#1a1a1a]",
  pageBackdrop: "pointer-events-none absolute inset-0 z-0",
  container:
    "relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16",
  panel:
    "rounded-[1.35rem] border border-[#1a1a1a]/8 bg-[#FFFFFF] p-6 shadow-[0_12px_48px_rgba(26,26,26,0.06)] sm:p-8 md:p-9",
  sticky:
    "rounded-[1.35rem] border border-[#1a1a1a]/8 bg-[#FFFFFF] p-6 shadow-[0_12px_48px_rgba(26,26,26,0.06)] sm:p-8 lg:sticky lg:top-8",
  experienceCard:
    "rounded-2xl border border-[#1a1a1a]/8 bg-[#FFFFFF] p-5 shadow-[0_8px_32px_rgba(26,26,26,0.05)] sm:p-6",
  primaryCta: `${categoryEditorialButtonClass("primary", "w-full !min-h-[48px]")}`,
  subtleLink:
    "text-sm font-medium text-[#1a1a1a]/65 underline-offset-4 transition-colors hover:text-[#1a1a1a]",
} as const;

export const BOOKING_INPUT_CLASS =
  "w-full max-w-full rounded-xl border border-[#1a1a1a]/12 bg-white px-4 py-3 text-sm text-[#1a1a1a] shadow-[inset_0_1px_2px_rgba(26,26,26,0.04)] placeholder:text-[#1a1a1a]/35 transition-[border-color,box-shadow,background-color] duration-200 " +
  "focus:border-[#1a1a1a]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/10";

export const BOOKING_LABEL_CLASS =
  "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#1a1a1a]/50";

export const BOOKING_SECTION_TITLE =
  "font-theater text-lg font-semibold tracking-tight text-[#1a1a1a] md:text-xl";

export const BOOKING_SECTION_HINT = "mt-1 text-sm text-[#1a1a1a]/55";

export const BOOKING_PAGE_KICKER =
  "mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#7A6248]";

export const BOOKING_PAGE_TITLE =
  "font-theater max-w-2xl text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-4xl";

export const BOOKING_PAGE_INTRO =
  "mt-3 max-w-xl text-sm text-[#1a1a1a]/65 md:text-base";

export const BOOKING_TEXT_PRIMARY = "text-[#1a1a1a]";

export const BOOKING_TEXT_SECONDARY = "text-[#1a1a1a]/72";

export const BOOKING_TEXT_MUTED = "text-[#1a1a1a]/55";

export const BOOKING_TEXT_FAINT = "text-[#1a1a1a]/45";

export const BOOKING_BORDER = "border-[#1a1a1a]/10";

export const BOOKING_QTY_CONTROL =
  "inline-flex items-center overflow-hidden rounded-lg border border-[#1a1a1a]/12 bg-white";

export const bookingMotion = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
} as const;
