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

  "city-tour-mendoza": {
    subtitle:
      "Media mañana urbana: ciudad fundacional, plazas, distrito cívico, Parque General San Martín y Cerro de la Gloria.",
    badges: [
      "Media jornada",
      "Ruta clásica",
      "Plazas y parque",
      "Mar · Jue · Sáb",
    ],
    whyLove: [
      "Entendés la trama de Mendoza en pocas horas: damero, historia y espacio verde.",
      "Subida al Cerro de la Gloria para una vista amplia de la ciudad.",
      "Salidas martes, jueves y sábados: fácil de insertar en la agenda.",
      "Buen primer día para ubicarte antes de bodegas o montaña.",
    ],
    editorial: [
      "Mendoza se explica por sus plazas y su parque: un diseño de ciudad que invita a circular y a entender por qué todo “está a diez cuadras”.",
      "El tour conecta el centro fundacional con el distrito cívico y culmina en el pulmón verde más grande, con tiempo para miradores y fotos.",
      "Es un recorrido accesible, con ritmo pausado y paradas para hidratarte: el sol local pega fuerte incluso en primavera.",
    ],
    places: [
      "Sector fundacional y plazas principales",
      "Distrito cívico",
      "Parque General San Martín",
      "Cerro de la Gloria",
    ],
    included: [
      "Transporte y recorrido según programa",
      "Guía / coordinación según operador",
    ],
    excluded: [
      "Comidas y bebidas",
      "Entradas a museos si hubiera parada opcional con costo",
    ],
    practical: {
      whatToBring: [
        "Calzado cómodo para caminar",
        "Gorra, protector solar y agua",
        "Cámara o celular cargado",
      ],
      restrictions:
        "Personas con movilidad reducida: consultá accesos en Cerro de la Gloria.",
      weather:
        "Lluvia ligera no suele cancelar; tormenta fuerte puede modificar paradas.",
      pickupDetails:
        "Retiros desde hoteles ~8:30; confirmá al reservar.",
    },
    faq: [
      {
        question: "¿Cuánto caminamos?",
        answer:
          "Hay tramos a pie en centro y parque; el ritmo es moderado con pausas.",
      },
      {
        question: "¿Incluye entradas?",
        answer:
          "El circuito clásico no suele requerir entradas; si se agrega museo, se informa costo aparte.",
      },
      {
        question: "¿Es apto para niños?",
        answer:
          "Sí, con hidratación y protector solar; el día puede ser cálido.",
      },
    ],
    testimonials: [
      {
        name: "Daniel K.",
        text: "Por fin entendimos la grilla: San Martín y la vista desde el cerro hicieron clic el resto del viaje.",
        rating: 5,
      },
    ],
    language: "Español / inglés según fecha (confirmar)",
    groupSize: "Grupo regular",
    season: "Todo el año (mar, jue, sáb)",
    pickup: "Hoteles de Mendoza — desde ~08:30 (confirmar)",
    cancellation:
      "Según voucher; avisá cambios con anticipación cuando sea posible.",
  },

  "valle-de-uco-cordon-del-plata": {
    subtitle:
      "Día escénico al Valle de Uco: mirador Cristo Rey, Manzano Histórico, corredor productivo y parada opcional en Bodega Atamisque.",
    badges: [
      "Día completo",
      "Valle de Uco",
      "Paisaje + vino opcional",
      "Viernes",
    ],
    whyLove: [
      "El Uco en panorámica: cordillera, viñedos y pueblos sin apuro de micro.",
      "Parada en Atamisque para degustación opcional (no incluida en la tarifa base).",
      "Ideal si querés paisaje primero y bodega después, no un tour solo de copas.",
      "Salidas viernes: planificá la semana con claridad.",
    ],
    editorial: [
      "El Valle de Uco se disfruta en curvas: miradores altos, historia del Manzano y la sensación de valle abierto hacia el Cordón del Plata.",
      "Este circuito equilibra conducción escénica con tiempo para fotos y una parada opcional en una bodega reconocida, pagando aparte la experiencia en copas si querés sumarla.",
      "El almuerzo no está incluido: hay opciones en ruta según el cronograma del día.",
    ],
    places: [
      "Mirador Cristo Rey",
      "Manzano Histórico",
      "Corredor productivo del Valle de Uco",
      "Bodega Atamisque (degustación opcional)",
    ],
    included: [
      "Transporte desde Mendoza según programa del viernes",
      "Recorrido escénico con paradas",
      "Coordinación por Edmar Travel",
    ],
    excluded: [
      "Almuerzo y bebidas",
      "Degustación y consumos en Atamisque u otras paradas opcionales",
    ],
    practical: {
      whatToBring: [
        "Capas y anteojos de sol; día largo en ruta",
        "Dinero para almuerzo y opcionales",
        "Agua y snacks",
      ],
      restrictions:
        "Largas horas en vehículo; informá mareos o condiciones médicas.",
      weather:
        "Viento y sol fuerte; lluvia ocasional puede cambiar visibilidad en miradores.",
      pickupDetails:
        "Salida ~7:30 desde Mendoza; confirmá punto al reservar.",
    },
    faq: [
      {
        question: "¿Puedo hacer solo el paisaje sin bodega?",
        answer:
          "Sí: la bodega es opcional. Avisá preferencias al coordinar.",
      },
      {
        question: "¿Cuánto demora el día?",
        answer:
          "Jornada completa con regreso por la tarde; horarios exactos según temporada.",
      },
      {
        question: "¿Hay otras salidas además del viernes?",
        answer:
          "Pueden abrirse fechas estacionales; consultá disponibilidad.",
      },
    ],
    testimonials: [
      {
        name: "Sophie y Marc",
        text: "Queríamos el Uco sin agenda cargada de catas: el viaje y la luz alcanzaron; Atamisque fue el broche extra.",
        rating: 5,
      },
    ],
    language: "Español / inglés según operador (confirmar)",
    groupSize: "Grupo regular",
    season: "Viernes + posibles salidas estacionales",
    pickup: "Mendoza — salida ~07:30 (confirmar)",
    cancellation:
      "Según voucher; tarifas opcionales en bodega pueden cambiar — confirmá al reservar.",
  },

  "epic-andes-adventure-trekking-hot-springs": {
    subtitle:
      "Día aventura en Cacheuta: trekking con vistas a los Andes y Potrerillos, cierre en termas — próximamente disponible.",
    badges: [
      "Próximamente",
      "Cupos limitados",
      "Trekking + termas",
      "Cacheuta",
    ],
    whyLove: [
      "Combinación de esfuerzo moderado–alto y relajación en aguas termales.",
      "Paisajes amplios de cordillera y valle en una misma jornada.",
      "Incluirá traslado, almuerzo y cobertura de accidentes según programa al lanzarse.",
      "Pensado para quien busca naturaleza activa cerca de Mendoza.",
    ],
    editorial: [
      "Esta experiencia está en preparación: trekking por senderos de Cacheuta con miradas hacia los Andes y el valle, terminando con tiempo en termas para recuperar piernas y mente.",
      "El día será completo, con horarios tempranos y retorno al atardecer. Los detalles finales (distancia exacta, dificultad y servicios incluidos) se publicarán al abrir reservas.",
      "Si querés avisos de lanzamiento, escribinos: habilitaremos cupos limitados para mantener grupos chicos y seguridad.",
    ],
    places: [
      "Senderos y miradores de Cacheuta",
      "Panoramas hacia los Andes y Potrerillos",
      "Complejo de termas (según programa final)",
    ],
    included: [
      "Por confirmar al lanzamiento: traslado, trekking guiado, termas según programa",
    ],
    excluded: [
      "Detalle de exclusiones al publicarse la ficha final",
    ],
    practical: {
      whatToBring: [
        "Calzado de trekking, mochila, agua y capas",
        "Traje de baño y toalla para termas (cuando aplique)",
        "Protector solar y gorra",
      ],
      restrictions:
        "Evaluación de condición física al reservar; no apto para quien no pueda caminar senderos irregulares.",
      weather:
        "Montaña y sol intenso; puede haber viento frío incluso en verano.",
      pickupDetails:
        "Horario tentativo ~9:00 desde Mendoza — se confirmará al abrir ventas.",
    },
    faq: [
      {
        question: "¿Cuándo habrá reservas?",
        answer:
          "Estamos cerrando operadores y protocolos. Anunciaremos fechas por WhatsApp y web.",
      },
      {
        question: "¿Qué nivel de trekking es?",
        answer:
          "Será moderado a exigente según tramo final; publicaremos desnivel y tiempo estimado.",
      },
      {
        question: "¿Incluye comida?",
        answer:
          "La propuesta apunta a incluir almuerzo según programa; confirmaremos al lanzar.",
      },
    ],
    testimonials: [],
    language: "Español / inglés (a confirmar)",
    groupSize: "Grupos chicos — cupos limitados",
    season: "Lanzamiento próximo — fechas por oleadas",
    pickup: "Mendoza — salida tentativa ~09:00 (confirmar al abrir reservas)",
    cancellation:
      "Según voucher; confirmá con Edmar Travel cuando se activen reservas.",
  },
};
