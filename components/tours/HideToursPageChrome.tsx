"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n/config";

/** /products — selector inmersivo a pantalla completa, sin header ni footer. */
export default function HideToursPageChrome() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const isToursPage = locales.some((l) => pathname === `/${l}/products`);
    if (!isToursPage) return;

    document.documentElement.classList.add("tours-page-takeover");

    return () => {
      document.documentElement.classList.remove("tours-page-takeover");
    };
  }, [pathname]);

  return null;
}
