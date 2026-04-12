import type { ExperienceRichContent } from "@/lib/experience-model";

/** Contenu enrichi PDP — français (produits 7–12). */
export const RICH_FR_B: Record<string, ExperienceRichContent> = {
  "half-day-winery-tour-maipu": {
    subtitle:
      "Après-midi à Maipú : quatre arrêts — domaine artisanal, industriel, huile d’olive et vin doux — dégustations incluses.",
    badges: [
      "Après-midi",
      "4 visites",
      "Dégustations incluses",
      "Classique Maipú",
    ],
    whyLove: [
      "Un panorama compact des styles de caves en une sortie.",
      "Dégustations selon programme : vin, huile et moelleux.",
      "Ramassage hôtels dès 14h ; retour vers 20h.",
      "Idéal si vous arrivez tard mais voulez le goût de la région.",
    ],
    editorial: [
      "Maipú est une porte d’entrée : histoire industrielle et petites caves, plus l’huile et le doux pour équilibrer l’après-midi.",
      "Rythme pédagogique : marcher, sentir, comparer.",
      "Ramassage coordonné depuis les hôtels — point exact à confirmer.",
    ],
    places: [
      "Domaine artisanal — Maipú",
      "Domaine industriel — Maipú",
      "Fabrique d’huile d’olive",
      "Cave de vins doux",
    ],
    included: [
      "Transport du circuit selon programme",
      "Visites et dégustations annoncées au tarif",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Repas complets hors dégustations",
      "Achats en cave",
      "Pourboires (facultatif)",
    ],
    practical: {
      whatToBring: [
        "Chaussures confortables pour cave et fabrique",
        "Eau et protection solaire",
        "Moyen de paiement si achats",
      ],
      restrictions:
        "Consommation responsable ; mineurs selon règles de chaque site.",
      weather:
        "Pluie légère : rarement annulé ; orage : ordre des visites modifiable.",
      pickupDetails:
        "Ramassage hôtels Mendoza dès ~14h ; tournées ~45 min.",
    },
    faq: [
      {
        question: "Déjeuner inclus ?",
        answer:
          "Non : visites avec dégustations ; dîner possible au retour en ville.",
      },
      {
        question: "Achat de bouteilles ?",
        answer:
          "Oui selon caves ; renseignez-vous sur envois et bagages.",
      },
      {
        question: "Visite en anglais ?",
        answer:
          "Selon date et opérateur — demandez à la réservation.",
      },
    ],
    testimonials: [
      {
        name: "Priya & Sam",
        text: "Vin doux et huile le même après-midi : Maipú en un seul tour.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais selon guide (confirmer)",
    groupSize: "Groupe régulier",
    season: "Toute l’année (lun–sam ; selon caves)",
    pickup: "Hôtels Mendoza — dès ~14h (tournées ~45 min)",
    cancellation:
      "Selon bon ; prévenez Edmar Travel à l’avance pour tout changement.",
  },

  "canon-del-atuel-san-rafael-tour": {
    subtitle:
      "Journée complète vers le sud : San Rafael, canyon de l’Atuel et temps à Valle Grande — jeudis et dimanches.",
    badges: [
      "Journée complète",
      "Route 40 sud",
      "Canyon de l’Atuel",
      "Jeu & dim",
    ],
    whyLove: [
      "Ville, canyon et espace ouvert le même jour.",
      "Contraste après les vignobles.",
      "Temps libre à Valle Grande pour options payantes.",
      "Départs planifiés sans improviser la voiture.",
    ],
    editorial: [
      "Le sud mendocin change d’échelle : longues routes, ciel large et l’Atuel sculptant la roche.",
      "Journée intense : reposez-vous bien, eau et coupe-vent. Options Valle Grande (catamaran, rafting) en supplément.",
      "Jeudis et dimanches : réservez tôt en haute saison.",
    ],
    places: [
      "San Rafael — centre et quartier historique",
      "Canyon de l’Atuel",
      "Valle Grande (activités optionnelles)",
    ],
    included: [
      "Transport depuis Mendoza",
      "Circuit selon itinéraire du jour",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Déjeuner et boissons",
      "Activités optionnelles à Valle Grande",
      "Entrées le cas échéant",
    ],
    practical: {
      whatToBring: [
        "Petit-déjeuner solide et encas pour le bus",
        "Eau, casquette, crème solaire",
        "Argent pour repas et options",
        "Coupe-vent : vent possible dans le canyon",
      ],
      restrictions:
        "Longues heures assises ; déconseillé si vous ne supportez pas ~3h de route sans longue pause.",
      weather:
        "Chaleur en été ; fraîcheur à l’ombre ; pluie occasionnelle.",
      pickupDetails:
        "Départ ~7h depuis hôtels Mendoza — confirmer.",
    },
    faq: [
      {
        question: "Durée depuis Mendoza ?",
        answer:
          "Environ 3h par tronçon selon trafic ; journée aller-retour complète.",
      },
      {
        question: "Rafting inclus ?",
        answer:
          "Non : activités payantes sur place selon disponibilité.",
      },
      {
        question: "Guide toute la journée ?",
        answer:
          "Coordination du service ; guides locaux possibles sur certains sites.",
      },
    ],
    testimonials: [
      {
        name: "Chris & Mira",
        text: "Nous étions venus pour le vin — ce jour nous a rappelé que Mendoza, c’est aussi montagne et rivière.",
        rating: 5,
      },
    ],
    language: "Espagnol (confirmer bilingue)",
    groupSize: "Groupe régulier",
    season: "Jeudis et dimanches (selon saison)",
    pickup: "Hôtels Mendoza — dès ~07h (tournées ~45 min)",
    cancellation:
      "Selon bon ; prévenir tôt pour les longues distances.",
  },

  "villavicencio-nature-reserve-tour": {
    subtitle:
      "Demi-journée à la réserve naturelle Villavicencio : sentiers, centre d’interprétation, hôtel historique et mirador des caracoles.",
    badges: [
      "Demi-journée",
      "Réserve naturelle",
      "Hôtel historique",
      "Mer & sam",
    ],
    whyLove: [
      "Mendoza sans verres : nature, histoire et vues.",
      "Hôtel Villavicencio et chapelle comme décor d’époque.",
      "Montée aux caracoles pour un panorama large.",
      "Mercredis et samedis : facile à combiner.",
    ],
    editorial: [
      "Villavicencio est un souffle vert avant l’aridité : chemins, faune discrète et poids historique de l’hôtel.",
      "Entrée à la réserve souvent en supplément — tarif en vigueur à la réservation.",
      "Couches, chaussures fermées, soleil et vent en hauteur.",
    ],
    places: [
      "Sentiers de la réserve Villavicencio",
      "Centre d’interprétation",
      "Hôtel historique, chapelle et mirador des caracoles",
    ],
    included: [
      "Transport depuis Mendoza",
      "Tour demi-journée selon programme",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Entrée à la réserve (tarif séparé)",
      "Repas et boissons",
      "Dépenses personnelles",
    ],
    practical: {
      whatToBring: [
        "Chaussures de randonnée",
        "Eau, crème solaire, casquette",
        "Argent pour l’entrée",
      ],
      restrictions:
        "Respecter les sentiers et les consignes du garde.",
      weather:
        "Vent et soleil fort ; pluie possible printemps/automne.",
      pickupDetails:
        "Ramassage hôtels ~8h — confirmer.",
    },
    faq: [
      {
        question: "Prix de l’entrée ?",
        answer:
          "Fixé par la réserve ; demandez le montant à la réservation.",
      },
      {
        question: "Difficulté physique ?",
        answer:
          "Marches modérées et montée au mirador ; pas un trek alpin mais bonne condition utile.",
      },
      {
        question: "Avec jeunes enfants ?",
        answer:
          "Oui avec hydratation et patience ; âge minimum selon activités.",
      },
    ],
    testimonials: [
      {
        name: "Isabel T.",
        text: "Enfin une matinée mendocine sans vin : vent, lumière et ces vieux murs d’hôtel.",
        rating: 5,
      },
    ],
    language: "Espagnol (guide selon programme)",
    groupSize: "Groupe régulier",
    season: "Mercredis et samedis (horaires de la réserve)",
    pickup: "Hôtels Mendoza — dès ~08h (tournées ~45 min)",
    cancellation:
      "Selon bon ; politique de la réserve peut affecter l’accès.",
  },

  "city-tour-mendoza": {
    subtitle:
      "Demi-journée urbaine : ville fondatrice, places, district civique, parc San Martín et Cerro de la Gloria.",
    badges: [
      "Demi-journée",
      "Itinéraire classique",
      "Places & parc",
      "Mar · jeu · sam",
    ],
    whyLove: [
      "Comprendre la trame de Mendoza en quelques heures.",
      "Montée au Cerro de la Gloria pour vue d’ensemble.",
      "Mardi, jeudi, samedi : facile à placer.",
      "Bon premier jour avant caves ou montagne.",
    ],
    editorial: [
      "Mendoza se lit par ses places et son parc : une grille où tout est à « dix pâtés de maisons ».",
      "Le tour relie le centre fondateur au district civique et au grand poumon vert, avec pauses photos.",
      "Rythme accessible ; hydratez-vous : le soleil est fort même au printemps.",
    ],
    places: [
      "Secteur fondateur et places principales",
      "District civique",
      "Parc General San Martín",
      "Cerro de la Gloria",
    ],
    included: [
      "Transport et circuit selon programme",
      "Guide / coordination selon opérateur",
    ],
    excluded: [
      "Repas et boissons",
      "Musées si arrêt optionnel payant",
    ],
    practical: {
      whatToBring: [
        "Chaussures confortables pour marcher",
        "Casquette, crème solaire, eau",
        "Téléphone ou appareil photo chargé",
      ],
      restrictions:
        "Mobilité réduite : vérifier accès au Cerro de la Gloria.",
      weather:
        "Pluie légère : rarement annulé ; orage : arrêts modifiables.",
      pickupDetails:
        "Ramassage hôtels ~8h30 — confirmer.",
    },
    faq: [
      {
        question: "Combien marchons-nous ?",
        answer:
          "Tronçons à pied en centre et parc ; pauses modérées.",
      },
      {
        question: "Entrées incluses ?",
        answer:
          "Circuit classique : souvent sans entrée ; musée = supplément si ajouté.",
      },
      {
        question: "Adapté aux enfants ?",
        answer:
          "Oui avec hydratation et protection solaire ; journée chaude possible.",
      },
    ],
    testimonials: [
      {
        name: "Daniel K.",
        text: "Nous avons enfin compris la grille : San Martín et la vue du cerro ont tout éclairé.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais selon date (confirmer)",
    groupSize: "Groupe régulier",
    season: "Toute l’année (mar, jeu, sam)",
    pickup: "Hôtels Mendoza — dès ~08h30 (confirmer)",
    cancellation:
      "Selon bon ; prévenez à l’avance si possible.",
  },

  "valle-de-uco-cordon-del-plata": {
    subtitle:
      "Journée panoramique au Valle de Uco : mirador Cristo Rey, Manzano Histórico, corridor productif et arrêt optionnel à Bodega Atamisque.",
    badges: [
      "Journée complète",
      "Valle de Uco",
      "Paysage + vin optionnel",
      "Vendredis",
    ],
    whyLove: [
      "L’Uco en grand angle : cordillère, vignes et villages.",
      "Arrêt Atamisque pour dégustation optionnelle (hors tarif base).",
      "Paysage d’abord, cave ensuite si vous le souhaitez.",
      "Vendredis : semaine simple à planifier.",
    ],
    editorial: [
      "Le Valle de Uco se vit en courbes : miradors, histoire du Manzano et sensation de vallée ouverte vers le Cordón del Plata.",
      "Équilibre entre route panoramique et option cave reconnue (paiement séparé si vous ajoutez la dégustation).",
      "Déjeuner non inclus : options en route selon horaire.",
    ],
    places: [
      "Mirador Cristo Rey",
      "Manzano Histórico",
      "Corridor productif du Valle de Uco",
      "Bodega Atamisque (option)",
    ],
    included: [
      "Transport depuis Mendoza le vendredi",
      "Circuit panoramique avec arrêts",
      "Coordination Edmar Travel",
    ],
    excluded: [
      "Déjeuner et boissons",
      "Dégustation et consommations à Atamisque ou autres options",
    ],
    practical: {
      whatToBring: [
        "Couches et lunettes de soleil ; longue journée",
        "Argent pour repas et options",
        "Eau et encas",
      ],
      restrictions:
        "Longues heures en véhicule ; signalez vertiges ou problèmes de santé.",
      weather:
        "Vent et soleil fort ; pluie peut réduire la visibilité aux miradors.",
      pickupDetails:
        "Départ ~7h30 depuis Mendoza — confirmer.",
    },
    faq: [
      {
        question: "Sans cave, uniquement paysage ?",
        answer:
          "Oui : la cave est optionnelle. Indiquez vos préférences à la réservation.",
      },
      {
        question: "Durée de la journée ?",
        answer:
          "Journée complète, retour l’après-midi selon saison.",
      },
      {
        question: "Autres jours que vendredi ?",
        answer:
          "Sorties saisonnières possibles — demandez les disponibilités.",
      },
    ],
    testimonials: [
      {
        name: "Sophie & Marc",
        text: "Nous voulions l’Uco sans marathon de dégustations : la route et la lumière suffisaient ; Atamisque était le bonus.",
        rating: 5,
      },
    ],
    language: "Espagnol / anglais selon opérateur (confirmer)",
    groupSize: "Groupe régulier",
    season: "Vendredis + sorties saisonnières possibles",
    pickup: "Mendoza — départ ~07h30 (confirmer)",
    cancellation:
      "Selon bon ; frais optionnels en cave peuvent varier.",
  },

  "epic-andes-adventure-trekking-hot-springs": {
    subtitle:
      "Journée aventure à Cacheuta : randonnée avec vues sur les Andes et Potrerillos, fin aux sources chaudes — bientôt disponible.",
    badges: [
      "Bientôt",
      "Places limitées",
      "Randonnée + thermes",
      "Cacheuta",
    ],
    whyLove: [
      "Effort modéré à soutenu puis détente aux eaux thermales.",
      "Grands paysages de cordillère et vallée le même jour.",
      "Transfert, déjeuner et assurance prévus selon programme au lancement.",
      "Pour ceux qui veulent nature active près de Mendoza.",
    ],
    editorial: [
      "Expérience en préparation : sentiers de Cacheuta, vues Andes et vallée, temps aux thermes pour récupérer.",
      "Journée complète, départ matinal et retour en fin de journée. Détails (distance, dénivelé, services) à la publication.",
      "Inscrivez-vous aux annonces pour les vagues d’ouverture à petits groupes.",
    ],
    places: [
      "Sentiers et miradors de Cacheuta",
      "Panoramas Andes et Potrerillos",
      "Complexe thermal (selon programme final)",
    ],
    included: [
      "À confirmer au lancement : transfert, guide, thermes selon programme",
    ],
    excluded: [
      "Détails à la fiche finale",
    ],
    practical: {
      whatToBring: [
        "Chaussures de rando, sac à dos, eau et couches",
        "Maillot et serviette pour les thermes",
        "Crème solaire et casquette",
      ],
      restrictions:
        "Condition physique à évaluer ; sentiers irréguliers.",
      weather:
        "Montagne et soleil fort ; vent froid possible même en été.",
      pickupDetails:
        "Départ indicatif ~9h depuis Mendoza — confirmé à l’ouverture des ventes.",
    },
    faq: [
      {
        question: "Quand les réservations ?",
        answer:
          "Nous finalisons opérateurs et protocoles ; annonce sur le site et WhatsApp.",
      },
      {
        question: "Niveau de randonnée ?",
        answer:
          "Modéré à exigeant selon tronçon final ; dénivelé publié au lancement.",
      },
      {
        question: "Repas inclus ?",
        answer:
          "Objectif : déjeuner inclus selon programme — à confirmer.",
      },
    ],
    testimonials: [],
    language: "Espagnol / anglais (à confirmer)",
    groupSize: "Petits groupes — places limitées",
    season: "Lancement prochain — dates par vagues",
    pickup: "Mendoza — départ indicatif ~09h (confirmer à l’ouverture)",
    cancellation:
      "Selon bon ; confirmez avec Edmar Travel quand les réservations seront actives.",
  },
};
