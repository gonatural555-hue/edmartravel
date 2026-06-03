import {
  HERO_CAROUSEL_STAGE,
  HERO_CAROUSEL_WRAP,
  HERO_LOGO_LAYOUT,
  HERO_PANEL_SIZE,
  HERO_SLOT_LAYOUT,
} from "./heroLayoutProduction";
import {
  slotDebugToLayout,
  type ExperienceHeroDebugState,
} from "./director/experienceHeroDebugConfig";

export const EXPERIENCE_HERO_DEBUG_DEFAULTS: ExperienceHeroDebugState = {
  logo: HERO_LOGO_LAYOUT,
  carouselWrap: HERO_CAROUSEL_WRAP,
  carouselStage: HERO_CAROUSEL_STAGE,
  panelSize: HERO_PANEL_SIZE,
  slots: HERO_SLOT_LAYOUT,
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
} from "./director/experienceHeroDebugConfig";
export { DEBUG_SECTION_LABELS } from "./director/experienceHeroDebugConfig";
