import type { ExperienceRichContent } from "@/lib/experience-model";
import { RICH_IT_A } from "@/lib/experience-rich/locale-it-a";
import { RICH_IT_B } from "@/lib/experience-rich/locale-it-b";

export const RICH_IT: Record<string, ExperienceRichContent> = {
  ...RICH_IT_A,
  ...RICH_IT_B,
};
