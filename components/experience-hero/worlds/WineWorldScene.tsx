"use client";

import Image from "next/image";
import { WINE_BOTTLE_ASSET_REV } from "@/components/cinematic/cinematicAssets";
import {
  WINE_SCENE_LAYOUT,
  wineLayoutToStyle,
} from "@/components/cinematic/wineSceneLayout";
import { WINE_LAYER_ASSETS } from "../experienceHeroConfig";
import PremiumExperienceCtaCard from "../PremiumExperienceCtaCard";

const HERO_LAYERS = [
  {
    id: "grapes",
    src: WINE_LAYER_ASSETS.grapes,
    key: "grapes" as const,
    className: "object-contain object-bottom",
  },
  {
    id: "glass",
    src: WINE_LAYER_ASSETS.glass,
    key: "glass" as const,
    className: "object-contain object-bottom",
  },
  {
    id: "bottle",
    src: WINE_LAYER_ASSETS.bottle,
    key: "bottle" as const,
    className: "object-contain object-bottom",
  },
];

/** Preview lateral — solo íconos de categoría */
const PEEK_LAYERS = [
  {
    id: "grapes",
    src: WINE_LAYER_ASSETS.grapes,
    style: { left: "8%", bottom: "6%", width: "38%", height: "52%", zIndex: 12 },
  },
  {
    id: "glass",
    src: WINE_LAYER_ASSETS.glass,
    style: { left: "32%", bottom: "4%", width: "32%", height: "58%", zIndex: 14 },
  },
  {
    id: "bottle",
    src: WINE_LAYER_ASSETS.bottle,
    style: { right: "4%", bottom: "0%", width: "42%", height: "88%", zIndex: 16 },
  },
];

type WineWorldSceneProps = {
  compact?: boolean;
  onExplore: () => void;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaAction: string;
  /** Título editorial (activo) */
  title?: string;
};

export default function WineWorldScene({
  compact = false,
  onExplore,
  ctaTitle,
  ctaSubtitle,
  ctaAction,
  title = "Wine Tours & Bodegas",
}: WineWorldSceneProps) {
  if (compact) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#F7F4EF]">
        {PEEK_LAYERS.map((layer) => (
          <div
            key={layer.id}
            className="pointer-events-none absolute"
            style={layer.style}
          >
            {layer.id === "bottle" ? (
              <img
                src={layer.src}
                alt=""
                className="h-full w-full object-contain object-bottom"
                draggable={false}
              />
            ) : (
              <Image
                src={layer.src}
                alt=""
                fill
                unoptimized
                className="object-contain object-bottom"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F7F4EF]">
      {HERO_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className="pointer-events-none absolute"
          style={wineLayoutToStyle(WINE_SCENE_LAYOUT[layer.key])}
        >
          {layer.id === "bottle" ? (
            <img
              key={`${layer.src}-${WINE_BOTTLE_ASSET_REV}`}
              src={layer.src}
              alt="Botella Edmar"
              className={`absolute inset-0 h-full w-full ${layer.className}`}
              draggable={false}
            />
          ) : (
            <Image
              src={layer.src}
              alt=""
              fill
              unoptimized
              className={layer.className}
              draggable={false}
            />
          )}
        </div>
      ))}

      <h2 className="pointer-events-none absolute left-[5%] top-[6%] z-[20] max-w-[min(42%,220px)] font-serif text-[clamp(0.68rem,1.35vw,0.95rem)] font-light uppercase leading-[1.35] tracking-[0.16em] text-[#2C2420]/85 line-clamp-2">
        {title}
      </h2>

      <div className="pointer-events-auto absolute bottom-[7%] left-[5%] z-[30]">
        <PremiumExperienceCtaCard
          title={ctaTitle}
          subtitle={ctaSubtitle}
          actionLabel={ctaAction}
          onAction={onExplore}
        />
      </div>
    </div>
  );
}
