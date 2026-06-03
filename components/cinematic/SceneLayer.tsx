"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { WINE_BOTTLE_ASSET_REV } from "./cinematicAssets";
import type { SceneId, SceneLayerDef } from "./types";

type SceneLayerProps = {
  sceneId: SceneId;
  layer: SceneLayerDef;
  /** Posición calibrada (inline). Anula className de posición en cinematicData. */
  layoutStyle?: CSSProperties;
  /** Usa layoutStyle en lugar de className de posicionamiento. */
  useCalibratedLayout?: boolean;
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
export default function SceneLayer({
  sceneId,
  layer,
  layoutStyle,
  useCalibratedLayout = false,
}: SceneLayerProps) {
  const [failed, setFailed] = useState(false);
  const { className, zIndex, kind, decorative, priority, placeholder } = layer;

  useEffect(() => {
    setFailed(false);
  }, [layer.src]);
  const showFallback = failed || !layer.src;
  const useLayout = useCalibratedLayout && layoutStyle != null;
  const isWineBottle = sceneId === "wine" && layer.layerId === "bottle";
  const imageClass = `${OBJECT_FIT_BY_KIND[kind]} ${layer.imageClassName ?? ""}`;

  return (
    <div
      data-scene={sceneId}
      data-layer={layer.layerId}
      className={`pointer-events-none absolute ${className}`}
      style={useLayout ? layoutStyle : { zIndex }}
      aria-hidden={decorative || showFallback ? true : undefined}
    >
      <div className="relative h-full w-full">
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
      ) : isWineBottle ? (
        <img
          key={`${layer.src}-${WINE_BOTTLE_ASSET_REV}`}
          src={layer.src}
          alt={layer.alt}
          className={`absolute inset-0 h-full w-full ${imageClass}`}
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          key={layer.src}
          src={layer.src}
          alt={layer.alt}
          fill
          sizes="100vw"
          priority={priority}
          unoptimized={sceneId === "wine"}
          className={imageClass}
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
      </div>
    </div>
  );
}
