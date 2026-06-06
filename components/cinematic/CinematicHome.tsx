"use client";

import ExperienceSelectorHome from "@/components/experience-hero/ExperienceSelectorHome";
import HideSiteChrome from "@/components/experience-hero/HideSiteChrome";
import {
  HERO_MOBILE_COLLAGE_GAP,
  HERO_MOBILE_MARQUEE_PULL_UP,
  HERO_MOBILE_NAV_BOTTOM_FROM_HERO_TOP,
} from "@/components/experience-hero/spatialSlotLayout";
import CinematicMarqueeSection from "@/components/home/CinematicMarqueeSection";
import { HomeExperienceProvider } from "@/components/home/HomeExperienceContext";
import ExperienceCollageSection from "@/components/home/ExperienceCollageSection";
import SmoothScrollProvider from "@/components/home/SmoothScrollProvider";
import type { CSSProperties } from "react";

const homeMobileLayoutVars = {
  "--hero-mobile-nav-bottom": HERO_MOBILE_NAV_BOTTOM_FROM_HERO_TOP,
  "--hero-mobile-marquee-pull": HERO_MOBILE_MARQUEE_PULL_UP,
  "--hero-mobile-collage-gap": HERO_MOBILE_COLLAGE_GAP,
} as CSSProperties;

/** Home inmersiva — fondo editorial #F8F5EE + scroll cinematográfico. */
export default function CinematicHome() {
  return (
    <SmoothScrollProvider>
      <HideSiteChrome />
      <HomeExperienceProvider>
        <main
          className="category-page home-page relative min-h-screen overflow-x-hidden"
          style={homeMobileLayoutVars}
        >
          <div className="relative z-10">
            <section
              className="relative -mb-10 min-h-[100dvh] w-full max-lg:mb-0"
              aria-label="Selector de experiencias"
            >
              <ExperienceSelectorHome />
            </section>

            <CinematicMarqueeSection />

            <ExperienceCollageSection />
          </div>
        </main>
      </HomeExperienceProvider>
    </SmoothScrollProvider>
  );
}
