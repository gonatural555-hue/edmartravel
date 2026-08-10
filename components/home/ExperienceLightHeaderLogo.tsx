"use client";

import { useLayoutEffect } from "react";
import { setExperienceLightHeaderLogo } from "@/lib/header-logo";

/** Fuerza logo blanco en el header global mientras la página de experiencia está montada. */
export default function ExperienceLightHeaderLogo() {
  useLayoutEffect(() => {
    setExperienceLightHeaderLogo(true);
    return () => setExperienceLightHeaderLogo(false);
  }, []);

  return null;
}
