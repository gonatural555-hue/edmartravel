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
  const isObject = kind === "object";

  return (
    <div
      data-scene={sceneId}
      data-layer={layer.layerId}
      className={`pointer-events-none absolute ${className}`}
      style={{ zIndex }}
      aria-hidden={decorative || showFallback ? true : undefined}
    >
      {showFallback ? (
        <div
          className={[
            "flex h-full w-full items-center justify-center overflow-hidden",
            isObject
              ? "rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-[2px]"
              : "",
            placeholder?.className ?? "",
          ].join(" ")}
          style={placeholder?.style}
        >
          {placeholder?.label ? (
            <span className="select-none px-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-xs">
              {placeholder.label}
            </span>
          ) : null}
        </div>
      ) : (
        <Image
          src={layer.src}
          alt={layer.alt}
          fill
          sizes="100vw"
          priority={priority}
          className={OBJECT_FIT_BY_KIND[kind]}
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
