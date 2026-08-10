/**
 * Logo blanco en el header global solo en PDP de experiencias (hero oscuro).
 * Resto de rutas (home, categorías, nosotros, contacto, etc.) usan logo estándar.
 */
export function usesLightHeaderLogo(pathname: string): boolean {
  return /\/products\/[^/?#]+/.test(pathname);
}
