"use client";

import SceneShell from "./SceneShell";

type Scene03DiscoverPlaceholderProps = {
  onExplore: () => void;
};

/**
 * SCENE 03 — Discover Mendoza (PLACEHOLDER estructural).
 * Sin assets finales todavía. Solo estructura + CTA conectado al navigator.
 */
export default function Scene03DiscoverPlaceholder({
  onExplore,
}: Scene03DiscoverPlaceholderProps) {
  return (
    <SceneShell sceneId="discover" ariaLabel="Discover Mendoza">
      <div
        data-scene="discover"
        data-layer="background"
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(80% 80% at 50% 25%, #3a2f2a 0%, #1d1814 55%, #0c1411 100%)",
        }}
        aria-hidden
      />

      <div
        data-scene="discover"
        data-layer="cta"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-accent-gold/90">
          Capítulo 03
        </p>
        <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Mendoza
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">
          Próximamente: city tours, scooter y experiencias urbanas.
        </p>
        <button
          type="button"
          onClick={onExplore}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
        >
          Explorar experiencias
          <span aria-hidden className="text-base leading-none">
            &rarr;
          </span>
        </button>
      </div>
    </SceneShell>
  );
}
