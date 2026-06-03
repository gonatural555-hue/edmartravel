"use client";

import { Suspense } from "react";
import ExperienceSelectorHome from "@/components/experience-hero/ExperienceSelectorHome";
import HideSiteChrome from "@/components/experience-hero/HideSiteChrome";

/**
 * Home inmersiva — selector espacial de 3 experiencias Mendoza.
 * Reemplaza el stack vertical de escenas cinematográficas.
 */
export default function CinematicHome() {
  return (
    <>
      <Suspense fallback={null}>
        <HideSiteChrome />
      </Suspense>
      <ExperienceSelectorHome />
    </>
  );
}
