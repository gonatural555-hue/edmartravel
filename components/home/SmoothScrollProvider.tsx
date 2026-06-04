"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

const PREMIUM_EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.65,
        easing: PREMIUM_EASE,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
