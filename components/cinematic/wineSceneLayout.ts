import type { CSSProperties } from "react";

/** Capas calibrables del hero (Escena 01). */
export type WineLayoutLayerKey =
  | "contactShadow"
  | "cheeseBoard"
  | "grapes"
  | "glass"
  | "bottle"
  | "cta";

export type WineLayerLayout = {
  left: number;
  top: number | null;
  bottom: number;
  width: number;
  height: number;
  scale: number;
  zIndex: number;
};

export const WINE_LAYOUT_LAYER_ID: Record<WineLayoutLayerKey, string> = {
  contactShadow: "contact-shadow",
  cheeseBoard: "cheese-board",
  grapes: "grapes",
  glass: "glass",
  bottle: "bottle",
  cta: "cta",
};

export const WINE_LAYOUT_LAYER_LABEL: Record<WineLayoutLayerKey, string> = {
  contactShadow: "ContactShadow",
  cheeseBoard: "CheeseBoard",
  grapes: "Grapes",
  glass: "Glass",
  bottle: "Bottle",
  cta: "CTA",
};

export const WINE_LAYOUT_LAYER_ORDER: WineLayoutLayerKey[] = [
  "contactShadow",
  "cheeseBoard",
  "grapes",
  "glass",
  "bottle",
  "cta",
];

/**
 * Composición calibrada (Scene 01) — fuente de verdad en producción.
 */
export const WINE_SCENE_LAYOUT: Record<WineLayoutLayerKey, WineLayerLayout> = {
  contactShadow: {
    left: 45,
    top: null,
    bottom: 24,
    width: 42,
    height: 9,
    scale: 1,
    zIndex: 14,
  },
  cheeseBoard: {
    left: 35,
    top: null,
    bottom: -25,
    width: 35,
    height: 34,
    scale: 2.86,
    zIndex: 18,
  },
  grapes: {
    left: 58.5,
    top: null,
    bottom: -10,
    width: 19.5,
    height: 35,
    scale: 2.43,
    zIndex: 13,
  },
  glass: {
    left: 57.5,
    top: null,
    bottom: 3.5,
    width: 16.5,
    height: 42,
    scale: 1.8,
    zIndex: 100,
  },
  bottle: {
    left: 46.5,
    top: null,
    bottom: 0.5,
    width: 28,
    height: 60,
    scale: 1.63,
    zIndex: 99,
  },
  cta: {
    left: 50.5,
    top: null,
    bottom: 0,
    width: 22,
    height: 46.5,
    scale: 1,
    zIndex: 100,
  },
};

export function wineLayoutToStyle(layout: WineLayerLayout): CSSProperties {
  const style: CSSProperties = {
    left: `${layout.left}%`,
    width: `${layout.width}vw`,
    height: `${layout.height}vh`,
    zIndex: layout.zIndex,
    transform: `translateX(-50%) scale(${layout.scale})`,
    transformOrigin: "bottom center",
  };

  if (layout.top != null) {
    style.top = `${layout.top}%`;
    style.bottom = "auto";
  } else {
    style.bottom = `${layout.bottom}%`;
    style.top = "auto";
  }

  return style;
}

export function wineLayoutKeyFromLayerId(
  layerId: string
): WineLayoutLayerKey | undefined {
  return (Object.entries(WINE_LAYOUT_LAYER_ID) as [WineLayoutLayerKey, string][])
    .find(([, id]) => id === layerId)?.[0];
}
