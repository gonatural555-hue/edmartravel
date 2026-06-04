"use client";

import { useMemo } from "react";
import WineWorldScene from "./worlds/WineWorldScene";
import PhotoWorldScene from "./worlds/PhotoWorldScene";
import CityWorldScene from "./worlds/CityWorldScene";
import SpatialWorldPanel from "./SpatialWorldPanel";
import CarouselNavArrow from "./CarouselNavArrow";
import { directorOutline } from "./director/directorOutline";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import { HERO_CAROUSEL_STAGE } from "./heroLayoutProduction";
import {
  EXPERIENCE_WORLDS,
  getSpatialSlots,
  getWorldConfig,
} from "./experienceHeroConfig";
import type { PanelEditorialLayoutDebugValues } from "./director/experienceHeroDebugConfig";
import type { ExperienceWorldId, SpatialSlot } from "./types";

type SpatialExperienceCarouselProps = {
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
  onExplore: (id: ExperienceWorldId) => void;
};

const SLOT_PAINT_ORDER: Record<SpatialSlot, number> = {
  left: 0,
  right: 1,
  center: 2,
};

type SceneRenderConfig = ReturnType<typeof getWorldConfig> & {
  titleLines: string[];
  subtitle: string;
  ctaLabel: string;
  layout?: PanelEditorialLayoutDebugValues;
};

function renderScene(
  worldId: ExperienceWorldId,
  config: SceneRenderConfig,
  compact: boolean,
  onExplore: () => void
) {
  const sceneProps = {
    imageSrc: config.heroImage,
    imageAlt: config.heroImageAlt,
    titleLines: config.titleLines,
    subtitle: config.subtitle,
    ctaLabel: config.ctaLabel,
    detailTags: config.detailTags,
    imagePosition: config.imagePosition,
    editorialLayout: config.layout,
    onExplore,
    compact,
  };

  if (worldId === "wine") return <WineWorldScene {...sceneProps} />;
  if (worldId === "adventure") return <PhotoWorldScene {...sceneProps} />;
  return <CityWorldScene {...sceneProps} />;
}

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

  const perspectivePx = stage?.perspectivePx ?? HERO_CAROUSEL_STAGE.perspectivePx;
  const originX = stage?.originX ?? HERO_CAROUSEL_STAGE.originX;
  const originY = stage?.originY ?? HERO_CAROUSEL_STAGE.originY;

  const worldsOrdered = useMemo(
    () =>
      [...EXPERIENCE_WORLDS].sort(
        (a, b) => SLOT_PAINT_ORDER[slots[a.id]] - SLOT_PAINT_ORDER[slots[b.id]]
      ),
    [slots]
  );

  const goPrev = () => {
    const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
    onSelect(EXPERIENCE_WORLDS[(i - 1 + 3) % 3].id);
  };

  const goNext = () => {
    const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
    onSelect(EXPERIENCE_WORLDS[(i + 1) % 3].id);
  };

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
          {worldsOrdered.map((world) => {
            const slot = slots[world.id];
            const config = getWorldConfig(world.id);
            const copy = debug?.values.panelCopy[world.id];
            const sceneConfig = copy
              ? {
                  ...config,
                  titleLines:
                    copy.titleLines.length > 0
                      ? copy.titleLines
                      : config.titleLines,
                  subtitle: copy.subtitle,
                  ctaLabel: copy.ctaLabel,
                  layout: copy.layout,
                }
              : config;

            return (
              <SpatialWorldPanel
                key={world.id}
                slot={slot}
                interactive={slot !== "center"}
                onClick={() => onSelect(world.id)}
              >
                {renderScene(
                  world.id,
                  sceneConfig,
                  slot !== "center",
                  () => onExplore(world.id)
                )}
              </SpatialWorldPanel>
            );
          })}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,6,0.42) 0%, transparent 6%, transparent 94%, rgba(5,6,6,0.42) 100%)",
        }}
        aria-hidden
      />

      <CarouselNavArrow
        direction="prev"
        onClick={goPrev}
        className="left-[2%] xl:left-[3%]"
      />
      <CarouselNavArrow
        direction="next"
        onClick={goNext}
        className="right-[2%] xl:right-[3%]"
      />
    </div>
  );
}
