import type { Locale } from "@/lib/i18n/config";
import type { ProductVariants } from "@/lib/product-types";

export type ProductLocaleFields = {
  duration?: string;
  location?: string;
  schedule?: string[];
  variants?: ProductVariants | ProductVariants[];
};

/** Campos operativos del catálogo traducidos (duración, ubicación, itinerario, variantes). */
export const PRODUCT_LOCALE_FIELDS: Partial<
  Record<Locale, Record<string, ProductLocaleFields>>
> = {
  es: {
    "cabalgata-picada-potrerillos": {
      duration:
        "Salida de ≈4,5 h (~1 h a caballo; incluye traslado y picada)",
      location:
        "Potrerillos, Mendoza — Establos Los Camperitos · picada junto al Dique de Potrerillos",
      schedule: [
        "08:30 (mañana) o 16:00 (tarde) — Retiro en Mendoza centro (hotel o punto acordado)",
        "Llegada a Los Camperitos — saludo al caballo, orientación breve y ajuste de montura si hace falta",
        "≈1 h de cabalgata guiada — senderos de montaña y vistas abiertas sobre Potrerillos",
        "Picada junto al dique — picada regional y copa de vino frente al agua",
        "≈13:00 (mañana) o ≈20:30 (tarde) — Regreso a Mendoza",
      ],
      variants: {
        type: "shift",
        label: "Turno",
        default: "morning",
        options: [
          { label: "Mañana · 8:30–13:00", value: "morning" },
          { label: "Tarde · 16:00–20:30", value: "afternoon" },
        ],
      },
    },
    "mono-city-tour-mendoza": {
      duration:
        "≈1,5 h por turno (desde la entrega hasta la devolución; ritmo libre en el circuito sugerido)",
      location:
        "Mendoza centro y Parque General San Martín (circuito recomendado)",
      schedule: [
        "Check-in y briefing de seguridad — entrega del monopatín, casco y mapa del circuito",
        "Tramo urbano — conectá las cinco plazas principales y la trama de la ciudad a tu ritmo",
        "Parque General San Martín — circuito del lago, árboles y vistas abiertas antes de volver",
        "Devolución dentro de tu turno reservado (11:00–12:30 o 17:00–18:30)",
      ],
      variants: [
        {
          type: "scooter",
          label: "Monopatín",
          default: "small",
          options: [
            { label: "Chico · AR$ 20.000", value: "small", priceModifier: 0 },
            { label: "Grande · AR$ 25.000", value: "large", priceModifier: 5_000 },
          ],
        },
        {
          type: "session",
          label: "Turno",
          default: "morning",
          options: [
            { label: "11:00–12:30", value: "morning", priceModifier: 0 },
            { label: "17:00–18:30", value: "afternoon", priceModifier: 0 },
          ],
        },
      ],
    },
    "private-winery-transfers-mendoza": {
      duration:
        "Flexible — típicamente media jornada o día completo, según tus reservas en bodegas (confirmar ventana al reservar)",
      location:
        "Región vitivinícola de Mendoza: Maipú, Luján de Cuyo o Valle de Uco (según tarifa elegida)",
      schedule: [
        "Reservá tu región (Maipú / Luján de Cuyo o Valle de Uco) y compartí horarios de bodegas o almuerzo",
        "Retiro en tu hotel o punto acordado en Mendoza — conocé al conductor y confirmá el orden del día",
        "Traslados privados entre direcciones en la región elegida — tiempos de espera según lo acordado",
        "Regreso a Mendoza cuando termine tu última reserva — sin apuro, cerrando el día a tu medida",
      ],
      variants: {
        type: "region",
        label: "Región vitivinícola",
        default: "maipu_lujan",
        options: [
          {
            label: "Maipú / Luján de Cuyo · AR$ 100.000",
            value: "maipu_lujan",
            priceModifier: 0,
          },
          {
            label: "Valle de Uco · AR$ 140.000",
            value: "valle_uco",
            priceModifier: 40_000,
          },
        ],
      },
    },
    "luxury-wine-experience-bodega-boutique": {
      duration: "Media jornada (~4 h) · 9:00–13:00 incluyendo traslados",
      location:
        "Bodega boutique premium — región vitivinícola de Mendoza (bodega confirmada al reservar)",
      schedule: [
        "09:00 — Retiro desde Mendoza centro (hotel o punto acordado)",
        "Llegada y bienvenida — presentación de la bodega boutique y su filosofía",
        "Recorrido por la finca — viñedos, bodega o highlights productivos (según apertura del lugar)",
        "Degustación guiada — vuelo curado de vinos con comentario del anfitrión",
        "Tabla de quesos y fiambres — servida como parte de la experiencia",
        "≈13:00 — Traslado de regreso a Mendoza",
      ],
    },
    "andes-experience-horseback-sunset-picnic": {
      duration:
        "Día completo · aprox. 7:15–19:30 (~12 h puerta a puerta; horarios pueden variar)",
      location:
        "Corredor de Alta Montaña (Uspallata, Puente del Inca, Aconcagua, Las Cuevas, etc.) + Potrerillos (cabalgata y picnic)",
      schedule: [
        "Desde las 7:15 — Retiros en hoteles del centro de Mendoza (hora exacta confirmada al reservar)",
        "Ruta de alta montaña — Cacheuta · Potrerillos (tránsito) · Uspallata (tiempo libre) · Penitentes · Puente del Inca (mercado artesanal) · Parque Provincial Aconcagua · Las Cuevas (~1 h para almuerzo por cuenta propia)",
        "Posibilidad estacional — Cristo Redentor solo en verano, sujeto a estado de la ruta, clima y autorización (no garantizado)",
        "Tarde / hora dorada — Potrerillos: cabalgata guiada (todos los niveles; solo al paso)",
        "Cierre al atardecer — picnic regional y copa de vino frente al Dique de Potrerillos",
        "≈19:00–19:30 — Regreso a Mendoza (tráfico y paradas pueden modificar el horario)",
      ],
    },
    "high-mountain-tour-mendoza": {
      duration:
        "Día completo · retiros desde ≈7:15 · regreso ≈19:00 (horarios exactos variables; recorrido de retiros ≈45 min)",
      location:
        "Mendoza ciudad → corredor andino (Cacheuta a Las Cuevas; Cristo Redentor estacional)",
      schedule: [
        "≈7:15 — Comienzan retiros en hoteles de Mendoza (el barrido por la ciudad puede tomar ≈45 min)",
        "Cacheuta — paisaje termal y parada fotográfica (timing flexible)",
        "Potrerillos — dique y vistas de montaña",
        "Uspallata — tiempo libre para recorrer las calles principales",
        "Penitentes — breve parada en alta montaña",
        "Puente del Inca — puente natural y tiempo libre en el mercado artesanal",
        "Parque Provincial Aconcagua — miradores e interpretación del macizo (no es ascenso a cumbre)",
        "Las Cuevas — ≈1 h para almuerzo (no incluido; pago local)",
        "Posibilidad estacional — Cristo Redentor solo en verano, sujeto a rutas, clima y autorización (no garantizado)",
        "≈19:00 — Regreso a Mendoza (aproximado; puede variar según condiciones)",
      ],
    },
    "half-day-winery-tour-maipu": {
      duration:
        "Media tarde · retiro en hotel ≈14:00 · regreso ≈20:00 (~6 h incl. recorrido de retiros)",
      location: "Región vitivinícola de Maipú (Gran Mendoza)",
      schedule: [
        "≈14:00 — Comienzan retiros en hoteles de Mendoza (permitir ≈45 min para recoger en toda la ciudad)",
        "Parada 1 — Bodega artesanal: visita de producción chica y degustación guiada",
        "Parada 2 — Bodega industrial en Maipú: vinificación a escala y degustación",
        "Parada 3 — Fábrica de aceite de oliva: recorrido productivo y degustación de aceite",
        "Parada 4 — Bodega de vinos dulces: visita y degustación de estilos dulces / generosos",
        "≈20:00 — Regreso a Mendoza (horario aproximado; puede variar por tráfico)",
      ],
    },
    "canon-del-atuel-san-rafael-tour": {
      duration:
        "Día completo · retiro en hotel ≈7:00 · regreso ≈21:00 (~14 h incl. retiros y paradas)",
      location:
        "Sur de Mendoza — San Rafael, Cañón del Atuel, Valle Grande (vía Ruta 40)",
      schedule: [
        "≈7:00 — Comienzan retiros en hoteles de Mendoza (recorrido por la ciudad ≈45 min)",
        "Viaje hacia el sur — Ruta 40 rumbo a San Rafael (~3 h; paradas de confort según necesidad)",
        "San Rafael — orientación en la ciudad y recorrido del sector histórico",
        "Cañón del Atuel — paradas escénicas y miradores a lo largo del cañón",
        "Valle Grande — tiempo libre para catamarán, rafting o almuerzo opcionales (extras no incluidos; sujetos a temporada/clima)",
        "Si elegís actividades opcionales — posible parada previa para comprar comida (a cargo del pasajero)",
        "Viaje de regreso a Mendoza — llegada alrededor de las 21:00 (aproximado; sujeto a tráfico)",
      ],
    },
    "villavicencio-nature-reserve-tour": {
      duration:
        "Media jornada · retiro en hotel ≈8:00 · regreso ≈13:00 (~5 h incl. retiros en ciudad)",
      location:
        "Reserva Natural Villavicencio — pie de cordillera al este de Mendoza ciudad",
      schedule: [
        "≈8:00 — Comienzan retiros en hoteles de Mendoza (permitir ≈45 min para recoger en toda la ciudad)",
        "Traslado a la Reserva Natural Villavicencio — entrada comprada en el lugar (no incluida en el precio del tour)",
        "Circuito guiado — senderos de la reserva con guías oficiales; interpretación de especies y paisaje",
        "Centro de interpretación — exhibiciones y contexto de los ecosistemas de la reserva",
        "Sector histórico — recorrido por el hotel histórico y la capilla",
        "Caracoles — breve ascenso por la ruta de curvas al mirador",
        "≈13:00 — Regreso a Mendoza (aproximado; sujeto a tráfico)",
      ],
    },
    "city-tour-mendoza": {
      duration:
        "Media jornada · retiro en hotel ≈8:30 · regreso ≈13:00 (~4,5 h incluyendo traslados)",
      location:
        "Gran Mendoza — núcleo fundacional, centro, parque y Cerro de la Gloria",
      schedule: [
        "≈8:30 — Retiros en hoteles de Mendoza (horario confirmado al reservar)",
        "Área fundacional — orígenes de la traza urbana y primer Mendoza",
        "Ciudad nueva y plazas principales — corazón peatonal, hitos y Mendoza contemporánea",
        "Distrito cívico — arquitectura gubernamental e institucional",
        "Parque General San Martín — recorrido escénico por sectores clave del parque",
        "Cerro de la Gloria — mirador y monumento (tiempo para fotos)",
        "≈13:00 — Regreso a Mendoza (aproximado; el orden puede variar)",
      ],
    },
    "valle-de-uco-cordon-del-plata": {
      duration:
        "Día completo · salida ≈7:30 · regreso ≈17:00 (~9,5 h; horarios pueden variar)",
      location:
        "Valle de Uco — Cristo Rey, Manzano Histórico, corredor productivo, Bodega Atamisque (telón del Cordón del Plata)",
      schedule: [
        "≈7:30 — Salida desde Mendoza (punto de retiro confirmado al reservar)",
        "Cristo Rey — monumento y mirador panorámico (paradas fotográficas)",
        "Manzano Histórico — visita patrimonial y tiempo libre para explorar",
        "Almuerzo — restaurante local (no incluido; ≈AR$ 25.000 por persona aprox.)",
        "Corredor productivo del Valle de Uco — ruta escénica entre viñedos y campo uco",
        "Bodega Atamisque — parada programada; visita y degustación opcionales (no incluidas; ≈AR$ 25.000 pp aprox., pago en sitio si participás)",
        "≈17:00 — Regreso a Mendoza (aproximado; puede variar por tráfico)",
      ],
    },
    "epic-andes-adventure-trekking-hot-springs": {
      duration:
        "Día completo · salida ≈9:00 · regreso ≈19:00 (~10 h en el programa)",
      location: "Cacheuta — pie de cordillera al este del Gran Mendoza",
      schedule: [
        "≈9:00 — Encuentro con el vehículo / salida desde Mendoza (retiro confirmado al reservar)",
        "Traslado al inicio del sendero en Cacheuta — briefing de seguridad y revisión de equipo",
        "Trekking guiado — ≈5 km en terreno moderado a exigente con paradas en miradores",
        "Almuerzo — incluido en el programa (timing según la caminata)",
        "Termas — baño reparador en instalaciones termales",
        "Momentos fotográficos opcionales — fotos profesionales del día incluidas",
        "≈19:00 — Regreso a Mendoza (aproximado)",
      ],
    },
  },
};
