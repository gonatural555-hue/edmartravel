"use client";

import Image from "next/image";
import { CITY_PEEK_ASSETS } from "../experienceHeroConfig";
import CinematicCoverScene from "./CinematicCoverScene";
import type { CinematicCoverSceneProps } from "./CinematicCoverScene";

type CityWorldSceneProps = Omit<
  CinematicCoverSceneProps,
  "imageSrc" | "imageAlt" | "imagePosition"
> & {
  heroImage: string;
  heroImageAlt: string;
};

function CityPeekPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#2a221c]">
      <Image
        src={CITY_PEEK_ASSETS.gate}
        alt="Plaza San Martín"
        fill
        className="object-cover object-center brightness-[0.9]"
        sizes="280px"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-y-[18%] right-[-8%] w-[58%] relative">
        <Image
          src={CITY_PEEK_ASSETS.scooter}
          alt="Scooter city tour"
          fill
          className="object-contain object-bottom drop-shadow-lg"
          sizes="160px"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function CityWorldScene({
  heroImage,
  heroImageAlt,
  compact = false,
  ...coverProps
}: CityWorldSceneProps) {
  if (compact) {
    return <CityPeekPreview />;
  }

  return (
    <CinematicCoverScene
      imageSrc={heroImage}
      imageAlt={heroImageAlt}
      imagePosition="48% 38%"
      {...coverProps}
    />
  );
}
