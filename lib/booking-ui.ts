/**
 * Sistema visual del flujo de reservas (Edmar Travel): vidrio oscuro, inputs premium, motion presets.
 * Alineado con `lib/about-ui` (ABOUT_GLASS).
 */
import { ABOUT_GLASS } from "@/lib/about-ui";

export const BOOKING_GLASS = {
  /** Fondo de página con gradiente suave */
  pageWrap:
    "relative min-h-[100dvh] overflow-x-hidden bg-[#0a0908] text-white",
  pageBackdrop:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(180,140,90,0.12),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(60,90,70,0.08),transparent_45%)]",
  /** Contenedor principal: misma caja que `Header` (max-w-7xl + padding) para alinear con el logo */
  container:
    "relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16",
  /** Panel principal (secciones izquierda) */
  panel: `${ABOUT_GLASS.panel} rounded-[1.35rem] p-6 sm:p-8 md:p-9`,
  /** Barra lateral sticky */
  sticky: `${ABOUT_GLASS.panel} rounded-[1.35rem] p-6 sm:p-8 lg:sticky lg:top-24`,
  /** Tarjeta de experiencia / ítem */
  experienceCard: `${ABOUT_GLASS.card} rounded-2xl border border-white/[0.1] p-5 sm:p-6`,
  /** Botón primario CTA */
  primaryCta:
    "inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-4 text-[0.95rem] font-semibold tracking-wide text-[#0c0a09] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_14px_40px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908] disabled:pointer-events-none disabled:opacity-45 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
  /** Enlace secundario */
  subtleLink:
    "text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-accent-moss",
} as const;

export const BOOKING_INPUT_CLASS =
  "w-full max-w-full rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] placeholder:text-white/35 transition-[border-color,box-shadow,background-color] duration-200 " +
  "focus:border-accent-gold/40 focus:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-accent-gold/25";

export const BOOKING_LABEL_CLASS =
  "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50";

export const BOOKING_SECTION_TITLE =
  "text-lg font-semibold tracking-tight text-white md:text-xl";

export const BOOKING_SECTION_HINT = "mt-1 text-sm text-white/45";

export const bookingMotion = {
  /** Sin `opacity: 0` en el contenedor: evita que el bloque quede invisible en cliente si el stagger falla */
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
