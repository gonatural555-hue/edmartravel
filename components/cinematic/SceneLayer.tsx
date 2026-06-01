import Image from "next/image";
import type { SceneLayerDef } from "./cinematicData";

type SceneLayerProps = {
  layer: SceneLayerDef;
  usePlaceholders: boolean;
  /** Marca la capa de fondo crítica para priorizar su carga. */
  priority?: boolean;
};

const OBJECT_FIT_BY_KIND: Record<SceneLayerDef["kind"], string> = {
  background: "object-cover object-center",
  midground: "object-cover object-bottom",
  object: "object-contain object-bottom",
  overlay: "object-cover object-center",
};

/**
 * Una capa individual de una escena cinematográfica.
 * FASE 1: render puro (sin scroll/animación). Con `usePlaceholders` dibuja un
 * bloque etiquetado que respeta posición y tamaño finales; con el flag en
 * `false` renderiza el asset real con next/image.
 */
export default function SceneLayer({
  layer,
  usePlaceholders,
  priority = false,
}: SceneLayerProps) {
  const { className, zIndex, kind, placeholder } = layer;

  if (usePlaceholders) {
    const isObject = kind === "object";
    return (
      <div
        className={`pointer-events-none absolute ${className}`}
        style={{ zIndex }}
        aria-hidden
      >
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
      </div>
    );
  }

  // TODO(assets): sustituir los placeholders dejando los PNG/WebP reales en
  // /public/cinematic/wine/ y poniendo USE_PLACEHOLDERS = false en cinematicData.ts.
  return (
    <div className={`pointer-events-none absolute ${className}`} style={{ zIndex }}>
      <Image
        src={layer.src}
        alt={layer.alt}
        fill
        sizes="100vw"
        priority={priority}
        className={OBJECT_FIT_BY_KIND[kind]}
        draggable={false}
      />
    </div>
  );
}
