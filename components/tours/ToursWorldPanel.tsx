"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import CategoryEditorialButton from "@/components/category/CategoryEditorialButton";
import {
  TOURS_NAV_TRANSITION_MS,
  TOURS_PANEL_EASE,
  TOURS_PANEL_TRANSITION_MS,
  getToursPanelWidths,
  type ToursWorldId,
} from "@/lib/tours-page-config";

export type ToursWorldPanelData = {
  id: ToursWorldId;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  titleLines: string[];
  description: string;
  experienceCountLabel: string;
  ctaLabel: string;
};

type ToursWorldPanelProps = {
  world: ToursWorldPanelData;
  hoveredId: ToursWorldId | null;
  navigatingId: ToursWorldId | null;
  isDesktop: boolean;
  onHover: (id: ToursWorldId | null) => void;
  onNavigate: (id: ToursWorldId, href: string) => void;
};

const PARALLAX_MAX = 10;

export default function ToursWorldPanel({
  world,
  hoveredId,
  navigatingId,
  isDesktop,
  onHover,
  onNavigate,
}: ToursWorldPanelProps) {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const isActive = hoveredId === world.id;
  const isInactive = hoveredId !== null && hoveredId !== world.id;
  const isNavigating = navigatingId === world.id;
  const width = isDesktop ? getToursPanelWidths(hoveredId, world.id) : 100;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || !isDesktop || !isActive || !panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({
        x: nx * PARALLAX_MAX,
        y: ny * PARALLAX_MAX * 0.6,
      });
    },
    [isActive, isDesktop, reducedMotion]
  );

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
    onHover(null);
  };

  const transitionDuration = reducedMotion ? 0 : TOURS_PANEL_TRANSITION_MS;
  const imageScale =
    isNavigating && !reducedMotion ? 1.08 : isActive && !reducedMotion ? 1.05 : 1;

  return (
    <article
      ref={panelRef}
      className={`tours-world-panel group/panel relative cursor-pointer overflow-hidden ${
        isDesktop
          ? "h-full shrink-0"
          : "min-h-[70vh] w-full sm:min-h-[80vh] md:min-h-[85vh]"
      } ${isInactive ? "tours-world-panel--inactive" : ""} ${
        isActive ? "tours-world-panel--active" : ""
      } ${isNavigating ? "tours-world-panel--navigating" : ""}`}
      style={
        isDesktop
          ? {
              width: `${width}%`,
              transition: `width ${transitionDuration}ms ${TOURS_PANEL_EASE}, opacity 700ms ${TOURS_PANEL_EASE}`,
              opacity: isInactive ? 0.82 : 1,
            }
          : undefined
      }
      onMouseEnter={() => isDesktop && onHover(world.id)}
      onMouseLeave={() => isDesktop && handleMouseLeave()}
      onMouseMove={handleMouseMove}
      onClick={() => onNavigate(world.id, world.href)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onNavigate(world.id, world.href);
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`${world.titleLines.join(" ")} — ${world.description}`}
    >
      {/* Imagen cinematográfica */}
      <div
        className="absolute inset-[-4%] will-change-transform"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(${imageScale})`,
          transition: reducedMotion
            ? "none"
            : `transform ${isNavigating ? TOURS_NAV_TRANSITION_MS : transitionDuration}ms ${TOURS_PANEL_EASE}`,
        }}
      >
        <Image
          src={world.imageSrc}
          alt={world.imageAlt}
          fill
          className="object-cover saturate-[1.04] contrast-[1.03] brightness-[1.02]"
          style={{ objectPosition: world.imagePosition }}
          sizes={
            isDesktop
              ? "(max-width: 1024px) 100vw, 55vw"
              : "100vw"
          }
          priority={world.id === "wine"}
        />
      </div>

      {/* Vignette suave */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/panel:opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.28) 100%)",
          opacity: isActive ? 0.88 : 1,
        }}
        aria-hidden
      />

      {/* Overlay legibilidad — sutil, no negro */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(5,6,6,0.52) 0%, rgba(5,6,6,0.18) 42%, rgba(5,6,6,0.06) 100%)"
            : "linear-gradient(to top, rgba(5,6,6,0.58) 0%, rgba(5,6,6,0.22) 45%, rgba(5,6,6,0.08) 100%)",
          opacity: isActive ? 0.92 : 1,
        }}
        aria-hidden
      />

      {/* Contenido editorial */}
      <div
        className={`relative z-10 flex h-full flex-col justify-end px-6 pb-10 pt-[var(--experience-header-height,5.5rem)] sm:px-8 sm:pb-12 lg:px-12 lg:pb-14 xl:px-16 xl:pb-16 ${
          isNavigating ? "opacity-0" : ""
        }`}
        style={{
          transition: reducedMotion
            ? "none"
            : `opacity ${TOURS_NAV_TRANSITION_MS}ms ${TOURS_PANEL_EASE}`,
        }}
      >
        <h2
          className="font-theater font-normal uppercase leading-[0.92] tracking-[-0.03em] text-[#F5F0E6] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/panel:-translate-y-2.5"
          style={{
            fontSize: isDesktop
              ? "clamp(5.625rem, 7vw, 8.75rem)"
              : "clamp(2.75rem, 11vw, 4.5rem)",
            transform: isActive ? "translateY(-10px)" : undefined,
          }}
        >
          {world.titleLines.map((line, i) => (
            <span
              key={`${line}-${i}`}
              className="block"
              style={{ marginTop: i > 0 ? "0.06em" : 0 }}
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          className="mt-4 max-w-md font-sans text-sm leading-relaxed tracking-[0.02em] text-[#F5F0E6]/78 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base md:max-w-lg md:text-[1.05rem] group-hover/panel:text-[#F5F0E6]/88"
          style={{
            opacity: isActive ? 1 : 0.78,
            transform: isActive ? "translateY(-4px)" : undefined,
          }}
        >
          {world.description}
        </p>

        <p
          className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F5F0E6]/45 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xs"
          style={{ opacity: isActive ? 0.72 : 0.45 }}
        >
          {world.experienceCountLabel}
        </p>

        <div
          className="mt-6 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mt-8 group-hover/panel:-translate-y-1"
          style={{ transform: isActive ? "translateY(-6px)" : undefined }}
          onClick={(e) => e.stopPropagation()}
        >
          <CategoryEditorialButton
            href={world.href}
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(world.id, world.href);
            }}
          >
            {world.ctaLabel} →
          </CategoryEditorialButton>
        </div>
      </div>
    </article>
  );
}
