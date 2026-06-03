"use client";

/** Variant C — Frosted hospitality glass card */
export default function LuxuryGlassCardCta() {
  return (
    <button
      type="button"
      className="group relative w-full max-w-[min(100%,220px)] overflow-hidden rounded-lg border border-[#C8A040]/55 bg-white/[0.42] px-4 py-3.5 text-left shadow-[0_12px_40px_rgba(12,20,17,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md transition-[transform,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:shadow-[0_16px_48px_rgba(12,20,17,0.12),inset_0_1px_0_rgba(255,255,255,0.85),0_0_24px_rgba(200,155,60,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
      aria-label="Explorar Wine Tours y Bodegas"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.45) 0%, transparent 42%, transparent 58%, rgba(255,255,255,0.2) 100%)",
        }}
        aria-hidden
      />
      <p className="relative font-serif text-[clamp(0.62rem,2.4vw,0.78rem)] font-semibold uppercase tracking-[0.2em] text-[#3D3228]">
        Wine Tours &amp; Bodegas
      </p>
      <p className="relative mt-1.5 font-serif text-[clamp(0.58rem,2.1vw,0.72rem)] leading-snug text-[#5C4A3A]/90">
        Descubrí Mendoza.
      </p>
      <p className="relative mt-2.5 flex items-center gap-1.5 font-sans text-[clamp(0.6rem,2.2vw,0.7rem)] font-semibold tracking-wide text-accent-gold transition-transform duration-[900ms] ease-out group-hover:translate-x-0.5">
        Explorar
        <span aria-hidden className="text-sm leading-none">
          &rarr;
        </span>
      </p>
    </button>
  );
}
