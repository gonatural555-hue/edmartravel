"use client";

import Image from "next/image";
import PremiumExperienceCtaButton from "../PremiumExperienceCtaButton";
import {
  contentJustifyFromPct,
  DEFAULT_PANEL_EDITORIAL_LAYOUT,
  type PanelEditorialLayoutDebugValues,
} from "../director/experienceHeroDebugConfig";
import { useHeroMobile } from "../useHeroMobile";

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
  const isMobile = useHeroMobile();

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
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="group/scene relative h-full w-full overflow-hidden bg-[#050606]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="100vw"
            draggable={false}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-45% to-black/10"
          aria-hidden
        />

        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-end px-5 pb-2 pt-16 text-center">
          <div className="flex w-full max-w-[min(100%,22rem)] flex-col items-center">
            <h2 className="font-theater font-bold uppercase leading-[0.98] tracking-[-0.03em] text-[#F5F0E6] drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
              {titleLines.map((line, i) => (
                <span
                  key={`${line}-${i}`}
                  className="block"
                  style={{
                    fontSize: "clamp(2.25rem, 11.25vw, 3rem)",
                    marginTop: i > 0 ? 6 : 0,
                  }}
                >
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-3 max-w-[28ch] font-sans text-sm font-normal leading-relaxed tracking-[0.02em] text-[#F5F0E6]/82">
              {subtitle}
            </p>

            {detailTags.length > 0 ? (
              <p className="mt-2 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[#F5F0E6]/55">
                {detailTags.join(" · ")}
              </p>
            ) : null}

            <div className="pointer-events-auto mt-5 flex justify-center">
              <PremiumExperienceCtaButton label={ctaLabel} href={ctaHref} />
            </div>
          </div>
        </div>
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

      {/* Scrim inferior para legibilidad del bloque editorial */}
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
                  fontSize: `clamp(${layout.titleFontMinRem * 1.5}rem, ${layout.titleFontVw * 1.5}vw, ${layout.titleFontMaxRem * 1.5}rem)`,
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
