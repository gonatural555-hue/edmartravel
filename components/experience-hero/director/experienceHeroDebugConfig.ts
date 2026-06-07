import type { SpatialSlotLayout } from "../spatialSlotLayout";
import type { ExperienceWorldId, SpatialSlot } from "../types";

/** Posición y tipografía del bloque editorial (panel activo / center). */
export type PanelEditorialLayoutDebugValues = {
  leftPct: number;
  offsetXPx: number;
  offsetYPx: number;
  widthPct: number;
  maxWidthPx: number;
  innerMaxWidthPx: number;
  padLeftPct: number;
  padRightPct: number;
  padTopPct: number;
  padBottomPct: number;
  /** 0 = arriba, 50 = centro, 100 = abajo */
  contentJustifyPct: number;
  /** Alineación horizontal del bloque editorial */
  contentAlign?: "left" | "center" | "right";
  titleFontMinRem: number;
  titleFontVw: number;
  titleFontMaxRem: number;
  titleLineGapPx: number;
  subtitleFontMinRem: number;
  subtitleFontVw: number;
  subtitleFontMaxRem: number;
  subtitleMarginTopPx: number;
  subtitleMaxWidthCh: number;
  ctaMarginTopPx: number;
};

export const DEFAULT_PANEL_EDITORIAL_LAYOUT: PanelEditorialLayoutDebugValues = {
  leftPct: 0,
  offsetXPx: 0,
  offsetYPx: 0,
  widthPct: 58,
  maxWidthPx: 380,
  innerMaxWidthPx: 320,
  padLeftPct: 6,
  padRightPct: 6,
  padTopPct: 7,
  padBottomPct: 8,
  contentJustifyPct: 100,
  titleFontMinRem: 1.35,
  titleFontVw: 3.2,
  titleFontMaxRem: 2.35,
  titleLineGapPx: 2,
  subtitleFontMinRem: 0.72,
  subtitleFontVw: 1.35,
  subtitleFontMaxRem: 0.88,
  subtitleMarginTopPx: 12,
  subtitleMaxWidthCh: 30,
  ctaMarginTopPx: 20,
};

export type PanelCopyDebugValues = {
  titleLines: string[];
  subtitle: string;
  ctaLabel: string;
  layout: PanelEditorialLayoutDebugValues;
};

export function contentJustifyFromPct(pct: number): "flex-start" | "center" | "flex-end" {
  if (pct <= 33) return "flex-start";
  if (pct >= 66) return "flex-end";
  return "center";
}

export type LogoDebugValues = {
  width: number;
  height: number;
  marginTop: number;
  marginLeft: number;
  offsetX: number;
  offsetY: number;
  scale: number;
};

/** Posición de utilidades del header inmersivo (director) */
export type HeaderUtilityPositionDebugValues = {
  offsetX: number;
  offsetY: number;
  marginTop: number;
  marginLeft: number;
};

export type HeaderUtilityId =
  | "home"
  | "tours"
  | "blog"
  | "language"
  | "login"
  | "reservations";

export const HEADER_UTILITY_IDS: HeaderUtilityId[] = [
  "home",
  "tours",
  "blog",
  "language",
  "login",
  "reservations",
];

export type HeaderUtilitiesDebugValues = Record<
  HeaderUtilityId,
  HeaderUtilityPositionDebugValues
>;

export const DEFAULT_HEADER_UTILITY_POSITION: HeaderUtilityPositionDebugValues =
  {
    offsetX: 0,
    offsetY: 0,
    marginTop: 0,
    marginLeft: 0,
  };

export const DEFAULT_HEADER_UTILITIES: HeaderUtilitiesDebugValues = {
  home: { ...DEFAULT_HEADER_UTILITY_POSITION },
  tours: { ...DEFAULT_HEADER_UTILITY_POSITION },
  blog: { ...DEFAULT_HEADER_UTILITY_POSITION },
  language: { ...DEFAULT_HEADER_UTILITY_POSITION },
  login: { ...DEFAULT_HEADER_UTILITY_POSITION },
  reservations: { ...DEFAULT_HEADER_UTILITY_POSITION },
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
  headerUtilities: HeaderUtilitiesDebugValues;
  carouselWrap: CarouselWrapDebugValues;
  carouselStage: CarouselStageDebugValues;
  panelSize: PanelSizeDebugValues;
  slots: Record<SpatialSlot, SlotDebugValues>;
  panelCopy: Record<ExperienceWorldId, PanelCopyDebugValues>;
  showOutlines: boolean;
};

export const DEBUG_HEADER_UTILITY_LABELS: Record<HeaderUtilityId, string> = {
  home: "Nav — Home",
  tours: "Nav — Tours",
  blog: "Nav — Blog",
  language: "Header — Idiomas",
  login: "Header — Login",
  reservations: "Header — Mis Reservas",
};

export const PANEL_COPY_WORLD_ORDER: ExperienceWorldId[] = [
  "wine",
  "adventure",
  "city",
];

export const DEBUG_PANEL_COPY_LABELS: Record<ExperienceWorldId, string> = {
  wine: "Panel — Wine Tours & Bodegas",
  adventure: "Panel — Aventura Mendoza",
  city: "Panel — Conocer la Ciudad",
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
