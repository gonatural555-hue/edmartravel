import type { TargetAndTransition, Transition } from "framer-motion";
import { slotDebugToLayout } from "./director/experienceHeroDebugConfig";
import { HERO_PANEL_SIZE, HERO_SLOT_LAYOUT } from "./heroLayoutProduction";
import type { SpatialSlot } from "./types";

/** Transición museográfica — sin rebote */
export const SPATIAL_TRANSITION: Transition = {
  duration: 1.35,
  ease: [0.16, 1, 0.3, 1],
};

export type SpatialSlotLayout = {
  left: string;
  top: string;
  x: string;
  y: string;
  scale: number;
  opacity: number;
  filter: string;
  zIndex: number;
  z: number;
  rotateY: number;
};

/** Desktop — valores desde heroLayoutProduction.ts */
export const SPATIAL_SLOT_LAYOUT: Record<SpatialSlot, SpatialSlotLayout> = {
  center: slotDebugToLayout(HERO_SLOT_LAYOUT.center),
  left: slotDebugToLayout(HERO_SLOT_LAYOUT.left),
  right: slotDebugToLayout(HERO_SLOT_LAYOUT.right),
};

/** Móvil — activo casi full bleed; laterales asoman detrás */
export const SPATIAL_SLOT_LAYOUT_MOBILE: Record<SpatialSlot, SpatialSlotLayout> = {
  center: {
    left: "50%",
    top: "48%",
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 30,
    z: 0,
    rotateY: 0,
  },
  left: {
    left: "22%",
    top: "54%",
    x: "-50%",
    y: "-50%",
    scale: 0.5,
    opacity: 0.5,
    filter: "blur(2px) brightness(0.85)",
    zIndex: 8,
    z: -32,
    rotateY: 8,
  },
  right: {
    left: "78%",
    top: "54%",
    x: "-50%",
    y: "-50%",
    scale: 0.5,
    opacity: 0.5,
    filter: "blur(2px) brightness(0.85)",
    zIndex: 8,
    z: -32,
    rotateY: -8,
  },
};

export const SPATIAL_PANEL_WIDTH = `clamp(300px, ${HERO_PANEL_SIZE.widthVw}vw, ${HERO_PANEL_SIZE.maxWidthPx}px)`;
export const SPATIAL_PANEL_HEIGHT = `clamp(360px, ${HERO_PANEL_SIZE.heightVh}vh, ${HERO_PANEL_SIZE.maxHeightPx}px)`;

export const SPATIAL_PANEL_WIDTH_MOBILE = "calc(100% - 1.5rem)";
export const SPATIAL_PANEL_HEIGHT_MOBILE = "clamp(320px, 62vh, 640px)";

export function layoutToMotionTarget(
  layout: SpatialSlotLayout
): TargetAndTransition {
  return {
    left: layout.left,
    top: layout.top,
    x: layout.x,
    y: layout.y,
    scale: layout.scale,
    opacity: layout.opacity,
    filter: layout.filter,
    zIndex: layout.zIndex,
    z: layout.z,
    rotateY: layout.rotateY,
  };
}
