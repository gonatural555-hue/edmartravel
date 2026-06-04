import type { ExperienceWorldId } from "../types";

/** Iluminación teatral por mundo — transición 1.5–2s vía Framer */
export type TheatricalSpotlights = {
  primary: string;
  secondary: string;
  accent: string;
  vignette: string;
};

export const PREMIUM_BASE = "#050606";

export const WORLD_ATMOSPHERE: Record<
  ExperienceWorldId,
  TheatricalSpotlights
> = {
  wine: {
    primary:
      "radial-gradient(ellipse 95% 80% at 38% 42%, rgba(72, 18, 32, 0.55) 0%, transparent 62%)",
    secondary:
      "radial-gradient(ellipse 70% 60% at 78% 58%, rgba(92, 48, 28, 0.28) 0%, transparent 58%)",
    accent:
      "radial-gradient(ellipse 55% 45% at 52% 28%, rgba(140, 72, 48, 0.18) 0%, transparent 70%)",
    vignette:
      "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 35%, rgba(5, 6, 6, 0.92) 100%)",
  },
  adventure: {
    primary:
      "radial-gradient(ellipse 100% 85% at 45% 38%, rgba(168, 108, 42, 0.4) 0%, transparent 60%)",
    secondary:
      "radial-gradient(ellipse 75% 65% at 22% 62%, rgba(120, 88, 52, 0.32) 0%, transparent 55%)",
    accent:
      "radial-gradient(ellipse 60% 50% at 70% 72%, rgba(58, 72, 62, 0.35) 0%, transparent 65%)",
    vignette:
      "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 32%, rgba(5, 6, 6, 0.9) 100%)",
  },
  city: {
    primary:
      "radial-gradient(ellipse 92% 78% at 55% 40%, rgba(28, 42, 72, 0.48) 0%, transparent 58%)",
    secondary:
      "radial-gradient(ellipse 68% 58% at 18% 55%, rgba(18, 28, 48, 0.38) 0%, transparent 52%)",
    accent:
      "radial-gradient(ellipse 50% 42% at 62% 22%, rgba(168, 132, 58, 0.22) 0%, transparent 68%)",
    vignette:
      "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 34%, rgba(5, 6, 6, 0.91) 100%)",
  },
};

export const ATMOSPHERE_TRANSITION = {
  duration: 1.75,
  ease: [0.22, 1, 0.36, 1] as const,
};
