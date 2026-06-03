"use client";

import type { CSSProperties, ReactNode } from "react";
import { WINE_ASSETS, WINE_BOTTLE_ASSET_REV } from "@/components/cinematic/cinematicAssets";
import {
  WINE_SCENE_LAYOUT,
  wineLayoutToStyle,
} from "@/components/cinematic/wineSceneLayout";

type LayerDef = {
  id: string;
  src: string;
  alt: string;
  layoutKey: keyof typeof WINE_SCENE_LAYOUT;
  imageClass?: string;
  blend?: string;
};

const LAYERS: LayerDef[] = [
  {
    id: "contact-shadow",
    src: WINE_ASSETS.contactShadow,
    alt: "",
    layoutKey: "contactShadow",
    imageClass: "object-contain object-center opacity-60 mix-blend-multiply",
  },
  {
    id: "cheese-board",
    src: WINE_ASSETS.cheeseBoard,
    alt: "Tabla de quesos",
    layoutKey: "cheeseBoard",
    imageClass: "object-contain object-bottom",
  },
  {
    id: "grapes",
    src: WINE_ASSETS.grapes,
    alt: "Uvas",
    layoutKey: "grapes",
    imageClass: "object-contain object-bottom",
  },
  {
    id: "glass",
    src: WINE_ASSETS.glass,
    alt: "Copa de vino",
    layoutKey: "glass",
    imageClass: "object-contain object-bottom",
  },
  {
    id: "bottle",
    src: WINE_ASSETS.bottle,
    alt: "Botella Edmar",
    layoutKey: "bottle",
    imageClass: "object-contain object-bottom",
  },
];

type WineCtaLabStageProps = {
  cta: ReactNode;
};

export default function WineCtaLabStage({ cta }: WineCtaLabStageProps) {
  const ctaStyle: CSSProperties = {
    ...wineLayoutToStyle(WINE_SCENE_LAYOUT.cta),
    pointerEvents: "auto",
  };

  return (
    <div
      className="relative isolate w-full overflow-hidden rounded-xl border border-[#E8E4DC] bg-[#FFFFFF] shadow-[0_8px_40px_rgba(12,20,17,0.06)]"
      style={{ aspectRatio: "4 / 5", minHeight: "420px" }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#FFFFFF]"
        aria-hidden
      />

      {LAYERS.map((layer) => (
        <div
          key={layer.id}
          data-lab-layer={layer.id}
          className="pointer-events-none absolute"
          style={wineLayoutToStyle(WINE_SCENE_LAYOUT[layer.layoutKey])}
        >
          <img
            key={layer.id === "bottle" ? `${layer.src}-${WINE_BOTTLE_ASSET_REV}` : layer.src}
            src={layer.src}
            alt={layer.alt}
            draggable={false}
            className={`absolute inset-0 h-full w-full ${layer.imageClass ?? ""}`}
          />
        </div>
      ))}

      <div
        data-lab-layer="cta"
        className="absolute flex items-center justify-center"
        style={ctaStyle}
      >
        {cta}
      </div>
    </div>
  );
}
