"use client";

import { useEffect, useState, type ReactNode } from "react";
import Header from "@/components/Header";
import LazyCartDrawer from "@/components/lazy/LazyCartDrawer";
import { useCart } from "@/context/CartContext";
import { ExperienceHeroDebugProvider } from "@/components/experience-hero/director/ExperienceHeroDebugContext";

/** Envuelve header + páginas con el contexto del director (calibración global). */
export default function LocaleShell({ children }: { children: ReactNode }) {
  const { isDrawerOpen } = useCart();
  const [mountCartDrawer, setMountCartDrawer] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      setMountCartDrawer(true);
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (mountCartDrawer) return;

    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => setMountCartDrawer(true), {
        timeout: 2000,
      });
      return () => cancelIdleCallback(id);
    }

    const timer = window.setTimeout(() => setMountCartDrawer(true), 800);
    return () => window.clearTimeout(timer);
  }, [mountCartDrawer]);

  return (
    <ExperienceHeroDebugProvider>
      <div className="relative">
        <Header />
        {children}
        {mountCartDrawer ? <LazyCartDrawer /> : null}
      </div>
    </ExperienceHeroDebugProvider>
  );
}
