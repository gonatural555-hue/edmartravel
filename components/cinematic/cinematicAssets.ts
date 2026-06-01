/**
 * EDMAR TRAVEL — Constantes de rutas de assets cinematográficos.
 *
 * Estas rutas se referencian SIEMPRE desde el código, aunque los archivos
 * todavía no existan. Si una imagen falta, SceneLayer muestra un fallback
 * visual y la app no se rompe (ver SceneLayer.tsx).
 *
 * Sube los archivos finales a /public/assets/scenes/... con estos nombres.
 */

export const ASSETS_BASE = "/assets/scenes";

const wine = `${ASSETS_BASE}/wine-tours`;

/** Escena 01 — Wine Tours & Bodegas. */
export const WINE_ASSETS = {
  background: `${wine}/backgrounds/wine-background-01.png`,
  table: `${wine}/foreground/wine-table-foreground-01.png`,
  bottle: `${wine}/props/wine-bottle-edmar-01.png`,
  glass: `${wine}/props/wine-glass-red-01.png`,
  cheeseBoard: `${wine}/props/wine-cheese-board-01.png`,
  grapes: `${wine}/props/wine-grapes-01.png`,
  dishA: `${wine}/props/wine-dish-a-01.png`,
  dishB: `${wine}/props/wine-dish-b-01.png`,
  napkinKnife: `${wine}/props/wine-napkin-knife-01.png`,
  contactShadow: `${wine}/effects/wine-contact-shadow-01.png`,
  warmGlow: `${wine}/effects/wine-warm-glow-01.png`,
  particles: `${wine}/effects/wine-atmospheric-particles-01.png`,
} as const;

/** Imágenes cuadradas de las cards del Experience Navigator (Escena 01). */
export const WINE_CARD_IMAGES = {
  luxuryWine: `${wine}/ui/wine-card-luxury-01.jpg`,
  privateTransfers: `${wine}/ui/wine-card-private-transfers-01.jpg`,
  valleDeUco: `${wine}/ui/wine-card-valle-de-uco-01.jpg`,
  halfDay: `${wine}/ui/wine-card-half-day-01.jpg`,
} as const;

const adventure = `${ASSETS_BASE}/adventure-mendoza`;
const discover = `${ASSETS_BASE}/discover-mendoza`;

/**
 * Cards de Adventure / Discover (placeholders editables; las escenas 02/03
 * aún no están diseñadas, pero el navigator ya puede mostrarlas).
 */
export const ADVENTURE_CARD_IMAGES = {
  cabalgataPicada: `${adventure}/ui/adventure-card-cabalgata-picada-01.jpg`,
  andesExperience: `${adventure}/ui/adventure-card-andes-experience-01.jpg`,
  altaMontana: `${adventure}/ui/adventure-card-alta-montana-01.jpg`,
  trekkingCacheuta: `${adventure}/ui/adventure-card-trekking-cacheuta-01.jpg`,
} as const;

export const DISCOVER_CARD_IMAGES = {
  scooterCityTour: `${discover}/ui/discover-card-scooter-city-tour-01.jpg`,
  cityTour: `${discover}/ui/discover-card-city-tour-01.jpg`,
  villavicencio: `${discover}/ui/discover-card-villavicencio-01.jpg`,
} as const;
