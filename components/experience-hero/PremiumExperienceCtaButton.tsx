"use client";

type PremiumExperienceCtaButtonProps = {
  label: string;
  onAction: () => void;
};

/** CTA pill cristal — una línea, flecha única al final */
export default function PremiumExperienceCtaButton({
  label,
  onAction,
}: PremiumExperienceCtaButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      className="group/cta relative inline-flex min-h-[44px] max-w-full items-center gap-3 whitespace-nowrap rounded-full border border-white/[0.65] px-5 py-2.5 font-sans text-[11px] font-medium tracking-[0.04em] text-[#1a1612] backdrop-blur-md transition-[box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/85 hover:shadow-[0_0_32px_rgba(255,255,255,0.42),0_10px_26px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:px-6 sm:text-xs"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(236,240,246,0.84) 50%, rgba(252,252,254,0.88) 100%)",
        boxShadow:
          "0 0 20px rgba(255,255,255,0.18), 0 8px 22px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.92)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] group-hover/cta:opacity-100"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.4) 42%, transparent 68%)",
        }}
        aria-hidden
      />
      <span
        className="relative h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#E8D4A8] to-[#C89B3C] shadow-[0_0_8px_rgba(200,155,60,0.4)]"
        aria-hidden
      />
      <span className="relative">{label}</span>
      <span
        className="relative shrink-0 text-[#1a1612]/55 transition-[opacity,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:text-[#1a1612]"
        aria-hidden
      >
        →
      </span>
    </button>
  );
}
