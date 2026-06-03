"use client";

import Image from "next/image";
import PremiumExperienceCtaCard from "../PremiumExperienceCtaCard";

export type CinematicCoverSceneProps = {
  imageSrc: string;
  imageAlt: string;
  /** Título editorial — tercero en jerarquía visual */
  title: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaAction: string;
  onExplore: () => void;
  compact?: boolean;
  /** Punto focal de la foto (evitar cubrir sujetos) */
  imagePosition?: string;
};

/**
 * Portada cinematográfica: imagen hero + CTA + título pequeño.
 * Sin párrafos duplicados ni overlays pesados.
 */
export default function CinematicCoverScene({
  imageSrc,
  imageAlt,
  title,
  ctaTitle,
  ctaSubtitle,
  ctaAction,
  onExplore,
  compact = false,
  imagePosition = "50% 42%",
}: CinematicCoverSceneProps) {
  if (compact) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0a120f]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover brightness-[0.92] saturate-[0.95]"
          style={{ objectPosition: imagePosition }}
          sizes="280px"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a120f]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        style={{ objectPosition: imagePosition }}
        sizes="(max-width: 1200px) 70vw, 64vw"
        draggable={false}
      />

      {/* Viñetas mínimas — solo legibilidad en esquinas */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/25 from-0% via-transparent via-[22%] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 from-0% via-transparent via-[28%] to-transparent"
        aria-hidden
      />

      <h2 className="pointer-events-none absolute left-[5%] top-[6%] z-[2] max-w-[min(42%,220px)] font-serif text-[clamp(0.68rem,1.35vw,0.95rem)] font-light uppercase leading-[1.35] tracking-[0.16em] text-white/90 line-clamp-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
        {title}
      </h2>

      <div className="pointer-events-auto absolute bottom-[7%] left-[5%] z-[3]">
        <PremiumExperienceCtaCard
          title={ctaTitle}
          subtitle={ctaSubtitle}
          actionLabel={ctaAction}
          onAction={onExplore}
        />
      </div>
    </div>
  );
}
