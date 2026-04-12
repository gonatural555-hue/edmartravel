/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic Dark Outdoor - Paleta base
        "dark-base": "#0c1411",
        "dark-surface": "#151f1c",
        "text-primary": "#E6ECE9",
        "text-muted": "#9BA6A1",
        "accent-gold": "#C89B3C",
        "accent-moss": "#3A5F4A",
        "mist-white": "#F8F6F2",
        "wine-burgundy": "#5A2E2E",

        // Aliases semánticos para uso común
        background: {
          DEFAULT: "#0c1411",
          surface: "#151f1c",
          primary: "#122220",
        },
        text: {
          primary: "#E6ECE9",
          muted: "#9BA6A1",
        },
        accent: {
          DEFAULT: "#C89B3C",
          moss: "#3A5F4A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
  