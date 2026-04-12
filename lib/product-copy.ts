import type { Product } from "@/lib/products";

export type ProductCopyVariant = "eyewear" | "backpack" | "wearable" | "generic";

/** Normaliza para comparar sin depender de mayúsculas ni acentos. */
function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Infiere el tipo de copy a partir de categoría y características del producto.
 * No usa el título: escalable cuando los títulos cambian de idioma o naming.
 */
export function inferProductCopyVariant(product: {
  category: string;
  features?: string[];
}): ProductCopyVariant {
  const cat = normalizeText(product.category);
  const featuresJoined = normalizeText((product.features ?? []).join(" "));

  const catMatches = (pattern: RegExp) => pattern.test(cat);
  const featuresMatch = (pattern: RegExp) => pattern.test(featuresJoined);

  // Gafas / lentes / óptica deportiva
  if (
    catMatches(
      /\b(gafas|lentes|eyewear|glasses|sunglasses|optic|optics|goggles)\b/
    ) ||
    featuresMatch(
      /\b(uv400|uv\s*400|fotocrom|photochrom|polariz|polarized|lente|lenses)\b/
    )
  ) {
    return "eyewear";
  }

  // Mochilas / bolsos / dry bag
  if (
    catMatches(
      /\b(mochila|backpack|backpacks|bag|bags|bolso|dry\s*bag|pack)\b/
    ) ||
    featuresMatch(/\b(molle|45\s*l|45l)\b/)
  ) {
    return "backpack";
  }

  // Relojes / wearables
  if (
    catMatches(
      /\b(smartwatch|smartwatches|watch|wearable|wearables|fitness|reloj|electronics)\b/
    ) ||
    featuresMatch(
      /\b(gps|smartwatch|puls[oó]metro|heart\s*rate|card[ií]aco)\b/
    )
  ) {
    return "wearable";
  }

  return "generic";
}

export type ProductCopyResult = {
  useCase: string;
  whyBetter: string;
  idealFor: string[];
  benefits: string[];
};

/**
 * Copy de marketing para la ficha de producto, basado solo en categoría y features.
 */
export function getProductCopy(product: Pick<Product, "category" | "description" | "features">): ProductCopyResult {
  const variant = inferProductCopyVariant(product);

  let useCase = "";
  let whyBetter = "";
  let idealFor: string[] = [];
  let benefits: string[] = [];

  switch (variant) {
    case "eyewear":
      useCase =
        "Protegen tus ojos de rayos UV y cambios de luz durante actividades al aire libre. Las lentes fotocromáticas se adaptan automáticamente a la intensidad de la luz, sin necesidad de cambiar de gafas.";
      whyBetter =
        "A diferencia de gafas genéricas, estas se adaptan a las condiciones de luz cambiantes. No necesitás llevar múltiples pares ni cambiarlos constantemente durante tu actividad.";
      idealFor = ["Ciclismo", "Running", "Trekking", "Uso diario outdoor"];
      benefits = [
        "Protección UV400 completa contra rayos solares dañinos",
        "Adaptación automática a cambios de luz (fotocromáticas)",
        "Montura ligera que no pesa durante actividades prolongadas",
        "Almohadillas antideslizantes para mantenerlas en su lugar",
        "Resistente a impactos y caídas accidentales",
      ];
      break;
    case "backpack":
      useCase =
        "Diseñada para cargar tu equipamiento de forma segura y cómoda durante trekking, camping y aventuras de varios días. El material impermeable protege tu contenido incluso en condiciones adversas.";
      whyBetter =
        "A diferencia de mochilas genéricas, esta combina capacidad (45L) con resistencia real al agua. El sistema MOLLE permite personalizar y expandir según tus necesidades específicas.";
      idealFor = ["Trekking", "Camping", "Aventuras de varios días", "Outdoor profesional"];
      benefits = [
        "Capacidad de 45L suficiente para escapadas de 2-4 días",
        "Material impermeable que protege en lluvia y humedad",
        "Sistema MOLLE para agregar bolsillos y accesorios",
        "Resistente a desgarros y uso intenso",
        "Distribución de peso equilibrada para comodidad",
      ];
      break;
    case "wearable":
      useCase =
        "Rastrea tu actividad física, rutas y métricas de rendimiento durante entrenamientos y aventuras. El GPS integrado te permite navegar y registrar tus recorridos sin depender del celular.";
      whyBetter =
        "A diferencia de smartwatches genéricos, este está pensado para uso outdoor real. La batería de 7 días aguanta escapadas largas sin necesidad de cargar constantemente.";
      idealFor = ["Running", "Ciclismo", "Trekking", "Entrenamientos diarios"];
      benefits = [
        "GPS preciso para rastrear rutas y navegación",
        "Monitor cardíaco continuo durante actividades",
        "Batería de 7 días para escapadas sin preocupaciones",
        "Múltiples modos deportivos para diferentes actividades",
        "Resistente al agua para uso en condiciones adversas",
      ];
      break;
    default:
      useCase = product.description;
      whyBetter =
        "Diseñado para uso real en condiciones outdoor. Probado en situaciones reales, no solo en laboratorio.";
      idealFor = ["Actividades outdoor", "Uso diario", "Aventuras"];
      benefits = product.features ?? [];
  }

  return { useCase, whyBetter, idealFor, benefits };
}
