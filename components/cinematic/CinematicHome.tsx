"use client";

import ExperienceSelectorHome from "@/components/experience-hero/ExperienceSelectorHome";
import HideSiteChrome from "@/components/experience-hero/HideSiteChrome";
import CinematicMarqueeSection from "@/components/home/CinematicMarqueeSection";
import { HomeExperienceProvider } from "@/components/home/HomeExperienceContext";
import ExperienceCollageSection from "@/components/home/ExperienceCollageSection";
import SmoothScrollProvider from "@/components/home/SmoothScrollProvider";

/** Home inmersiva — fondo editorial #F8F5EE + scroll cinematográfico. */
export default function CinematicHome() {
  return (
    <SmoothScrollProvider>
      <HideSiteChrome />
      <HomeExperienceProvider>
        <main className="category-page home-page relative min-h-screen overflow-x-hidden">
          <div className="relative z-10">
            <section
              className="relative -mb-10 min-h-[100dvh] w-full md:-mb-16"
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
