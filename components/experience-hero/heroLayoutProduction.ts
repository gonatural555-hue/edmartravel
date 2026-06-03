import type {
  CarouselStageDebugValues,
  CarouselWrapDebugValues,
  LogoDebugValues,
  PanelSizeDebugValues,
  SlotDebugValues,
} from "./director/experienceHeroDebugConfig";
import type { SpatialSlot } from "./types";

/**
 * Fuente de verdad del hero — sincronizada desde calibration/hero-layout.json
 * (npm run hero-layout:sync)
 */
export const HERO_LOGO_LAYOUT: LogoDebugValues = {
  width: 199,
  height: 36,
  marginTop: 0,
  marginLeft: 0,
  offsetX: 0,
  offsetY: 0,
  scale: 2,
};

export const HERO_CAROUSEL_WRAP: CarouselWrapDebugValues = {
  paddingTopRem: 0,
  paddingBottomRem: 0,
};

export const HERO_CAROUSEL_STAGE: CarouselStageDebugValues = {
  perspectivePx: 2250,
  originX: 48,
  originY: 50,
};

export const HERO_PANEL_SIZE: PanelSizeDebugValues = {
  widthVw: 71,
  heightVh: 68,
  maxWidthPx: 1080,
  maxHeightPx: 780,
};

export const HERO_SLOT_LAYOUT: Record<SpatialSlot, SlotDebugValues> = {
  center: {
    leftPct: 51,
    topPct: 48,
    scale: 1,
    opacity: 1,
    blurPx: 0,
    zIndex: 30,
    z: 68,
    rotateY: -1,
  },
  left: {
    leftPct: 24,
    topPct: 55,
    scale: 0.69,
    opacity: 0.56,
    blurPx: 0,
    zIndex: 10,
    z: -48,
    rotateY: 45,
  },
  right: {
    leftPct: 73.5,
    topPct: 55,
    scale: 0.75,
    opacity: 0.58,
    blurPx: 0,
    zIndex: 10,
    z: -48,
    rotateY: -45,
  },
};
