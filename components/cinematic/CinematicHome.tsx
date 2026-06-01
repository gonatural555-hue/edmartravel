"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import Scene01WineTours from "./Scene01WineTours";
import Scene02AdventurePlaceholder from "./Scene02AdventurePlaceholder";
import Scene03DiscoverPlaceholder from "./Scene03DiscoverPlaceholder";
import ExperienceNavigator from "./ExperienceNavigator";
import { experienceCategories } from "./cinematicData";
import type { SceneId } from "./types";

/**
 * EDMAR TRAVEL — Cinematic Storytelling Home.
 *
 * Estado actual:
 * - Escena 01 (Wine Tours) refinada y estática, lista para animar.
 * - Escenas 02/03 como placeholders estructurales.
 * - Experience Navigator global conectado a cada CTA.
 *
 * Las escenas se apilan verticalmente para preparar el scroll cinematográfico
 * (Fase 3). Aún NO hay pinning ni animación de scroll.
 */
export default function CinematicHome() {
  const locale = useLocale();
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SceneId>("wine");

  const openNavigator = (category: SceneId) => {
    setActiveCategory(category);
    setIsNavigatorOpen(true);
  };

  const closeNavigator = () => setIsNavigatorOpen(false);

  return (
    <main className="relative w-full bg-dark-base">
      {/* Las escenas permanecen visibles detrás del panel: se oscurecen y difuminan. */}
      <div
        className="transition-[filter] duration-700 ease-out"
        style={
          isNavigatorOpen
            ? { filter: "blur(14px) brightness(0.5)" }
            : undefined
        }
        inert={isNavigatorOpen}
      >
        <Scene01WineTours onExplore={() => openNavigator("wine")} />
        <Scene02AdventurePlaceholder onExplore={() => openNavigator("adventure")} />
        <Scene03DiscoverPlaceholder onExplore={() => openNavigator("discover")} />
      </div>

      <ExperienceNavigator
        open={isNavigatorOpen}
        category={experienceCategories[activeCategory]}
        locale={locale}
        onClose={closeNavigator}
      />
    </main>
  );
}
