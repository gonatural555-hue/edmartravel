import type { ExperienceRichContent } from "@/lib/experience-model";

/** Contenuto arricchito PDP — italiano (prodotti 7–12). */
export const RICH_IT_B: Record<string, ExperienceRichContent> = {
  "half-day-winery-tour-maipu": {
    subtitle:
      "Pomeriggio a Maipú: quattro tappe — cantina artigianale, industriale, olio d’oliva e vino dolce — degustazioni incluse.",
    badges: [
      "Pomeriggio",
      "4 visite",
      "Degustazioni incluse",
      "Classico Maipú",
    ],
    whyLove: [
      "Panorama compatto degli stili di cantina in un’uscita.",
      "Degustazioni secondo programma: vino, olio e dolce.",
      "Pickup hotel dalle 14:00; rientro verso le 20:00.",
      "Ideale se arrivi tardi ma vuoi il sapore della regione.",
    ],
    editorial: [
      "Maipú è una porta d’ingresso: storia industriale e piccole cantine, più olio e dolce per bilanciare il pomeriggio.",
      "Ritmo didattico: camminare, annusare, confrontare.",
      "Pickup coordinato dagli hotel — punto esatto da confermare.",
    ],
    places: [
      "Cantina artigianale — Maipú",
      "Cantina industriale — Maipú",
      "Frantoio d’olio",
      "Cantina di vini dolci",
    ],
    included: [
      "Trasporto del circuito secondo programma",
      "Visite e degustazioni incluse nel prezzo annunciato",
      "Coordinamento Edmar Travel",
    ],
    excluded: [
      "Pasti completi oltre alle degustazioni",
      "Acquisti in cantina",
      "Mance (facoltative)",
    ],
    practical: {
      whatToBring: [
        "Scarpe comode per cantina e frantoio",
        "Acqua e protezione solare",
        "Mezzo di pagamento se acquisti",
      ],
      restrictions:
        "Consumo responsabile; minori secondo regole di ogni sito.",
      weather:
        "Pioggia leggera: raramente annullato; temporale: ordine visite modificabile.",
      pickupDetails:
        "Pickup hotel Mendoza da ~14:00; giri ~45 min.",
    },
    faq: [
      {
        question: "Pranzo incluso?",
        answer:
          "No: visite con degustazioni; cena possibile al rientro in città.",
      },
      {
        question: "Si possono comprare bottiglie?",
        answer:
          "Sì secondo cantine; informazioni su spedizioni e bagaglio.",
      },
      {
        question: "Visita in inglese?",
        answer:
          "Secondo data e operatore — chiedi in prenotazione.",
      },
    ],
    testimonials: [
      {
        name: "Priya e Sam",
        text: "Vino dolce e olio nello stesso pomeriggio: Maipú in un solo giro.",
        rating: 5,
      },
    ],
    language: "Spagnolo / inglese secondo guida (confermare)",
    groupSize: "Gruppo regolare",
    season: "Tutto l’anno (lun–sab; secondo cantine)",
    pickup: "Hotel Mendoza — da ~14:00 (giri ~45 min)",
    cancellation:
      "Secondo voucher; avvisa Edmar Travel in anticipo per modifiche.",
  },

  "canon-del-atuel-san-rafael-tour": {
    subtitle:
      "Giornata intera a sud: San Rafael, canyon dell’Atuel e tempo a Valle Grande — giovedì e domeniche.",
    badges: [
      "Giornata intera",
      "Ruta 40 sud",
      "Canyon dell’Atuel",
      "Gio e dom",
    ],
    whyLove: [
      "Città, canyon e spazio aperto nello stesso giorno.",
      "Contrasto dopo i vigneti.",
      "Tempo libero a Valle Grande per attività a pagamento.",
      "Partenze programmate senza improvvisare l’auto.",
    ],
    editorial: [
      "Il sud mendocino cambia scala: lunghe strade, cielo ampio e l’Atuel che scolpisce la roccia.",
      "Giornata intensa: riposo, acqua e vento leggero. Opzioni Valle Grande (catamarano, rafting) in supplemento.",
      "Giovedì e domeniche: prenota con anticipo in alta stagione.",
    ],
    places: [
      "San Rafael — centro e storico",
      "Canyon dell’Atuel",
      "Valle Grande (attività opzionali)",
    ],
    included: [
      "Trasporto da Mendoza",
      "Circuito secondo itinerario del giorno",
      "Coordinamento Edmar Travel",
    ],
    excluded: [
      "Pranzo e bevande",
      "Attività opzionali a Valle Grande",
      "Ingressi ove applicabile",
    ],
    practical: {
      whatToBring: [
        "Colazione abbondante e snack per il bus",
        "Acqua, cappello, protezione solare",
        "Soldi per pasti e opzioni",
        "Giacca a vento: vento possibile nel canyon",
      ],
      restrictions:
        "Molte ore seduti; sconsigliato se non tolleri ~3h di strada senza lunga pausa.",
      weather:
        "Caldo in estate; frescura all’ombra; pioggia occasionale.",
      pickupDetails:
        "Partenza ~7:00 da hotel Mendoza — confermare.",
    },
    faq: [
      {
        question: "Durata da Mendoza?",
        answer:
          "Circa 3 ore per tratta secondo traffico; giornata andata e ritorno intera.",
      },
      {
        question: "Rafting incluso?",
        answer:
          "No: attività a pagamento in loco secondo disponibilità.",
      },
      {
        question: "Guida tutto il giorno?",
        answer:
          "Coordinamento del servizio; guide locali possibili su alcuni siti.",
      },
    ],
    testimonials: [
      {
        name: "Chris e Mira",
        text: "Eravamo venuti per il vino — questo giorno ci ha ricordato che Mendoza è anche montagna e fiume.",
        rating: 5,
      },
    ],
    language: "Spagnolo (confermare bilingue)",
    groupSize: "Gruppo regolare",
    season: "Giovedì e domeniche (secondo stagione)",
    pickup: "Hotel Mendoza — da ~07:00 (giri ~45 min)",
    cancellation:
      "Secondo voucher; avvisa con anticipo per le lunghe distanze.",
  },

  "villavicencio-nature-reserve-tour": {
    subtitle:
      "Mezza giornata nella riserva naturale Villavicencio: sentieri, centro di interpretazione, hotel storico e mirador dei caracoles.",
    badges: [
      "Mezza giornata",
      "Riserva naturale",
      "Hotel storico",
      "Mer e sab",
    ],
    whyLove: [
      "Mendoza senza calici: natura, storia e viste.",
      "Hotel Villavicencio e cappella come scenario d’epoca.",
      "Salita ai caracoles per panorama ampio.",
      "Mercoledì e sabati: facile da combinare.",
    ],
    editorial: [
      "Villavicencio è un respiro verde prima dell’aridità: sentieri, fauna silenziosa e peso storico dell’hotel.",
      "Ingresso alla riserva spesso separato — tariffa vigente in prenotazione.",
      "Strati, scarpe chiuse, sole e vento in quota.",
    ],
    places: [
      "Sentieri della riserva Villavicencio",
      "Centro di interpretazione",
      "Hotel storico, cappella e mirador dei caracoles",
    ],
    included: [
      "Trasporto da Mendoza",
      "Tour mezza giornata secondo programma",
      "Coordinamento Edmar Travel",
    ],
    excluded: [
      "Ingresso alla riserva (tariffa separata)",
      "Pasti e bevande",
      "Spese personali",
    ],
    practical: {
      whatToBring: [
        "Scarpe da trekking",
        "Acqua, protezione solare, cappello",
        "Soldi per ingresso",
      ],
      restrictions:
        "Rispettare sentieri e indicazioni del guardaparco.",
      weather:
        "Vento e sole forte; pioggia possibile primavera/autunno.",
      pickupDetails:
        "Pickup hotel ~8:00 — confermare.",
    },
    faq: [
      {
        question: "Prezzo ingresso?",
        answer:
          "Fissato dalla riserva; chiedi l’importo in prenotazione.",
      },
      {
        question: "Sforzo fisico?",
        answer:
          "Camminate moderate e salita al mirador; non trekking alpino ma buona forma utile.",
      },
      {
        question: "Con bambini piccoli?",
        answer:
          "Sì con idratazione e pazienza; età minima secondo attività.",
      },
    ],
    testimonials: [
      {
        name: "Isabel T.",
        text: "Finalmente una mattina mendocina senza vino: vento, luce e quelle vecchie mura d’hotel.",
        rating: 5,
      },
    ],
    language: "Spagnolo (guida secondo programma)",
    groupSize: "Gruppo regolare",
    season: "Mercoledì e sabati (orari riserva)",
    pickup: "Hotel Mendoza — da ~08:00 (giri ~45 min)",
    cancellation:
      "Secondo voucher; policy della riserva può influire sugli accessi.",
  },

  "city-tour-mendoza": {
    subtitle:
      "Mezza giornata urbana: città fondativa, piazze, distretto civico, Parque San Martín e Cerro de la Gloria.",
    badges: [
      "Mezza giornata",
      "Itinerario classico",
      "Piazze e parco",
      "Mar · gio · sab",
    ],
    whyLove: [
      "Capire la griglia di Mendoza in poche ore.",
      "Salita al Cerro de la Gloria per vista d’insieme.",
      "Martedì, giovedì, sabato: facile da inserire.",
      "Buon primo giorno prima di cantine o montagna.",
    ],
    editorial: [
      "Mendoza si legge nelle piazze e nel parco: una griglia dove tutto è a «dieci isolati».",
      "Il tour collega il centro fondativo al distretto civico e al grande polmone verde, con fermate foto.",
      "Ritmo accessibile; idratarsi: il sole è forte anche in primavera.",
    ],
    places: [
      "Settore fondativo e piazze principali",
      "Distretto civico",
      "Parque General San Martín",
      "Cerro de la Gloria",
    ],
    included: [
      "Trasporto e tour secondo programma",
      "Guida / coordinamento secondo operatore",
    ],
    excluded: [
      "Pasti e bevande",
      "Musei se fermata opzionale a pagamento",
    ],
    practical: {
      whatToBring: [
        "Scarpe comode per camminare",
        "Cappello, protezione solare, acqua",
        "Telefono o fotocamera carico",
      ],
      restrictions:
        "Mobilità ridotta: verifica accessi al Cerro de la Gloria.",
      weather:
        "Pioggia leggera: raramente annullato; temporale: fermate modificabili.",
      pickupDetails:
        "Pickup hotel ~8:30 — confermare.",
    },
    faq: [
      {
        question: "Quanto si cammina?",
        answer:
          "Tratti a piedi in centro e parco; ritmo moderato con pause.",
      },
      {
        question: "Ingressi inclusi?",
        answer:
          "Circuito classico spesso senza ingressi; museo = supplemento se aggiunto.",
      },
      {
        question: "Adatto ai bambini?",
        answer:
          "Sì con idratazione e protezione solare; giornata calda possibile.",
      },
    ],
    testimonials: [
      {
        name: "Daniel K.",
        text: "Abbiamo capito la griglia: San Martín e la vista dal cerro hanno chiarito tutto il resto del viaggio.",
        rating: 5,
      },
    ],
    language: "Spagnolo / inglese secondo data (confermare)",
    groupSize: "Gruppo regolare",
    season: "Tutto l’anno (mar, gio, sab)",
    pickup: "Hotel Mendoza — da ~08:30 (confermare)",
    cancellation:
      "Secondo voucher; avvisa in anticipo se possibile.",
  },

  "valle-de-uco-cordon-del-plata": {
    subtitle:
      "Giornata panoramica nel Valle de Uco: mirador Cristo Rey, Manzano Histórico, corridoio produttivo e fermata opzionale alla Bodega Atamisque.",
    badges: [
      "Giornata intera",
      "Valle de Uco",
      "Paesaggio + vino opzionale",
      "Venerdì",
    ],
    whyLove: [
      "L’Uco in grande angolo: cordigliera, vigneti e paesi.",
      "Fermata Atamisque per degustazione opzionale (fuori tariffa base).",
      "Paesaggio prima, cantina dopo se vuoi.",
      "Venerdì: settimana facile da pianificare.",
    ],
    editorial: [
      "Il Valle de Uco si vive in curve: mirador, storia del Manzano e sensazione di valle aperta verso il Cordón del Plata.",
      "Equilibrio tra strada panoramica e fermata opzionale in cantina nota (pagamento separato se aggiungi degustazione).",
      "Pranzo non incluso: opzioni in strada secondo orario.",
    ],
    places: [
      "Mirador Cristo Rey",
      "Manzano Histórico",
      "Corridoio produttivo del Valle de Uco",
      "Bodega Atamisque (opzione)",
    ],
    included: [
      "Trasporto da Mendoza il venerdì",
      "Circuito panoramico con fermate",
      "Coordinamento Edmar Travel",
    ],
    excluded: [
      "Pranzo e bevande",
      "Degustazione e consumi ad Atamisque o altre opzioni",
    ],
    practical: {
      whatToBring: [
        "Strati e occhiali da sole; giornata lunga",
        "Soldi per pranzo e opzioni",
        "Acqua e snack",
      ],
      restrictions:
        "Molte ore in veicolo; segnala vertigini o problemi di salute.",
      weather:
        "Vento e sole forte; pioggia può ridurre la visibilità ai mirador.",
      pickupDetails:
        "Partenza ~7:30 da Mendoza — confermare.",
    },
    faq: [
      {
        question: "Solo paesaggio senza cantina?",
        answer:
          "Sì: la cantina è opzionale. Indica le preferenze in prenotazione.",
      },
      {
        question: "Durata giornata?",
        answer:
          "Giornata intera, rientro nel pomeriggio secondo stagione.",
      },
      {
        question: "Altri giorni oltre al venerdì?",
        answer:
          "Possibili uscite stagionali — chiedi disponibilità.",
      },
    ],
    testimonials: [
      {
        name: "Sophie e Marc",
        text: "Volevamo l’Uco senza maratona di degustazioni: strada e luce bastavano; Atamisque era il plus.",
        rating: 5,
      },
    ],
    language: "Spagnolo / inglese secondo operatore (confermare)",
    groupSize: "Gruppo regolare",
    season: "Venerdì + possibili uscite stagionali",
    pickup: "Mendoza — partenza ~07:30 (confermare)",
    cancellation:
      "Secondo voucher; costi opzionali in cantina possono variare.",
  },

  "epic-andes-adventure-trekking-hot-springs": {
    subtitle:
      "Giornata avventura a Cacheuta: trekking con viste sulle Ande e Potrerillos, chiusura alle terme — prossimamente disponibile.",
    badges: [
      "Prossimamente",
      "Posti limitati",
      "Trekking + terme",
      "Cacheuta",
    ],
    whyLove: [
      "Sforzo moderato–intenso poi relax alle acque termali.",
      "Grandi paesaggi di cordigliera e valle nello stesso giorno.",
      "Transfer, pranzo e copertura previsti secondo programma al lancio.",
      "Per chi vuole natura attiva vicino a Mendoza.",
    ],
    editorial: [
      "Esperienza in preparazione: sentieri di Cacheuta, viste Ande e valle, tempo alle terme per recuperare.",
      "Giornata intera, partenza mattutina e rientro in serata. Dettagli finali alla pubblicazione.",
      "Iscriviti agli avvisi per ondate di apertura a gruppi piccoli.",
    ],
    places: [
      "Sentieri e mirador di Cacheuta",
      "Panorami Ande e Potrerillos",
      "Complesso termale (secondo programma finale)",
    ],
    included: [
      "Da confermare al lancio: transfer, trekking guidato, terme secondo programma",
    ],
    excluded: [
      "Dettagli alla scheda finale",
    ],
    practical: {
      whatToBring: [
        "Scarpe da trekking, zaino, acqua e strati",
        "Costume e asciugamano per le terme",
        "Protezione solare e cappello",
      ],
      restrictions:
        "Valutazione della condizione fisica; sentieri irregolari.",
      weather:
        "Montagna e sole intenso; vento freddo possibile anche in estate.",
      pickupDetails:
        "Partenza indicativa ~9:00 da Mendoza — confermata all’apertura vendite.",
    },
    faq: [
      {
        question: "Quando le prenotazioni?",
        answer:
          "Stiamo finalizzando operatori e protocolli; annuncio su sito e WhatsApp.",
      },
      {
        question: "Livello trekking?",
        answer:
          "Moderato–impegnativo secondo tratto finale; dislivello pubblicato al lancio.",
      },
      {
        question: "Pasto incluso?",
        answer:
          "Obiettivo: pranzo incluso secondo programma — da confermare.",
      },
    ],
    testimonials: [],
    language: "Spagnolo / inglese (da confermare)",
    groupSize: "Gruppi piccoli — posti limitati",
    season: "Lancio prossimo — date a ondate",
    pickup: "Mendoza — partenza indicativa ~09:00 (confermare all’apertura)",
    cancellation:
      "Secondo voucher; conferma con Edmar Travel quando le prenotazioni saranno attive.",
  },
};
