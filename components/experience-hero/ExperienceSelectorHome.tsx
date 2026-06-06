"use client";

import { useState } from "react";
import { useHomeExperienceOptional } from "@/components/home/HomeExperienceContext";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import SpatialExperienceCarousel from "./SpatialExperienceCarousel";
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

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    const threshold = 48;
    const i = EXPERIENCE_WORLDS.findIndex((w) => w.id === activeId);
    if (info.offset.x < -threshold) {
      setActiveId(EXPERIENCE_WORLDS[(i + 1) % 3].id);
    } else if (info.offset.x > threshold) {
      setActiveId(EXPERIENCE_WORLDS[(i - 1 + 3) % 3].id);
    }
    dragX.set(0);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col text-white">
      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-[var(--experience-header-height,4.25rem)]">
        <motion.main
          className="premium-fade-in-delayed relative min-h-0 flex-1 touch-pan-y"
          style={{ x: dragX }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onPanEnd={handlePanEnd}
        >
          <div
            data-director-layer="carousel-wrap"
            className={`absolute inset-0 flex items-stretch justify-center ${directorOutline("carouselWrap", showOutlines)}`}
            style={{
              paddingTop: `${carouselWrap?.paddingTopRem ?? 0}rem`,
              paddingBottom: `${carouselWrap?.paddingBottomRem ?? 0}rem`,
            }}
          >
            <SpatialExperienceCarousel
              activeId={activeId}
              onSelect={setActiveId}
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
