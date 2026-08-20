"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import LazyAuthModal from "@/components/lazy/LazyAuthModal";
import { useAuth } from "@/context/AuthContext";
import ImmersiveHomeHeader from "@/components/home/ImmersiveHomeHeader";
import { isAuthUiEnabled } from "@/lib/feature-flags";
import LazyExperienceHeroDebugPanel from "@/components/lazy/LazyExperienceHeroDebugPanel";
import { useExperienceDirectorMode } from "@/components/experience-hero/director/useExperienceDirectorMode";
import { isHomePath } from "@/lib/is-home-path";

export default function Header() {
  const pathname = usePathname();
  const isDirector = useExperienceDirectorMode();
  const { authOpen, setAuthOpen, initialTab } = useAuth();
  const variant = isHomePath(pathname) ? "immersive" : "default";
  const authUiEnabled = isAuthUiEnabled();

  return (
    <>
      <Suspense fallback={null}>
        <ImmersiveHomeHeader variant={variant} />
      </Suspense>
      {isDirector ? <LazyExperienceHeroDebugPanel /> : null}
      {authUiEnabled ? (
        <LazyAuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          initialTab={initialTab}
        />
      ) : null}
    </>
  );
}
