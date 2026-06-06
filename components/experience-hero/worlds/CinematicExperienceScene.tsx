"use client";

import Image from "next/image";
import PremiumExperienceCtaButton from "../PremiumExperienceCtaButton";
import {
  contentJustifyFromPct,
  DEFAULT_PANEL_EDITORIAL_LAYOUT,
  type PanelEditorialLayoutDebugValues,
} from "../director/experienceHeroDebugConfig";

export type CinematicExperienceSceneProps = {
  imageSrc: string;
  imageAlt: string;
  titleLines: string[];
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  detailTags?: string[];
  compact?: boolean;
  imagePosition?: string;
  editorialLayout?: PanelEditorialLayoutDebugValues;
};

/**
 * Escena cinematográfica: imagen + bloque editorial (título, subtítulo, CTA).
 */
export default function CinematicExperienceScene({
  imageSrc,
  imageAlt,
  titleLines,
  subtitle,
  ctaLabel,
  ctaHref,
  detailTags = [],
  compact = false,
  imagePosition = "50% 42%",
  editorialLayout = DEFAULT_PANEL_EDITORIAL_LAYOUT,
}: CinematicExperienceSceneProps) {
  const layout = editorialLayout;
  if (compact) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#050606]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover brightness-[0.94] saturate-[1.02] contrast-[1.02]"
          style={{ objectPosition: imagePosition }}
          sizes="32vw"
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/18 via-transparent to-black/12"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div className="group/scene relative h-full w-full overflow-hidden bg-[#050606]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/scene:scale-[1.035]"
          style={{ objectPosition: imagePosition }}
          sizes="(max-width: 1200px) 72vw, 70vw"
          draggable={false}
        />
      </div>

      {/* Scrim lateral para legibilidad del bloque editorial */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/18 via-[38%] to-transparent transition-opacity duration-[600ms] group-hover/scene:from-black/48"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 from-0% via-transparent via-[40%] to-transparent"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-y-0 z-[2] flex flex-col"
        style={{
          left: `${layout.leftPct}%`,
          width: `min(${layout.widthPct}%, ${layout.maxWidthPx}px)`,
          paddingLeft: `${layout.padLeftPct}%`,
          paddingRight: `${layout.padRightPct}%`,
          paddingTop: `${layout.padTopPct}%`,
          paddingBottom: `${layout.padBottomPct}%`,
          justifyContent: contentJustifyFromPct(layout.contentJustifyPct),
          transform: `translate(${layout.offsetXPx}px, ${layout.offsetYPx}px)`,
        }}
      >
        <div
          className="flex w-full flex-col gap-0"
          style={{ maxWidth: layout.innerMaxWidthPx }}
        >
          <h2 className="font-theater font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[#F5F0E6] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] transition-[color,filter] duration-[500ms] group-hover/scene:text-[#FFFBF5] group-hover/scene:drop-shadow-[0_2px_24px_rgba(0,0,0,0.32)]">
            {titleLines.map((line, i) => (
              <span
                key={`${line}-${i}`}
                className="block opacity-95"
                style={{
                  fontSize: `clamp(${layout.titleFontMinRem}rem, ${layout.titleFontVw}vw, ${layout.titleFontMaxRem}rem)`,
                  marginTop: i > 0 ? layout.titleLineGapPx : 0,
                  opacity: i === 0 ? 1 : 0.95,
                }}
              >
                {line}
              </span>
            ))}
          </h2>

          <p
            className="whitespace-pre-line font-sans font-normal leading-relaxed tracking-[0.02em] text-[#F5F0E6]/78"
            style={{
              marginTop: layout.subtitleMarginTopPx,
              maxWidth: `${layout.subtitleMaxWidthCh}ch`,
              fontSize: `clamp(${layout.subtitleFontMinRem}rem, ${layout.subtitleFontVw}vw, ${layout.subtitleFontMaxRem}rem)`,
            }}
          >
            {subtitle}
          </p>

          {detailTags.length > 0 ? (
            <p className="mt-2.5 font-sans text-[9px] font-medium uppercase tracking-[0.26em] text-[#F5F0E6]/0 transition-opacity duration-[500ms] group-hover/scene:text-[#F5F0E6]/50 sm:text-[10px]">
              {detailTags.join(" · ")}
            </p>
          ) : null}

          <div
            className="pointer-events-auto"
            style={{ marginTop: layout.ctaMarginTopPx }}
          >
            <PremiumExperienceCtaButton label={ctaLabel} href={ctaHref} />
          </div>
        </div>
      </div>
    </div>
  );
}
