"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EXPERIENCE_HERO_DEBUG_DEFAULTS } from "../experienceHeroLayout";
import type {
  ExperienceHeroDebugState,
  LogoDebugValues,
  CarouselWrapDebugValues,
  CarouselStageDebugValues,
  PanelSizeDebugValues,
  SlotDebugValues,
} from "./experienceHeroDebugConfig";
import type { SpatialSlot } from "../types";

const STORAGE_KEY = "experience-hero-debug-layout";

function loadStoredValues(): ExperienceHeroDebugState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ExperienceHeroDebugState;
  } catch {
    return null;
  }
}

type ExperienceHeroDebugContextValue = {
  values: ExperienceHeroDebugState;
  setLogo: (patch: Partial<LogoDebugValues>) => void;
  setCarouselWrap: (patch: Partial<CarouselWrapDebugValues>) => void;
  setCarouselStage: (patch: Partial<CarouselStageDebugValues>) => void;
  setPanelSize: (patch: Partial<PanelSizeDebugValues>) => void;
  setSlot: (slot: SpatialSlot, patch: Partial<SlotDebugValues>) => void;
  setShowOutlines: (show: boolean) => void;
  persistForHome: () => void;
  resetAll: () => void;
};

const ExperienceHeroDebugContext =
  createContext<ExperienceHeroDebugContextValue | null>(null);

export function ExperienceHeroDebugProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [values, setValues] = useState<ExperienceHeroDebugState>(
    EXPERIENCE_HERO_DEBUG_DEFAULTS
  );

  useEffect(() => {
    const isDirector =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("director") === "true";
    const stored = loadStoredValues();
    if (isDirector && stored) {
      setValues({ ...EXPERIENCE_HERO_DEBUG_DEFAULTS, ...stored });
    } else {
      setValues(EXPERIENCE_HERO_DEBUG_DEFAULTS);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(EXPERIENCE_HERO_DEBUG_DEFAULTS)
        );
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      window.dispatchEvent(new CustomEvent("experience-hero-debug-updated"));
    } catch {
      /* ignore */
    }
  }, [values]);

  const setLogo = useCallback((patch: Partial<LogoDebugValues>) => {
    setValues((prev) => ({ ...prev, logo: { ...prev.logo, ...patch } }));
  }, []);

  const setCarouselWrap = useCallback(
    (patch: Partial<CarouselWrapDebugValues>) => {
      setValues((prev) => ({
        ...prev,
        carouselWrap: { ...prev.carouselWrap, ...patch },
      }));
    },
    []
  );

  const setCarouselStage = useCallback(
    (patch: Partial<CarouselStageDebugValues>) => {
      setValues((prev) => ({
        ...prev,
        carouselStage: { ...prev.carouselStage, ...patch },
      }));
    },
    []
  );

  const setPanelSize = useCallback((patch: Partial<PanelSizeDebugValues>) => {
    setValues((prev) => ({
      ...prev,
      panelSize: { ...prev.panelSize, ...patch },
    }));
  }, []);

  const setSlot = useCallback(
    (slot: SpatialSlot, patch: Partial<SlotDebugValues>) => {
      setValues((prev) => ({
        ...prev,
        slots: {
          ...prev.slots,
          [slot]: { ...prev.slots[slot], ...patch },
        },
      }));
    },
    []
  );

  const setShowOutlines = useCallback((show: boolean) => {
    setValues((prev) => ({ ...prev, showOutlines: show }));
  }, []);

  const persistForHome = useCallback(() => {
    const payload = {
      logo: values.logo,
      carouselWrap: values.carouselWrap,
      carouselStage: values.carouselStage,
      panelSize: values.panelSize,
      slots: values.slots,
      showOutlines: values.showOutlines,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent("experience-hero-debug-updated"));
    } catch {
      /* ignore */
    }
  }, [values]);

  const resetAll = useCallback(() => {
    setValues(EXPERIENCE_HERO_DEBUG_DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent("experience-hero-debug-updated"));
    } catch {
      /* ignore */
    }
  }, []);

  const ctx = useMemo(
    () => ({
      values,
      setLogo,
      setCarouselWrap,
      setCarouselStage,
      setPanelSize,
      setSlot,
      setShowOutlines,
      persistForHome,
      resetAll,
    }),
    [
      values,
      setLogo,
      setCarouselWrap,
      setCarouselStage,
      setPanelSize,
      setSlot,
      setShowOutlines,
      persistForHome,
      resetAll,
    ]
  );

  return (
    <ExperienceHeroDebugContext.Provider value={ctx}>
      {children}
    </ExperienceHeroDebugContext.Provider>
  );
}

export function useExperienceHeroDebug() {
  const ctx = useContext(ExperienceHeroDebugContext);
  if (!ctx) {
    throw new Error(
      "useExperienceHeroDebug must be used within ExperienceHeroDebugProvider"
    );
  }
  return ctx;
}

export function useExperienceHeroDebugOptional() {
  return useContext(ExperienceHeroDebugContext);
}

export { STORAGE_KEY as EXPERIENCE_HERO_DEBUG_STORAGE_KEY };
