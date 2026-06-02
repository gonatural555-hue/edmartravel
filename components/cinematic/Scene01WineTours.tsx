"use client";

import SceneShell from "./SceneShell";
import SceneLayer from "./SceneLayer";
import { wineScene } from "./cinematicData";

// ⚠️ DEBUG TEMPORAL — solo para alinear las capas con la foto de referencia.
// Pon en `false` (o elimina el overlay) antes de producción.
const SHOW_REFERENCE_OVERLAY = true;
const REFERENCE_OVERLAY_SRC =
  "/assets/scenes/wine-tours/backgrounds/reference/reference-composition.png";

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

      {/* Vignette atmosférica de altura completa: oscurece cielo y base,
          deja limpio el centro (objetos) y da legibilidad/grounding al CTA. */}
      <div
        data-scene="wine"
        data-layer="atmosphere"
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 45,
          background:
            "linear-gradient(180deg, rgba(8,12,11,0.40) 0%, rgba(8,12,11,0) 26%, rgba(8,12,11,0) 46%, rgba(8,12,11,0.45) 72%, rgba(8,12,11,0.9) 100%)",
        }}
        aria-hidden
      />

      {/* CTA — bloque compacto: título y botón próximos, integrados en la foto */}
      <div
        data-scene="wine"
        data-layer="cta"
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-[6vh] text-center"
        style={{ zIndex: 50 }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-accent-gold/90">
          Mendoza
        </p>
        <h1 className="mt-2.5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
          {wineScene.cta.title}
        </h1>
        <button
          type="button"
          onClick={onExplore}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent-gold px-7 py-3.5 text-sm font-semibold text-dark-base shadow-[0_10px_40px_rgba(200,155,60,0.35)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-accent-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        >
          {wineScene.cta.button}
          <span aria-hidden className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>

      {/* DEBUG TEMPORAL: overlay de la foto de referencia para alinear capas.
          Sin pointer-events; no interfiere con la escena. */}
      {SHOW_REFERENCE_OVERLAY ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={REFERENCE_OVERLAY_SRC}
          alt=""
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            opacity: 0.35,
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
      ) : null}
    </SceneShell>
  );
}
