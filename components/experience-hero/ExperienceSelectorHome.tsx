"use client";

import { useCallback, useState } from "react";
import { useHomeExperienceOptional } from "@/components/home/HomeExperienceContext";
import { AnimatePresence, motion, useMotionValue, PanInfo } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import ExperienceNavigator from "@/components/cinematic/ExperienceNavigator";
import { experienceCategories } from "@/components/cinematic/cinematicData";
import type { SceneId } from "@/components/cinematic/types";
import SpatialExperienceCarousel from "./SpatialExperienceCarousel";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { directorOutline } from "./director/directorOutline";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import { EXPERIENCE_WORLDS } from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

const WORLD_TO_SCENE: Record<ExperienceWorldId, SceneId> = {
  wine: "wine",
  adventure: "adventure",
  city: "discover",
};

function ExperienceSelectorHomeInner() {
  const locale = useLocale();
  const isDirector = useExperienceDirectorMode();
  const debug = useExperienceHeroDebugOptional();
  const carouselWrap = debug?.values.carouselWrap;
  const showOutlines = isDirector && (debug?.values.showOutlines ?? true);
  const homeExperience = useHomeExperienceOptional();
  const [localActiveId, setLocalActiveId] =
    useState<ExperienceWorldId>("adventure");
  const activeId = homeExperience?.activeId ?? localActiveId;
  const setActiveId = homeExperience?.setActiveId ?? setLocalActiveId;
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const dragX = useMotionValue(0);
  const sceneBlur = isNavigatorOpen
    ? "blur(12px) brightness(0.55)"
    : undefined;

  const openNavigator = useCallback((id: ExperienceWorldId) => {
    setIsNavigatorOpen(true);
  }, []);

  const handleExplore = useCallback(
    (id: ExperienceWorldId) => {
      setActiveId(id);
      openNavigator(id);
    },
    [openNavigator]
  );

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
    <>
      <div className="relative flex min-h-[100dvh] w-full flex-col text-white">
        <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-[var(--experience-header-height,4.25rem)]">
          <motion.main
            className="premium-fade-in-delayed relative min-h-0 flex-1 touch-pan-y transition-[filter,opacity,transform] duration-700"
            style={{
              x: dragX,
              filter: sceneBlur,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onPanEnd={handlePanEnd}
            inert={isNavigatorOpen}
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
                onExplore={handleExplore}
              />
            </div>
          </motion.main>
        </div>
      </div>

      <ExperienceNavigator
        open={isNavigatorOpen}
        category={experienceCategories[WORLD_TO_SCENE[activeId]]}
        locale={locale}
        onClose={() => setIsNavigatorOpen(false)}
      />

    </>
  );
}

export default function ExperienceSelectorHome() {
  return <ExperienceSelectorHomeInner />;
}
