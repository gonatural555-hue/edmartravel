"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useExperienceHeroDebugOptional } from "./director/ExperienceHeroDebugContext";
import { directorOutline } from "./director/directorOutline";
import { useExperienceDirectorMode } from "./director/useExperienceDirectorMode";
import type { ExperienceWorldConfig } from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

function CategoryIcon({ type }: { type: ExperienceWorldConfig["icon"] }) {
  const stroke = "currentColor";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "wine") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...common} d="M9 3h6v3a4 4 0 01-4 4 4 4 0 01-4-4V3z" />
        <path {...common} d="M12 10v8M9 21h6" />
      </svg>
    );
  }
  if (type === "mountain") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path {...common} d="M4 18 L12 6 L20 18 Z" />
        <path {...common} d="M8 14h8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path {...common} d="M4 20h16M8 20V10l4-6 4 6v10" />
      <circle {...common} cx="17" cy="7" r="2" />
    </svg>
  );
}

type ExperienceSidebarProps = {
  worlds: ExperienceWorldConfig[];
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
  contactHref: string;
};

export default function ExperienceSidebar({
  worlds,
  activeId,
  onSelect,
  contactHref,
}: ExperienceSidebarProps) {
  const isDirector = useExperienceDirectorMode();
  const debug = useExperienceHeroDebugOptional();
  const logo = debug?.values.logo;
  const showOutlines = isDirector && (debug?.values.showOutlines ?? true);

  return (
    <aside className="relative z-30 flex h-full w-full flex-col border-r border-white/[0.06] bg-[#0c1411]/95 px-5 py-6 backdrop-blur-sm lg:w-[280px] lg:min-w-[280px] lg:max-w-[300px] lg:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div
        data-director-layer="logo"
        className={`relative flex items-center gap-3 ${directorOutline("logo", showOutlines)}`}
        style={
          logo
            ? {
                marginTop: logo.marginTop,
                marginLeft: logo.marginLeft,
                transform: `translate(${logo.offsetX}px, ${logo.offsetY}px) scale(${logo.scale})`,
              }
            : undefined
        }
      >
        <Image
          src="/assets/images/logo/logo.png"
          alt="Edmar Travel"
          width={logo?.width ?? 120}
          height={logo?.height ?? 40}
          className={logo ? "object-contain brightness-110" : "h-9 w-auto object-contain brightness-110"}
          style={
            logo ? { width: logo.width, height: logo.height } : undefined
          }
          priority
        />
      </div>

      <nav className="relative mt-10 flex flex-1 flex-col gap-2" aria-label="Experiencias">
        {worlds.map((world) => {
          const isActive = world.id === activeId;
          return (
            <button
              key={world.id}
              type="button"
              onClick={() => onSelect(world.id)}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-3.5 text-left transition-colors duration-500 ${
                isActive
                  ? "text-[#F8F4EC]"
                  : "text-white/55 hover:text-white/80"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3A5F4A]/90 via-[#2d4a3d]/80 to-[#1a332d]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(200,155,60,0.12)]"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              ) : null}
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-accent-gold">
                <CategoryIcon type={world.icon} />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block font-serif text-[13px] font-medium leading-snug tracking-wide">
                  {world.sidebarTitle}
                </span>
              </span>
              {isActive ? (
                <span className="relative text-accent-gold" aria-hidden>
                  ›
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      <a
        href={contactHref}
        className="relative mt-6 hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-accent-gold/40 hover:text-accent-gold lg:inline-flex"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
        Contacto
      </a>
    </aside>
  );
}
