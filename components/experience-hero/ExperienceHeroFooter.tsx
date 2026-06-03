"use client";

import { motion } from "framer-motion";
import { FOOTER_PILLS } from "./experienceHeroConfig";
import type { ExperienceWorldId } from "./types";

function PillIcon({ type }: { type: (typeof FOOTER_PILLS)[number]["icon"] }) {
  const c = "currentColor";
  if (type === "nature") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={c} strokeWidth="1.3">
        <path d="M12 3C8 8 4 10 4 14a8 8 0 0016 0c0-4-4-6-8-8z" />
      </svg>
    );
  }
  if (type === "horse") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={c} strokeWidth="1.3">
        <path d="M4 16c2-6 6-10 12-10 2 0 4 2 4 6" />
        <circle cx="7" cy="17" r="1.5" fill={c} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={c} strokeWidth="1.3">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

type ExperienceHeroFooterProps = {
  activeId: ExperienceWorldId;
  onSelect: (id: ExperienceWorldId) => void;
};

const DOT_ORDER: ExperienceWorldId[] = ["wine", "adventure", "city"];

export default function ExperienceHeroFooter({
  activeId,
  onSelect,
}: ExperienceHeroFooterProps) {
  return (
    <footer className="relative z-30 border-t border-white/[0.06] bg-[#0a120f]/90 px-4 py-4 backdrop-blur-md lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="hidden items-center justify-center gap-10 text-accent-gold/90 lg:flex">
          {FOOTER_PILLS.map((pill) => (
            <div
              key={pill.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <PillIcon type={pill.icon} />
              <span className="max-w-[140px] text-[9px] font-medium uppercase tracking-[0.18em] text-white/55">
                {pill.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {DOT_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-label={`Ir a ${id}`}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              {activeId === id ? (
                <motion.span
                  layoutId="footer-dot"
                  className="h-2 w-2 rounded-full bg-accent-gold shadow-[0_0_12px_rgba(200,155,60,0.6)]"
                />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
              )}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
