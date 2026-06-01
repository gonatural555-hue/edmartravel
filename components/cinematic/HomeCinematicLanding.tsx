"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import WineToursScene from "./WineToursScene";
import ExperienceNavigator from "./ExperienceNavigator";
import { experienceCategories, type ExperienceCategory } from "./cinematicData";

/**
 * EDMAR TRAVEL — Cinematic Storytelling Landing.
 *
 * FASE 1: composición estática del Capítulo 01 (Wine Tours & Bodegas).
 * FASE 2: Experience Navigator lateral conectado al CTA.
 * - Sin animación de scroll todavía (Fase 3).
 * - Capítulos 02 (Adventure) y 03 (Discover) en la Fase 4.
 */
export default function HomeCinematicLanding() {
  const locale = useLocale();
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<ExperienceCategory["id"]>("wine");

  const openNavigator = (category: ExperienceCategory["id"]) => {
    setActiveCategory(category);
    setIsNavigatorOpen(true);
  };

  const closeNavigator = () => setIsNavigatorOpen(false);

  return (
    <main className="relative w-full bg-dark-base">
      {/* El hero permanece visible detrás del panel: se oscurece y difumina. */}
      <div
        className="transition-[filter,transform] duration-700 ease-out"
        style={
          isNavigatorOpen
            ? { filter: "blur(14px) brightness(0.5)", transform: "scale(1.03)" }
            : undefined
        }
        // Oculta el hero a tecnologías de asistencia mientras el panel está abierto.
        inert={isNavigatorOpen}
      >
        <WineToursScene onExplore={() => openNavigator("wine")} />
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
