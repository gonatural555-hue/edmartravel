"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { WineDebugLayerKey, WineLayerDebugValues } from "./wineSceneDebugConfig";
import {
  WINE_DEBUG_LAYER_LABEL,
  WINE_DEBUG_LAYER_ORDER,
  WINE_SCENE_DEBUG_DEFAULTS,
} from "./wineSceneDebugConfig";

type Scene01DebugPanelProps = {
  values: Record<WineDebugLayerKey, WineLayerDebugValues>;
  onChange: (next: Record<WineDebugLayerKey, WineLayerDebugValues>) => void;
};

type FieldKey = keyof Pick<
  WineLayerDebugValues,
  "left" | "bottom" | "width" | "height" | "scale" | "zIndex"
>;

const FIELD_CONFIG: {
  key: FieldKey | "top";
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "left", label: "left (%)", min: 0, max: 100, step: 0.5 },
  { key: "top", label: "top (%)", min: 0, max: 100, step: 0.5 },
  { key: "bottom", label: "bottom (%)", min: 0, max: 80, step: 0.5 },
  { key: "width", label: "width (vw)", min: 1, max: 90, step: 0.5 },
  { key: "height", label: "height (vh)", min: 1, max: 90, step: 0.5 },
  { key: "scale", label: "scale", min: 0.1, max: 3, step: 0.01 },
  { key: "zIndex", label: "z-index", min: 0, max: 100, step: 1 },
];

function updateLayer(
  prev: Record<WineDebugLayerKey, WineLayerDebugValues>,
  layerKey: WineDebugLayerKey,
  patch: Partial<WineLayerDebugValues>
): Record<WineDebugLayerKey, WineLayerDebugValues> {
  return { ...prev, [layerKey]: { ...prev[layerKey], ...patch } };
}

export default function Scene01DebugPanel({
  values,
  onChange,
}: Scene01DebugPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null
  );
  const [position, setPosition] = useState({ x: 12, y: 72 });
  const [expanded, setExpanded] = useState<WineDebugLayerKey | null>("bottle");
  const [useTopAnchor, setUseTopAnchor] = useState<Record<WineDebugLayerKey, boolean>>(() =>
    Object.fromEntries(
      WINE_DEBUG_LAYER_ORDER.map((k) => [k, values[k].top != null])
    ) as Record<WineDebugLayerKey, boolean>
  );
  const [copied, setCopied] = useState(false);

  const onPointerDownHeader = useCallback((e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position.x, position.y]);

  const onPointerMoveHeader = useCallback((e: ReactPointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: Math.max(8, dragRef.current.originX + dx),
      y: Math.max(8, dragRef.current.originY + dy),
    });
  }, []);

  const onPointerUpHeader = useCallback((e: ReactPointerEvent) => {
    dragRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const setField = (
    layerKey: WineDebugLayerKey,
    field: FieldKey | "top",
    raw: number
  ) => {
    if (field === "top") {
      onChange(
        updateLayer(values, layerKey, {
          top: Number.isFinite(raw) ? raw : null,
        })
      );
      return;
    }
    onChange(updateLayer(values, layerKey, { [field]: raw }));
  };

  const buildPayload = () =>
    WINE_DEBUG_LAYER_ORDER.reduce(
      (acc, key) => {
        acc[WINE_DEBUG_LAYER_LABEL[key]] = values[key];
        return acc;
      },
      {} as Record<string, WineLayerDebugValues>
    );

  const copyValues = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(buildPayload(), null, 2)
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(buildPayload(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wine-layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAll = () => {
    onChange({ ...WINE_SCENE_DEBUG_DEFAULTS });
    try {
      localStorage.removeItem("wine-scene01-debug-layout");
    } catch {
      /* ignore */
    }
    setUseTopAnchor(
      Object.fromEntries(
        WINE_DEBUG_LAYER_ORDER.map((k) => [k, false])
      ) as Record<WineDebugLayerKey, boolean>
    );
  };

  return (
    <div
      ref={panelRef}
      className="fixed max-h-[min(88vh,720px)] w-[min(100vw-16px,340px)] overflow-hidden rounded-lg border border-white/20 bg-black/85 text-[11px] text-white shadow-2xl backdrop-blur-md"
      style={{ left: position.x, top: position.y, zIndex: 1000 }}
      role="region"
      aria-label="Scene 01 calibration debug panel"
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-white/15 bg-white/10 px-3 py-2 active:cursor-grabbing"
        onPointerDown={onPointerDownHeader}
        onPointerMove={onPointerMoveHeader}
        onPointerUp={onPointerUpHeader}
        onPointerCancel={onPointerUpHeader}
      >
        <span className="font-semibold uppercase tracking-wider text-accent-gold">
          Scene 01 · Calibración
        </span>
        <span className="text-white/50">arrastrar</span>
      </div>

      <div className="flex flex-col gap-2 border-b border-white/10 px-3 py-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copyValues}
            className="flex-1 rounded bg-white/10 px-2 py-1 hover:bg-white/20"
          >
            {copied ? "Copiado" : "Copiar JSON"}
          </button>
          <button
            type="button"
            onClick={downloadJson}
            className="flex-1 rounded bg-white/10 px-2 py-1 hover:bg-white/20"
          >
            Descargar JSON
          </button>
        </div>
        <p className="text-[9px] leading-tight text-white/45">
          Persistir en código: guarda el JSON y ejecuta{" "}
          <code className="text-accent-gold/90">
            node scripts/sync-wine-layout.mjs calibration/wine-layout.json
          </code>
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="w-full rounded bg-white/10 px-2 py-1 hover:bg-white/20"
        >
          Reset
        </button>
      </div>

      <div className="max-h-[calc(min(88vh,720px)-88px)] overflow-y-auto px-2 py-2">
        {WINE_DEBUG_LAYER_ORDER.map((layerKey) => {
          const v = values[layerKey];
          const isOpen = expanded === layerKey;
          const topEnabled = useTopAnchor[layerKey];

          return (
            <section key={layerKey} className="mb-2 rounded border border-white/10">
              <button
                type="button"
                className="flex w-full items-center justify-between px-2 py-1.5 text-left font-medium hover:bg-white/5"
                onClick={() => setExpanded(isOpen ? null : layerKey)}
              >
                {WINE_DEBUG_LAYER_LABEL[layerKey]}
                <span className="text-white/40">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen ? (
                <div className="space-y-2 border-t border-white/10 px-2 pb-2 pt-2">
                  <label className="flex items-center gap-2 text-white/70">
                    <input
                      type="checkbox"
                      checked={topEnabled}
                      onChange={(e) => {
                        const on = e.target.checked;
                        setUseTopAnchor((prev) => ({ ...prev, [layerKey]: on }));
                        onChange(
                          updateLayer(values, layerKey, {
                            top: on ? (v.top ?? 40) : null,
                          })
                        );
                      }}
                    />
                    Anclar con top (desactiva bottom)
                  </label>

                  {FIELD_CONFIG.map((field) => {
                    if (field.key === "top" && !topEnabled) {
                      return (
                        <div
                          key="top-display"
                          className="grid grid-cols-[72px_1fr_44px] items-center gap-1 opacity-50"
                        >
                          <span className="text-white/60">top (%)</span>
                          <span className="col-span-2 text-white/40">— (usa bottom)</span>
                        </div>
                      );
                    }
                    if (field.key === "bottom" && topEnabled) {
                      return (
                        <div
                          key="bottom-display"
                          className="grid grid-cols-[72px_1fr_44px] items-center gap-1 opacity-50"
                        >
                          <span className="text-white/60">bottom (%)</span>
                          <span className="col-span-2 text-white/40">— (usa top)</span>
                        </div>
                      );
                    }

                    const value =
                      field.key === "top"
                        ? (v.top ?? 0)
                        : (v[field.key as FieldKey] as number);

                    return (
                      <div
                        key={field.key}
                        className="grid grid-cols-[72px_1fr_44px] items-center gap-1"
                      >
                        <label
                          htmlFor={`${layerKey}-${field.key}`}
                          className="text-white/70"
                        >
                          {field.label.split(" ")[0]}
                        </label>
                        <input
                          id={`${layerKey}-${field.key}`}
                          type="range"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={value}
                          onChange={(e) =>
                            setField(layerKey, field.key, Number(e.target.value))
                          }
                          className="h-1 w-full accent-accent-gold"
                        />
                        <input
                          type="number"
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={value}
                          onChange={(e) =>
                            setField(layerKey, field.key, Number(e.target.value))
                          }
                          className="w-full rounded border border-white/20 bg-black/50 px-1 py-0.5 text-right tabular-nums"
                        />
                      </div>
                    );
                  })}

                  <pre className="overflow-x-auto rounded bg-black/40 p-1.5 text-[9px] leading-tight text-white/60">
                    {JSON.stringify(v, null, 0)}
                  </pre>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </div>
  );
}
