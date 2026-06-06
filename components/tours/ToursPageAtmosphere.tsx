"use client";

import type { ExperienceWorldId } from "@/components/experience-hero/types";
import PremiumAtmosphere from "@/components/experience-hero/atmosphere/PremiumAtmosphere";

type ToursPageAtmosphereProps = {
  activeId: ExperienceWorldId;
};

/** Misma atmósfera premium que Home — fondo fijo detrás de los paneles. */
export default function ToursPageAtmosphere({
  activeId,
}: ToursPageAtmosphereProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <PremiumAtmosphere activeId={activeId} />
    </div>
  );
}
