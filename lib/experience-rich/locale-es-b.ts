import type { ExperienceRichContent } from "@/lib/experience-model";

/** Contenido enriquecido PDP — español (productos 7–12). */
export const RICH_ES_B: Record<string, ExperienceRichContent> = {
  "half-day-winery-tour-maipu": {
    subtitle:
      "Media tarde en Maipú: cuatro paradas introductorias — bodega artesanal, industrial, aceite de oliva y vino dulce — con degustaciones incluidas.",
    badges: [
      "Media tarde",
      "4 visitas",
      "Degustaciones incluidas",
      "Clásico Maipú",
    ],
    whyLove: [
      "Un recorrido compacto para entender variedades de bodega en una sola salida.",
      "Incluye degustaciones según programa: vino, aceite y vino dulce.",
      "Retiros desde hoteles desde las 14:00; regreso alrededor de las 20:00.",
      "Ideal para quien llega tarde a Mendoza pero quiere “sabor” de la región.",
    ],
    editorial: [
      "Maipú es una puerta de entrada al vino mendocino: bodegas con historia industrial y otras más artesanales, más el contraste del aceite y el dulce que redondean la tarde.",
      "El ritmo es pedagógico: caminar, oler, probar. No es una mega degustación en una sola finca: es un mosaico para comparar estilos en pocas horas.",
      "Coordinamos retiros desde hoteles para que no pierdas tiempo en traslados sueltos; confirmá el punto exacto al reservar.",
    ],
    places: [
      "Bodega artesanal — Maipú",
      "Bodega industrial — Maipú",
      "Fábrica de aceite de oliva",
      "Bodega de vinos dulces",
    ],
    included: [
      "Transporte del circuito según programa",
      "Visitas y degustaciones incluidas en la tarifa anunciada",
      "Coordinación por Edmar Travel",
    ],
    excluded: [
      "Comidas completas fuera de lo incluido en cada parada",
      "Compras en bodegas",
      "Propinas (opcional)",
    ],
    practical: {
      whatToBring: [
        "Calzado cómodo para entrar a bodega y fábrica",
        "Agua y protector solar; la tarde puede ser cálida",
        "Medios de pago si pensás comprar en bodegas",
      ],
      restrictions:
        "Consumo responsable; menores según política de cada establecimiento.",
      weather:
        "Lluvia ligera no suele cancelar; tormenta fuerte puede ajustar el orden de visitas.",
      pickupDetails:
        "Retiros desde hoteles de Mendoza desde ~14:00; rondas ~45 min según ubicación.",
    },
    faq: [
      {
        question: "¿Incluye almuerzo?",
        answer:
          "No es un tour de comida completa: son visitas con degustaciones. Podés cenar al volver a la ciudad.",
      },
      {
        question: "¿Puedo comprar vino?",
        answer:
          "Sí, en bodegas que vendan al público; consultá envíos o límites de equipaje.",
      },
      {
        question: "¿Hay versión en inglés?",
        answer:
          "Depende de la fecha y el operador; pedilo al reservar.",
      },
    ],
    testimonials: [
      {
        name: "Priya y Sam",
        text: "Vino dulce y aceite en la misma tarde: Maipú cerró en una sola vuelta.",
        rating: 5,
      },
    ],
    language: "Español / inglés según guía (confirmar)",
    groupSize: "Grupo regular (confirmar)",
    season: "Todo el año (lun–sáb; sujeto a bodegas)",
    pickup: "Hoteles de Mendoza — desde ~14:00 (rondas ~45 min)",
    cancellation:
      "Según voucher; confirmá cambios con anticipación con Edmar Travel.",
  },

  "canon-del-atuel-san-rafael-tour": {
    subtitle:
      "Día completo al sur mendocino: San Rafael, el Cañón del Atuel y tiempo en Valle Grande — salidas jueves y domingos.",
    badges: [
      "Día completo",
      "Ruta 40 sur",
      "Cañón del Atuel",
      "Jue y dom",
    ],
    whyLove: [
      "Combinás ciudad, cañón y espacio abierto en una jornada intensa.",
      "Ideal si ya viste viñedos y querés el contraste del río y los paredones.",
      "Tiempo libre en Valle Grande para actividades opcionales (no incluidas).",
      "Salidas programadas: organizás el día sin improvisar el auto.",
    ],
    editorial: [
      "El sur de Mendoza se siente distinto: más horas de ruta, cielos amplios y el Atuel tallando la piedra. San Rafael aporta historia urbana; el cañón, drama geológico; Valle Grande, aire y opciones al aire libre.",
      "Es un día largo: conviene descansar bien y llevar abrigo liviano y agua. Las actividades opcionales en Valle Grande (catamarán, rafting, etc.) se contratan aparte según disponibilidad.",
      "Salimos jueves y domingos: reservá con margen en temporada alta.",
    ],
    places: [
      "San Rafael — ciudad e histórico",
      "Cañón del Atuel",
      "Valle Grande (actividades opcionales)",
    ],
    included: [
      "Transporte desde Mendoza en servicio programado",
      "Circuito según itinerario del día",
      "Coordinación por Edmar Travel",
    ],
    excluded: [
      "Almuerzo y bebidas",
      "Actividades opcionales en Valle Grande",
      "Entradas donde aplique",
    ],
    practical: {
      whatToBring: [
        "Desayuno abundante y snacks para el bus",
        "Agua, gorra, protector solar",
        "Dinero para comida y opcionales",
        "Capa cortaviento: el viento puede soplar en el cañón",
      ],
      restrictions:
        "Largas horas sentado; no recomendado para quien no tolera viajes de ~3 h seguidas sin pausa larga.",
      weather:
        "Calor en verano y frescor en sombra; lluvias ocasionales pueden cambiar el orden de visitas.",
      pickupDetails:
        "Salida ~7:00 desde hoteles de Mendoza; confirmá horario exacto al reservar.",
    },
    faq: [
      {
        question: "¿Cuánto dura el viaje desde Mendoza?",
        answer:
          "Aproximadamente 3 horas por tramo según tráfico y paradas; es un día completo de ida y vuelta.",
      },
      {
        question: "¿El rafting está incluido?",
        answer:
          "No. Las actividades en Valle Grande son opcionales y de pago directo según operador local.",
      },
      {
        question: "¿Hay guía durante todo el día?",
        answer:
          "Hay coordinación del servicio; en sitios específicos pueden aplicar guías locales aparte.",
      },
    ],
    testimonials: [
      {
        name: "Chris y Mira",
        text: "Vinimos por el vino; este día nos recordó que Mendoza también es montaña y río.",
        rating: 5,
      },
    ],
    language: "Español (confirmar si hay asistencia bilingüe)",
    groupSize: "Grupo regular",
    season: "Salidas jueves y domingos (según demanda y temporada)",
    pickup: "Hoteles de Mendoza — desde ~07:00 (rondas ~45 min)",
    cancellation:
      "Según voucher; por la distancia, conviene avisar cambios con tiempo a Edmar Travel.",
  },

  "villavicencio-nature-reserve-tour": {
    subtitle:
      "Media mañana en la Reserva Natural Villavicencio: senderos, centro de interpretación, hotel histórico y mirador de los caracoles.",
    badges: [
      "Media jornada",
      "Reserva natural",
      "Hotel histórico",
      "Mié y sáb",
    ],
    whyLove: [
      "Una Mendoza sin copas: naturaleza, historia y miradores.",
      "Hotel Villavicencio y capilla como escenario de época.",
      "Subida a los caracoles para una vista amplia del entorno.",
      "Salidas miércoles y sábados: fácil de combinar con otros planes.",
    ],
    editorial: [
      "Villavicencio es un respiro verde antes de la aridez plena: caminos, fauna silenciosa y el peso histórico del hotel que domina el paisaje.",
      "La visita combina interpretación, caminatas suaves y miradores. La entrada a la reserva suele abonarse aparte: consultá tarifa vigente al reservar.",
      "Vestite en capas: sol fuerte y viento en altura. Calzado cerrado obligatorio para senderos.",
    ],
    places: [
      "Senderos de la Reserva Natural Villavicencio",
      "Centro de interpretación",
      "Hotel histórico, capilla y mirador de los caracoles",
    ],
    included: [
      "Transporte desde Mendoza según programa",
      "Tour de media mañana con recorridos indicados",
      "Coordinación por Edmar Travel",
    ],
    excluded: [
      "Entrada a la reserva (costo aparte según tarifario vigente)",
      "Comidas y bebidas",
      "Gastos personales",
    ],
    practical: {
      whatToBring: [
        "Calzado de trekking cómodo",
        "Agua, protector solar, gorra",
        "Dinero para entrada a la reserva",
      ],
      restrictions:
        "Respetar senderos marcados y indicaciones del guardaparque.",
      weather:
        "Viento y sol intenso; lluvia ocasional en primavera/otoño.",
      pickupDetails:
        "Retiros desde hoteles ~8:00; confirmá punto al reservar.",
    },
    faq: [
      {
        question: "¿Cuánto cuesta la entrada?",
        answer:
          "La tarifa la fija la reserva y puede cambiar; consultá monto vigente al reservar.",
      },
      {
        question: "¿Es exigente físicamente?",
        answer:
          "Hay caminatas moderadas y subida a mirador; no es trekking alpino pero requiere buen estado general.",
      },
      {
        question: "¿Puedo ir con niños pequeños?",
        answer:
          "Sí, con paciencia y hidratación; consultá edad mínima en actividades específicas.",
      },
    ],
    testimonials: [
      {
        name: "Isabel T.",
        text: "Por fin una mañana mendocina que no era solo vino: viento, luz y esas paredes del hotel viejo.",
        rating: 5,
      },
    ],
    language: "Español (guía según programa)",
    groupSize: "Grupo regular",
    season: "Miércoles y sábados (según horarios de la reserva)",
    pickup: "Hoteles de Mendoza — desde ~08:00 (rondas ~45 min)",
    cancellation:
      "Según voucher; políticas de la reserva pueden afectar accesos — confirmá al reservar.",
  },

  "epic-andes-adventure-trekking-hot-springs": {
    subtitle:
      "Día aventura en Cacheuta: trekking guiado de 5 km con vistas a los Andes y Potrerillos, cierre en termas.",
    badges: [
      "Día completo",
      "Trekking + termas",
      "Moderado / desafiante",
      "Cacheuta",
    ],
    whyLove: [
      "Combinación de esfuerzo moderado–alto y relajación en aguas termales.",
      "Paisajes amplios de cordillera y valle en una misma jornada.",
      "Incluye traslado, almuerzo, fotos y seguro contra accidentes.",
      "Ideal para conocer gente y mover el cuerpo lejos de la rutina.",
    ],
    editorial: [
      "Salimos de la rutina para meternos de lleno en los Andes y Potrerillos: trekking guiado, fotos increíbles y un cierre reparador en termas.",
      "El día va de 9:00 a 19:00 aproximadamente, con almuerzo incluido y ritmo pensado para grupos que disfrutan caminar con vistas.",
      "Dificultad moderada a desafiante: consultá condición física al reservar.",
    ],
    places: [
      "Senderos y miradores de Cacheuta",
      "Panoramas hacia los Andes y Potrerillos",
      "Termas al cierre del día",
    ],
    included: [
      "Traslado ida y vuelta",
      "Trekking guiado (~5 km)",
      "Almuerzo",
      "Fotos de la experiencia",
      "Seguro contra accidentes",
    ],
    excluded: [
      "Bebidas extra fuera del almuerzo incluido",
      "Propinas (opcionales)",
    ],
    practical: {
      whatToBring: [
        "Calzado de trekking, mochila, agua y capas",
        "Traje de baño y toalla para termas",
        "Protector solar y gorra",
      ],
      restrictions:
        "Evaluación de condición física al reservar; terreno irregular.",
      weather:
        "Montaña y sol intenso; puede haber viento frío incluso en verano.",
      pickupDetails:
        "Salida ~9:00 desde Mendoza — confirmá al reservar.",
    },
    faq: [
      {
        question: "¿Qué nivel de trekking es?",
        answer:
          "Moderado a desafiante: ~5 km con desnivel y terreno irregular.",
      },
      {
        question: "¿Incluye comida?",
        answer: "Sí, almuerzo incluido en el programa.",
      },
      {
        question: "¿Incluye termas?",
        answer:
          "Sí, tiempo en termas al finalizar la caminata según operación del día.",
      },
    ],
    testimonials: [],
    language: "Español / inglés (confirmar al reservar)",
    groupSize: "Grupos regulares",
    season: "Salidas según calendario — confirmá disponibilidad",
    pickup: "Mendoza — salida ~09:00 (confirmar al reservar)",
    cancellation:
      "Según voucher; confirmá con Edmar Travel al reservar.",
  },
};
