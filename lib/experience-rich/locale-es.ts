import type { ExperienceRichContent } from "@/lib/experience-model";
import { RICH_ES_A } from "@/lib/experience-rich/locale-es-a";
import { RICH_ES_B } from "@/lib/experience-rich/locale-es-b";

export const RICH_ES: Record<string, ExperienceRichContent> = {
  ...RICH_ES_A,
  ...RICH_ES_B,
};
