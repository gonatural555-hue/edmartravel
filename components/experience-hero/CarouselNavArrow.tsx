"use client";

type CarouselNavArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
};

export default function CarouselNavArrow({
  direction,
  onClick,
  className = "",
}: CarouselNavArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`premium-hover absolute top-1/2 z-40 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-black/50 text-white/75 backdrop-blur-md transition-[border-color,box-shadow,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent-gold/45 hover:text-[#F5F0E6] hover:shadow-[0_0_28px_rgba(200,155,60,0.2),0_0_16px_rgba(255,255,255,0.08)] lg:flex ${className}`}
      aria-label={direction === "prev" ? "Experiencia anterior" : "Siguiente experiencia"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        className="h-4 w-4"
        aria-hidden
      >
        {direction === "prev" ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}
