"use client";

import { useEffect, useState } from "react";

/** Activo solo con `?director=true` en la URL. */
export function useDirectorMode(): boolean {
  const [isDirector, setIsDirector] = useState(false);

  useEffect(() => {
    const read = () => {
      const params = new URLSearchParams(window.location.search);
      setIsDirector(params.get("director") === "true");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return isDirector;
}
