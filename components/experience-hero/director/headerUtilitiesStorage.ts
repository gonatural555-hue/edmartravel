import {
  HEADER_UTILITY_IDS,
  type HeaderUtilitiesDebugValues,
} from "./experienceHeroDebugConfig";

function mergeHeaderUtilities(
  stored: Partial<HeaderUtilitiesDebugValues>,
  fallback: HeaderUtilitiesDebugValues
): HeaderUtilitiesDebugValues {
  return HEADER_UTILITY_IDS.reduce(
    (acc, id) => ({
      ...acc,
      [id]: { ...fallback[id], ...stored[id] },
    }),
    {} as HeaderUtilitiesDebugValues
  );
}

export const HEADER_UTILITIES_HOME_KEY = "experience-header-utilities-home";
export const HEADER_UTILITIES_DEBUG_KEY = "experience-hero-debug-layout";

export function readHeaderUtilitiesForHome(
  fallback: HeaderUtilitiesDebugValues
): HeaderUtilitiesDebugValues {
  if (typeof window === "undefined") return fallback;

  try {
    const applied = localStorage.getItem(HEADER_UTILITIES_HOME_KEY);
    if (applied) {
      return mergeHeaderUtilities(
        JSON.parse(applied) as Partial<HeaderUtilitiesDebugValues>,
        fallback
      );
    }

    const debug = localStorage.getItem(HEADER_UTILITIES_DEBUG_KEY);
    if (debug) {
      const parsed = JSON.parse(debug) as {
        headerUtilities?: Partial<HeaderUtilitiesDebugValues>;
      };
      if (parsed.headerUtilities) {
        return mergeHeaderUtilities(parsed.headerUtilities, fallback);
      }
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
