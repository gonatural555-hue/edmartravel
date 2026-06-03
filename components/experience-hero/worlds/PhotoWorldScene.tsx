"use client";

import CinematicCoverScene, {
  type CinematicCoverSceneProps,
} from "./CinematicCoverScene";

/** Aventura Mendoza — portada fotográfica cinematográfica */
export default function PhotoWorldScene(props: CinematicCoverSceneProps) {
  return (
    <CinematicCoverScene
      imagePosition="52% 40%"
      {...props}
    />
  );
}
