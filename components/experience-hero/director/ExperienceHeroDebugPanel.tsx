"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  DEBUG_HEADER_UTILITY_LABELS,
  type HeaderUtilityId,
  type HeaderUtilityPositionDebugValues,
} from "./experienceHeroDebugConfig";
import { useExperienceHeroDebug } from "./ExperienceHeroDebugContext";

type SliderField = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  get: () => number;
  set: (v: number) => void;
};

const HEADER_UTILITY_ORDER: HeaderUtilityId[] = [
  "language",
  "login",
  "reservations",
];

function utilityPositionFields(
  getPos: () => HeaderUtilityPositionDebugValues,
  setPos: (patch: Partial<HeaderUtilityPositionDebugValues>) => void
): SliderField[] {
  return [
    {
      key: "offsetX",
      label: "offsetX",
      min: -120,
      max: 120,
      step: 1,
      get: () => getPos().offsetX,
      set: (v) => setPos({ offsetX: v }),
    },
    {
      key: "offsetY",
      label: "offsetY",
      min: -80,
      max: 80,
      step: 1,
      get: () => getPos().offsetY,
      set: (v) => setPos({ offsetY: v }),
    },
    {
      key: "marginTop",
      label: "marginTop",
      min: -40,
      max: 80,
      step: 1,
      get: () => getPos().marginTop,
      set: (v) => setPos({ marginTop: v }),
    },
    {
      key: "marginLeft",
      label: "marginLeft",
      min: -120,
      max: 120,
      step: 1,
      get: () => getPos().marginLeft,
      set: (v) => setPos({ marginLeft: v }),
    },
  ];
}

function SliderRow({ field }: { field: SliderField }) {
  const value = field.get();
  return (
    <div className="grid grid-cols-[88px_1fr_44px] items-center gap-1">
      <label className="text-white/70">{field.label}</label>
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => field.set(Number(e.target.value))}
        className="h-1 w-full accent-accent-gold"
      />
      <input
        type="number"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => field.set(Number(e.target.value))}
        className="w-full rounded border border-white/20 bg-black/50 px-1 py-0.5 text-right tabular-nums"
      />
    </div>
  );
}

function Section({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section className="mb-2 rounded border border-white/10">
      <button
        type="button"
        className="flex w-full items-center justify-between px-2 py-1.5 text-left font-medium hover:bg-white/5"
        onClick={onToggle}
      >
        {title}
        <span className="text-white/40">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="space-y-2 border-t border-white/10 px-2 pb-2 pt-2">
          {children}
        </div>
      ) : null}
    </section>
  );
}

export default function ExperienceHeroDebugPanel() {
  const { values, setHeaderUtility, persistForHome, resetAll } =
    useExperienceHeroDebug();

  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [position, setPosition] = useState({ x: 12, y: 48 });
  const [expanded, setExpanded] = useState<string>("header-language");
  const [copied, setCopied] = useState(false);
  const [savedHome, setSavedHome] = useState(false);

  const onPointerDownHeader = useCallback(
    (e: ReactPointerEvent) => {
      if (e.button !== 0) return;
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position.x, position.y]
  );

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

  const buildPayload = () => ({
    headerUtilities: values.headerUtilities,
  });

  const copyValues = async () => {
    await navigator.clipboard.writeText(
      JSON.stringify(buildPayload(), null, 2)
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const applyToHome = async () => {
    persistForHome();
    try {
      await fetch("/api/dev/sync-header-utilities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
    } catch {
      /* dev server puede estar apagado */
    }
    setSavedHome(true);
    window.setTimeout(() => setSavedHome(false), 2500);
  };

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? "" : id));

  return (
    <div
      ref={panelRef}
      className="fixed z-[200] w-[min(92vw,320px)] rounded-lg border border-white/15 bg-[#0c1411]/95 text-[11px] text-white shadow-2xl backdrop-blur-md"
      style={{ left: position.x, top: position.y }}
      role="dialog"
      aria-label="Header director debug"
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-white/10 px-3 py-2 active:cursor-grabbing"
        onPointerDown={onPointerDownHeader}
        onPointerMove={onPointerMoveHeader}
        onPointerUp={onPointerUpHeader}
        onPointerCancel={onPointerUpHeader}
      >
        <span className="font-semibold uppercase tracking-wider text-accent-gold">
          Header · Director
        </span>
        <span className="text-white/50">arrastrar</span>
      </div>

      <div className="flex flex-col gap-2 border-b border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={applyToHome}
          className="w-full rounded bg-accent-gold/25 px-2 py-2 font-medium text-accent-gold hover:bg-accent-gold/35"
        >
          {savedHome ? "✓ Guardado para /es" : "Aplicar en localhost:3000/es"}
        </button>
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
            onClick={() => {
              resetAll();
              setExpanded("header-language");
            }}
            className="flex-1 rounded bg-white/10 px-2 py-1 hover:bg-white/20"
          >
            Reset
          </button>
        </div>
        <p className="text-[9px] leading-tight text-white/45">
          Ajustá posición de Idiomas, Login y Mis Reservas. Los cambios se guardan
          en el navegador al mover los sliders.
        </p>
      </div>

      <div className="max-h-[min(70vh,420px)] overflow-y-auto px-2 py-2">
        {HEADER_UTILITY_ORDER.map((utilityId) => {
          const sectionKey = `header-${utilityId}`;
          return (
            <Section
              key={utilityId}
              title={DEBUG_HEADER_UTILITY_LABELS[utilityId]}
              open={expanded === sectionKey}
              onToggle={() => toggle(sectionKey)}
            >
              {utilityPositionFields(
                () => values.headerUtilities[utilityId],
                (patch) => setHeaderUtility(utilityId, patch)
              ).map((f) => (
                <SliderRow key={`${utilityId}-${f.key}`} field={f} />
              ))}
            </Section>
          );
        })}
      </div>
    </div>
  );
}
