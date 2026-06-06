"use client";

import ToursWorldSelector from "./ToursWorldSelector";
import HideToursPageChrome from "./HideToursPageChrome";
import type { ToursWorldPanelData } from "./ToursWorldPanel";

type ToursPageViewProps = {
  worlds: ToursWorldPanelData[];
};

export default function ToursPageView({ worlds }: ToursPageViewProps) {
  return (
    <main className="tours-page relative isolate min-h-[100dvh] overflow-x-hidden bg-[var(--premium-base)] lg:h-[100dvh] lg:overflow-hidden">
      <HideToursPageChrome />
      <ToursWorldSelector worlds={worlds} />
    </main>
  );
}
