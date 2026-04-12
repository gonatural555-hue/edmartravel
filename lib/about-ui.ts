/**
 * Sistema visual About (Edmar Travel): vidrio suave, sombras contenidas, sin gradientes pesados.
 */
export const ABOUT_GLASS = {
  panel:
    "rounded-[1.25rem] border border-white/[0.09] bg-black/35 backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.28)]",
  card:
    "rounded-2xl border border-white/[0.1] bg-white/[0.045] backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
  value:
    "rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.06] hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100",
  quote:
    "rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] duration-300 hover:shadow-[0_14px_44px_rgba(0,0,0,0.28)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
} as const;
