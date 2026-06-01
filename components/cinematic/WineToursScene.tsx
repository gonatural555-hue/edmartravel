"use client";

import SceneLayer from "./SceneLayer";
import { USE_PLACEHOLDERS, wineScene } from "./cinematicData";

type WineToursSceneProps = {
  /** Abre el Experience Navigator del capítulo (Fase 2). */
  onExplore: () => void;
};

/**
 * CHAPTER 01 — Wine Tours & Bodegas.
 *
 * FASE 1: composición estática por capas (sin scroll/animación).
 * Cada elemento es una capa independiente con posición y z-index propios,
 * lista para recibir la coreografía de scroll en fases posteriores.
 *
 * `isolate` crea un stacking context propio para que los z-index internos
 * de la escena nunca compitan con el Header (fixed, z-50).
 */
export default function WineToursScene({ onExplore }: WineToursSceneProps) {
  return (
    <section
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-dark-base"
      aria-label={wineScene.cta.title}
    >
      {wineScene.layers.map((layer) => (
        <SceneLayer
          key={layer.id}
          layer={layer}
          usePlaceholders={USE_PLACEHOLDERS}
          priority={layer.kind === "background"}
        />
      ))}

      {/* Degradado cálido inferior para profundidad y legibilidad del CTA */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          zIndex: 46,
          background:
            "linear-gradient(180deg, rgba(8,12,11,0) 0%, rgba(8,12,11,0.28) 50%, rgba(8,12,11,0.72) 100%)",
        }}
        aria-hidden
      />

      {/* CTA — cerca de la botella / centro-inferior */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[8vh] text-center"
        style={{ zIndex: 47 }}
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
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold text-dark-base transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        >
          {wineScene.cta.button}
          <span aria-hidden className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>
    </section>
  );
}
