"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { locales } from "@/lib/i18n/config";

/** Home inmersiva: oculta footer. En ?director=true muestra el Header global. */
export default function HideSiteChrome() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDirector = searchParams.get("director") === "true";

  useEffect(() => {
    const isHome = locales.some(
      (l) => pathname === `/${l}` || pathname === `/${l}/`
    );
    if (!isHome) return;

    document.documentElement.classList.add("experience-hero-takeover");
    if (isDirector) {
      document.documentElement.classList.add("experience-hero-director-mode");
    } else {
      document.documentElement.classList.remove("experience-hero-director-mode");
    }

    return () => {
      document.documentElement.classList.remove("experience-hero-takeover");
      document.documentElement.classList.remove("experience-hero-director-mode");
    };
  }, [pathname, isDirector]);

  return null;
}
