type HomeSectionFadeProps = {
  edge: "top" | "bottom";
};

/** Viñeta ligera entre secciones — continuidad sin cortes de fondo. */
export default function HomeSectionFade({ edge }: HomeSectionFadeProps) {
  const gradient =
    edge === "top"
      ? "bg-gradient-to-b from-[#1a1a1a]/6 to-transparent"
      : "bg-gradient-to-t from-[#1a1a1a]/5 to-transparent";

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[2] h-[min(10vh,96px)] ${edge === "top" ? "top-0" : "bottom-0"} ${gradient}`}
      aria-hidden
    />
  );
}
