/**
 * Contenido editorial y operativo para páginas de experiencia (PDP turismo).
 * Se fusiona con datos del catálogo (`TourismExperience`) por `product.id`.
 */
export type ExperienceFaqItem = {
  question: string;
  answer: string;
};

export type ExperienceTestimonial = {
  name: string;
  text: string;
  rating: number;
};

export type ExperiencePractical = {
  whatToBring: string[];
  restrictions?: string;
  weather?: string;
  pickupDetails?: string;
};

export type ExperienceRichContent = {
  subtitle: string;
  badges: string[];
  /** Puntos “por qué te va a encantar” */
  whyLove: string[];
  /** Párrafos editoriales largos */
  editorial: string[];
  /** Lugares o momentos destacados */
  places: string[];
  included: string[];
  excluded: string[];
  practical: ExperiencePractical;
  faq: ExperienceFaqItem[];
  testimonials?: ExperienceTestimonial[];
  /** Complementan quick facts si faltan en catálogo */
  language?: string;
  groupSize?: string;
  season?: string;
  pickup?: string;
  cancellation?: string;
};
