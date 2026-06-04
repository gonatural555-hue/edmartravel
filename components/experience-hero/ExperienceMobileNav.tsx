"use client";

import { EXPERIENCE_WORLDS } from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

type ExperienceMobileNavProps = {
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
};

/** Navegación compacta inferior — solo móvil */
export default function ExperienceMobileNav({
  activeId,
  onSelect,
}: ExperienceMobileNavProps) {
  return (
    <nav
      className="relative z-50 flex shrink-0 justify-center gap-2 border-t border-white/[0.06] bg-[#050606]/80 px-3 py-3 backdrop-blur-md lg:hidden"
      aria-label="Elegir experiencia"
    >
      {EXPERIENCE_WORLDS.map((world) => {
        const active = world.id === activeId;
        return (
          <button
            key={world.id}
            type="button"
            onClick={() => onSelect(world.id)}
            className={`premium-hover rounded-full px-3.5 py-2 font-theater text-[10px] font-bold uppercase tracking-[-0.02em] transition-[background-color,border-color,color] duration-[400ms] ${
              active
                ? "border border-accent-gold/35 bg-black/50 text-[#F5F0E6]"
                : "border border-transparent bg-transparent text-white/45"
            }`}
          >
            {world.sidebarTitle}
          </button>
        );
      })}
    </nav>
  );
}
