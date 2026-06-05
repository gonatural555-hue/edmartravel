import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

/** Nav header — sans geométrica premium (referencia editorial INICIO / BLOG / …) */
export const headerNav = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-header-nav",
  display: "swap",
});

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
