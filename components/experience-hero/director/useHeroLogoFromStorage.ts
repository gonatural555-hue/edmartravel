"use client";

import { useEffect, useState } from "react";
import { HERO_LOGO_LAYOUT } from "../heroLayoutProduction";
import type { LogoDebugValues } from "./experienceHeroDebugConfig";
import { EXPERIENCE_HERO_DEBUG_STORAGE_KEY } from "./ExperienceHeroDebugContext";

export function useHeroLogoFromStorage(): LogoDebugValues {
  const [logo, setLogo] = useState<LogoDebugValues>(HERO_LOGO_LAYOUT);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(EXPERIENCE_HERO_DEBUG_STORAGE_KEY);
        if (!raw) {
          setLogo(HERO_LOGO_LAYOUT);
          return;
        }
        const parsed = JSON.parse(raw) as { logo?: LogoDebugValues };
        setLogo(parsed.logo ?? HERO_LOGO_LAYOUT);
      } catch {
        setLogo(HERO_LOGO_LAYOUT);
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("experience-hero-debug-updated", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("experience-hero-debug-updated", read);
    };
  }, []);

  return logo;
}
