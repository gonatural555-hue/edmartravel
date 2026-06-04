"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";

/** Home inmersiva: header visible, sin footer; layout carrusel a pantalla completa. */
export default function HideSiteChrome() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const isHome = locales.some(
      (l) => pathname === `/${l}` || pathname === `/${l}/`
    );
    if (!isHome) return;

    document.documentElement.classList.add("experience-hero-takeover");

    return () => {
      document.documentElement.classList.remove("experience-hero-takeover");
    };
  }, [pathname]);

  return null;
}
