import type { CSSProperties } from "react";

/** Identificador estable de cada escena/capítulo. */
export type SceneId = "wine" | "adventure" | "discover";

/** Rol visual de una capa dentro de la escena. */
export type SceneLayerKind =
  | "background"
  | "foreground"
  | "object"
  | "effect"
  | "overlay";

export type LayerPlaceholder = {
  /** Etiqueta visible mientras no exista el asset real (solo capas de objeto). */
  label?: string;
  className?: string;
  /** Estilo del fallback (degradado/radial) cuando falta la imagen. */
  style?: CSSProperties;
};

export type SceneLayerDef = {
  /** Valor de `data-layer`; ID estable para animaciones de scroll futuras. */
  layerId: string;
  /** Ruta del asset (constante de cinematicAssets.ts). */
  src: string;
  alt: string;
  zIndex: number;
  kind: SceneLayerKind;
  /** Clases de posicionamiento/tamaño del wrapper (data structure de posición). */
  className: string;
  /** Clases aplicadas a la <img> real (blend modes, opacidad, object-position). */
  imageClassName?: string;
  /** Capa decorativa → aria-hidden. */
  decorative?: boolean;
  /** Marca el fondo crítico para `priority` en next/image. */
  priority?: boolean;
  placeholder?: LayerPlaceholder;
};

export type CinematicSceneDef = {
  id: SceneId;
  cta: {
    title: string;
    button: string;
  };
  layers: SceneLayerDef[];
};

export type ExperienceCard = {
  id: string;
  /** ID del producto existente → href = /{locale}/products/{productId} */
  productId: string;
  title: string;
  description: string;
  /** Imagen cuadrada de la card del navigator. */
  image: string;
};

export type ExperienceCategory = {
  id: SceneId;
  title: string;
  subtitle: string;
  cta: string;
  experiences: ExperienceCard[];
};
