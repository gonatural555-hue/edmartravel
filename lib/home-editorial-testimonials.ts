export type EditorialTestimonial = {
  quoteLines: string[];
  body: string;
  author: string;
  location: string;
  experience: string;
};

export const EDITORIAL_TESTIMONIAL_VIDEO =
  "/assets/videos/experiences/cabalgata-potrerillos-card.mp4";

export const EDITORIAL_TESTIMONIALS: EditorialTestimonial[] = [
  {
    quoteLines: ["The best way", "to discover Mendoza."],
    body:
      "The wineries were extraordinary. The horseback experience exceeded every expectation. Everything felt authentic and beautifully organized.",
    author: "Sarah Mitchell",
    location: "London, United Kingdom",
    experience: "Wine Tour + Horseback Experience",
  },
  {
    quoteLines: ["Mendoza", "stays with you."],
    body:
      "From the Andes at sunrise to an evening among the vines, each moment felt intentional. Edmar made it effortless and deeply personal.",
    author: "James Whitfield",
    location: "Sydney, Australia",
    experience: "High Mountain + Wine Tours",
  },
  {
    quoteLines: ["Authentic.", "Unforgettable.", "Refined."],
    body:
      "The city tour on scooters was a surprise highlight. Warm guides, stunning landscapes, and a pace that let us truly absorb Mendoza.",
    author: "Elena Marchetti",
    location: "Milan, Italy",
    experience: "City Tour + Wine Experience",
  },
];

export const EDITORIAL_ROTATION_MS = 9000;
