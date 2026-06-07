"use client";

import type { ReactNode } from "react";
import Header from "@/components/Header";
import CartDrawer from "@/components/cart/CartDrawer";
import { ExperienceHeroDebugProvider } from "@/components/experience-hero/director/ExperienceHeroDebugContext";

/** Envuelve header + páginas con el contexto del director (calibración global). */
export default function LocaleShell({ children }: { children: ReactNode }) {
  return (
    <ExperienceHeroDebugProvider>
      <div className="relative">
        <Header />
        {children}
        <CartDrawer />
      </div>
    </ExperienceHeroDebugProvider>
  );
}
