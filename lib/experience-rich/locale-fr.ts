import type { ExperienceRichContent } from "@/lib/experience-model";
import { RICH_FR_A } from "@/lib/experience-rich/locale-fr-a";
import { RICH_FR_B } from "@/lib/experience-rich/locale-fr-b";

export const RICH_FR: Record<string, ExperienceRichContent> = {
  ...RICH_FR_A,
  ...RICH_FR_B,
};
