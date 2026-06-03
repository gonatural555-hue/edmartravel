const OUTLINE_RING: Record<string, string> = {
  logo: "ring-2 ring-amber-400/90 ring-offset-2 ring-offset-[#0c1411]",
  carouselWrap: "ring-2 ring-cyan-400/90 ring-offset-2 ring-offset-[#0a120f]",
  carouselStage: "ring-2 ring-sky-400/90 ring-offset-2 ring-offset-[#0a120f]",
  carouselPerspective: "ring-2 ring-blue-400/70 ring-offset-1 ring-offset-transparent",
  worldPanel: "ring-2 ring-fuchsia-400/85 ring-offset-2 ring-offset-transparent",
};

export function directorOutline(
  layerId: keyof typeof OUTLINE_RING | "worldPanel",
  enabled: boolean
): string {
  if (!enabled) return "";
  return OUTLINE_RING[layerId] ?? OUTLINE_RING.worldPanel;
}
