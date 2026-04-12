import type { ExperienceRichContent } from "@/lib/experience-model";

/** Contenu enrichi PDP — français (produits 1–6). */
export const RICH_FR_A: Record<string, ExperienceRichContent> = {
  "cabalgata-picada-potrerillos": {
    subtitle:
      "Une chevauchée lente et cinématographique dans les contreforts andins, puis picada régionale et verre de vin face au barrage de Potrerillos.",
    badges: [
      "Départs quotidiens",
      "Los Camperitos",
      "Transfert inclus",
      "Accessible aux débutants",
    ],
    whyLove: [
      "Vues sur les collines sans course : espace, silence et lumière changeante.",
      "Chevauchée avec Los Camperitos : encadrement attentif et chevaux calmes.",
      "Le barrage comme finale : picada, vin et eau dans le même cadre.",
      "Transfert depuis le centre de Mendoza pour une journée fluide.",
    ],
    editorial: [
      "Potrerillos, c’est là où la vallée s’ouvre : longues vues, air pur et un rythme loin de la ville. Vous chevauchez avec Los Camperitos : mains locales, chevaux sereins et sentiers qui privilégient le paysage.",
      "La sortie dure environ une heure à cheval, mais la demi-journée inclut transfert, écuries, sentier et pause finale où la montagne rencontre l’eau : picada régionale et un verre de vin au bord du lac.",
      "Idéal pour couples et amis, y compris si vous n’avez jamais monté. Nous gérons le transfert depuis Mendoza centre pour que vous profitiez des vues.",
    ],
    places: [
      "Écuries Los Camperitos, Potrerillos",
      "Sentiers en hauteur avec vues andines",
      "Picnic et vin près du barrage de Potrerillos",
    ],
    included: [
      "Transfert aller-retour depuis Mendoza centre (hôtel ou point de rendez-vous)",
      "Chevauchée guidée d’environ 1 h avec Los Camperitos",
      "Picada régionale et un verre de vin au barrage",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Boissons au-delà du verre servi avec la picada",
      "Assurance voyage personnelle",
      "Pourboires (facultatif)",
      "Hôtel hors centre sauf accord à la réservation",
    ],
    practical: {
      whatToBring: [
        "Pantalon long et chaussures fermées (baskets avec bonne adhérence)",
        "Couches : soleil fort, brise près de l’eau",
        "Crème solaire, lunettes, petite bouteille d’eau",
        "Téléphone ou appareil photo chargé",
      ],
      restrictions:
        "Limites de poids/âge possibles ; précisez lors de la réservation. Non adapté si vous ne pouvez monter avec une brève assistance.",
      weather:
        "Météo changeante en montagne ; prévoir un léger imperméable. Horaires ajustables pour sécurité.",
      pickupDetails:
        "Prise en charge confirmée après réservation — hôtels du centre ou point fixe. Soyez prêt 10 minutes avant l’heure.",
    },
    faq: [
      {
        question: "Convient-il aux débutants ?",
        answer:
          "Oui. Allure uniquement au pas, chevaux calmes. Indiquez votre niveau à la réservation.",
      },
      {
        question: "Le transfert est-il inclus ?",
        answer:
          "Oui, aller-retour depuis Mendoza centre. Hors centre : supplément possible.",
      },
      {
        question: "Quelle tenue ?",
        answer:
          "Pantalon long, chaussures fermées, couches. Casquette ou chapeau recommandé.",
      },
      {
        question: "Le vin est-il inclus ?",
        answer:
          "Oui : un verre avec la picada au barrage. Autres boissons : selon disponibilité, en supplément.",
      },
    ],
    testimonials: [
      {
        name: "Helena & Tom",
        text: "Allure tranquille, belle lumière sur l’eau et une picada personnelle, pas un lunch standard.",
        rating: 5,
      },
    ],
    language: "Anglais & espagnol (confirmer à la réservation)",
    groupSize: "Petits groupes (souvent 8–12 personnes ; confirmer)",
    season: "Toute l’année (selon météo et disponibilité)",
    pickup: "Mendoza centre — hôtel ou point convenu",
    cancellation:
      "Selon conditions du bon ; demandez les options météo ou report.",
  },

  "mono-city-tour-mendoza": {
    subtitle:
      "Cinq places, le centre et le lac du parc San Martín en trottinette électrique, à votre rythme, casque et carte fournis.",
    badges: [
      "Autoguidé",
      "Trottinette électrique",
      "Casque + carte",
      "Deux créneaux/jour",
    ],
    whyLove: [
      "La ville sans bus : vous, le parc et le lac.",
      "Deux horaires : matin ou après-midi.",
      "Casque et carte ; itinéraire clair.",
      "Tarif selon taille de trottinette.",
    ],
    editorial: [
      "Mendoza se lit en places : le damier, les arbres et un rythme posé. Le Mono City Tour vous laisse choisir l’engin et le créneau pour voir l’essentiel sans guide.",
      "Le parc San Martín et le lac ferment naturellement la boucle : verdure et espace. Expérience urbaine légère pour commencer le voyage.",
      "Autoguidé : respectez pistes, piétons et règles locales. Casque attaché en permanence.",
    ],
    places: [
      "Les cinq places principales",
      "Rues du centre et repères urbains",
      "Boucle du lac au parc San Martín",
    ],
    included: [
      "Location de trottinette selon catégorie",
      "Casque et carte / orientation du circuit",
      "Deux plages horaires (matin et après-midi)",
    ],
    excluded: [
      "Assurance personnelle",
      "Repas ou boissons",
      "Amendes en cas de mauvaise utilisation",
    ],
    practical: {
      whatToBring: [
        "Pièce d’identité ou réservation sur téléphone",
        "Tenue confortable et chaussures fermées",
        "Batterie chargée si vous filmez",
      ],
      restrictions:
        "Âge minimum et conditions selon l’opérateur ; éviter forte pluie.",
      weather:
        "Orage : report possible selon politique de l’opérateur.",
      pickupDetails:
        "Point de rendez-vous confirmé à la réservation (zone centre).",
    },
    faq: [
      {
        question: "Faut-il de l’expérience ?",
        answer:
          "Pas obligatoire ; conduisez prudemment et suivez le briefing à la remise du matériel.",
      },
      {
        question: "Y a-t-il un guide ?",
        answer:
          "Non, circuit autoguidé avec carte et consignes.",
      },
      {
        question: "Et s’il pleut ?",
        answer:
          "Suspension ou report possible pour sécurité — confirmez à la réservation.",
      },
    ],
    testimonials: [
      {
        name: "Nico & Flo",
        text: "Comme si la ville s’ouvrait : pas de bus, juste nous, le parc et le lac.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais à l’accueil (confirmer)",
    groupSize: "Individuel ou petits groupes selon stock",
    season: "Toute l’année (selon météo et disponibilité)",
    pickup: "Mendoza centre — point confirmé à la réservation",
    cancellation:
      "Selon bon ; demandez report météo.",
  },

  "private-winery-transfers-mendoza": {
    subtitle:
      "Véhicule privé avec chauffeur jusqu’à 4 passagers : Maipú, Luján de Cuyo ou Valle de Uco, tarifs par région.",
    badges: [
      "Véhicule privé",
      "Jusqu’à 4 passagers",
      "Tarifs régionaux",
      "Chauffeur inclus",
    ],
    whyLove: [
      "Organisez votre journée de caves sans conduire.",
      "Tarifs clairs par zone viticole.",
      "Idéal couples et petits groupes.",
      "Coordination Edmar Travel.",
    ],
    editorial: [
      "Mendoza se vit sur de longues routes et des déjeuners qui s’allongent. Un transfert privé vous laisse enchaîner les visites sereinement.",
      "Maipú / Luján d’un côté, Valle de Uco de l’autre : plus de kilomètres pour l’Uco. Prise en charge depuis votre hébergement en ville.",
      "Le transfert ne remplace pas les réservations de visites : c’est du transport privé.",
    ],
    places: [
      "Routes de Maipú",
      "Luján de Cuyo",
      "Domaines du Valle de Uco",
    ],
    included: [
      "Véhicule privé avec chauffeur",
      "Attentes raisonnables selon itinéraire",
    ],
    excluded: [
      "Entrées, dégustations ou repas dans les domaines",
      "Péages ou extras non convenus",
      "Pourboires (facultatif)",
    ],
    practical: {
      whatToBring: [
        "Réservations de caves ou horaires",
        "Pièce d’identité",
        "Couche légère pour une longue journée",
      ],
      restrictions:
        "Capacité max 4 passagers ; gros bagages : demander à la réservation.",
      weather:
        "Haute saison : temps de route variable ; prévoir marge entre visites.",
      pickupDetails:
        "Prise en charge à Mendoza ville sauf autre accord.",
    },
    faq: [
      {
        question: "Les visites sont-elles incluses ?",
        answer:
          "Non, transport uniquement. Réservez vos caves séparément ; nous pouvons conseiller.",
      },
      {
        question: "Maipú et Uco le même jour ?",
        answer:
          "Rarement confortable : une région par jour est plus agréable.",
      },
      {
        question: "Siège enfant ?",
        answer:
          "À confirmer selon véhicule et réglementation.",
      },
    ],
    testimonials: [
      {
        name: "Alex & Jordan",
        text: "Enfin un long déjeuner et une 2e dégustation, le retour était réglé.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais avec le chauffeur (confirmer)",
    groupSize: "Jusqu’à 4 passagers",
    season: "Toute l’année (selon disponibilité)",
    pickup: "Mendoza — hôtel ou adresse convenue",
    cancellation:
      "Selon bon ; tarif régional figé à la réservation sauf accord contraire.",
  },

  "luxury-wine-experience-bodega-boutique": {
    subtitle:
      "Demi-journée dans un domaine boutique : visite guidée, dégustation et planche fromages-charcuterie, transferts depuis Mendoza.",
    badges: [
      "Domaine boutique",
      "Demi-journée",
      "Dégustation + planche",
      "Transferts inclus",
    ],
    whyLove: [
      "Rythme posé pour poser questions et savourer.",
      "Planche pensée pour accompagner les vins.",
      "Transferts depuis Mendoza centre.",
      "Ton premium pour couples et petits groupes.",
    ],
    editorial: [
      "Un domaine boutique, ce n’est pas seulement une visite : c’est une mise en scène sobre — lumière, table, explications sans effet spectacle.",
      "La dégustation s’accompagne d’une planche qui dialogue avec le style de la maison.",
      "Nous coordonnons les transferts pour que vous restiez concentrés sur le vin.",
    ],
    places: [
      "Salle de dégustation et chai ou vignoble (selon programme)",
      "Espace pour le service de planche",
    ],
    included: [
      "Transfert depuis Mendoza centre",
      "Visite et dégustation selon programme du domaine",
      "Planche fromages et charcuterie",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Vins ou produits hors menu inclus",
      "Pourboires (facultatif)",
      "Dépenses personnelles",
    ],
    practical: {
      whatToBring: [
        "Chaussures confortables pour vignoble ou cave",
        "Lunettes de soleil et protection UV en saison chaude",
        "Pièce d’identité",
      ],
      restrictions:
        "Mineurs selon politique du domaine. Consommation responsable.",
      weather:
        "Activités extérieures peuvent être ajustées selon météo.",
      pickupDetails:
        "Horaire et point de prise en charge confirmés à la réservation.",
    },
    faq: [
      {
        question: "Réservé aux experts ?",
        answer:
          "Non : le ton s’adapte au groupe, du curieux au passionné.",
      },
      {
        question: "Peut-on choisir le domaine ?",
        answer:
          "L’expérience est liée à une proposition boutique disponible ; demandez les options à la réservation.",
      },
      {
        question: "Planche végétarienne ?",
        answer:
          "Demandez à l’avance selon approvisionnement du jour.",
      },
    ],
    testimonials: [
      {
        name: "Camille & James",
        text: "Luxe discret : vin, lumière et table parfaitement alignés.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais selon domaine (confirmer)",
    groupSize: "Petits groupes (confirmer)",
    season: "Toute l’année (selon disponibilité)",
    pickup: "Mendoza centre — hôtel ou point convenu",
    cancellation:
      "Selon bon ; les domaines boutique peuvent exiger un préavis pour les modifications.",
  },

  "andes-experience-horseback-sunset-picnic": {
    subtitle:
      "Journée complète en haute montagne (Uspallata, Puente del Inca, Aconcagua, Las Cuevas) et fin à Potrerillos : chevauchée et picnic au barrage.",
    badges: [
      "Journée complète",
      "Départs quotidiens",
      "Andes + Potrerillos",
      "Transferts inclus",
    ],
    whyLove: [
      "Échelle des sommets le matin, silence du sentier au soir.",
      "Route mythique avec pauses photos.",
      "Fin en chevauchée et picnic au bord de l’eau.",
      "Transferts depuis Mendoza.",
    ],
    editorial: [
      "Deux mondes : la route classique vers l’ouest mendocin, puis Potrerillos où le rythme ralentit.",
      "En montagne, le temps se mesure en virages ; à Potrerillos, en pas de cheval et reflets sur le lac.",
      "Segments type Cristo Redentor : saisonniers — vérifiez ouvertures à la réservation.",
    ],
    places: [
      "Uspallata & Penitentes",
      "Puente del Inca · Parc provincial Aconcagua",
      "Las Cuevas (fenêtre déjeuner)",
      "Potrerillos — chevauchée et picnic au barrage",
    ],
    included: [
      "Transfert depuis Mendoza selon horaire du tour",
      "Circuit haute montagne avec arrêts selon conditions",
      "Chevauchée à Potrerillos et picnic avec vin (selon programme)",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Déjeuner en route (sauf indication)",
      "Taxes ou entrées optionnelles",
      "Activités hors programme",
    ],
    practical: {
      whatToBring: [
        "Couches thermiques et coupe-vent ; soleil fort en altitude",
        "Chaussures fermées confortables toute la journée",
        "Eau, snacks, argent pour le déjeuner",
        "Crème solaire, casquette, lunettes",
      ],
      restrictions:
        "Problèmes cardiaques graves : avis médical. Virages et altitude.",
      weather:
        "Neige ou vent peuvent fermer des tronçons ; itinéraire ajusté pour sécurité.",
      pickupDetails:
        "Départ matinal depuis Mendoza (~7:15 selon ramassages hôtels).",
    },
    faq: [
      {
        question: "Visite-t-on toujours le Cristo Redentor ?",
        answer:
          "Selon saison, météo et ouverture des cols — information actualisée à la réservation.",
      },
      {
        question: "Chevauchée pour débutants ?",
        answer:
          "Souvent au pas avec chevaux calmes ; indiquez votre condition physique.",
      },
      {
        question: "Mal des montagnes ?",
        answer:
          "Montée progressive ; consultez un médecin si antécédents.",
      },
    ],
    testimonials: [
      {
        name: "Marina & Greg",
        text: "L’échelle des montagnes puis le sentier tranquille au bord de l’eau : la journée valait chaque heure.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais (confirmer)",
    groupSize: "Selon véhicule (confirmer)",
    season:
      "Toute l’année avec routage saisonnier (segments hauts en été si ouverts)",
    pickup: "Mendoza centre — dès ~7:15 (confirmer)",
    cancellation:
      "Selon bon ; météo montagne peut imposer changements.",
  },

  "high-mountain-tour-mendoza": {
    subtitle:
      "Le circuit classique d’une journée : Cacheuta, Potrerillos, Uspallata, Puente del Inca, Aconcagua et Las Cuevas.",
    badges: [
      "Journée complète",
      "Itinéraire classique",
      "Points de vue Aconcagua",
      "Départs quotidiens",
    ],
    whyLove: [
      "Un seul départ pour les photos les plus emblématiques des Andes mendocins.",
      "Arrêts pour respirer et photographier.",
      "Idéal si vous n’avez qu’un jour sans louer de voiture.",
      "Ramassage depuis les hôtels de Mendoza.",
    ],
    editorial: [
      "Le tour haute montagne est le raccourci pour sentir l’échelle des Andes sans expédition : route, miradors, villages et silence près de l’Aconcagua.",
      "Journée longue : couche chaude, eau et patience. Déjeuner en route souvent à votre charge.",
      "Tronçons hauts saisonniers : votre opérateur confirme ce qui est accessible.",
    ],
    places: [
      "Cacheuta & Potrerillos",
      "Uspallata · Penitentes",
      "Puente del Inca · Parc Aconcagua",
      "Las Cuevas · (Cristo Redentor en saison)",
    ],
    included: [
      "Transport depuis Mendoza avec arrêts panoramiques",
      "Coordination selon opérateur",
    ],
    excluded: [
      "Déjeuner et boissons",
      "Entrées ou taxes sur sites",
      "Dépenses personnelles",
    ],
    practical: {
      whatToBring: [
        "Coupe-vent et couches ; soleil fort même par temps frais",
        "Chaussures confortables pour les arrêts",
        "Eau, snacks, argent pour le repas",
        "Appareil photo ou téléphone chargé",
      ],
      restrictions:
        "Mobilité très réduite : vérifier accès véhicule et arrêts.",
      weather:
        "Neige ou vent peuvent modifier le parcours ; sécurité d’abord.",
      pickupDetails:
        "Ramassage hôtels dès ~7:15 ; tournées ~45 min selon zone.",
    },
    faq: [
      {
        question: "Y a-t-il une longue randonnée ?",
        answer:
          "Plutôt de courtes pauses aux miradors, pas un trek de plusieurs heures.",
      },
      {
        question: "Avec enfants ?",
        answer:
          "Oui avec siège adapté et patience pour le temps de route ; âge minimum à confirmer.",
      },
      {
        question: "Et s’il neige ?",
        answer:
          "Fermeture possible des cols ; itinéraire adapté ou report selon politique.",
      },
    ],
    testimonials: [
      {
        name: "Elena R.",
        text: "Chaque arrêt avait un sens : retour fatigué au bon sens, zéro stress logistique.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais selon opérateur (confirmer)",
    groupSize: "Groupe régulier",
    season:
      "Toute l’année (Cristo Redentor en été si ouvert)",
    pickup: "Hôtels Mendoza — dès ~7:15 (tournées ~45 min)",
    cancellation:
      "Selon bon ; itinéraire modifiable pour sécurité.",
  },
};
