import { EXPERIENCE_WORLDS } from "./experienceHeroConfig";
import {
  HERO_CAROUSEL_STAGE,
  HERO_CAROUSEL_WRAP,
  HERO_HEADER_UTILITIES,
  HERO_LOGO_LAYOUT,
  HERO_PANEL_COPY,
  HERO_PANEL_SIZE,
  HERO_SLOT_LAYOUT,
} from "./heroLayoutProduction";
import {
  DEFAULT_PANEL_EDITORIAL_LAYOUT,
  slotDebugToLayout,
  type ExperienceHeroDebugState,
  type PanelCopyDebugValues,
} from "./director/experienceHeroDebugConfig";
import type { ExperienceWorldId } from "./types";

export function buildDefaultPanelCopy(): Record<
  ExperienceWorldId,
  PanelCopyDebugValues
> {
  if (HERO_PANEL_COPY) {
    return {
      wine: {
        ...HERO_PANEL_COPY.wine,
        titleLines: [...HERO_PANEL_COPY.wine.titleLines],
        layout: { ...HERO_PANEL_COPY.wine.layout },
      },
      adventure: {
        ...HERO_PANEL_COPY.adventure,
        titleLines: [...HERO_PANEL_COPY.adventure.titleLines],
        layout: { ...HERO_PANEL_COPY.adventure.layout },
      },
      city: {
        ...HERO_PANEL_COPY.city,
        titleLines: [...HERO_PANEL_COPY.city.titleLines],
        layout: { ...HERO_PANEL_COPY.city.layout },
      },
    };
  }

  return EXPERIENCE_WORLDS.reduce(
    (acc, w) => {
      acc[w.id] = {
        titleLines: [...w.titleLines],
        subtitle: w.subtitle,
        ctaLabel: w.ctaLabel,
        layout: { ...DEFAULT_PANEL_EDITORIAL_LAYOUT },
      };
      return acc;
    },
    {} as Record<ExperienceWorldId, PanelCopyDebugValues>
  );
}

export const EXPERIENCE_HERO_DEBUG_DEFAULTS: ExperienceHeroDebugState = {
  logo: HERO_LOGO_LAYOUT,
  headerUtilities: HERO_HEADER_UTILITIES,
  carouselWrap: HERO_CAROUSEL_WRAP,
  carouselStage: HERO_CAROUSEL_STAGE,
  panelSize: HERO_PANEL_SIZE,
  slots: HERO_SLOT_LAYOUT,
  panelCopy: buildDefaultPanelCopy(),
  showOutlines: true,
};

export { slotDebugToLayout };
export type {
  CarouselStageDebugValues,
  CarouselWrapDebugValues,
  ExperienceHeroDebugState,
  LogoDebugValues,
  PanelSizeDebugValues,
  SlotDebugValues,
  PanelCopyDebugValues,
  PanelEditorialLayoutDebugValues,
} from "./director/experienceHeroDebugConfig";
export {
  DEBUG_PANEL_COPY_LABELS,
  DEBUG_SECTION_LABELS,
} from "./director/experienceHeroDebugConfig";
