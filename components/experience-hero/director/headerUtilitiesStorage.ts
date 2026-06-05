import type { HeaderUtilitiesDebugValues } from "./experienceHeroDebugConfig";

export const HEADER_UTILITIES_HOME_KEY = "experience-header-utilities-home";
export const HEADER_UTILITIES_DEBUG_KEY = "experience-hero-debug-layout";

export function readHeaderUtilitiesForHome(
  fallback: HeaderUtilitiesDebugValues
): HeaderUtilitiesDebugValues {
  if (typeof window === "undefined") return fallback;

  try {
    const applied = localStorage.getItem(HEADER_UTILITIES_HOME_KEY);
    if (applied) {
      return JSON.parse(applied) as HeaderUtilitiesDebugValues;
    }

    const debug = localStorage.getItem(HEADER_UTILITIES_DEBUG_KEY);
    if (debug) {
      const parsed = JSON.parse(debug) as {
        headerUtilities?: HeaderUtilitiesDebugValues;
      };
      if (parsed.headerUtilities) return parsed.headerUtilities;
    }
  } catch {
    /* ignore */
  }

  return fallback;
}

export function persistHeaderUtilitiesForHome(
  utilities: HeaderUtilitiesDebugValues
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      HEADER_UTILITIES_HOME_KEY,
      JSON.stringify(utilities)
    );
    window.dispatchEvent(
      new CustomEvent("experience-header-utilities-applied", {
        detail: utilities,
      })
    );
  } catch {
    /* ignore */
  }
}
