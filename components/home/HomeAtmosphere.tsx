"use client";

import PremiumAtmosphere from "@/components/experience-hero/atmosphere/PremiumAtmosphere";
import { useHomeExperience } from "@/components/home/HomeExperienceContext";

/**
 * Atmósfera fija compartida — misma capa visual que el hero del carrusel.
 */
export default function HomeAtmosphere() {
  const { activeId } = useHomeExperience();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <PremiumAtmosphere activeId={activeId} />
    </div>
  );
}
