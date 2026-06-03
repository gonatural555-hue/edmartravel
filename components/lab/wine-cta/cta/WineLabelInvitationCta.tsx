"use client";

/** Variant D — Premium floating wine label invitation */
export default function WineLabelInvitationCta() {
  return (
    <button
      type="button"
      className="group relative w-full max-w-[min(100%,240px)] rounded-sm border-2 border-[#B8923A]/75 bg-[#F4EFE4] px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_36px_rgba(42,32,22,0.1)] transition-[transform,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_rgba(200,155,60,0.18),0_0_20px_rgba(200,155,60,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
      aria-label="Explorar experiencias Wine Tours"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <span
        className="pointer-events-none absolute inset-[5px] rounded-[1px] border border-[#C8A040]/45"
        aria-hidden
      />
      <h3 className="relative font-serif text-[clamp(0.72rem,2.8vw,0.95rem)] font-semibold uppercase leading-tight tracking-[0.12em] text-[#3D2E24]">
        Wine Tours
        <br />
        <span className="text-[0.92em]">&amp; Bodegas</span>
      </h3>
      <p className="relative mx-auto mt-2.5 max-w-[22ch] font-serif text-[clamp(0.55rem,2vw,0.68rem)] leading-snug text-[#5C4A3A]/88">
        Descubrí las bodegas más emblemáticas de Mendoza.
      </p>
      <p className="relative mt-3 font-sans text-[clamp(0.58rem,2.1vw,0.68rem)] font-semibold tracking-wide text-[#6B5344] transition-colors duration-[900ms] group-hover:text-accent-gold">
        Explorar experiencias &rarr;
      </p>
    </button>
  );
}
