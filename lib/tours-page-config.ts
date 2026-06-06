import type { ExperienceCategory } from "@/lib/product-types";

export type ToursWorldId = ExperienceCategory;

/** Imágenes premium de campaña — mismas que el hero inmersivo de Home. */
export const TOURS_WORLD_IMAGES: Record<ToursWorldId, string> = {
  wine: "/assets/scenes/wine-tours/backgrounds/background-vino.png",
  adventure: "/assets/scenes/adventure-mendoza/backgrounds/hero-aventura.png",
  city: "/assets/scenes/discover-mendoza/backgrounds/background-mendoza.png",
};

export const TOURS_WORLD_IMAGE_POSITION: Record<ToursWorldId, string> = {
  wine: "55% 45%",
  adventure: "52% 40%",
  city: "52% 42%",
};

export const TOURS_PANEL_TRANSITION_MS = 1100;
export const TOURS_NAV_TRANSITION_MS = 420;

export const TOURS_PANEL_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function getToursPanelWidths(
  hovered: ToursWorldId | null,
  panelId: ToursWorldId
): number {
  if (!hovered) return 100 / 3;
  if (panelId === hovered) return 55;
  return 22.5;
}
