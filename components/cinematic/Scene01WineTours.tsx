"use client";

import SceneShell from "./SceneShell";
import SceneLayer from "./SceneLayer";
import { wineScene } from "./cinematicData";

type Scene01WineToursProps = {
  /** Abre el Experience Navigator de la categoría wine. */
  onExplore: () => void;
};

/**
 * SCENE 01 — Wine Tours & Bodegas.
 *
 * Composición cinematográfica estática por capas (desktop-first).
 * Lista para animar: cada capa expone data-scene="wine" + data-layer="…".
 * Sin animación de scroll todavía (Fase 3).
 */
export default function Scene01WineTours({ onExplore }: Scene01WineToursProps) {
  return (
    <SceneShell sceneId="wine" ariaLabel={wineScene.cta.title}>
      {wineScene.layers.map((layer) => (
        <SceneLayer key={layer.layerId} sceneId="wine" layer={layer} />
      ))}

      {/* Degradado cálido inferior para profundidad y legibilidad del CTA */}
      <div
        data-scene="wine"
        data-layer="readability-gradient"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          zIndex: 45,
          background:
            "linear-gradient(180deg, rgba(8,12,11,0) 0%, rgba(8,12,11,0.28) 50%, rgba(8,12,11,0.72) 100%)",
        }}
        aria-hidden
      />

      {/* CTA — integrado en la composición, centro-inferior */}
      <div
        data-scene="wine"
        data-layer="cta"
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[8vh] text-center"
        style={{ zIndex: 50 }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent-gold/90">
          Mendoza
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          {wineScene.cta.title}
        </h1>
        <button
          type="button"
          onClick={onExplore}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold text-dark-base shadow-[0_10px_40px_rgba(200,155,60,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        >
          {wineScene.cta.button}
          <span aria-hidden className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>
    </SceneShell>
  );
}
