"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { slotDebugToLayout } from "./director/experienceHeroDebugConfig";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { directorOutline } from "./director/directorOutline";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import { HERO_SLOT_LAYOUT } from "./heroLayoutProduction";
import {
  layoutToMotionTarget,
  SPATIAL_PANEL_HEIGHT,
  SPATIAL_PANEL_HEIGHT_MOBILE,
  SPATIAL_PANEL_WIDTH,
  SPATIAL_PANEL_WIDTH_MOBILE,
  SPATIAL_SLOT_LAYOUT_MOBILE,
  SPATIAL_TRANSITION,
} from "./spatialSlotLayout";
import type { SpatialSlot } from "./types";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return mobile;
}

type SpatialWorldPanelProps = {
  slot: SpatialSlot;
  children: ReactNode;
  onClick?: () => void;
  interactive?: boolean;
};

export default function SpatialWorldPanel({
  slot,
  children,
  onClick,
  interactive = false,
}: SpatialWorldPanelProps) {
  const isCenter = slot === "center";
  const isMobile = useIsMobile();
  const isDirector = useExperienceDirectorMode();
  const debug = useExperienceHeroDebugOptional();
  const showOutlines = isDirector && (debug?.values.showOutlines ?? true);

  const layout = useMemo(() => {
    if (isMobile) return SPATIAL_SLOT_LAYOUT_MOBILE[slot];
    const slotValues = debug?.values.slots[slot] ?? HERO_SLOT_LAYOUT[slot];
    return slotDebugToLayout(slotValues);
  }, [debug, isMobile, slot]);

  const panelSize = debug?.values.panelSize;

  const panelWidth = useMemo(() => {
    if (isMobile) return SPATIAL_PANEL_WIDTH_MOBILE;
    if (panelSize) {
      return `clamp(300px, ${panelSize.widthVw}vw, ${panelSize.maxWidthPx}px)`;
    }
    return SPATIAL_PANEL_WIDTH;
  }, [isMobile, panelSize]);

  const panelHeight = useMemo(() => {
    if (isMobile) return SPATIAL_PANEL_HEIGHT_MOBILE;
    if (panelSize) {
      return `clamp(360px, ${panelSize.heightVh}vh, ${panelSize.maxHeightPx}px)`;
    }
    return SPATIAL_PANEL_HEIGHT;
  }, [isMobile, panelSize]);

  const animateTarget = useMemo(() => layoutToMotionTarget(layout), [layout]);

  return (
    <motion.div
      layout={false}
      data-director-layer={`world-panel-${slot}`}
      className={`absolute will-change-[transform,opacity,filter] ${
        interactive && !isCenter ? "cursor-pointer" : ""
      } ${isCenter ? "group/panel" : ""} ${directorOutline("worldPanel", showOutlines)}`}
      style={{
        width: panelWidth,
        height: panelHeight,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
      }}
      initial={false}
      animate={animateTarget}
      transition={SPATIAL_TRANSITION}
      onClick={interactive && !isCenter ? onClick : undefined}
      role={interactive && !isCenter ? "button" : undefined}
      tabIndex={interactive && !isCenter ? 0 : undefined}
      onKeyDown={
        interactive && !isCenter
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      <div
        className={`relative h-full w-full overflow-hidden ${
          isCenter
            ? "rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.5),0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]"
            : "rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.4)]"
        }`}
      >
        {children}
      </div>
      {!isCenter ? (
        <div
          className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-r from-black/10 via-black/8 to-black/10"
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}
