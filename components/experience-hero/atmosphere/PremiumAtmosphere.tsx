"use client";

import { motion } from "framer-motion";
import {
  ATMOSPHERE_TRANSITION,
  PREMIUM_BASE,
  WORLD_ATMOSPHERE,
} from "./atmospherePresets";
import type { ExperienceWorldId } from "../types";

type PremiumAtmosphereProps = {
  activeId: ExperienceWorldId;
};

/**
 * Sistema de fondo premium: base profunda + grain + neblina + spotlights teatrales.
 */
export default function PremiumAtmosphere({ activeId }: PremiumAtmosphereProps) {
  const spot = WORLD_ATMOSPHERE[activeId];
  const transition = ATMOSPHERE_TRANSITION;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: PREMIUM_BASE }} />

      {/* Layer 1 — grain cinematográfico */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Layer 2 — neblina lenta */}
      <motion.div
        className="absolute -inset-[20%] opacity-[0.35]"
        animate={{
          x: ["-2%", "2%", "-2%"],
          y: ["-1%", "1.5%", "-1%"],
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 30% 40%, rgba(12, 14, 16, 0.9) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 72% 60%, rgba(8, 10, 12, 0.85) 0%, transparent 50%)",
        }}
      />

      {/* Layer 3 — spotlights teatrales (por mundo activo) */}
      <motion.div
        key={`primary-${activeId}`}
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: 1 }}
        transition={transition}
        style={{ background: spot.primary }}
      />
      <motion.div
        key={`secondary-${activeId}`}
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: 1 }}
        transition={transition}
        style={{ background: spot.secondary }}
      />
      <motion.div
        key={`accent-${activeId}`}
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: 1 }}
        transition={transition}
        style={{ background: spot.accent }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: spot.vignette }}
      />

      {/* Profundidad lateral mínima */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,6,0.65) 0%, transparent 14%, transparent 86%, rgba(5,6,6,0.65) 100%)",
        }}
      />
    </div>
  );
}
