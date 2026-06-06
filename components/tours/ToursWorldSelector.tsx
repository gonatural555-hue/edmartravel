"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ExperienceWorldId } from "@/components/experience-hero/types";
import {
  TOURS_NAV_TRANSITION_MS,
  type ToursWorldId,
} from "@/lib/tours-page-config";
import ToursPageAtmosphere from "./ToursPageAtmosphere";
import ToursWorldPanel, { type ToursWorldPanelData } from "./ToursWorldPanel";

type ToursWorldSelectorProps = {
  worlds: ToursWorldPanelData[];
  defaultActiveId?: ToursWorldId;
};

export default function ToursWorldSelector({
  worlds,
  defaultActiveId = "wine",
}: ToursWorldSelectorProps) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<ToursWorldId | null>(null);
  const [navigatingId, setNavigatingId] = useState<ToursWorldId | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const atmosphereId: ExperienceWorldId = hoveredId ?? defaultActiveId;

  const handleNavigate = useCallback(
    (id: ToursWorldId, href: string) => {
      if (navigatingId) return;
      setNavigatingId(id);
      window.setTimeout(() => {
        router.push(href);
      }, TOURS_NAV_TRANSITION_MS);
    },
    [navigatingId, router]
  );

  return (
    <>
      <ToursPageAtmosphere activeId={atmosphereId} />

      <div
        className={`relative z-10 flex w-full ${
          isDesktop
            ? "h-[100dvh] min-h-[560px] flex-row overflow-hidden"
            : "min-h-[100dvh] flex-col"
        }`}
        onMouseLeave={() => isDesktop && setHoveredId(null)}
      >
        {worlds.map((world) => (
          <ToursWorldPanel
            key={world.id}
            world={world}
            hoveredId={hoveredId}
            navigatingId={navigatingId}
            isDesktop={isDesktop}
            onHover={setHoveredId}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </>
  );
}
