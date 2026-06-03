"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Activo con `?director=true` (ej. http://localhost:3000/es?director=true) */
export function useExperienceDirectorMode(): boolean {
  const pathname = usePathname();
  const [isDirector, setIsDirector] = useState(false);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      setIsDirector(params.get("director") === "true");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, [pathname]);

  return isDirector;
}
