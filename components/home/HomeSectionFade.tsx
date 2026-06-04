type HomeSectionFadeProps = {
  edge: "top" | "bottom";
};

/** Viñeta ligera entre secciones — continuidad sin cortes de fondo. */
export default function HomeSectionFade({ edge }: HomeSectionFadeProps) {
  const gradient =
    edge === "top"
      ? "bg-gradient-to-b from-black/14 to-transparent"
      : "bg-gradient-to-t from-black/10 to-transparent";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[2] h-[min(10vh,96px)] ${edge === "top" ? "top-0" : "bottom-0"} ${gradient}`}
      aria-hidden
    />
  );
}
