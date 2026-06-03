"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useMotionValue, PanInfo } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import ExperienceNavigator from "@/components/cinematic/ExperienceNavigator";
import { experienceCategories } from "@/components/cinematic/cinematicData";
import type { SceneId } from "@/components/cinematic/types";
import ExperienceSidebar from "./ExperienceSidebar";
import ExperienceHeroFooter from "./ExperienceHeroFooter";
import ExperienceSpotlight from "./ExperienceSpotlight";
import SpatialExperienceCarousel from "./SpatialExperienceCarousel";
import { ExperienceHeroDebugProvider } from "./director/ExperienceHeroDebugContext";
import ExperienceHeroDebugPanel from "./director/ExperienceHeroDebugPanel";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { directorOutline } from "./director/directorOutline";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import {
  EXPERIENCE_WORLDS,
  getWorldConfig,
} from "./experienceHeroConfig";
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
  const [activeId, setActiveId] = useState<ExperienceWorldId>("adventure");
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const dragX = useMotionValue(0);
  const sceneBlur = isNavigatorOpen
    ? "blur(12px) brightness(0.55)"
    : undefined;

  const activeWorld = getWorldConfig(activeId);

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

  const shellClass = isDirector
    ? "fixed inset-x-0 bottom-0 top-[var(--experience-header-height,5.25rem)] z-40 flex flex-col bg-[#0a120f] text-white"
    : "fixed inset-0 z-[55] flex h-[100dvh] min-h-[100dvh] flex-col bg-[#0a120f] text-white";

  return (
    <>
      <div className={shellClass}>
        {!isDirector && (
          <>
            <div className="relative z-40 flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 lg:hidden">
              <span className="font-serif text-sm tracking-wide text-accent-gold">
                EDMAR TRAVEL
              </span>
            </div>

            <div className="relative z-40 flex gap-1 overflow-x-auto border-b border-white/[0.06] px-2 py-2 lg:hidden">
              {EXPERIENCE_WORLDS.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setActiveId(w.id)}
                  className={`shrink-0 rounded-md px-3 py-2 font-serif text-[11px] tracking-wide transition-colors ${
                    activeId === w.id
                      ? "bg-[#3A5F4A]/80 text-[#F8F4EC]"
                      : "text-white/50"
                  }`}
                >
                  {w.sidebarTitle}
                </button>
              ))}
            </div>
          </>
        )}

        <div
          className={`relative flex min-h-0 flex-1 flex-col ${isDirector ? "" : "lg:flex-row"}`}
        >
          {!isDirector && (
            <div className="hidden lg:flex">
              <ExperienceSidebar
                worlds={EXPERIENCE_WORLDS}
                activeId={activeId}
                onSelect={setActiveId}
                contactHref={`/${locale}/contact`}
              />
            </div>
          )}

          <div className="relative flex min-h-0 flex-1 flex-col">
            {!isDirector && (
              <div className="absolute right-4 top-4 z-40 hidden items-center gap-3 lg:flex">
                <a
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm"
                >
                  Contacto
                </a>
              </div>
            )}

            <motion.main
              className="relative min-h-0 flex-1 touch-pan-y transition-[filter] duration-700 ease-out"
              style={{ x: dragX, filter: sceneBlur }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onPanEnd={handlePanEnd}
              inert={isNavigatorOpen}
            >
              <AnimatePresence mode="wait">
                <ExperienceSpotlight key={activeId} world={activeWorld} />
              </AnimatePresence>

              <div
                data-director-layer="carousel-wrap"
                className={`absolute inset-0 flex items-stretch justify-center ${directorOutline("carouselWrap", showOutlines)}`}
                style={{
                  paddingTop: `${carouselWrap?.paddingTopRem ?? 0}rem`,
                  paddingBottom: isDirector
                    ? `${carouselWrap?.paddingBottomRem ?? 0}rem`
                    : `${carouselWrap?.paddingBottomRem ?? 5.5}rem`,
                }}
              >
                <SpatialExperienceCarousel
                  activeId={activeId}
                  onSelect={setActiveId}
                  onExplore={handleExplore}
                />
              </div>
            </motion.main>

            {!isDirector && (
              <ExperienceHeroFooter
                activeId={activeId}
                onSelect={setActiveId}
              />
            )}
          </div>
        </div>
      </div>

      <ExperienceNavigator
        open={isNavigatorOpen}
        category={experienceCategories[WORLD_TO_SCENE[activeId]]}
        locale={locale}
        onClose={() => setIsNavigatorOpen(false)}
      />

      {isDirector ? <ExperienceHeroDebugPanel /> : null}
    </>
  );
}

export default function ExperienceSelectorHome() {
  return (
    <ExperienceHeroDebugProvider>
      <ExperienceSelectorHomeInner />
    </ExperienceHeroDebugProvider>
  );
}
