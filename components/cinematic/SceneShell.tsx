import type { ReactNode } from "react";
import type { SceneId } from "./types";

type SceneShellProps = {
  sceneId: SceneId;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
};

/**
 * Contenedor a pantalla completa reutilizable por cada escena/capítulo.
 *
 * `isolate` crea un stacking context propio: los z-index internos de la
 * escena nunca compiten con el Header fijo (z-50) ni con el Experience
 * Navigator (z-[60]/[70]). `data-scene` queda como ancla estable para el
 * scroll cinematográfico futuro.
 */
export default function SceneShell({
  sceneId,
  ariaLabel,
  children,
  className = "",
}: SceneShellProps) {
  return (
    <section
      data-scene={sceneId}
      aria-label={ariaLabel}
      className={`relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-dark-base ${className}`}
    >
      {children}
    </section>
  );
}
