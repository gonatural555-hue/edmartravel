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
import {
  EXPERIENCE_HERO_DEBUG_DEFAULTS,
  buildDefaultPanelCopy,
} from "../experienceHeroLayout";
import type {
  ExperienceHeroDebugState,
  HeaderUtilityId,
  HeaderUtilityPositionDebugValues,
  LogoDebugValues,
  CarouselWrapDebugValues,
  CarouselStageDebugValues,
  PanelCopyDebugValues,
  PanelSizeDebugValues,
  SlotDebugValues,
} from "./experienceHeroDebugConfig";
import {
  DEFAULT_HEADER_UTILITIES,
  HEADER_UTILITY_IDS,
} from "./experienceHeroDebugConfig";
import { persistHeaderUtilitiesForHome } from "./headerUtilitiesStorage";
import type { ExperienceWorldId, SpatialSlot } from "../types";

function mergePanelCopyEntry(
  defaults: PanelCopyDebugValues,
  stored?: Partial<PanelCopyDebugValues>
): PanelCopyDebugValues {
  return {
    ...defaults,
    ...stored,
    titleLines: stored?.titleLines ?? defaults.titleLines,
    layout: {
      ...defaults.layout,
      ...stored?.layout,
    },
  };
}

function mergeDebugState(
  stored: Partial<ExperienceHeroDebugState>
): ExperienceHeroDebugState {
  const defaults = EXPERIENCE_HERO_DEBUG_DEFAULTS;
  const defaultPanelCopy = buildDefaultPanelCopy();

  return {
    ...defaults,
    ...stored,
    logo: { ...defaults.logo, ...stored.logo },
    headerUtilities: HEADER_UTILITY_IDS.reduce(
      (acc, id) => ({
        ...acc,
        [id]: {
          ...defaults.headerUtilities[id],
          ...stored.headerUtilities?.[id],
        },
      }),
      { ...DEFAULT_HEADER_UTILITIES }
    ),
    carouselWrap: { ...defaults.carouselWrap, ...stored.carouselWrap },
    carouselStage: { ...defaults.carouselStage, ...stored.carouselStage },
    panelSize: { ...defaults.panelSize, ...stored.panelSize },
    slots: {
      center: { ...defaults.slots.center, ...stored.slots?.center },
      left: { ...defaults.slots.left, ...stored.slots?.left },
      right: { ...defaults.slots.right, ...stored.slots?.right },
    },
    panelCopy: {
      wine: mergePanelCopyEntry(defaultPanelCopy.wine, stored.panelCopy?.wine),
      adventure: mergePanelCopyEntry(
        defaultPanelCopy.adventure,
        stored.panelCopy?.adventure
      ),
      city: mergePanelCopyEntry(defaultPanelCopy.city, stored.panelCopy?.city),
    },
    showOutlines: stored.showOutlines ?? defaults.showOutlines,
  };
}

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
  setHeaderUtility: (
    id: HeaderUtilityId,
    patch: Partial<HeaderUtilityPositionDebugValues>
  ) => void;
  setCarouselWrap: (patch: Partial<CarouselWrapDebugValues>) => void;
  setCarouselStage: (patch: Partial<CarouselStageDebugValues>) => void;
  setPanelSize: (patch: Partial<PanelSizeDebugValues>) => void;
  setSlot: (slot: SpatialSlot, patch: Partial<SlotDebugValues>) => void;
  setPanelCopy: (
    worldId: ExperienceWorldId,
    patch: Partial<Omit<PanelCopyDebugValues, "layout">> & {
      layout?: Partial<PanelCopyDebugValues["layout"]>;
    }
  ) => void;
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
    if (isDirector) {
      setValues(
        stored ? mergeDebugState(stored) : EXPERIENCE_HERO_DEBUG_DEFAULTS
      );
      return;
    }
    // /es sin director: layout de producción en memoria, sin pisar localStorage
    setValues(EXPERIENCE_HERO_DEBUG_DEFAULTS);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDirector =
      new URLSearchParams(window.location.search).get("director") === "true";
    if (!isDirector) return;
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

  const setHeaderUtility = useCallback(
    (id: HeaderUtilityId, patch: Partial<HeaderUtilityPositionDebugValues>) => {
      setValues((prev) => ({
        ...prev,
        headerUtilities: {
          ...prev.headerUtilities,
          [id]: { ...prev.headerUtilities[id], ...patch },
        },
      }));
    },
    []
  );

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

  const setPanelCopy = useCallback(
    (
      worldId: ExperienceWorldId,
      patch: Partial<Omit<PanelCopyDebugValues, "layout">> & {
        layout?: Partial<PanelCopyDebugValues["layout"]>;
      }
    ) => {
      setValues((prev) => {
        const current = prev.panelCopy[worldId];
        return {
          ...prev,
          panelCopy: {
            ...prev.panelCopy,
            [worldId]: {
              ...current,
              ...patch,
              layout: patch.layout
                ? { ...current.layout, ...patch.layout }
                : current.layout,
            },
          },
        };
      });
    },
    []
  );

  const setShowOutlines = useCallback((show: boolean) => {
    setValues((prev) => ({ ...prev, showOutlines: show }));
  }, []);

  const persistForHome = useCallback(() => {
    const existing = loadStoredValues();
    const payload = {
      ...EXPERIENCE_HERO_DEBUG_DEFAULTS,
      ...existing,
      headerUtilities: values.headerUtilities,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      persistHeaderUtilitiesForHome(values.headerUtilities);
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
      setHeaderUtility,
      setCarouselWrap,
      setCarouselStage,
      setPanelSize,
      setSlot,
      setPanelCopy,
      setShowOutlines,
      persistForHome,
      resetAll,
    }),
    [
      values,
      setLogo,
      setHeaderUtility,
      setCarouselWrap,
      setCarouselStage,
      setPanelSize,
      setSlot,
      setPanelCopy,
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
