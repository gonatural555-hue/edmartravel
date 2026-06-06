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

/** Móvil — panel activo centrado; laterales ocultos (swipe + nav inferior) */
export const SPATIAL_SLOT_LAYOUT_MOBILE: Record<SpatialSlot, SpatialSlotLayout> = {
  center: {
    left: "50%",
    top: "44%",
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
    left: "50%",
    top: "44%",
    x: "-50%",
    y: "-50%",
    scale: 0.92,
    opacity: 0,
    filter: "blur(0px)",
    zIndex: 0,
    z: 0,
    rotateY: 0,
  },
  right: {
    left: "50%",
    top: "44%",
    x: "-50%",
    y: "-50%",
    scale: 0.92,
    opacity: 0,
    filter: "blur(0px)",
    zIndex: 0,
    z: 0,
    rotateY: 0,
  },
};

export const SPATIAL_PANEL_WIDTH = `clamp(300px, ${HERO_PANEL_SIZE.widthVw}vw, ${HERO_PANEL_SIZE.maxWidthPx}px)`;
export const SPATIAL_PANEL_HEIGHT = `clamp(360px, ${HERO_PANEL_SIZE.heightVh}vh, ${HERO_PANEL_SIZE.maxHeightPx}px)`;

export const SPATIAL_PANEL_WIDTH_MOBILE = "calc(100% - 1.5rem)";
export const SPATIAL_PANEL_HEIGHT_MOBILE = "clamp(280px, 50vh, 480px)";

/** Mitad del alto del panel mobile — sincronizado con SPATIAL_PANEL_HEIGHT_MOBILE */
export const SPATIAL_PANEL_HALF_HEIGHT_MOBILE = "clamp(140px, 25vh, 240px)";

/** Posición vertical del centro del panel activo (mobile) */
export const SPATIAL_PANEL_CENTER_TOP_MOBILE = "44%";

/** Aire entre borde inferior del panel y la nav mobile */
export const HERO_MOBILE_NAV_GAP = "0.625rem";

/** Alto de la fila de nav mobile (botones circulares) */
export const HERO_MOBILE_NAV_HEIGHT = "44px";

/** Aire entre nav mobile y carrusel de texto */
export const HERO_MOBILE_MARQUEE_GAP = "0.75rem";

/** Aire entre carrusel de texto y sección collage (mobile) */
export const HERO_MOBILE_COLLAGE_GAP = "0.75rem";

/** Reserva inferior del wrap del carrusel hero (mobile) */
export const HERO_MOBILE_CAROUSEL_WRAP_BOTTOM = "4.25rem";

/** Altura usable del stage del carrusel hero en mobile */
export const HERO_MOBILE_STAGE_HEIGHT = `calc(100dvh - max(0.75rem, env(safe-area-inset-bottom, 0px)) - ${HERO_MOBILE_CAROUSEL_WRAP_BOTTOM} - var(--experience-header-height, 5.5rem) - 0.25rem)`;

/** Distancia desde el top del hero hasta el borde inferior de la nav mobile */
export const HERO_MOBILE_NAV_BOTTOM_FROM_HERO_TOP = `calc(
  var(--experience-header-height, 5.5rem) + 0.25rem +
  ${HERO_MOBILE_STAGE_HEIGHT} * 0.44 +
  ${SPATIAL_PANEL_HALF_HEIGHT_MOBILE} + ${HERO_MOBILE_NAV_GAP} + ${HERO_MOBILE_NAV_HEIGHT}
)`;

/** Margen negativo del marquee para pegarlo bajo la nav mobile */
export const HERO_MOBILE_MARQUEE_PULL_UP = `calc(
  100dvh + max(0.75rem, env(safe-area-inset-bottom, 0px)) -
  ${HERO_MOBILE_NAV_BOTTOM_FROM_HERO_TOP} - ${HERO_MOBILE_MARQUEE_GAP}
)`;

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

