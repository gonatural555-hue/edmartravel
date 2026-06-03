import type { SpatialSlotLayout } from "../spatialSlotLayout";
import type { SpatialSlot } from "../types";

export type LogoDebugValues = {
  width: number;
  height: number;
  marginTop: number;
  marginLeft: number;
  offsetX: number;
  offsetY: number;
  scale: number;
};

export type CarouselWrapDebugValues = {
  paddingTopRem: number;
  paddingBottomRem: number;
};

export type CarouselStageDebugValues = {
  perspectivePx: number;
  originX: number;
  originY: number;
};

export type PanelSizeDebugValues = {
  widthVw: number;
  heightVh: number;
  maxWidthPx: number;
  maxHeightPx: number;
};

export type SlotDebugValues = {
  leftPct: number;
  topPct: number;
  scale: number;
  opacity: number;
  blurPx: number;
  zIndex: number;
  z: number;
  rotateY: number;
};

export type ExperienceHeroDebugState = {
  logo: LogoDebugValues;
  carouselWrap: CarouselWrapDebugValues;
  carouselStage: CarouselStageDebugValues;
  panelSize: PanelSizeDebugValues;
  slots: Record<SpatialSlot, SlotDebugValues>;
  showOutlines: boolean;
};

export function slotDebugToLayout(debug: SlotDebugValues): SpatialSlotLayout {
  const brightness =
    debug.opacity < 1 ? " brightness(0.88)" : "";
  return {
    left: `${debug.leftPct}%`,
    top: `${debug.topPct}%`,
    x: "-50%",
    y: "-50%",
    scale: debug.scale,
    opacity: debug.opacity,
    filter:
      debug.blurPx > 0
        ? `blur(${debug.blurPx}px)${brightness}`
        : debug.opacity < 1
          ? "brightness(0.88)"
          : "blur(0px)",
    zIndex: debug.zIndex,
    z: debug.z,
    rotateY: debug.rotateY,
  };
}

export const DEBUG_SECTION_LABELS: Record<
  "logo" | "carouselWrap" | "carouselStage" | "panelSize" | SpatialSlot,
  string
> = {
  logo: "Logotipo Edmar (Header)",
  carouselWrap: "Contenedor carrusel (wrap)",
  carouselStage: "Escenario 3D (perspectiva)",
  panelSize: "Tamaño paneles mundos",
  center: "Panel — activo (center)",
  left: "Panel — izquierda (left)",
  right: "Panel — derecha (right)",
};
