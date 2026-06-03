"use client";

import { motion } from "framer-motion";
import type { ExperienceWorldConfig } from "./experienceHeroConfig";

type ExperienceSpotlightProps = {
  world: ExperienceWorldConfig;
};

export default function ExperienceSpotlight({ world }: ExperienceSpotlightProps) {
  return (
    <motion.div
      key={world.id}
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 72% at 50% 40%, ${world.spotlight.core} 0%, ${world.spotlight.mid} 38%, ${world.spotlight.edge} 72%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 200deg at 55% 30%, transparent 0deg, rgba(255,255,255,0.06) 40deg, transparent 80deg)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a120f] via-transparent to-[#0a120f]/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a120f] via-transparent to-[#0a120f]/60" />
    </motion.div>
  );
}
