"use client";

import { useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import PremiumExperienceCtaButton from "@/components/experience-hero/PremiumExperienceCtaButton";
import {
  JOURNEY_ROUTE_PATH,
  MAP_REGIONS,
  PROVINCE_OUTLINE_PATH,
  TERRAIN_DETAIL_PATHS,
  type MapRegion,
  type MapRegionId,
} from "@/lib/home-mendoza-map";
import HomeSectionFade from "@/components/home/HomeSectionFade";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

const DRAW = {
  lines: { delay: 0, duration: 0.9 },
  terrain: { delay: 0.5, duration: 0.7 },
  locations: { delay: 1.0, duration: 0.65 },
  markers: { delay: 1.4, duration: 0.55 },
  route: { delay: 1.75, duration: 0.95 },
} as const;

function pathTransition(phase: keyof typeof DRAW, reduced: boolean) {
  if (reduced) return { duration: 0 };
  return {
    duration: DRAW[phase].duration,
    delay: DRAW[phase].delay,
    ease: PREMIUM_EASE,
  };
}

type MendozaInteractiveMapProps = {
  activeId: MapRegionId | null;
  onRegionEnter: (id: MapRegionId) => void;
  onRegionLeave: () => void;
  reducedMotion: boolean;
};

function MendozaInteractiveMap({
  activeId,
  onRegionEnter,
  onRegionLeave,
  reducedMotion,
}: MendozaInteractiveMapProps) {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.35 });
  const animate = reducedMotion || inView;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[min(100%,920px)]">
      <svg
        ref={ref}
        viewBox="0 0 900 560"
        className="h-auto w-full select-none"
        role="img"
        aria-label="Mapa estilizado de Mendoza con regiones de experiencias"
      >
        <defs>
          <linearGradient id="map-vignette" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050606" stopOpacity="0" />
            <stop offset="100%" stopColor="#050606" stopOpacity="0.35" />
          </linearGradient>
          <filter id="region-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Líneas — contorno provincial */}
        <motion.path
          d={PROVINCE_OUTLINE_PATH}
          fill="none"
          stroke="rgba(245, 240, 230, 0.14)"
          strokeWidth={1.2}
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={pathTransition("lines", reducedMotion)}
        />

        {/* Terreno — detalle topográfico */}
        {TERRAIN_DETAIL_PATHS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(230, 236, 233, 0.06)"
            strokeWidth={0.8}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              animate
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              ...pathTransition("terrain", reducedMotion),
              delay: (reducedMotion ? 0 : DRAW.terrain.delay) + i * 0.08,
            }}
          />
        ))}

        {/* Regiones — relleno base */}
        {MAP_REGIONS.map((region) => (
          <motion.path
            key={`fill-${region.id}`}
            d={region.areaPath}
            fill={region.colorMuted}
            stroke="transparent"
            initial={{ opacity: 0 }}
            animate={
              animate
                ? {
                    opacity: activeId === region.id ? 0.55 : 0.35,
                  }
                : { opacity: 0 }
            }
            transition={{
              opacity: { duration: reducedMotion ? 0 : 0.5, delay: DRAW.terrain.delay },
            }}
          />
        ))}

        {/* Ruta del viaje */}
        <motion.path
          d={JOURNEY_ROUTE_PATH}
          fill="none"
          stroke="rgba(245, 240, 230, 0.22)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="6 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            animate
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={pathTransition("route", reducedMotion)}
        />
        {animate && !reducedMotion ? (
          <motion.path
            d={JOURNEY_ROUTE_PATH}
            fill="none"
            stroke="rgba(200, 155, 60, 0.35)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: DRAW.route.duration,
              delay: DRAW.route.delay,
              ease: PREMIUM_EASE,
            }}
          />
        ) : null}

        {/* Ubicaciones — puntos y etiquetas */}
        {MAP_REGIONS.flatMap((region) =>
          region.locations.map((loc, i) => (
            <g key={`${region.id}-${loc.name}`}>
              <motion.circle
                cx={loc.x}
                cy={loc.y}
                fill={region.color}
                fillOpacity={0.85}
                initial={{ r: 0, opacity: 0 }}
                animate={
                  animate ? { r: 3, opacity: 1 } : { r: 0, opacity: 0 }
                }
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                  delay: reducedMotion
                    ? 0
                    : DRAW.locations.delay + i * 0.06,
                  ease: PREMIUM_EASE,
                }}
              />
              <motion.text
                x={loc.x}
                y={loc.y + 14}
                textAnchor="middle"
                className="fill-[#E6ECE9]/45 font-sans text-[9px] tracking-[0.12em] uppercase"
                initial={{ opacity: 0 }}
                animate={animate ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion
                    ? 0
                    : DRAW.locations.delay + 0.15 + i * 0.06,
                }}
              >
                {loc.name}
              </motion.text>
            </g>
          ))
        )}

        {/* Marcadores de experiencia — anillos editoriales */}
        {MAP_REGIONS.map((region, i) => (
          <motion.g
            key={`marker-${region.id}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              animate
                ? {
                    opacity: 1,
                    scale: activeId === region.id ? 1.08 : 1,
                  }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.5,
              delay: reducedMotion ? 0 : DRAW.markers.delay + i * 0.1,
              ease: PREMIUM_EASE,
            }}
            style={{ transformOrigin: `${region.center.x}px ${region.center.y}px` }}
          >
            <circle
              cx={region.center.x}
              cy={region.center.y}
              r={activeId === region.id ? 28 : 22}
              fill="none"
              stroke={region.color}
              strokeOpacity={activeId === region.id ? 0.5 : 0.28}
              strokeWidth={1}
              className="transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            <circle
              cx={region.center.x}
              cy={region.center.y}
              r={6}
              fill={region.color}
              fillOpacity={0.9}
              filter="url(#region-glow)"
            />
          </motion.g>
        ))}

        {/* Zonas interactivas */}
        {MAP_REGIONS.map((region) => (
          <path
            key={`hit-${region.id}`}
            d={region.areaPath}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => onRegionEnter(region.id)}
            onMouseLeave={onRegionLeave}
            onFocus={() => onRegionEnter(region.id)}
            onBlur={onRegionLeave}
            onClick={() => onRegionEnter(region.id)}
            tabIndex={0}
            aria-label={region.title}
          />
        ))}

        <rect
          width="900"
          height="560"
          fill="url(#map-vignette)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}

function EditorialRegionPanel({
  region,
  onExplore,
}: {
  region: MapRegion;
  onExplore: () => void;
}) {
  return (
    <motion.div
      key={region.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.55, ease: PREMIUM_EASE }}
      className="flex flex-col"
      style={{ color: region.color }}
    >
      <p
        className="font-sans text-[10px] font-medium uppercase tracking-[0.22em]"
        style={{ color: `${region.color}99` }}
      >
        Experiencia
      </p>
      <h3 className="mt-2 font-theater text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#F5F0E6]">
        {region.title}
      </h3>
      <p className="mt-4 max-w-[32ch] font-sans text-[clamp(0.88rem,1.15vw,1rem)] leading-[1.65] text-[#E6ECE9]/62">
        {region.description}
      </p>
      <ul className="mt-5 space-y-1.5 font-sans text-[11px] tracking-[0.08em] text-[#E6ECE9]/40">
        {region.locations.map((loc) => (
          <li key={loc.name}>{loc.name}</li>
        ))}
      </ul>
      <div className="pointer-events-auto mt-8">
        <PremiumExperienceCtaButton label={region.ctaLabel} onAction={onExplore} />
      </div>
    </motion.div>
  );
}

export default function MendozaMapSection() {
  const [activeId, setActiveId] = useState<MapRegionId | null>(null);
  const reducedMotion = useReducedMotion();
  const activeRegion = MAP_REGIONS.find((r) => r.id === activeId);

  const scrollToExperiences = useCallback(() => {
    document
      .querySelector('[aria-label="Selector de experiencias"]')
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden py-14 md:py-16"
      aria-label="Mapa de experiencias en Mendoza"
    >
      <HomeSectionFade edge="top" />
      <div className="relative z-10 mx-auto flex w-full max-w-[96rem] flex-1 flex-col items-center justify-center gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12 xl:gap-24">
        <div className="w-full flex-1 lg:max-w-[58%]">
          <motion.p
            className="mb-6 text-center font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-[#E6ECE9]/38 lg:text-left"
            initial={reducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
          >
            Mendoza · Una sola historia
          </motion.p>
          <MendozaInteractiveMap
            activeId={activeId}
            onRegionEnter={setActiveId}
            onRegionLeave={() => setActiveId(null)}
            reducedMotion={!!reducedMotion}
          />
          <p className="mt-4 text-center font-sans text-[9px] tracking-[0.14em] text-[#E6ECE9]/32 lg:text-left">
            Ciudad → Wine Tours → Aventura
          </p>
        </div>

        <div
          className={`relative flex min-h-[220px] w-full flex-1 flex-col justify-center lg:max-w-[36%] lg:pl-4 ${
            activeId ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            {activeId && activeRegion ? (
              <EditorialRegionPanel
                region={activeRegion}
                onExplore={scrollToExperiences}
              />
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[28ch] font-sans text-[#E6ECE9]/45"
              >
                <p className="font-theater text-2xl font-bold tracking-[-0.02em] text-[#F5F0E6]/70">
                  Explorá Mendoza
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  Pasá el cursor sobre una región para descubrir cómo conectan
                  nuestras experiencias.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
