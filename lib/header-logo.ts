import { locales, type Locale } from "@/lib/i18n/config";
import { SITE_CONFIG } from "@/lib/config";

/** Quita prefijo /es | /en del pathname. */
export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return `/${segments.slice(1).join("/")}`;
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/** PDP de experiencia: /products/{id} */
export function isExperienceProductPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);
  const segments = path.split("/").filter(Boolean);
  return segments[0] === "products" && segments.length >= 2;
}

/** Hub de categoría: /category/{slug} */
export function isExperienceCategoryPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);
  const segments = path.split("/").filter(Boolean);
  return segments[0] === "category" && segments.length >= 2;
}

export function usesLightHeaderLogo(pathname: string): boolean {
  return isExperienceProductPath(pathname) || isExperienceCategoryPath(pathname);
}

export function resolveHeaderLogoSrc(pathname: string, forceLight = false): string {
  return forceLight || usesLightHeaderLogo(pathname)
    ? SITE_CONFIG.logoLight
    : SITE_CONFIG.logo;
}

/** Flag global para forzar logo claro cuando el PDP/categoría monta (header es hermano del page tree). */
let experienceLightLogoActive = false;
const experienceLightLogoListeners = new Set<() => void>();

export function setExperienceLightHeaderLogo(active: boolean): void {
  if (experienceLightLogoActive === active) return;
  experienceLightLogoActive = active;
  experienceLightLogoListeners.forEach((listener) => listener());
}

export function subscribeExperienceLightHeaderLogo(listener: () => void): () => void {
  experienceLightLogoListeners.add(listener);
  return () => {
    experienceLightLogoListeners.delete(listener);
  };
}

export function getExperienceLightHeaderLogoSnapshot(): boolean {
  return experienceLightLogoActive;
}
