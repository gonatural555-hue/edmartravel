"use client";

type PremiumExperienceCtaCardProps = {
  title: string;
  subtitle: string;
  actionLabel: string;
  onAction: () => void;
  compact?: boolean;
};

export default function PremiumExperienceCtaCard({
  title,
  subtitle,
  actionLabel,
  onAction,
  compact = false,
}: PremiumExperienceCtaCardProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onAction();
      }}
      className={`group relative text-left transition-[transform,box-shadow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_rgba(200,155,60,0.18),0_0_20px_rgba(200,155,60,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold ${
        compact
          ? "max-w-[200px] rounded-sm border border-[#B8923A]/60 bg-[#F4EFE4]/95 px-3 py-2.5 shadow-md"
          : "max-w-[min(100%,280px)] rounded-sm border-2 border-[#B8923A]/75 bg-[#F4EFE4] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_28px_rgba(42,32,22,0.12)]"
      }`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      }}
    >
      <span
        className="pointer-events-none absolute inset-[6px] rounded-[1px] border border-[#C8A040]/40"
        aria-hidden
      />
      <h3
        className={`relative font-serif font-semibold uppercase leading-tight tracking-[0.1em] text-[#3D2E24] ${
          compact ? "text-[10px]" : "text-[clamp(0.72rem,1.8vw,0.95rem)]"
        }`}
      >
        {title}
      </h3>
      <p
        className={`relative mt-1.5 font-serif leading-snug text-[#5C4A3A]/88 ${
          compact ? "text-[8px] line-clamp-2" : "text-[clamp(0.58rem,1.4vw,0.72rem)]"
        }`}
      >
        {subtitle}
      </p>
      <p
        className={`relative mt-2 font-sans font-semibold tracking-wide text-[#6B5344] transition-colors duration-500 group-hover:text-accent-gold ${
          compact ? "text-[8px]" : "text-[clamp(0.58rem,1.3vw,0.68rem)]"
        }`}
      >
        {actionLabel}
      </p>
    </button>
  );
}
