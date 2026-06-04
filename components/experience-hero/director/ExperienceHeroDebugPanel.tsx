"use client";

import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { EXPERIENCE_HERO_DEBUG_DEFAULTS } from "../experienceHeroLayout";
import {
  DEBUG_PANEL_COPY_LABELS,
  DEBUG_SECTION_LABELS,
  PANEL_COPY_WORLD_ORDER,
  slotDebugToLayout,
  type PanelEditorialLayoutDebugValues,
  type SlotDebugValues,
} from "./experienceHeroDebugConfig";
import { useExperienceHeroDebug } from "./ExperienceHeroDebugContext";
import type { ExperienceWorldId, SpatialSlot } from "../types";

const copyInputClass =
  "w-full rounded border border-white/20 bg-black/50 px-2 py-1.5 text-white placeholder:text-white/30";

function parseTitleLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function CopyField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-white/70">{label}</label>
      {hint ? <p className="text-[9px] text-white/40">{hint}</p> : null}
      {children}
    </div>
  );
}

function LayoutGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2 border-t border-white/10 pt-2 first:border-t-0 first:pt-0">
      <p className="text-[10px] font-medium uppercase tracking-wider text-accent-gold/90">
        {title}
      </p>
      {children}
    </div>
  );
}

function panelLayoutFields(
  layout: PanelEditorialLayoutDebugValues,
  patchLayout: (p: Partial<PanelEditorialLayoutDebugValues>) => void
): SliderField[] {
  const p = patchLayout;
  return [
    {
      key: "leftPct",
      label: "left (%)",
      min: 0,
      max: 40,
      step: 0.5,
      get: () => layout.leftPct,
      set: (v) => p({ leftPct: v }),
    },
    {
      key: "offsetX",
      label: "offset X (px)",
      min: -80,
      max: 80,
      step: 1,
      get: () => layout.offsetXPx,
      set: (v) => p({ offsetXPx: v }),
    },
    {
      key: "offsetY",
      label: "offset Y (px)",
      min: -80,
      max: 80,
      step: 1,
      get: () => layout.offsetYPx,
      set: (v) => p({ offsetYPx: v }),
    },
    {
      key: "widthPct",
      label: "ancho bloque (%)",
      min: 30,
      max: 90,
      step: 1,
      get: () => layout.widthPct,
      set: (v) => p({ widthPct: v }),
    },
    {
      key: "maxWidthPx",
      label: "max ancho (px)",
      min: 200,
      max: 600,
      step: 10,
      get: () => layout.maxWidthPx,
      set: (v) => p({ maxWidthPx: v }),
    },
    {
      key: "innerMaxWidthPx",
      label: "max contenido (px)",
      min: 160,
      max: 480,
      step: 10,
      get: () => layout.innerMaxWidthPx,
      set: (v) => p({ innerMaxWidthPx: v }),
    },
    {
      key: "padLeft",
      label: "pad left (%)",
      min: 0,
      max: 20,
      step: 0.5,
      get: () => layout.padLeftPct,
      set: (v) => p({ padLeftPct: v }),
    },
    {
      key: "padRight",
      label: "pad right (%)",
      min: 0,
      max: 20,
      step: 0.5,
      get: () => layout.padRightPct,
      set: (v) => p({ padRightPct: v }),
    },
    {
      key: "padTop",
      label: "pad top (%)",
      min: 0,
      max: 25,
      step: 0.5,
      get: () => layout.padTopPct,
      set: (v) => p({ padTopPct: v }),
    },
    {
      key: "padBottom",
      label: "pad bottom (%)",
      min: 0,
      max: 25,
      step: 0.5,
      get: () => layout.padBottomPct,
      set: (v) => p({ padBottomPct: v }),
    },
    {
      key: "justify",
      label: "anclaje vert. (%)",
      min: 0,
      max: 100,
      step: 1,
      get: () => layout.contentJustifyPct,
      set: (v) => p({ contentJustifyPct: v }),
    },
    {
      key: "titleMin",
      label: "título min (rem)",
      min: 0.8,
      max: 2.5,
      step: 0.05,
      get: () => layout.titleFontMinRem,
      set: (v) => p({ titleFontMinRem: v }),
    },
    {
      key: "titleVw",
      label: "título vw",
      min: 1,
      max: 6,
      step: 0.1,
      get: () => layout.titleFontVw,
      set: (v) => p({ titleFontVw: v }),
    },
    {
      key: "titleMax",
      label: "título max (rem)",
      min: 1.2,
      max: 4,
      step: 0.05,
      get: () => layout.titleFontMaxRem,
      set: (v) => p({ titleFontMaxRem: v }),
    },
    {
      key: "titleGap",
      label: "gap líneas título",
      min: 0,
      max: 24,
      step: 1,
      get: () => layout.titleLineGapPx,
      set: (v) => p({ titleLineGapPx: v }),
    },
    {
      key: "subMin",
      label: "subtítulo min (rem)",
      min: 0.55,
      max: 1.5,
      step: 0.02,
      get: () => layout.subtitleFontMinRem,
      set: (v) => p({ subtitleFontMinRem: v }),
    },
    {
      key: "subVw",
      label: "subtítulo vw",
      min: 0.5,
      max: 3,
      step: 0.05,
      get: () => layout.subtitleFontVw,
      set: (v) => p({ subtitleFontVw: v }),
    },
    {
      key: "subMax",
      label: "subtítulo max (rem)",
      min: 0.65,
      max: 1.5,
      step: 0.02,
      get: () => layout.subtitleFontMaxRem,
      set: (v) => p({ subtitleFontMaxRem: v }),
    },
    {
      key: "subMt",
      label: "subtítulo margin top",
      min: 0,
      max: 48,
      step: 1,
      get: () => layout.subtitleMarginTopPx,
      set: (v) => p({ subtitleMarginTopPx: v }),
    },
    {
      key: "subCh",
      label: "subtítulo max (ch)",
      min: 12,
      max: 50,
      step: 1,
      get: () => layout.subtitleMaxWidthCh,
      set: (v) => p({ subtitleMaxWidthCh: v }),
    },
    {
      key: "ctaMt",
      label: "CTA margin top",
      min: 0,
      max: 64,
      step: 1,
      get: () => layout.ctaMarginTopPx,
      set: (v) => p({ ctaMarginTopPx: v }),
    },
  ];
}

function PanelCopyEditor({ worldId }: { worldId: ExperienceWorldId }) {
  const { values, setPanelCopy } = useExperienceHeroDebug();
  const copy = values.panelCopy[worldId];
  const patchLayout = (p: Partial<PanelEditorialLayoutDebugValues>) =>
    setPanelCopy(worldId, { layout: { ...copy.layout, ...p } });

  const layoutFields = panelLayoutFields(copy.layout, patchLayout);
  const blockFields = layoutFields.slice(0, 11);
  const titleFields = layoutFields.slice(11, 15);
  const subtitleFields = layoutFields.slice(15, 19);
  const ctaFields = layoutFields.slice(19);

  return (
    <div className="space-y-2.5">
      <CopyField label="Título" hint="Una línea por renglón (máx. recomendado: 2)">
        <textarea
          rows={2}
          value={copy.titleLines.join("\n")}
          onChange={(e) =>
            setPanelCopy(worldId, {
              titleLines: parseTitleLines(e.target.value),
            })
          }
          className={`${copyInputClass} resize-y font-theater text-[12px] leading-snug`}
        />
      </CopyField>
      <CopyField label="Subtítulo">
        <textarea
          rows={2}
          value={copy.subtitle}
          onChange={(e) => setPanelCopy(worldId, { subtitle: e.target.value })}
          className={`${copyInputClass} resize-y leading-snug`}
        />
      </CopyField>
      <CopyField label="Botón CTA">
        <input
          type="text"
          value={copy.ctaLabel}
          onChange={(e) => setPanelCopy(worldId, { ctaLabel: e.target.value })}
          className={copyInputClass}
        />
      </CopyField>

      <LayoutGroup title="Bloque editorial (posición)">
        {blockFields.map((f) => (
          <SliderRow key={`${worldId}-${f.key}`} field={f} />
        ))}
      </LayoutGroup>
      <LayoutGroup title="Título (tamaño)">
        {titleFields.map((f) => (
          <SliderRow key={`${worldId}-${f.key}`} field={f} />
        ))}
      </LayoutGroup>
      <LayoutGroup title="Subtítulo (tamaño)">
        {subtitleFields.map((f) => (
          <SliderRow key={`${worldId}-${f.key}`} field={f} />
        ))}
      </LayoutGroup>
      <LayoutGroup title="CTA (espaciado)">
        {ctaFields.map((f) => (
          <SliderRow key={`${worldId}-${f.key}`} field={f} />
        ))}
      </LayoutGroup>
      <p className="text-[9px] text-white/40">
        Solo visible en el panel activo (centro). Centrá el mundo en el carrusel para
        previsualizar.
      </p>
    </div>
  );
}

type SliderField = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  get: () => number;
  set: (v: number) => void;
};

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

const SLOT_ORDER: SpatialSlot[] = ["center", "left", "right"];

export default function ExperienceHeroDebugPanel() {
  const {
    values,
    setLogo,
    setCarouselWrap,
    setCarouselStage,
    setPanelSize,
    setSlot,
    setShowOutlines,
    persistForHome,
    resetAll,
  } = useExperienceHeroDebug();

  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [position, setPosition] = useState({ x: 12, y: 48 });
  const [expanded, setExpanded] = useState<string>("logo");
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
    logo: values.logo,
    carouselWrap: values.carouselWrap,
    carouselStage: values.carouselStage,
    panelSize: values.panelSize,
    panelCopy: values.panelCopy,
    slots: SLOT_ORDER.reduce(
      (acc, slot) => {
        acc[slot] = {
          debug: values.slots[slot],
          layout: slotDebugToLayout(values.slots[slot]),
        };
        return acc;
      },
      {} as Record<string, unknown>
    ),
  });

  const copyValues = async () => {
    await navigator.clipboard.writeText(JSON.stringify(buildPayload(), null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const buildSyncJson = () => ({
    logo: values.logo,
    carouselWrap: values.carouselWrap,
    carouselStage: values.carouselStage,
    panelSize: values.panelSize,
    slots: values.slots,
    panelCopy: values.panelCopy,
  });

  const applyToHome = () => {
    persistForHome();
    const blob = new Blob([JSON.stringify(buildSyncJson(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hero-layout.json";
    a.click();
    URL.revokeObjectURL(url);
    setSavedHome(true);
    window.setTimeout(() => setSavedHome(false), 3000);
  };

  const slotFields = (slot: SpatialSlot): SliderField[] => {
    const s = values.slots[slot];
    const patch = (p: Partial<SlotDebugValues>) => setSlot(slot, p);
    return [
      {
        key: "left",
        label: "left (%)",
        min: 0,
        max: 100,
        step: 0.5,
        get: () => s.leftPct,
        set: (v) => patch({ leftPct: v }),
      },
      {
        key: "top",
        label: "top (%)",
        min: 0,
        max: 100,
        step: 0.5,
        get: () => s.topPct,
        set: (v) => patch({ topPct: v }),
      },
      {
        key: "scale",
        label: "scale",
        min: 0.2,
        max: 1.2,
        step: 0.01,
        get: () => s.scale,
        set: (v) => patch({ scale: v }),
      },
      {
        key: "opacity",
        label: "opacity",
        min: 0.1,
        max: 1,
        step: 0.02,
        get: () => s.opacity,
        set: (v) => patch({ opacity: v }),
      },
      {
        key: "blur",
        label: "blur (px)",
        min: 0,
        max: 12,
        step: 0.5,
        get: () => s.blurPx,
        set: (v) => patch({ blurPx: v }),
      },
      {
        key: "zIndex",
        label: "z-index",
        min: 0,
        max: 50,
        step: 1,
        get: () => s.zIndex,
        set: (v) => patch({ zIndex: v }),
      },
      {
        key: "rotateY",
        label: "rotateY (°)",
        min: -45,
        max: 45,
        step: 1,
        get: () => s.rotateY,
        set: (v) => patch({ rotateY: v }),
      },
      {
        key: "z",
        label: "z 3D",
        min: -300,
        max: 120,
        step: 4,
        get: () => s.z,
        set: (v) => patch({ z: v }),
      },
    ];
  };

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? "" : id));

  return (
    <div
      ref={panelRef}
      className="fixed max-h-[min(92vh,820px)] w-[min(100vw-16px,380px)] overflow-hidden rounded-lg border border-white/20 bg-black/88 text-[11px] text-white shadow-2xl backdrop-blur-md"
      style={{ left: position.x, top: position.y, zIndex: 1000 }}
      role="region"
      aria-label="Experience Hero director debug"
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-white/15 bg-white/10 px-3 py-2 active:cursor-grabbing"
        onPointerDown={onPointerDownHeader}
        onPointerMove={onPointerMoveHeader}
        onPointerUp={onPointerUpHeader}
        onPointerCancel={onPointerUpHeader}
      >
        <span className="font-semibold uppercase tracking-wider text-accent-gold">
          Hero · Director
        </span>
        <span className="text-white/50">arrastrar</span>
      </div>

      <div className="flex flex-col gap-2 border-b border-white/10 px-3 py-2">
        <div className="flex flex-col gap-2">
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
              onClick={resetAll}
              className="flex-1 rounded bg-white/10 px-2 py-1 hover:bg-white/20"
            >
              Reset
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-white/70">
          <input
            type="checkbox"
            checked={values.showOutlines}
            onChange={(e) => setShowOutlines(e.target.checked)}
          />
          Mostrar contornos (logo + carrusel)
        </label>
        <p className="text-[9px] leading-tight text-white/45">
          «Aplicar en /es» guarda en el navegador y descarga JSON. Layout:{" "}
          <code className="text-accent-gold/90">npm run hero-layout:sync</code>.
          Textos/layout: <code className="text-accent-gold/90">panelCopy</code> del JSON
          (copy + layout por mundo).
        </p>
      </div>

      <div className="max-h-[calc(min(90vh,760px)-120px)] overflow-y-auto px-2 py-2">
        <Section
          title={DEBUG_SECTION_LABELS.logo}
          open={expanded === "logo"}
          onToggle={() => toggle("logo")}
        >
          {(
            [
              {
                label: "width (px)",
                min: 60,
                max: 280,
                step: 1,
                get: () => values.logo.width,
                set: (v: number) => setLogo({ width: v }),
              },
              {
                label: "height (px)",
                min: 20,
                max: 120,
                step: 1,
                get: () => values.logo.height,
                set: (v: number) => setLogo({ height: v }),
              },
              {
                label: "scale",
                min: 0.5,
                max: 2,
                step: 0.02,
                get: () => values.logo.scale,
                set: (v: number) => setLogo({ scale: v }),
              },
              {
                label: "marginTop",
                min: -40,
                max: 80,
                step: 1,
                get: () => values.logo.marginTop,
                set: (v: number) => setLogo({ marginTop: v }),
              },
              {
                label: "marginLeft",
                min: -40,
                max: 80,
                step: 1,
                get: () => values.logo.marginLeft,
                set: (v: number) => setLogo({ marginLeft: v }),
              },
              {
                label: "offsetX",
                min: -60,
                max: 60,
                step: 1,
                get: () => values.logo.offsetX,
                set: (v: number) => setLogo({ offsetX: v }),
              },
              {
                label: "offsetY",
                min: -60,
                max: 60,
                step: 1,
                get: () => values.logo.offsetY,
                set: (v: number) => setLogo({ offsetY: v }),
              },
            ] as const
          ).map((f) => (
            <SliderRow
              key={f.label}
              field={{
                key: f.label,
                label: f.label,
                min: f.min,
                max: f.max,
                step: f.step,
                get: f.get,
                set: f.set,
              }}
            />
          ))}
        </Section>

        <Section
          title={DEBUG_SECTION_LABELS.carouselWrap}
          open={expanded === "wrap"}
          onToggle={() => toggle("wrap")}
        >
          <SliderRow
            field={{
              key: "pt",
              label: "paddingTop (rem)",
              min: 0,
              max: 8,
              step: 0.25,
              get: () => values.carouselWrap.paddingTopRem,
              set: (v) => setCarouselWrap({ paddingTopRem: v }),
            }}
          />
          <SliderRow
            field={{
              key: "pb",
              label: "paddingBottom (rem)",
              min: 0,
              max: 12,
              step: 0.25,
              get: () => values.carouselWrap.paddingBottomRem,
              set: (v) => setCarouselWrap({ paddingBottomRem: v }),
            }}
          />
        </Section>

        <Section
          title={DEBUG_SECTION_LABELS.carouselStage}
          open={expanded === "stage"}
          onToggle={() => toggle("stage")}
        >
          <SliderRow
            field={{
              key: "perspective",
              label: "perspective (px)",
              min: 800,
              max: 4000,
              step: 50,
              get: () => values.carouselStage.perspectivePx,
              set: (v) => setCarouselStage({ perspectivePx: v }),
            }}
          />
          <SliderRow
            field={{
              key: "originX",
              label: "origin X (%)",
              min: 0,
              max: 100,
              step: 1,
              get: () => values.carouselStage.originX,
              set: (v) => setCarouselStage({ originX: v }),
            }}
          />
          <SliderRow
            field={{
              key: "originY",
              label: "origin Y (%)",
              min: 0,
              max: 100,
              step: 1,
              get: () => values.carouselStage.originY,
              set: (v) => setCarouselStage({ originY: v }),
            }}
          />
        </Section>

        <Section
          title={DEBUG_SECTION_LABELS.panelSize}
          open={expanded === "panel"}
          onToggle={() => toggle("panel")}
        >
          <SliderRow
            field={{
              key: "wvw",
              label: "width (vw)",
              min: 40,
              max: 90,
              step: 1,
              get: () => values.panelSize.widthVw,
              set: (v) => setPanelSize({ widthVw: v }),
            }}
          />
          <SliderRow
            field={{
              key: "hvh",
              label: "height (vh)",
              min: 40,
              max: 90,
              step: 1,
              get: () => values.panelSize.heightVh,
              set: (v) => setPanelSize({ heightVh: v }),
            }}
          />
          <SliderRow
            field={{
              key: "maxW",
              label: "maxW (px)",
              min: 600,
              max: 1400,
              step: 10,
              get: () => values.panelSize.maxWidthPx,
              set: (v) => setPanelSize({ maxWidthPx: v }),
            }}
          />
          <SliderRow
            field={{
              key: "maxH",
              label: "maxH (px)",
              min: 400,
              max: 1000,
              step: 10,
              get: () => values.panelSize.maxHeightPx,
              set: (v) => setPanelSize({ maxHeightPx: v }),
            }}
          />
        </Section>

        {PANEL_COPY_WORLD_ORDER.map((worldId) => (
          <Section
            key={`copy-${worldId}`}
            title={DEBUG_PANEL_COPY_LABELS[worldId]}
            open={expanded === `copy-${worldId}`}
            onToggle={() => toggle(`copy-${worldId}`)}
          >
            <PanelCopyEditor worldId={worldId} />
          </Section>
        ))}

        {SLOT_ORDER.map((slot) => (
          <Section
            key={slot}
            title={DEBUG_SECTION_LABELS[slot]}
            open={expanded === slot}
            onToggle={() => toggle(slot)}
          >
            {slotFields(slot).map((f) => (
              <SliderRow key={`${slot}-${f.key}`} field={f} />
            ))}
            <pre className="overflow-x-auto rounded bg-black/40 p-1.5 text-[9px] text-white/55">
              {JSON.stringify(slotDebugToLayout(values.slots[slot]))}
            </pre>
          </Section>
        ))}
      </div>
    </div>
  );
}
