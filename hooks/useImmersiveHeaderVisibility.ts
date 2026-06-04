"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_MS = 5000;

/**
 * Header flotante: visible con mouse, scroll o foco; se oculta tras inactividad.
 */
export function useImmersiveHeaderVisibility(enabled: boolean) {
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    if (!enabled) return;
    setVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setVisible(false), IDLE_MS);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    reveal();

    const onMove = () => reveal();
    const onScroll = () => reveal();
    const onKey = () => reveal();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [enabled, reveal]);

  return visible;
}
