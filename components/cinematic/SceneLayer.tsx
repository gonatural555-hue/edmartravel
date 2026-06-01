"use client";

import Image from "next/image";
import { useState } from "react";
import type { SceneId, SceneLayerDef } from "./types";

type SceneLayerProps = {
  sceneId: SceneId;
  layer: SceneLayerDef;
};

const OBJECT_FIT_BY_KIND: Record<SceneLayerDef["kind"], string> = {
  background: "object-cover object-center",
  foreground: "object-cover object-bottom",
  object: "object-contain object-bottom",
  effect: "object-contain object-center",
  overlay: "object-cover object-center",
};

/**
 * Capa individual de una escena cinematográfica.
 *
 * - Expone `data-scene` y `data-layer` como anclas estables para la futura
 *   coreografía de scroll (Fase 3).
 * - Render puro (sin animación todavía).
 * - Si el asset real no existe, NO rompe: cae a un fallback visual
 *   (degradado/etiqueta) mediante onError.
 */
export default function SceneLayer({ sceneId, layer }: SceneLayerProps) {
  const [failed, setFailed] = useState(false);
  const { className, zIndex, kind, decorative, priority, placeholder } = layer;
  const showFallback = failed || !layer.src;

  return (
    <div
      data-scene={sceneId}
      data-layer={layer.layerId}
      className={`pointer-events-none absolute ${className}`}
      style={{ zIndex }}
      aria-hidden={decorative || showFallback ? true : undefined}
    >
      {showFallback ? (
        // Solo dibujamos un fallback visible si la capa define un estilo
        // (fondo/efecto). Los objetos que falten quedan invisibles para no
        // romper la composición fotográfica.
        placeholder?.style ? (
          <div
            className={`h-full w-full overflow-hidden ${placeholder.className ?? ""}`}
            style={placeholder.style}
          />
        ) : null
      ) : (
        <Image
          src={layer.src}
          alt={layer.alt}
          fill
          sizes="100vw"
          priority={priority}
          className={`${OBJECT_FIT_BY_KIND[kind]} ${layer.imageClassName ?? ""}`}
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
