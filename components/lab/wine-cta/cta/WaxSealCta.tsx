"use client";

/** Variant B — Luxury burgundy wax seal */
export default function WaxSealCta() {
  return (
    <button
      type="button"
      className="group relative flex h-[min(72px,12vw)] w-[min(72px,12vw)] min-h-[56px] min-w-[56px] flex-col items-center justify-center rounded-full border border-[#D4AF5A]/70 bg-[#5C1828] shadow-[inset_0_2px_8px_rgba(255,255,255,0.12),inset_0_-4px_12px_rgba(0,0,0,0.35),0_6px_20px_rgba(92,24,40,0.45)] transition-[transform,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.16),inset_0_-4px_12px_rgba(0,0,0,0.3),0_10px_32px_rgba(200,155,60,0.35),0_0_28px_rgba(200,155,60,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-gold"
      aria-label="Explorar Wine Tours"
    >
      <span
        className="pointer-events-none absolute inset-[3px] rounded-full border border-[#D4AF5A]/40"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-[8px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.2) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <span className="relative z-[1] font-serif text-[clamp(0.55rem,2.2vw,0.72rem)] font-semibold uppercase tracking-[0.28em] text-[#F8F0E6] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
        Explorar
      </span>
    </button>
  );
}
