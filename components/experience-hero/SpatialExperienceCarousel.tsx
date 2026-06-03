"use client";

import { useMemo } from "react";
import WineWorldScene from "./worlds/WineWorldScene";
import PhotoWorldScene from "./worlds/PhotoWorldScene";
import CityWorldScene from "./worlds/CityWorldScene";
import SpatialWorldPanel from "./SpatialWorldPanel";
import { directorOutline } from "./director/directorOutline";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import {
  EXPERIENCE_WORLDS,
  getSpatialSlots,
  getWorldConfig,
} from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

type SpatialExperienceCarouselProps = {
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
  onExplore: (id: ExperienceWorldId) => void;
};

/**
 * Stage único: tres mundos con posición absoluta % + profundidad.
 * Al cambiar categoría, cada mundo anima hacia active / left / right.
 */
export default function SpatialExperienceCarousel({
  activeId,
  onSelect,
  onExplore,
}: SpatialExperienceCarouselProps) {
  const slots = useMemo(() => getSpatialSlots(activeId), [activeId]);
  const isDirector = useExperienceDirectorMode();
  const debug = useExperienceHeroDebugOptional();
  const stage = debug?.values.carouselStage;
  const showOutlines = isDirector && (debug?.values.showOutlines ?? true);

  const perspectivePx = stage?.perspectivePx ?? 2400;
  const originX = stage?.originX ?? 58;
  const originY = stage?.originY ?? 50;

  return (
    <div
      data-director-layer="carousel-stage"
      className={`relative h-full w-full overflow-hidden ${directorOutline("carouselStage", showOutlines)}`}
      aria-label="Selector de experiencias"
    >
      <div
        data-director-layer="carousel-perspective"
        className={`absolute inset-0 ${directorOutline("carouselPerspective", showOutlines)}`}
        style={{
          perspective: `${perspectivePx}px`,
          perspectiveOrigin: `${originX}% ${originY}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {EXPERIENCE_WORLDS.map((world) => {
            const slot = slots[world.id];
            const config = getWorldConfig(world.id);
            const compact = slot !== "center";

            const content =
              world.id === "wine" ? (
                <WineWorldScene
                  compact={compact}
                  title={config.title}
                  onExplore={() => onExplore("wine")}
                  ctaTitle={config.ctaTitle}
                  ctaSubtitle={config.ctaSubtitle}
                  ctaAction={config.ctaAction}
                />
              ) : world.id === "adventure" ? (
                <PhotoWorldScene
                  imageSrc={config.heroImage}
                  imageAlt={config.heroImageAlt}
                  title={config.title}
                  ctaTitle={config.ctaTitle}
                  ctaSubtitle={config.ctaSubtitle}
                  ctaAction={config.ctaAction}
                  onExplore={() => onExplore("adventure")}
                  compact={compact}
                />
              ) : (
                <CityWorldScene
                  heroImage={config.heroImage}
                  heroImageAlt={config.heroImageAlt}
                  title={config.title}
                  ctaTitle={config.ctaTitle}
                  ctaSubtitle={config.ctaSubtitle}
                  ctaAction={config.ctaAction}
                  onExplore={() => onExplore("city")}
                  compact={compact}
                />
              );

            return (
              <SpatialWorldPanel
                key={world.id}
                slot={slot}
                interactive={slot !== "center"}
                onClick={() => onSelect(world.id)}
              >
                {content}
              </SpatialWorldPanel>
            );
          })}
        </div>
      </div>

      {/* Viñetas suaves — no ocultar los peeks laterales */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,18,15,0.55) 0%, transparent 10%, transparent 90%, rgba(10,18,15,0.55) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#0a120f]/50 to-transparent"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => {
          const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
          const prev = EXPERIENCE_WORLDS[(i - 1 + 3) % 3];
          onSelect(prev.id);
        }}
        className="absolute left-[3%] top-[52%] z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:border-accent-gold/50 hover:text-accent-gold lg:flex"
        aria-label="Experiencia anterior"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => {
          const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
          const next = EXPERIENCE_WORLDS[(i + 1) % 3];
          onSelect(next.id);
        }}
        className="absolute right-[3%] top-[52%] z-40 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:border-accent-gold/50 hover:text-accent-gold lg:flex"
        aria-label="Siguiente experiencia"
      >
        ›
      </button>
    </div>
  );
}
