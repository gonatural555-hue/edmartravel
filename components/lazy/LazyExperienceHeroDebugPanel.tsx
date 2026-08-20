"use client";

import dynamic from "next/dynamic";

const ExperienceHeroDebugPanel = dynamic(
  () => import("@/components/experience-hero/director/ExperienceHeroDebugPanel"),
  { ssr: false, loading: () => null }
);

export default ExperienceHeroDebugPanel;
