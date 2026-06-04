import type { TargetAndTransition, Transition } from "framer-motion";
import { slotDebugToLayout } from "./director/experienceHeroDebugConfig";
import { HERO_PANEL_SIZE, HERO_SLOT_LAYOUT } from "./heroLayoutProduction";
import type { SpatialSlot } from "./types";

/** Transición orbital — cámara entre mundos */
export const SPATIAL_TRANSITION: Transition = {
  duration: 1.35,
  ease: [0.22, 1, 0.36, 1],
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

/** Móvil — activo dominante; peeks parciales detrás */
export const SPATIAL_SLOT_LAYOUT_MOBILE: Record<SpatialSlot, SpatialSlotLayout> = {
  center: {
    left: "50%",
    top: "46%",
    x: "-50%",
    y: "-50%",
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 40,
    z: 0,
    rotateY: 0,
  },
  left: {
    left: "14%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 0.56,
    opacity: 0.45,
    filter: "blur(2px) brightness(0.82)",
    zIndex: 5,
    z: 0,
    rotateY: 0,
  },
  right: {
    left: "86%",
    top: "50%",
    x: "-50%",
    y: "-50%",
    scale: 0.56,
    opacity: 0.45,
    filter: "blur(2px) brightness(0.82)",
    zIndex: 5,
    z: 0,
    rotateY: 0,
  },
};

export const SPATIAL_PANEL_WIDTH = `clamp(300px, ${HERO_PANEL_SIZE.widthVw}vw, ${HERO_PANEL_SIZE.maxWidthPx}px)`;
export const SPATIAL_PANEL_HEIGHT = `clamp(360px, ${HERO_PANEL_SIZE.heightVh}vh, ${HERO_PANEL_SIZE.maxHeightPx}px)`;

export const SPATIAL_PANEL_WIDTH_MOBILE = "calc(100% - 2rem)";
export const SPATIAL_PANEL_HEIGHT_MOBILE = "clamp(300px, 58vh, 560px)";

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

