"use client";

import { categoryEditorialButtonClass } from "@/components/category/CategoryEditorialButton";
import { EXPERIENCE_WORLDS } from "./experienceHeroConfig";
import {
  HERO_MOBILE_NAV_GAP,
  SPATIAL_PANEL_CENTER_TOP_MOBILE,
  SPATIAL_PANEL_HALF_HEIGHT_MOBILE,
} from "./spatialSlotLayout";
import type { ExperienceWorldId } from "./types";

type HeroCarouselMobileNavProps = {
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
  onPrev: () => void;
  onNext: () => void;
};

const ICON_BTN = categoryEditorialButtonClass(
  "primary",
  "!min-h-[44px] !min-w-[44px] !p-0"
);

const DOT_ACTIVE = categoryEditorialButtonClass(
  "primary",
  "!min-h-[10px] !h-2.5 !w-9 !min-w-[2.25rem] !px-0 !py-0"
);

const DOT_IDLE = categoryEditorialButtonClass(
  "secondary",
  "!min-h-[10px] !h-2.5 !w-2.5 !min-w-[10px] !px-0 !py-0"
);

export default function HeroCarouselMobileNav({
  activeId,
  onSelect,
  onPrev,
  onNext,
}: HeroCarouselMobileNavProps) {
  return (
    <nav
      className="pointer-events-auto absolute inset-x-0 z-30 flex items-center justify-center gap-3 px-4 lg:hidden"
      style={{
        top: `calc(${SPATIAL_PANEL_CENTER_TOP_MOBILE} + ${SPATIAL_PANEL_HALF_HEIGHT_MOBILE} + ${HERO_MOBILE_NAV_GAP})`,
      }}
      aria-label="Navegación del carrusel"
    >
      <button
        type="button"
        onClick={onPrev}
        className={ICON_BTN}
        aria-label="Experiencia anterior"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-4 w-4"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5" role="tablist" aria-label="Experiencias">
        {EXPERIENCE_WORLDS.map((world) => {
          const active = world.id === activeId;
          return (
            <button
              key={world.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={world.sidebarTitle}
              onClick={() => onSelect(world.id)}
              className={active ? DOT_ACTIVE : DOT_IDLE}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        className={ICON_BTN}
        aria-label="Siguiente experiencia"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-4 w-4"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
}
