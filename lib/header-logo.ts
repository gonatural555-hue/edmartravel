/**
 * Header global: logo blanco sobre heroes oscuros (categorías wine/adventure/city y PDP).
 */
export function usesLightHeaderLogo(pathname: string): boolean {
  if (/\/category(\/|$)/.test(pathname)) return true;
  return /\/products\/[^/?#]+/.test(pathname);
}
