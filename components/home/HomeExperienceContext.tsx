"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ExperienceWorldId } from "@/components/experience-hero/types";

type HomeExperienceContextValue = {
  activeId: ExperienceWorldId;
  setActiveId: (id: ExperienceWorldId) => void;
};

const HomeExperienceContext = createContext<HomeExperienceContextValue | null>(
  null
);

export function HomeExperienceProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<ExperienceWorldId>("adventure");

  const value = useMemo(
    () => ({
      activeId,
      setActiveId,
    }),
    [activeId]
  );

  return (
    <HomeExperienceContext.Provider value={value}>
      {children}
    </HomeExperienceContext.Provider>
  );
}

export function useHomeExperience() {
  const ctx = useContext(HomeExperienceContext);
  if (!ctx) {
    throw new Error("useHomeExperience must be used within HomeExperienceProvider");
  }
  return ctx;
}

export function useHomeExperienceOptional() {
  return useContext(HomeExperienceContext);
}
