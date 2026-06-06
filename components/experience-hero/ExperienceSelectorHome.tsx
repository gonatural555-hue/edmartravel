"use client";

import { useState } from "react";
import { useHomeExperienceOptional } from "@/components/home/HomeExperienceContext";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import SpatialExperienceCarousel from "./SpatialExperienceCarousel";
import HeroCarouselMobileNav from "./HeroCarouselMobileNav";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { directorOutline } from "./director/directorOutline";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import { EXPERIENCE_WORLDS } from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

function ExperienceSelectorHomeInner() {
  const isDirector = useExperienceDirectorMode();
  const debug = useExperienceHeroDebugOptional();
  const carouselWrap = debug?.values.carouselWrap;
  const showOutlines = isDirector && (debug?.values.showOutlines ?? true);
  const homeExperience = useHomeExperienceOptional();
  const [localActiveId, setLocalActiveId] =
    useState<ExperienceWorldId>("adventure");
  const activeId = homeExperience?.activeId ?? localActiveId;
  const setActiveId = homeExperience?.setActiveId ?? setLocalActiveId;
  const dragX = useMotionValue(0);

  const goPrev = () => {
    const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
    setActiveId(EXPERIENCE_WORLDS[(i - 1 + 3) % 3].id);
  };

  const goNext = () => {
    const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
    setActiveId(EXPERIENCE_WORLDS[(i + 1) % 3].id);
  };

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    const threshold = 48;
    if (info.offset.x < -threshold) {
      goNext();
    } else if (info.offset.x > threshold) {
      goPrev();
    }
    dragX.set(0);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <motion.main
          className="premium-fade-in-delayed relative min-h-0 flex-1 touch-pan-y lg:pb-0"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onPanEnd={handlePanEnd}
        >
          <div
            data-director-layer="carousel-wrap"
            className={`absolute inset-0 bottom-[4.25rem] flex items-stretch justify-center pt-[calc(var(--experience-header-height,5.5rem)+0.25rem)] lg:bottom-0 lg:pt-0 ${directorOutline("carouselWrap", showOutlines)}`}
            style={{
              paddingTop: `${carouselWrap?.paddingTopRem ?? 0}rem`,
              paddingBottom: `${carouselWrap?.paddingBottomRem ?? 0}rem`,
            }}
          >
            <SpatialExperienceCarousel
              activeId={activeId}
              onSelect={setActiveId}
            />
            <HeroCarouselMobileNav
              activeId={activeId}
              onSelect={setActiveId}
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export default function ExperienceSelectorHome() {
  return <ExperienceSelectorHomeInner />;
}
