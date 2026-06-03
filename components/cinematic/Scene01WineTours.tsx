"use client";

import { useCallback, useEffect, useState } from "react";
import SceneShell from "./SceneShell";
import SceneLayer from "./SceneLayer";
import { wineScene } from "./cinematicData";
import Scene01DebugPanel from "./debug/Scene01DebugPanel";
import { useDirectorMode } from "./director/useDirectorMode";
import {
  WINE_SCENE_LAYOUT,
  wineLayoutKeyFromLayerId,
  wineLayoutToStyle,
  type WineLayoutLayerKey,
  type WineLayerLayout,
} from "./wineSceneLayout";

/** Panel layout solo con `?director=true`. */
const ENABLE_SCENE01_LAYOUT_DEBUG = false;

const DEBUG_LAYOUT_STORAGE_KEY = "wine-scene01-debug-layout";

type Scene01WineToursProps = {
  onExplore: () => void;
};

function Scene01WineToursContent({
  onExplore,
  isDirector,
  showLayoutDebug,
}: Scene01WineToursProps & {
  isDirector: boolean;
  showLayoutDebug: boolean;
}) {
  const [debugLayers, setDebugLayers] = useState<
    Record<WineLayoutLayerKey, WineLayerLayout>
  >(WINE_SCENE_LAYOUT);

  useEffect(() => {
    if (!showLayoutDebug) return;
    try {
      const raw = localStorage.getItem(DEBUG_LAYOUT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<
        Record<WineLayoutLayerKey, WineLayerLayout>
      >;
      const merged = { ...WINE_SCENE_LAYOUT };
      for (const key of Object.keys(
        WINE_SCENE_LAYOUT
      ) as WineLayoutLayerKey[]) {
        if (parsed[key]) merged[key] = parsed[key];
      }
      setDebugLayers(merged);
    } catch {
      /* ignore */
    }
  }, [showLayoutDebug]);

  const handleDebugChange = useCallback(
    (next: Record<WineLayoutLayerKey, WineLayerLayout>) => {
      setDebugLayers(next);
      if (!showLayoutDebug) return;
      try {
        localStorage.setItem(DEBUG_LAYOUT_STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [showLayoutDebug]
  );

  const layoutForRender = showLayoutDebug ? debugLayers : WINE_SCENE_LAYOUT;

  return (
    <SceneShell
      sceneId="wine"
      ariaLabel={wineScene.cta.title}
      className="bg-[#FFFFFF]"
    >
      <div
        data-scene="wine"
        data-layer="background"
        className="pointer-events-none absolute inset-0 z-0 bg-[#FFFFFF]"
        aria-hidden
      />

      {wineScene.layers.map((layer) => {
        const layoutKey = wineLayoutKeyFromLayerId(layer.layerId);
        const layout =
          layoutKey != null ? layoutForRender[layoutKey] : undefined;

        return (
          <SceneLayer
            key={layer.layerId}
            sceneId="wine"
            layer={layer}
            useCalibratedLayout={layout != null}
            layoutStyle={layout ? wineLayoutToStyle(layout) : undefined}
          />
        );
      })}

      <div
        data-scene="wine"
        data-layer="cta"
        className="pointer-events-auto absolute flex items-center justify-center"
        style={wineLayoutToStyle(layoutForRender.cta)}
      >
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold text-dark-base shadow-[0_10px_40px_rgba(200,155,60,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        >
          {wineScene.cta.button}
          <span aria-hidden className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>

      {showLayoutDebug ? (
        <Scene01DebugPanel values={debugLayers} onChange={handleDebugChange} />
      ) : null}

    </SceneShell>
  );
}

export default function Scene01WineTours(props: Scene01WineToursProps) {
  const isDirector = useDirectorMode();
  const showLayoutDebug = isDirector || ENABLE_SCENE01_LAYOUT_DEBUG;

  return (
    <Scene01WineToursContent
      {...props}
      isDirector={isDirector}
      showLayoutDebug={showLayoutDebug}
    />
  );
}

export { DEBUG_LAYOUT_STORAGE_KEY };
