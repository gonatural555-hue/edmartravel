import localFont from "next/font/local";

/** Theater — Adrian Jordanov (free commercial use). Solo peso Bold en el kit. */
export const theater = localFont({
  src: [
    {
      path: "../public/fonts/theater/Theater-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-theater",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});
