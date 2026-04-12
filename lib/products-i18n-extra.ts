import type { Locale } from "@/lib/i18n/config";
import type { ProductTranslation } from "@/lib/product-types";

/**
 * Traducciones de catálogo (FR / IT) fusionadas en `getProductById`.
 * ES y la base en inglés siguen en `products-data.ts` / campos por defecto.
 */
export const PRODUCT_I18N_EXTRA: Record<
  string,
  Partial<Record<Locale, ProductTranslation>>
> = {
  "cabalgata-picada-potrerillos": {
    fr: {
      title: "Cabalgata + Picada – Potrerillos",
      description:
        "Promenade à cheval guidée à Potrerillos avec vues de montagne, opérée par Los Camperitos, picada régionale et verre de vin face au barrage. Transferts depuis Mendoza centre ; départs matin ou après-midi.",
      shortDescription:
        "Chevauchée à Potrerillos avec vues andines, picada et vin au bord du lac. Transfert depuis Mendoza. Idéal pour débutants.",
      features: [
        "Vues panoramiques sans pression — espace, silence et lumière changeante.",
        "Chevauchée avec Los Camperitos : encadrement attentif et chevaux adaptés.",
        "Finale au barrage : picada, vin et eau dans le même cadre.",
        "Transfert depuis Mendoza centre pour une journée fluide.",
      ],
      seo: {
        title: "Chevauchée et picada à Potrerillos | Edmar Travel Mendoza",
        description:
          "Chevauchée guidée d’1 h à Potrerillos avec Los Camperitos, picada et vin face au barrage. Transferts depuis Mendoza. Départs quotidiens.",
        ogTitle: "Cabalgata + Picada – Potrerillos | Edmar Travel",
        ogDescription:
          "Andes, picada régionale et transferts inclus depuis Mendoza centre.",
      },
    },
    it: {
      title: "Cabalgata + Picada – Potrerillos",
      description:
        "Cavalcata guidata a Potrerillos con viste di montagna, Los Camperitos, picada regionale e calice di vino di fronte alla diga. Transfer da Mendoza centro; partenze mattina o pomeriggio.",
      shortDescription:
        "Cavalcata a Potrerillos con vista sulle Ande, picada e vino sulla diga. Transfer da Mendoza. Ideale per principianti.",
      features: [
        "Viste ampie senza fretta: spazio, silenzio e luce che cambia.",
        "Cavalcata con Los Camperitos: assistenza e cavalli tranquilli.",
        "Finale alla diga: picada, vino e acqua nella stessa inquadratura.",
        "Transfer da Mendoza centro per una giornata senza stress.",
      ],
      seo: {
        title: "Cavalcata e picada a Potrerillos | Edmar Travel Mendoza",
        description:
          "Cavalcata guidata di 1 h a Potrerillos con Los Camperitos, picada e vino alla diga. Transfer da Mendoza. Partenze giornaliere.",
        ogTitle: "Cabalgata + Picada – Potrerillos | Edmar Travel",
        ogDescription:
          "Ande, picada regionale e transfer inclusi da Mendoza centro.",
      },
    },
  },
  "mono-city-tour-mendoza": {
    fr: {
      title: "Scooter City Tour – Mendoza",
      description:
        "Parcours en trottinette électrique autoguidé : cinq places, centre et boucle du lac au parc San Martín. Casque et carte inclus. Deux créneaux par jour.",
      shortDescription:
        "Découvrez Mendoza en trottinette électrique : places, centre et lac au parc San Martín. Sans guide. Petit AR$ 20 000 · Grand AR$ 25 000.",
      features: [
        "La ville sans bus : vous, le parc et le lac.",
        "Deux horaires : matin ou après-midi.",
        "Casque et carte ; itinéraire clair.",
        "Tarif selon taille de trottinette.",
      ],
      seo: {
        title: "Mono City Tour Mendoza | Trottinette électrique | Edmar Travel",
        description:
          "City tour en trottinette autoguidé à Mendoza. Places, centre et parc San Martín. Casque et carte. Réservez votre créneau.",
        ogTitle: "Mono City Tour Mendoza | Edmar Travel",
        ogDescription:
          "Places, centre et Parque San Martín en trottinette électrique, à votre rythme.",
      },
    },
    it: {
      title: "Scooter City Tour – Mendoza",
      description:
        "Percorso autoguidato in monopattino elettrico: cinque piazze, centro e giro del lago al Parque San Martín. Casco e mappa inclusi. Due turni al giorno.",
      shortDescription:
        "Scopri Mendoza in monopattino elettrico: piazze, centro e lago al Parque San Martín. Senza guida. Piccolo AR$ 20.000 · Grande AR$ 25.000.",
      features: [
        "La città senza bus: tu, il parco e il lago.",
        "Due fasce orarie: mattina o pomeriggio.",
        "Casco e mappa; percorso chiaro.",
        "Prezzo per tipo di monopattino.",
      ],
      seo: {
        title: "Scooter City Tour Mendoza | Monopattino elettrico | Edmar Travel",
        description:
          "City tour in monopattino autoguidato a Mendoza. Piazze, centro e Parque San Martín. Casco e mappa. Prenota il turno.",
        ogTitle: "Mono City Tour Mendoza | Edmar Travel",
        ogDescription:
          "Piazze, centro e Parque San Martín in monopattino elettrico, al tuo ritmo.",
      },
    },
  },
  "private-winery-transfers-mendoza": {
    fr: {
      title: "Transferts privés vers les domaines – Mendoza",
      description:
        "Véhicule privé avec chauffeur jusqu’à 4 passagers vers Maipú, Luján de Cuyo ou Valle de Uco. Tarifs par région. Confort pour profiter du vin sans conduire.",
      shortDescription:
        "Transferts privés vers les caves (jusqu’à 4 personnes). Maipú/Luján AR$ 100 000 · Valle de Uco AR$ 140 000. Visites et réservations non incluses.",
      features: [
        "Organisez votre journée sans conduire.",
        "Tarifs clairs par zone viticole.",
        "Idéal pour couples et petits groupes.",
        "Coordination Edmar Travel.",
      ],
      seo: {
        title: "Transferts privés vers les caves à Mendoza | Edmar Travel",
        description:
          "Service de véhicule privé pour les circuits viticoles Mendoza. Jusqu’à 4 passagers. Tarifs Maipú/Luján et Valle de Uco.",
        ogTitle: "Transferts privés bodegas | Edmar Travel",
        ogDescription:
          "Véhicule privé avec chauffeur pour circuits Maipú, Luján et Valle de Uco.",
      },
    },
    it: {
      title: "Transfer privati verso le cantine – Mendoza",
      description:
        "Auto privata con autista fino a 4 passeggeri verso Maipú, Luján de Cuyo o Valle de Uco. Tariffe per regione. Comfort per godere del vino senza guidare.",
      shortDescription:
        "Transfer privati verso le cantine (fino a 4 persone). Maipú/Luján AR$ 100.000 · Valle de Uco AR$ 140.000. Visite e prenotazioni non incluse.",
      features: [
        "Organizza la giornata senza guidare.",
        "Tariffe chiare per zona viticola.",
        "Ideale per coppie e piccoli gruppi.",
        "Coordinamento Edmar Travel.",
      ],
      seo: {
        title: "Transfer privati verso le cantine a Mendoza | Edmar Travel",
        description:
          "Servizio auto privato per i circuiti viticoli a Mendoza. Fino a 4 passeggeri. Tariffe Maipú/Luján e Valle de Uco.",
        ogTitle: "Transfer privati cantine | Edmar Travel",
        ogDescription:
          "Auto privata con autista per circuiti Maipú, Luján e Valle de Uco.",
      },
    },
  },
  "luxury-wine-experience-bodega-boutique": {
    fr: {
      title: "Luxury Wine Experience – Bodega Boutique",
      description:
        "Demi-journée dans un domaine boutique premium : visite guidée, dégustation et planche fromages-charcuterie. Transferts depuis Mendoza centre.",
      shortDescription:
        "Expérience vin boutique demi-matinée : visite, dégustation et planche. Transfert depuis Mendoza. AR$ 140 000 par personne.",
      features: [
        "Rythme posé pour poser questions et savourer.",
        "Planche pensée pour accompagner les vins.",
        "Transferts depuis Mendoza centre.",
        "Ton premium pour couples et petits groupes.",
      ],
      seo: {
        title: "Expérience vin boutique à Mendoza | Edmar Travel",
        description:
          "Demi-journée dans un domaine boutique : dégustation, planche, transferts depuis la ville.",
        ogTitle: "Luxury Wine Experience | Edmar Travel",
        ogDescription:
          "Demi-journée en domaine boutique avec dégustation et planche fromages-charcuterie.",
      },
    },
    it: {
      title: "Luxury Wine Experience – Bodega Boutique",
      description:
        "Mezza giornata in una cantina boutique premium: visita guidata, degustazione e tagliere formaggi e salumi. Transfer da Mendoza centro.",
      shortDescription:
        "Esperienza vino boutique mezza mattina: visita, degustazione e tagliere. Transfer da Mendoza. AR$ 140.000 a persona.",
      features: [
        "Ritmo calmo per domande e assaggi.",
        "Tagliere pensato per accompagnare i vini.",
        "Transfer da Mendoza centro.",
        "Tono premium per coppie e piccoli gruppi.",
      ],
      seo: {
        title: "Esperienza vino boutique a Mendoza | Edmar Travel",
        description:
          "Mezza giornata in cantina boutique: degustazione, tagliere, transfer dalla città.",
        ogTitle: "Luxury Wine Experience | Edmar Travel",
        ogDescription:
          "Mezza giornata in cantina boutique con degustazione e tagliere gourmet.",
      },
    },
  },
  "andes-experience-horseback-sunset-picnic": {
    fr: {
      title: "Andes Experience + Cabalgata et Picnic au Coucher du Soleil",
      description:
        "Journée complète en haute montagne (Uspallata, Puente del Inca, Aconcagua, Las Cuevas) et fin à Potrerillos : chevauchée et picnic au barrage. Départs quotidiens. Transferts depuis Mendoza. Déjeuner non inclus.",
      shortDescription:
        "Journée complète : route andine + chevauchée à Potrerillos et picnic au barrage. Transferts inclus. AR$ 150 000/pers. Cristo Redentor selon saison.",
      features: [
        "Échelle des sommets le matin, silence du sentier le soir.",
        "Route mythique avec pauses photos.",
        "Fin en chevauchée et picnic au bord de l’eau.",
        "Transferts depuis Mendoza.",
      ],
      seo: {
        title: "Tour Haute Montagne + chevauchée Potrerillos | Edmar Travel",
        description:
          "Expérience journée complète dans les Andes mendocines et fin à Potrerillos. Transferts depuis la ville.",
        ogTitle: "Andes Experience + Picnic | Edmar Travel",
        ogDescription:
          "Haute montagne mythique et fin en chevauchée au bord du barrage.",
      },
    },
    it: {
      title: "Andes Experience + Cavalcata e Picnic al Tramonto",
      description:
        "Giornata intera in alta montagna (Uspallata, Puente del Inca, Aconcagua, Las Cuevas) e chiusura a Potrerillos: cavalcata e picnic alla diga. Partenze giornaliere. Transfer da Mendoza. Pranzo non incluso.",
      shortDescription:
        "Giornata intera: strada andina + cavalcata a Potrerillos e picnic alla diga. Transfer inclusi. AR$ 150.000/pers. Cristo Redentor stagionale.",
      features: [
        "Scala delle vette al mattino, silenzio del sentiero alla sera.",
        "Rotta iconica con soste fotografiche.",
        "Chiusura in cavalcata e picnic sull’acqua.",
        "Transfer da Mendoza.",
      ],
      seo: {
        title: "Tour Alta Montagna + cavalcata Potrerillos | Edmar Travel",
        description:
          "Esperienza full day nelle Ande mendocine e chiusura a Potrerillos. Transfer dalla città.",
        ogTitle: "Andes Experience + Picnic | Edmar Travel",
        ogDescription:
          "Alta montagna iconica e chiusura in cavalcata di fronte alla diga.",
      },
    },
  },
  "high-mountain-tour-mendoza": {
    fr: {
      title: "Tour Haute Montagne – Mendoza",
      description:
        "Circuit classique d’une journée : Cacheuta, Potrerillos, Uspallata, Puente del Inca, Parc Aconcagua, Las Cuevas. Déjeuner non inclus. Cristo Redentor en été selon conditions. Départs quotidiens.",
      shortDescription:
        "Tour haute montagne depuis Mendoza : les paysages les plus emblématiques des Andes. Transferts depuis les hôtels dès 7h15. AR$ 86 000/pers.",
      features: [
        "Une seule sortie pour les points de vue les plus photographiés.",
        "Arrêts pour respirer et photographier.",
        "Ramassage depuis les hôtels de Mendoza.",
        "Journée complète sur la route de la cordillère.",
      ],
      seo: {
        title: "Tour Haute Montagne Mendoza | Aconcagua | Edmar Travel",
        description:
          "Journée complète dans la cordillère : Uspallata, Puente del Inca, Aconcagua et plus. Départs quotidiens.",
        ogTitle: "High Mountain Tour | Edmar Travel",
        ogDescription:
          "Circuit journée complète classique dans la cordillère mendocine.",
      },
    },
    it: {
      title: "Tour Alta Montagna – Mendoza",
      description:
        "Circuito classico di un giorno: Cacheuta, Potrerillos, Uspallata, Puente del Inca, Parco Aconcagua, Las Cuevas. Pranzo non incluso. Cristo Redentor in estate secondo condizioni. Partenze giornaliere.",
      shortDescription:
        "Tour alta montagna da Mendoza: i paesaggi più iconici delle Ande. Transfer dagli hotel dalle 7:15. AR$ 86.000/pers.",
      features: [
        "Un’unica uscita per i mirador più fotografati.",
        "Soste per respirare e fotografare.",
        "Pickup dagli hotel di Mendoza.",
        "Giornata intera sulla strada della cordigliera.",
      ],
      seo: {
        title: "Tour Alta Montagna Mendoza | Aconcagua | Edmar Travel",
        description:
          "Giornata intera nella cordigliera: Uspallata, Puente del Inca, Aconcagua e altro. Partenze giornaliere.",
        ogTitle: "High Mountain Tour | Edmar Travel",
        ogDescription:
          "Circuito classico di giornata intera nella cordigliera mendocina.",
      },
    },
  },
  "half-day-winery-tour-maipu": {
    fr: {
      title: "Tour des caves demi-journée – Maipú",
      description:
        "Après-midi introductif à Maipú : cave artisanale, industrielle, huile d’olive et vin doux. 4 visites. Dégustations incluses. Ramassage hôtels dès 14h. Lun–sam.",
      shortDescription:
        "Après-midi à Maipú : 4 arrêts, vin, huile et moelleux. Tout inclus. AR$ 48 000/pers. Retour ~20h.",
      features: [
        "Panorama compact des styles de caves.",
        "Dégustations incluses selon programme.",
        "Ramassage hôtels dès 14h.",
        "Retour en soirée.",
      ],
      seo: {
        title: "Tour des caves Maipú après-midi | Edmar Travel",
        description:
          "Circuit à Maipú avec dégustations incluses. Départs du lundi au samedi.",
        ogTitle: "Tour bodegas Maipú | Edmar Travel",
        ogDescription:
          "Quatre arrêts à Maipú avec dégustations incluses.",
      },
    },
    it: {
      title: "Tour cantine mezza giornata – Maipú",
      description:
        "Pomeriggio introduttivo a Maipú: cantina artigianale, industriale, olio d’oliva e vino dolce. 4 visite. Degustazioni incluse. Pickup hotel dalle 14:00. Lun–sab.",
      shortDescription:
        "Pomeriggio a Maipú: 4 tappe, vino, olio e dolce. Tutto incluso. AR$ 48.000/pers. Rientro ~20:00.",
      features: [
        "Panorama compatto degli stili di cantina.",
        "Degustazioni incluse secondo programma.",
        "Pickup hotel dalle 14:00.",
        "Rientro in serata.",
      ],
      seo: {
        title: "Tour cantine Maipú pomeriggio | Edmar Travel",
        description:
          "Circuito a Maipú con degustazioni incluse. Partenze da lunedì a sabato.",
        ogTitle: "Tour bodegas Maipú | Edmar Travel",
        ogDescription:
          "Quattro tappe a Maipú con degustazioni incluse.",
      },
    },
  },
  "canon-del-atuel-san-rafael-tour": {
    fr: {
      title: "Canyon de l’Atuel et San Rafael – Journée complète",
      description:
        "Excursion depuis Mendoza vers San Rafael et le canyon de l’Atuel par la Ruta 40. Ville et quartier historique, canyon et temps libre à Valle Grande (options payantes). Jeudis et dimanches. AR$ 99 000/pers.",
      shortDescription:
        "Journée complète au sud : San Rafael, canyon de l’Atuel et Valle Grande. ~3 h de route. Retour ~21h. Jeudis et dimanches.",
      features: [
        "Ville, canyon et espace ouvert le même jour.",
        "Temps libre à Valle Grande pour options.",
        "Départs programmés jeudi et dimanche.",
        "Journée intense — prévoyez confort pour la route.",
      ],
      seo: {
        title: "Excursion Canyon de l’Atuel et San Rafael | Edmar Travel",
        description:
          "Journée complète depuis Mendoza vers le canyon et Valle Grande. Vérifiez les dates.",
        ogTitle: "Cañón del Atuel | Edmar Travel",
        ogDescription:
          "Excursion journée complète au sud de Mendoza.",
      },
    },
    it: {
      title: "Canyon dell’Atuel e San Rafael – Giornata intera",
      description:
        "Escursione da Mendoza a San Rafael e al canyon dell’Atuel via Ruta 40. Città e storico, canyon e tempo libero a Valle Grande (opzioni a pagamento). Giovedì e domeniche. AR$ 99.000/pers.",
      shortDescription:
        "Giornata intera a sud: San Rafael, canyon dell’Atuel e Valle Grande. ~3 h di strada. Rientro ~21:00. Giovedì e domeniche.",
      features: [
        "Città, canyon e spazio aperto nello stesso giorno.",
        "Tempo libero a Valle Grande per opzioni.",
        "Partenze programmate giovedì e domenica.",
        "Giornata intensa — comfort per la strada.",
      ],
      seo: {
        title: "Escursione Canyon dell’Atuel e San Rafael | Edmar Travel",
        description:
          "Giornata intera da Mendoza verso il canyon e Valle Grande. Verificare le date.",
        ogTitle: "Cañón del Atuel | Edmar Travel",
        ogDescription:
          "Escursione di giornata intera a sud di Mendoza.",
      },
    },
  },
  "villavicencio-nature-reserve-tour": {
    fr: {
      title: "Réserve naturelle Villavicencio – Tour",
      description:
        "Demi-journée à la réserve naturelle Villavicencio : sentiers avec guides, centre d’interprétation, hôtel historique et chapelle, montée aux caracoles. Entrée non incluse (~AR$ 25 000). Mercredis et samedis. AR$ 50 000 le tour.",
      shortDescription:
        "Tour à Villavicencio : nature, histoire et mirador. Ramassage dès 8h. Entrée parc en supplément. Mercredis et samedis.",
      features: [
        "Nature et histoire hors du circuit vin.",
        "Hôtel et chapelle comme décor d’époque.",
        "Mirador des caracoles pour un panorama large.",
        "Demi-journée facile à combiner.",
      ],
      seo: {
        title: "Tour Villavicencio depuis Mendoza | Edmar Travel",
        description:
          "Demi-journée dans la réserve Villavicencio. Vérifiez dates et tarifs d’entrée.",
        ogTitle: "Reserva Villavicencio | Edmar Travel",
        ogDescription:
          "Nature et histoire dans la réserve mendocine.",
      },
    },
    it: {
      title: "Riserva naturale Villavicencio – Tour",
      description:
        "Mezza giornata nella riserva naturale Villavicencio: sentieri con guide, centro di interpretazione, hotel storico e cappella, salita ai caracoles. Ingresso non incluso (~AR$ 25.000). Mercoledì e sabati. AR$ 50.000 il tour.",
      shortDescription:
        "Tour a Villavicencio: natura, storia e mirador. Pickup dalle 8:00. Ingresso parco a parte. Mercoledì e sabati.",
      features: [
        "Natura e storia fuori dal circuito vino.",
        "Hotel e cappella come scenario d’epoca.",
        "Mirador dei caracoles per panorama ampio.",
        "Mezza giornata facile da combinare.",
      ],
      seo: {
        title: "Tour Villavicencio da Mendoza | Edmar Travel",
        description:
          "Mezza giornata nella riserva Villavicencio. Verificare date e tariffe ingresso.",
        ogTitle: "Reserva Villavicencio | Edmar Travel",
        ogDescription:
          "Natura e storia nella riserva mendocina.",
      },
    },
  },
  "city-tour-mendoza": {
    fr: {
      title: "City Tour – Mendoza",
      description:
        "Tour urbain demi-matinée : ville fondatrice, places, district civique, Parque General San Martín et Cerro de la Gloria. Ramassage hôtels dès 8h30. Mardi, jeudi, samedi. AR$ 31 000/pers.",
      shortDescription:
        "Parcours classique de Mendoza : histoire, places, parc et mirador. Idéal pour commencer le voyage.",
      features: [
        "Comprendre la grille de Mendoza en quelques heures.",
        "Cerro de la Gloria pour vue d’ensemble.",
        "Mardi, jeudi, samedi.",
        "Rythme accessible ; hydratez-vous.",
      ],
      seo: {
        title: "City Tour Mendoza | Edmar Travel",
        description:
          "Demi-journée dans la ville : places, parc San Martín et Cerro de la Gloria.",
        ogTitle: "City Tour Mendoza | Edmar Travel",
        ogDescription:
          "Parcours classique de la ville et du grand parc.",
      },
    },
    it: {
      title: "City Tour – Mendoza",
      description:
        "Tour urbano mezza mattina: città fondativa, piazze, distretto civico, Parque General San Martín e Cerro de la Gloria. Pickup hotel dalle 8:30. Martedì, giovedì, sabato. AR$ 31.000/pers.",
      shortDescription:
        "Percorso classico di Mendoza: storia, piazze, parco e mirador. Ideale per iniziare il viaggio.",
      features: [
        "Capire la griglia di Mendoza in poche ore.",
        "Cerro de la Gloria per vista d’insieme.",
        "Martedì, giovedì, sabato.",
        "Ritmo accessibile; idratarsi.",
      ],
      seo: {
        title: "City Tour Mendoza | Edmar Travel",
        description:
          "Mezza giornata in città: piazze, Parque San Martín e Cerro de la Gloria.",
        ogTitle: "City Tour Mendoza | Edmar Travel",
        ogDescription:
          "Percorso classico della città e del grande parco.",
      },
    },
  },
  "valle-de-uco-cordon-del-plata": {
    fr: {
      title: "Valle de Uco et Cordón del Plata",
      description:
        "Journée panoramique au Valle de Uco : Cristo Rey, Manzano Histórico, corridor productif et arrêt à Bodega Atamisque (dégustation optionnelle, non incluse). Déjeuner non inclus. Vendredis. AR$ 86 000 le tour.",
      shortDescription:
        "Journée complète au Valle de Uco avec vues sur le Cordón del Plata. Arrêt Atamisque (extra). Déjeuner à part. Vendredis.",
      features: [
        "L’Uco en grand angle : cordillère et vignes.",
        "Option dégustation à Atamisque.",
        "Vendredis : semaine simple à planifier.",
        "Paysage d’abord, cave ensuite si vous le souhaitez.",
      ],
      seo: {
        title: "Tour Valle de Uco et Cordón del Plata | Edmar Travel",
        description:
          "Circuit panoramique dans le Valle de Uco depuis Mendoza. Vérifiez les dates.",
        ogTitle: "Valle de Uco | Edmar Travel",
        ogDescription:
          "Paysage panoramique et arrêt optionnel à Bodega Atamisque.",
      },
    },
    it: {
      title: "Valle de Uco e Cordón del Plata",
      description:
        "Giornata panoramica nel Valle de Uco: Cristo Rey, Manzano Histórico, corridoio produttivo e fermata alla Bodega Atamisque (degustazione opzionale, non inclusa). Pranzo non incluso. Venerdì. AR$ 86.000 il tour.",
      shortDescription:
        "Giornata intera nel Valle de Uco con viste sul Cordón del Plata. Fermata Atamisque (extra). Pranzo a parte. Venerdì.",
      features: [
        "L’Uco in grande angolo: cordigliera e vigneti.",
        "Opzione degustazione ad Atamisque.",
        "Venerdì: settimana facile da pianificare.",
        "Paesaggio prima, cantina dopo se vuoi.",
      ],
      seo: {
        title: "Tour Valle de Uco e Cordón del Plata | Edmar Travel",
        description:
          "Circuito panoramico nel Valle de Uco da Mendoza. Verificare le date.",
        ogTitle: "Valle de Uco | Edmar Travel",
        ogDescription:
          "Paesaggio panoramico e fermata opzionale alla Bodega Atamisque.",
      },
    },
  },
  "epic-andes-adventure-trekking-hot-springs": {
    fr: {
      title: "Epic Andes Adventure – Randonnée + Sources chaudes",
      description:
        "Journée complète à Cacheuta : randonnée modérée à exigeante (~5 km), vues sur les Andes et Potrerillos, fin aux sources chaudes. Inclut transfert, déjeuner, photos et assurance accidents. Places limitées — bientôt disponible.",
      shortDescription:
        "Aventure à Cacheuta : randonnée + sources. ~9h–19h. Bientôt — liste d’attente. AR$ 95 000/pers.",
      features: [
        "Effort puis détente aux eaux thermales.",
        "Grands paysages de cordillère et vallée.",
        "Bientôt : transfert, déjeuner et assurance selon programme.",
        "Petits groupes au lancement.",
      ],
      seo: {
        title: "Randonnée et sources chaudes Cacheuta | Epic Andes | Edmar Travel",
        description:
          "Aventure journée complète dans les Andes mendocines. Bientôt disponible.",
        ogTitle: "Epic Andes Adventure | Edmar Travel",
        ogDescription:
          "Randonnée et sources chaudes à Cacheuta — bientôt disponible.",
      },
    },
    it: {
      title: "Epic Andes Adventure – Trekking + Terme",
      description:
        "Giornata intera a Cacheuta: trekking moderato–impegnativo (~5 km), viste sulle Ande e Potrerillos, chiusura alle terme. Include transfer, pranzo, foto e assicurazione infortuni. Posti limitati — prossimamente disponibile.",
      shortDescription:
        "Avventura a Cacheuta: trekking + terme. ~9:00–19:00. Prossimamente — lista d’attesa. AR$ 95.000/pers.",
      features: [
        "Sforzo poi relax alle acque termali.",
        "Grandi paesaggi di cordigliera e valle.",
        "Prossimamente: transfer, pranzo e assicurazione secondo programma.",
        "Piccoli gruppi al lancio.",
      ],
      seo: {
        title: "Trekking e terme Cacheuta | Epic Andes | Edmar Travel",
        description:
          "Avventura di giornata intera nelle Ande mendocine. Prossimamente disponibile.",
        ogTitle: "Epic Andes Adventure | Edmar Travel",
        ogDescription:
          "Trekking e terme a Cacheuta — prossimamente disponibile.",
      },
    },
  },
};
