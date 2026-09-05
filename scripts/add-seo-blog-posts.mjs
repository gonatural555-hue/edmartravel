/**
 * Inserta los 10 artículos SEO del PDF en messages/es.json y messages/en.json.
 * Sin imágenes (sin heroImage ni section.image).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {Record<string, { es: object, en: object }>} */
const posts = {
  "que-hacer-en-mendoza-error-itinerario": {
    es: {
      title: "¿Qué Hacer en Mendoza? El Error Típico al Armar tu Itinerario",
      excerpt:
        "El error del 90% de los turistas al planificar Mendoza: el turismo maratónico de bodegas. Cómo equilibrar vino, montaña y relax en tu viaje.",
      subtitle: "Consejos para viajar a Mendoza sin saturar la agenda",
      intro:
        "¡Hola! Soy Edmar, el fundador de Edmar Travel. Si estás planeando tu viaje a la tierra del sol y del buen vino, dejame decirte algo: estás a punto de descubrir uno de los rincones más imponentes del mundo.",
      sections: [
        {
          heading: "El error del turismo maratónico",
          paragraphs: [
            "El error más común de quienes vienen por primera vez es caer en la trampa del «turismo maratónico»: llenar la agenda con tres o cuatro bodegas por día. ¿El resultado real? Al tercer día estás empalagado de copas, saturado de explicaciones técnicas sobre barricas, cansado de correr contra el reloj y con la sensación de que te perdiste la verdadera magia de la cordillera.",
            "El secreto de un viaje memorable en Mendoza no es acumular visitas, sino equilibrar la experiencia. Para vivir la provincia al 100%, te sugerimos estructurar tus días alternando ritmos.",
          ],
        },
        {
          heading: "Día 1 — Cultura y sabores",
          paragraphs: [
            "Visita tranquila a bodegas tradicionales, catas guiadas sin apuros y degustación de aceites de oliva locales.",
          ],
        },
        {
          heading: "Día 2 — Aventura y conexión",
          paragraphs: [
            "Aventura activa en la montaña, como una cabalgata o navegación en kayak con picada artesanal a la orilla del agua turquesa.",
          ],
        },
        {
          heading: "Día 3 — Relax e inmensidad",
          paragraphs: [
            "Desconexión total en piletas de agua termal natural o la inmensidad del recorrido por Alta Montaña.",
          ],
        },
        {
          heading: "Tip de Edmar",
          paragraphs: [
            "La montaña no se disfruta corriendo. Cuando balanceás tu viaje entre vino, naturaleza y relax, volvés a tu casa con fotos épicas pero, sobre todo, con el alma descansada.",
          ],
        },
      ],
      closing:
        "¿Querés que te ayudemos a armar este equilibrio sin dolores de cabeza? Descubrí nuestras excursiones guiadas con traslados incluidos y reservá tu lugar congelando la tarifa con solo el 50% de seña.",
    },
    en: {
      title: "What to Do in Mendoza? The Classic Itinerary Mistake",
      excerpt:
        "The mistake 90% of visitors make when planning Mendoza: marathon winery days. How to balance wine, mountains, and downtime.",
      subtitle: "Travel tips for Mendoza without packing the agenda",
      intro:
        "Hi — I'm Edmar, founder of Edmar Travel. If you're planning a trip to the land of sun and great wine, you're about to discover one of the most impressive corners of the world.",
      sections: [
        {
          heading: "The marathon tourism trap",
          paragraphs: [
            "The most common first-timer mistake is packing three or four wineries into every day. The real result? By day three you're tired of tastings, saturated with barrel talk, racing the clock, and missing the true magic of the Andes.",
            "A memorable Mendoza trip isn't about stacking visits — it's about balance. Structure your days by alternating rhythms.",
          ],
        },
        {
          heading: "Day 1 — Culture and flavor",
          paragraphs: [
            "A calm visit to traditional wineries, unhurried guided tastings, and local olive oil sampling.",
          ],
        },
        {
          heading: "Day 2 — Adventure and connection",
          paragraphs: [
            "Active mountain time — a horseback ride or kayak outing with an artisan picnic by turquoise water.",
          ],
        },
        {
          heading: "Day 3 — Rest and scale",
          paragraphs: [
            "Full disconnect in natural thermal pools, or the vast High Mountain route.",
          ],
        },
        {
          heading: "Edmar's tip",
          paragraphs: [
            "The mountains aren't meant to be rushed. When you balance wine, nature, and rest, you go home with epic photos — and a rested mind.",
          ],
        },
      ],
      closing:
        "Want help building that balance without the stress? Explore our guided excursions with transfers included and reserve your spot by locking the rate with a 50% deposit.",
    },
  },

  "alquilar-auto-en-mendoza-precios-traslados": {
    es: {
      title: "¿Conviene Alquilar Auto en Mendoza? Precios, Nafta y Traslados",
      excerpt:
        "El cálculo real de alquilar auto en Mendoza: nafta, peajes, depósito y el dilema del conductor designado. Cuándo conviene un traslado incluido.",
      subtitle: "Cómo moverse en Mendoza sin sorpresas en el presupuesto",
      intro:
        "Alquilar un auto suena como la idea perfecta de libertad hasta que sacás la calculadora y analizás la logística real de la cordillera.",
      sections: [
        {
          heading: "El costo oculto",
          paragraphs: [
            "Al valor diario del vehículo tenés que sumarle la nafta (que en rutas de montaña consume el doble), peajes y la franquicia gigantesca que te retienen en la tarjeta de crédito como depósito de garantía.",
          ],
        },
        {
          heading: "El estado de las rutas",
          paragraphs: [
            "Manejar en caminos de alta montaña o consolidados requiere atención constante, lo que transforma un día de paseo en una jornada de tensión al volante.",
          ],
        },
        {
          heading: "El gran dilema mendocino",
          paragraphs: [
            "Si vas a recorrer caminos del vino o paradores de montaña, alguien de la familia o del grupo tiene que ser el «conductor designado». Eso significa perderse las degustaciones o andar con la preocupación de los estrictos controles de alcoholemia locales.",
          ],
        },
        {
          heading: "La alternativa con traslado incluido",
          paragraphs: [
            "Contratar excursiones que ya te incluyan el traslado puerta a puerta desde tu alojamiento no solo cuida tu presupuesto, sino que te permite relajarte en asientos climatizados, tomarte esa copa de vino tranquilo y admirar el paisaje mientras nuestros choferes profesionales se encargan del camino.",
          ],
        },
      ],
      closing:
        "Olvidate del volante y dedicate solo a disfrutar. Mirá todos nuestros tours con logística resuelta y congelá el valor de tu salida abonando el 50% de seña.",
    },
    en: {
      title: "Is Renting a Car in Mendoza Worth It? Prices, Fuel & Transfers",
      excerpt:
        "The real cost of renting a car in Mendoza: fuel, tolls, deposits, and the designated-driver problem. When an included transfer wins.",
      subtitle: "How to get around Mendoza without budget surprises",
      intro:
        "Renting a car sounds like perfect freedom — until you run the numbers and face the real logistics of the Andes.",
      sections: [
        {
          heading: "The hidden cost",
          paragraphs: [
            "Add fuel (mountain routes often use twice as much), tolls, and the large credit-card hold for the insurance deductible on top of the daily rental rate.",
          ],
        },
        {
          heading: "Road conditions",
          paragraphs: [
            "Driving high-mountain or unpaved roads demands constant focus, turning a leisure day into stress behind the wheel.",
          ],
        },
        {
          heading: "The Mendoza dilemma",
          paragraphs: [
            "On wine roads or mountain stops, someone has to be the designated driver — missing tastings or worrying about strict local alcohol checks.",
          ],
        },
        {
          heading: "The transfer-included alternative",
          paragraphs: [
            "Booking excursions with door-to-door hotel pickup protects your budget and lets you relax in climate-controlled seats, enjoy that glass of wine, and watch the landscape while professional drivers handle the road.",
          ],
        },
      ],
      closing:
        "Skip the wheel and focus on enjoying the day. Browse our tours with logistics handled and lock your rate with a 50% deposit.",
    },
  },

  "mendoza-en-3-dias-itinerario-que-hacer": {
    es: {
      title: "Mendoza en 3 Días: Itinerario Perfecto y Tours Recomendados",
      excerpt:
        "Itinerario de 3 días en Mendoza: bodegas y olivas, Potrerillos con cabalgata o kayak, y Alta Montaña hasta el Aconcagua.",
      subtitle: "Qué ver en Mendoza en un fin de semana largo",
      intro:
        "Si venís por un fin de semana largo o tenés pocos días disponibles, el tiempo vale oro. Para que no sientas que se te escapó nada importante, diseñamos un itinerario fluido de 3 días que combina los tres pilares fundamentales de la provincia.",
      sections: [
        {
          heading: "Día 1 — Sabores y orígenes",
          paragraphs: [
            "Arrancá con nuestro Tour de Bodegas & Olivas. Recorremos viñedos icónicos de Maipú o Luján de Cuyo con cata guiada, aprendiendo sobre el Malbec y degustando aceites de oliva artesanales.",
          ],
        },
        {
          heading: "Día 2 — La cordillera desde adentro",
          paragraphs: [
            "Trasladate al Dique Potrerillos para hacer una cabalgata bordeando el agua turquesa o una travesía en kayak. Coronamos el mediodía con una abundante picada tradicional argentina y vino frente al embalse.",
          ],
        },
        {
          heading: "Día 3 — El techo de América",
          paragraphs: [
            "Hacé el circuito de Alta Montaña Full Day navegando la mítica Ruta 7. Conocé el histórico Valle de Uspallata, el enigmático Puente del Inca y hacé una caminata suave hasta el mirador del Cerro Aconcagua.",
          ],
        },
      ],
      closing:
        "¿Ya tenés confirmadas las fechas de tu vuelo o pasaje? Podés congelar este itinerario completo reservando tus cupos con el 50% de seña escribiéndonos directo por WhatsApp.",
    },
    en: {
      title: "Mendoza in 3 Days: Perfect Itinerary & Recommended Tours",
      excerpt:
        "A 3-day Mendoza itinerary: wineries and olive oil, Potrerillos horseback or kayak, and High Mountain to Aconcagua.",
      subtitle: "What to see in Mendoza on a long weekend",
      intro:
        "On a long weekend or a short stay, time is precious. This fluid 3-day itinerary covers Mendoza's three pillars so nothing essential slips by.",
      sections: [
        {
          heading: "Day 1 — Flavors and origins",
          paragraphs: [
            "Start with our Wineries & Olive Oil Tour. We visit iconic vineyards in Maipú or Luján de Cuyo with a guided tasting, Malbec stories, and artisan olive oils.",
          ],
        },
        {
          heading: "Day 2 — The Andes from within",
          paragraphs: [
            "Head to Potrerillos Dam for a horseback ride along turquoise water or a kayak outing, then a generous Argentine picnic with wine facing the reservoir.",
          ],
        },
        {
          heading: "Day 3 — The roof of the Americas",
          paragraphs: [
            "Take the High Mountain full-day circuit on legendary Route 7: historic Uspallata Valley, Puente del Inca, and a gentle walk to the Aconcagua viewpoint.",
          ],
        },
      ],
      closing:
        "Already have your flight dates? Lock this full itinerary by reserving with a 50% deposit — message us on WhatsApp.",
    },
  },

  "donde-comer-picada-potrerillos-mendoza": {
    es: {
      title: "Dónde Comer Picada en Potrerillos: Almuerzo de Montaña en Mendoza",
      excerpt:
        "La picada mendocina de montaña en Potrerillos: salames, quesos, empanadas y vino junto al dique. Autenticidad sin restaurantes caros.",
      subtitle: "Gastronomía mendocina imperdible al aire libre",
      intro:
        "Mendoza es mundialmente famosa por sus restaurantes de pasos y cocina de autor. Sin embargo, la experiencia gastronómica que más enamora a los viajeros no viene en platos sofisticados de porcelana, sino sobre una tabla de madera a la orilla de la montaña.",
      sections: [
        {
          heading: "La auténtica picada de montaña",
          paragraphs: [
            "Hablamos de la auténtica picada mendocina de montaña: una selección de salames artesanales, quesos criollos, aceitunas marinadas, empanadas jugosas y pan casero recién horneado, maridada con un buen vino local.",
          ],
        },
        {
          heading: "El lujo de la autenticidad",
          paragraphs: [
            "Cuando disfrutás de estos sabores locales al aire libre, sintiendo la brisa de la cordillera y con la vista fija en el espejo turquesa del Dique Potrerillos después de una caminata o una cabalgata, entendés que el verdadero lujo está en la autenticidad del momento.",
          ],
        },
      ],
      closing:
        "Sentate a la mesa de la montaña con nuestra Cabalgata + Picada Premium en Potrerillos y congelá tu lugar abonando solo el 50% de seña.",
    },
    en: {
      title: "Where to Eat a Picnic in Potrerillos: Mountain Lunch in Mendoza",
      excerpt:
        "The Mendoza mountain picnic in Potrerillos: salami, cheeses, empanadas, and wine by the dam — authentic, not expensive fine dining.",
      subtitle: "Must-try Mendoza food outdoors",
      intro:
        "Mendoza is famous for tasting-menu restaurants and chef-driven cuisine. Yet the meal travelers fall for most isn't on porcelain plates — it's on a wooden board at the edge of the mountains.",
      sections: [
        {
          heading: "The real mountain picnic",
          paragraphs: [
            "Think artisan salami, local cheeses, marinated olives, juicy empanadas, and fresh homemade bread paired with good regional wine.",
          ],
        },
        {
          heading: "Luxury as authenticity",
          paragraphs: [
            "Enjoying those flavors outdoors, with Andean breeze and turquoise Potrerillos Dam after a hike or horseback ride, you understand real luxury is the authenticity of the moment.",
          ],
        },
      ],
      closing:
        "Take a seat at the mountain table with our Potrerillos Horseback + Premium Picnic and lock your spot with a 50% deposit.",
    },
  },

  "excursion-aconcagua-mendoza-miradores-clima": {
    es: {
      title: "Excursión al Aconcagua desde Mendoza: Miradores, Clima y Guía",
      excerpt:
        "Guía rápida para visitar el Aconcagua: cómo vestirse, hidratarse y llegar al mirador de Horcones sin ser montañista.",
      subtitle: "Parque Provincial Aconcagua — consejos prácticos",
      intro:
        "Con sus 6.962 metros de altura, el Centinela de Piedra es el pico más alto del hemisferio occidental y una visita obligada para cualquier persona que pise suelo mendocino. Para que tu día en el Parque Provincial Aconcagua sea perfecto, tené en cuenta estos tres consejos clave.",
      sections: [
        {
          heading: "1. Vestite en capas (el sistema «cebolla»)",
          paragraphs: [
            "En la cordillera el clima es dinámico. Podés pasar de un sol radiante a un viento frío de montaña en cuestión de minutos. Llevá remera liviana, un abrigo intermedio y una campera cortaviento.",
          ],
        },
        {
          heading: "2. El secreto de la hidratación",
          paragraphs: [
            "La aridez y la altitud hacen que el cuerpo pierda humedad rápidamente sin que te des cuenta. Tomar agua en pequeños sorbos durante todo el trayecto evita dolores de cabeza y fatiga.",
          ],
        },
        {
          heading: "3. Apto para todas las edades",
          paragraphs: [
            "No hace falta ser un montañista experimentado para contemplarlo. La caminata suave desde el centro de visitantes hasta el mirador de la Laguna de Horcones es totalmente accesible y te regala una postal directa a la pared sur del gigante.",
          ],
        },
      ],
      closing:
        "Acompañanos a descubrir el Techo de América en nuestra salida de Alta Montaña Full Day con tiempo libre en cada parada. Congelá tu tarifa con el 50% de seña previa.",
    },
    en: {
      title: "Aconcagua Day Trip from Mendoza: Viewpoints, Weather & Guide",
      excerpt:
        "Quick guide to visiting Aconcagua: how to dress, hydrate, and reach the Horcones viewpoint without being a climber.",
      subtitle: "Aconcagua Provincial Park — practical tips",
      intro:
        "At 6,962 meters, the Stone Sentinel is the highest peak in the Western Hemisphere and a must for anyone who reaches Mendoza. Keep these three tips in mind for a perfect day in Aconcagua Provincial Park.",
      sections: [
        {
          heading: "1. Dress in layers (the onion system)",
          paragraphs: [
            "Mountain weather shifts fast — bright sun to cold wind in minutes. Bring a light shirt, a mid layer, and a windbreaker.",
          ],
        },
        {
          heading: "2. Hydration is the secret",
          paragraphs: [
            "Dry air and altitude drain moisture before you notice. Small sips throughout the day help prevent headaches and fatigue.",
          ],
        },
        {
          heading: "3. Suitable for all ages",
          paragraphs: [
            "You don't need to be an experienced mountaineer. The gentle walk from the visitor center to Laguna de Horcones viewpoint is accessible and delivers a direct view of the south face.",
          ],
        },
      ],
      closing:
        "Join us for the Roof of the Americas on our High Mountain full-day outing with free time at each stop. Lock your rate with a 50% deposit.",
    },
  },

  "termas-de-cacheuta-o-potrerillos-comparativa": {
    es: {
      title: "Termas de Cacheuta o Potrerillos: ¿Qué Excursión Elegir?",
      excerpt:
        "Cacheuta vs Potrerillos: termas naturales para desconectar o dique turquesa para kayak, trekking y cabalgatas. Cómo elegir según tu viaje.",
      subtitle: "Excursiones cerca de Mendoza Capital",
      intro:
        "A solo una hora de Mendoza Capital, estas dos zonas precordilleranas son las grandes estrellas de las escapadas de día. Aunque están muy cerca una de la otra, ofrecen experiencias totalmente diferentes.",
      sections: [
        {
          heading: "Elegí Cacheuta si…",
          paragraphs: [
            "Tu cuerpo te pide desconexión, descanso muscular y serenidad. Sus piletas de agua termal natural, esculpidas en piedra junto al río Mendoza, son perfectas para pasar un día flotando y liberando el estrés acumulado.",
          ],
        },
        {
          heading: "Elegí Potrerillos si…",
          paragraphs: [
            "Buscás paisajes de impacto visual, fotos de postal y aire puro con un toque de acción. El dique es el escenario ideal para hacer trekking, navegar en kayak sobre aguas turquesas o recorrer sus senderos a caballo.",
          ],
        },
        {
          heading: "La mejor recomendación de Edmar",
          paragraphs: [
            "No tenés por qué elegir solo uno. Al estar ubicados en la misma franja geográfica, podés dedicarle un día a la aventura en Potrerillos y al día siguiente reponer energías en las termas.",
          ],
        },
      ],
      closing:
        "Conectá con la tranquilidad en nuestro combo de Trekking + Termas de Cacheuta y asegurá tus cupos congelando el precio con el 50% de seña.",
    },
    en: {
      title: "Cacheuta Hot Springs or Potrerillos: Which Excursion to Choose?",
      excerpt:
        "Cacheuta vs Potrerillos: natural hot springs to unwind, or a turquoise dam for kayak, trekking, and horseback. How to choose.",
      subtitle: "Day trips near Mendoza City",
      intro:
        "About an hour from Mendoza City, these two foothill areas star in day escapes. They're close to each other — and offer completely different experiences.",
      sections: [
        {
          heading: "Choose Cacheuta if…",
          paragraphs: [
            "Your body wants disconnect, muscle rest, and calm. Natural thermal pools carved in stone by the Mendoza River are perfect for a floating, stress-free day.",
          ],
        },
        {
          heading: "Choose Potrerillos if…",
          paragraphs: [
            "You want postcard landscapes, fresh air, and a touch of action. The dam is ideal for trekking, kayaking turquoise water, or horseback trails.",
          ],
        },
        {
          heading: "Edmar's best tip",
          paragraphs: [
            "You don't have to pick only one. On the same corridor, spend a day of adventure in Potrerillos and recover in the hot springs the next day.",
          ],
        },
      ],
      closing:
        "Find calm with our Trekking + Cacheuta Hot Springs combo and secure your spots by locking the price with a 50% deposit.",
    },
  },

  "trekking-vallecitos-mendoza-cordon-del-plata": {
    es: {
      title: "Trekking en Vallecitos Mendoza: Excursión al Cordón del Plata",
      excerpt:
        "Vallecitos, cuna del andinismo argentino: trekking a más de 2.900 m entre picos del Cordón del Plata lejos de los circuitos masivos.",
      subtitle: "Alta montaña auténtica cerca de Mendoza",
      intro:
        "Si querés escapar de los circuitos turísticos tradicionales y sentir la imponencia de los Andes en su estado más puro y salvaje, Vallecitos es tu lugar. Ubicado a más de 2.900 metros sobre el nivel del mar, este histórico centro de montaña es considerado la cuna del andinismo argentino.",
      sections: [
        {
          heading: "Caminatas reales, no solo miradores",
          paragraphs: [
            "A diferencia de los miradores masivos, en Vallecitos hacés caminatas reales rodeado por los majestuosos picos del Cordón del Plata, que superan los 5.000 metros de altura.",
            "Es una experiencia de trekking adaptada a tu nivel, donde el silencio de la altura, el aire helado y la inmensidad de las quebradas te hacen sentir verdaderamente pequeño ante la naturaleza.",
          ],
        },
      ],
      closing:
        "Descubrí la alta montaña auténtica en nuestro Trekking en Vallecitos & Cordón del Plata. Congelá el valor de tu travesía abonando el 50% de seña.",
    },
    en: {
      title: "Vallecitos Trekking in Mendoza: Cordón del Plata Excursion",
      excerpt:
        "Vallecitos, birthplace of Argentine mountaineering: trekking above 2,900 m among Cordón del Plata peaks, away from mass circuits.",
      subtitle: "Authentic high mountain near Mendoza",
      intro:
        "If you want to leave standard tourist circuits and feel the Andes at their purest, Vallecitos is your place. Above 2,900 meters, this historic mountain center is considered the birthplace of Argentine mountaineering.",
      sections: [
        {
          heading: "Real walks, not just viewpoints",
          paragraphs: [
            "Unlike crowded lookouts, Vallecitos means real hiking surrounded by Cordón del Plata peaks over 5,000 meters.",
            "It's a level-adapted trek where altitude silence, cold air, and vast ravines make you feel small before nature.",
          ],
        },
      ],
      closing:
        "Discover authentic high mountain on our Vallecitos & Cordón del Plata trek. Lock your trip price with a 50% deposit.",
    },
  },

  "que-ropa-llevar-a-mendoza-montana-clima": {
    es: {
      title: "Qué Ropa Llevar a Mendoza: Guía de Montaña Verano e Invierno",
      excerpt:
        "Qué ropa empacar para la montaña en Mendoza: checklist de verano (sol y viento) e invierno (sistema cebolla y nieve).",
      subtitle: "Cómo vestirse para las excursiones según la temporada",
      intro:
        "El clima mendocino es famoso por sus más de 300 días de sol al año, pero la amplitud térmica de la cordillera suele tomar por sorpresa a los viajeros. La clave para armar tu valija sin fallar está en adaptar tu equipamiento según la época del año.",
      sections: [
        {
          heading: "En verano (diciembre a marzo)",
          paragraphs: [
            "Aunque el sol brille con fuerza y en la ciudad haga calor, en la montaña el viento puede refrescar rápidamente. Tu equipamiento debe incluir:",
            "Indumentaria fresca y transpirable: remeras de tela sintética o algodón liviano (preferentemente de manga larga para protegerte de la radiación solar).",
            "Pantalón desmontable o cómodo: ideal para caminatas o cabalgatas. Evitá shorts ajustados si vas a montar a caballo.",
            "Protección solar extrema: anteojos con filtro UV, gorra o sombrero y protector solar de factor alto (mínimo FPS 50).",
            "Abrigo liviano: una campera cortaviento o buzo para las paradas en altura o el atardecer junto al lago.",
          ],
        },
        {
          heading: "En invierno (junio a septiembre)",
          paragraphs: [
            "Las temperaturas en la cordillera suelen ser bajo cero y la nieve es protagonista. El truco infalible es el sistema «cebolla» (vestirse en 3 capas):",
            "Primera capa (aislamiento térmico): camiseta y calza térmica pegada al cuerpo para retener el calor.",
            "Segunda capa (abrigo): buzo polar o abrigo sintético.",
            "Tercera capa (protección exterior): campera impermeable cortaviento para aislar la nieve y la brisa helada.",
            "Accesorios clave: gorro de lana, guantes térmicos, cuello o bufanda y calzado de trekking con buen agarre para zonas con hielo o nieve.",
          ],
        },
      ],
      closing:
        "¿Ya tenés la valija armada para tu temporada? Asegurá tus lugares en la combi congelando el precio de tus salidas abonando solo el 50% de seña.",
    },
    en: {
      title: "What to Wear in Mendoza: Summer & Winter Mountain Guide",
      excerpt:
        "What to pack for Mendoza mountains: summer checklist (sun and wind) and winter layers (onion system and snow).",
      subtitle: "How to dress for excursions by season",
      intro:
        "Mendoza is famous for 300+ sunny days a year, but Andean temperature swings surprise travelers. Pack by season.",
      sections: [
        {
          heading: "In summer (December–March)",
          paragraphs: [
            "Even when the city is hot, mountain wind cools fast. Pack:",
            "Light, breathable clothes: synthetic or light cotton shirts (long sleeves help with sun).",
            "Convertible or comfortable pants for hikes or horseback — avoid tight shorts for riding.",
            "Strong sun protection: UV sunglasses, hat, and SPF 50+ sunscreen.",
            "A light windbreaker or fleece for high stops or lakeside evenings.",
          ],
        },
        {
          heading: "In winter (June–September)",
          paragraphs: [
            "Mountain temperatures often drop below freezing and snow takes center stage. Use the onion system (3 layers):",
            "Base layer: thermal top and bottoms against the skin.",
            "Mid layer: fleece or synthetic insulation.",
            "Shell: waterproof windbreaker against snow and cold breeze.",
            "Key accessories: wool hat, thermal gloves, neck gaiter, and trekking shoes with grip for ice or snow.",
          ],
        },
      ],
      closing:
        "Bag packed for your season? Secure your seats by locking excursion prices with a 50% deposit.",
    },
  },

  "canon-del-atuel-desde-mendoza-capital-san-rafael": {
    es: {
      title: "Excursión Cañón del Atuel desde Mendoza Capital: ¿Vale la Pena?",
      excerpt:
        "¿Vale la pena ir al Cañón del Atuel desde Mendoza Capital? Museo geológico a cielo abierto, Valle Grande y San Rafael en un full day.",
      subtitle: "Excursión a San Rafael sin manejar cientos de kilómetros",
      intro:
        "Muchos viajeros dudan sobre hacer esta excursión porque implica recorrer una distancia mayor desde Mendoza Capital. Mi respuesta es contundente: sí, vale totalmente la pena.",
      sections: [
        {
          heading: "Un museo geológico a cielo abierto",
          paragraphs: [
            "El Cañón del Atuel es un auténtico museo geológico a cielo abierto. A lo largo del recorrido, el río Atuel talló durante millones de años formaciones rocosas impresionantes con tonalidades rojizas, amarillas y ocres que parecen sacadas de otro planeta.",
            "Conocer el dique Valle Grande, las esculturas naturales del cañón y la ciudad de San Rafael en una excursión de día entero con guía y chofer te permite disfrutar de este espectáculo natural sin el desgaste físico de manejar cientos de kilómetros ida y vuelta.",
          ],
        },
      ],
      closing:
        "Sumate al recorrido más fascinante del sur mendocino en nuestra salida al Cañón del Atuel & San Rafael. Podés congelar la tarifa con el 50% de seña.",
    },
    en: {
      title: "Atuel Canyon Day Trip from Mendoza City: Is It Worth It?",
      excerpt:
        "Is Atuel Canyon from Mendoza City worth it? Open-air geology, Valle Grande, and San Rafael in one full day.",
      subtitle: "San Rafael excursion without driving hundreds of kilometers",
      intro:
        "Many travelers hesitate because it's farther from Mendoza City. My answer is clear: yes, it's absolutely worth it.",
      sections: [
        {
          heading: "An open-air geology museum",
          paragraphs: [
            "Atuel Canyon is a true open-air geological museum. Over millions of years the Atuel River carved striking red, yellow, and ochre rock formations that look otherworldly.",
            "Seeing Valle Grande dam, the canyon's natural sculptures, and San Rafael on a full-day trip with guide and driver lets you enjoy the spectacle without the exhaustion of driving hundreds of kilometers round trip.",
          ],
        },
      ],
      closing:
        "Join the most fascinating route in southern Mendoza on our Atuel Canyon & San Rafael departure. Lock the fare with a 50% deposit.",
    },
  },

  "precios-excursiones-mendoza-reserva-sena": {
    es: {
      title: "Precios Excursiones Mendoza: Cómo Reservar con Seña en Pesos",
      excerpt:
        "Cómo reservar excursiones en Mendoza con seña del 50%: congelá la tarifa, asegurá tu cupo y pagá el saldo el día de la salida.",
      subtitle: "El método inteligente para planificar sin sorpresas",
      intro:
        "Sabemos que planificar un viaje requiere organizar el presupuesto familiar o personal con anticipación. En un contexto donde los costos cambian rápidamente, en Edmar Travel queremos darte previsibilidad y tranquilidad absoluta.",
      sections: [
        {
          heading: "Congelá la tarifa con el 50% de seña",
          paragraphs: [
            "Podés congelar la tarifa oficial de cualquiera de nuestras excursiones garantizando tus lugares con un pago inicial del 50% de seña por persona.",
            "El saldo restante lo cancelás cómodamente el mismo día de la excursión al subir a la combi. De esta manera, asegurás tu cupo en nuestros grupos reducidos, protegés tu dinero y coordinás tu itinerario con la anticipación que te merecés.",
          ],
        },
      ],
      closing:
        "¿Listo para asegurar tu próxima salida? Escribinos por WhatsApp, elegí tu experiencia y congelá el precio abonando solo el 50% de seña.",
    },
    en: {
      title: "Mendoza Excursion Prices: How to Book with a Deposit",
      excerpt:
        "How to book Mendoza excursions with a 50% deposit: lock the rate, secure your seat, and pay the balance on departure day.",
      subtitle: "The smart way to plan without surprises",
      intro:
        "Planning a trip means organizing your budget ahead of time. When costs move fast, Edmar Travel aims to give you predictability and peace of mind.",
      sections: [
        {
          heading: "Lock the rate with a 50% deposit",
          paragraphs: [
            "You can freeze the official fare of any of our excursions by guaranteeing your spots with an initial 50% deposit per person.",
            "Pay the remaining balance comfortably on the day of the excursion when you board. That way you secure a seat in our small groups, protect your money, and plan your itinerary with the lead time you deserve.",
          ],
        },
      ],
      closing:
        "Ready to secure your next outing? Message us on WhatsApp, pick your experience, and lock the price with only a 50% deposit.",
    },
  },
};

function inject(localeFile, localeKey) {
  const filePath = path.join(root, "messages", localeFile);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!data.blog?.posts) {
    throw new Error(`No blog.posts in ${localeFile}`);
  }

  const before = Object.keys(data.blog.posts).length;
  for (const [slug, locales] of Object.entries(posts)) {
    data.blog.posts[slug] = locales[localeKey];
  }
  const after = Object.keys(data.blog.posts).length;

  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(
    `${localeFile}: ${before} → ${after} posts (+${after - before})`
  );
}

inject("es.json", "es");
inject("en.json", "en");
console.log("Slugs:", Object.keys(posts).join("\n"));
