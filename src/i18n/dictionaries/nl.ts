import type { Dictionary } from '../types'

/**
 * Dutch translations
 */
export const nl: Dictionary = {
  nav: {
    home: 'Home',
    about: 'Over ons',
    facilities: 'Faciliteiten',
    experiences: 'Boek een Retraite',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Welkom bij',
    emphasis: 'the Makers Barn',
    subtitle: 'Een thuis voor je retraite',
    subtitleBreak: '',
  },

  heroDetails: {
    title: 'Een fijne, intieme locatie voor retraites en sessies',
    subtitle: 'Midden op het Nederlandse platteland, omringd door natuur.',
    body: 'Een plek die voelt als thuiskomen, omringd door bomen met daarbuiten weidse weilanden. Opgezet voor transformerende bijeenkomsten die je bijblijven. Of je nu een yoga retraite, een workshop of een creatieve bijeenkomst geeft, onze plek staat voor je klaar.',
    primaryCtaLabel: 'Ontdek de ruimtes',
    secondaryCtaLabel: 'Reserveer je retraite',
    metaItems: [
      'Plek voor kleine groepen tot 20 personen',
      'Sauna & natuur op loopafstand',
      'Midden op het platteland',
    ],
  },

  contact: {
    pageTitle: 'Plan je retraite',
    metaTitle: 'Contact',
    metaDescription:
      'Neem contact op met MakersBarn. We horen graag van je over het plannen van je retraite, workshop of creatieve bijeenkomst.',
    introText:
      'Leuk dat je contact wilt opnemen! Of je nu een retraite of workshop wilt plannen, of gewoon meer wilt weten over the MakersBarn - we horen graag van je. Kies wat het beste bij je past:',
    formTitle: 'Stuur ons een bericht',
    options: {
      whatsapp: {
        title: 'WhatsApp',
        description: 'Stuur ons een berichtje voor snel contact',
        buttonText: 'App ons op WhatsApp',
      },
      email: {
        title: 'E-mail',
        description: 'Mail ons en we reageren zo snel mogelijk',
        buttonText: 'Stuur een e-mail',
      },
      form: {
        title: 'Contactformulier',
        description: 'Vul het formulier in en we nemen contact met je op',
        buttonText: 'Naar het formulier',
      },
    },
    labels: {
      name: 'Hoi! Ik ben...',
      email: 'Je kunt me bereiken via...',
      phone: 'Of bel me op...',
      message: 'Hoe kunnen we je helpen?',
    },
    placeholders: {
      name: 'Je naam...',
      email: 'Je e-mailadres...',
      phone: 'Je telefoonnummer...',
      message: 'Vertel, waar kunnen we je mee helpen?',
    },
    buttons: {
      submit: 'Versturen',
      submitting: 'Bezig met versturen...',
    },
    messages: {
      success: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
      emailFailed: 'Oeps, er ging iets mis bij het versturen. Probeer het later nog eens.',
      unexpectedError: 'Er ging iets mis. Probeer het later nog eens.',
      validationError: 'Kun je je gegevens even checken en het opnieuw proberen?',
      rateLimited: 'Rustig aan! Wacht even en probeer het dan opnieuw.',
      loading: 'Bezig met versturen...',
    },
  },

  footer: {
    getInTouch: 'Neem contact op',
    followUs: 'Volg ons',
    tagline: 'Where creativity meets tranquility',
    copyright: "Maker's Barn.",
  },

  about: {
    title: 'Over ons',
    intro: `The MakersBarn begon als een plek voor allerlei soorten Makers: houtbewerkers, zakenmensen, kunstenaars en dromers. Gaandeweg leerde we dat wat mensen het meest nodig hebben niet zomaar een plek om te werken is. Het is een plek om tot rust te komen. Dus dat zijn we gaan maken.`,
    secondary: `Wij geloven dat er in ieder van ons een Maker schuilt. Of dat nu iets is wat we met onze handen maken, plezier maken, of het maken van herinneringen. Samenkomen, delen en verbinden zijn allemaal kernwaarden van Makers.`,
    tertiary: `Wij drieën kwamen samen met een visie en een drang om te ontsnappen aan de drukte van het stadsleven. Een prachtige herenboerderij uit de jaren '20, onze liefde voor het land en onze toewijding aan het creëren van unieke verblijven hebben tot een plek geleid waar planten, dieren én mensen geluk vinden.`,
    fourth: `Of je nu je volgende retraite wilt organiseren, aan een retraite wilt deelnemen, of gewoon wilt genieten van een rustig verblijf; the MakersBarn staat voor je klaar.`,
    teamTitle: 'Wie we zijn',
    metaTitle: 'Over ons',
    metaDescription:
      'Maak kennis met het team achter de MakersBarn. Een plek waar makers, kunstenaars en dromers samenkomen en inspiratie vinden.',
  },

  facilities: {
    title: 'Faciliteiten',
    intro: `Huur de ruimtes die je nodig hebt voor je retraite, masterclass of creatieve uitjes. We hebben een eigen tuin, een verbouwde hooischuur, 14 bedden, plus ruimte voor tenten en campers, en alle rust die je nodig hebt. We helpen je ook graag met het regelen van catering op basis van jouw wensen en behoeften.`,
    metaTitle: 'Faciliteiten',
    metaDescription:
      'Huur de ruimtes die je nodig hebt bij MakersBarn. Eigen tuin, verbouwde hooischuur, 14 bedden, ruimte voor tenten en campers, plus catering op maat.',
    stats: [
      { number: '1200+', description: 'Bomen geplant op het terrein' },
      { number: '13.000+ m²', description: 'Eigen terrein met zwemvijver, sauna en vuurplaats' },
      { number: '∞', description: 'Oneindige mogelijkheden' },
    ],
    categories: {
      groupAccommodation: 'Groepsaccommodatie',
      workshopSpace: 'Workshopruimte',
      outdoors: 'Buiten',
    },
    ctaTitle: 'Klaar om je retraite te plannen?',
    ctaSubtitle: 'Laat ons je helpen een onvergetelijke ervaring te creëren voor je groep.',
    ctaButton: 'Boek nu je retraite',
    carousel: {
      previousImage: 'Vorige afbeelding',
      nextImage: 'Volgende afbeelding',
      viewFullscreen: 'Bekijk afbeelding op volledig scherm',
      goToImage: 'Ga naar afbeelding',
      imageNavigation: 'afbeelding navigatie',
    },
    items: {
      hayHouse: {
        title: 'Hooischuur - oefenruimte',
        description:
          'Een betoverend hooischuur met ruimte voor yoga, breathwork en nog veel meer! Zelfs nog mooier wanneer de zon schijnt en betoverende kleurrijke reflecties van de glazen stenen.',
        features: ['65+ m² ruimte', 'Vloerverwarming', 'Yogamatten en accessoires', 'Geluidssysteem'],
      },
      cosmos: {
        title: 'De Cosmos',
        description:
          'Een houten cabin met houtkachel. Luxe ingericht maar toch gezelliger dan welke andere plek ook. Privéterras met een van de mooiste uitzichten die Nederland te bieden heeft.',
        features: ['60 m²', 'Tweepersoonsbed of twee eenpersoonsbedden', 'Slaapbank', 'Douche', 'Keuken'],
      },
      horizon: {
        title: 'Horizon',
        description:
          'Oude schuur omgetoverd tot luxe slaapgelegenheid. Chill area, kamers met privé- en gedeelde douches. Keuken aanwezig op de tweede verdieping.',
        features: [
          '3-persoonskamer met gedeelde douche',
          '2-persoonskamer met eigen douche',
          'Privékamer met gedeelde douche',
          'Grote zolder (2-4 bedden, douche)',
          'Zolderruimte voor binnen praktijksessies',
        ],
      },
      sauna: {
        title: 'Sauna, Hot Tub & Vuurkuil',
        description:
          'Ontspan en kom tot rust in onze eigen sauna, Hot Tub en vuurkuil. De perfecte manier om bij te komen na een dag vol creativiteit of workshops.',
      },
      pond: {
        title: 'Zwemvijver',
        description:
          'Een natuurlijke zwemvijver omringd door groen en lokale dieren. Heerlijk voor een frisse duik of om te genieten van de rust van de natuur.',
      },
      inBetween: {
        title: 'Alles ertussenin',
        description:
          'Alle gebouwen en faciliteiten zijn natuurlijk essentieel voor een retraite, maar het zijn juist de kleine dingen daartussen die een plek echt bijzonder maken.',
        features: ['Mooie paden', '1000+ bomen', 'Theehuis', 'Vogelgebied', 'Weidse uitzichten'],
      },
    },
  },

  experiences: {
    metaTitle: 'Ervaringen',
    metaDescription: 'Ontdek jouw perfecte retraite-ervaring bij MakersBarn. Boek een solo yoga retraite, huur onze accommodatie, of sluit je aan bij een groepsweekend.',
    title: 'Ervaringen',
    intro: 'Of je nu op zoek bent naar rust, je eigen uitje wilt samenstellen, of wilt deelnemen aan een samengestelde retraite met anderen, we hebben de perfecte ervaring voor je klaar.',
    createExperience: {
      title: 'Creëer Je Eigen Ervaring',
      subtitle: 'Stel jouw perfecte escape samen met onze flexibele opties',
    },
    soloRetreat: {
      title: 'Solo Yoga Retraite',
      description: 'Een gepersonaliseerde retraite-ervaring in de Cosmos cabin. Op maat gemaakte yoga sessies, sauna, hot tub en complete rust voor je persoonlijke reis.',
      features: [
        '2-3 nachten pakketten',
        'Gepersonaliseerde yoga sessies',
        'Sauna & hot tub toegang',
        'Vers ontbijt inbegrepen',
      ],
      ctaLabel: 'Ontdek Solo Retraite',
    },
    accommodation: {
      title: 'Boek Onze Accommodatie',
      description: 'Huur onze prachtige ruimtes voor je eigen privé uitje. Perfect voor stellen, gezinnen of kleine groepen op zoek naar een rustige escape.',
      features: [
        'Yoga sessies beschikbaar',
        'Hot tub huur',
        'Sauna toegang',
        'Catering op aanvraag',
      ],
      platforms: {
        airbnb: 'Boek via Airbnb',
        natuurhuisje: 'Boek via Natuurhuisje',
      },
    },
    togetherRetreat: {
      title: 'Vrienden Retraite',
      description: 'Een all-inclusive escape met vrienden. Yoga, creatieve workshops, heerlijke maaltijden en betekenisvolle connecties in een prachtige omgeving.',
      features: [
        'All-inclusive ervaring',
        'Yoga & creatieve workshops',
        'Ayurvedisch geïnspireerde maaltijden',
        'Exclusieve groepstoegang',
      ],
      ctaLabel: 'Ontdek Groepsretraites',
    },
    featuredRetreats: {
      title: 'Uitgelichte Retraites',
      subtitle: 'Sluit je aan bij een van onze aankomende samengestelde retraite-ervaringen',
      bookNow: 'Boek Nu',
      spotsLeft: 'plekken beschikbaar',
      fullyBooked: 'Volgeboekt',
    },
    ctaTitle: 'Niet zeker welke ervaring bij je past?',
    ctaSubtitle: 'Neem contact met ons op en we helpen je de perfecte match te vinden.',
    ctaButton: 'Neem Contact Op',
  },

  impressionCarousel: {
    kicker: 'Een kleine impressie',
    title: 'Neem de tijd, kijk rond',
    subtitle:
      'Ontdek de kracht van langzaam leven. Ontdek de schoonheid van langzaam leven. Elk moment hier nodigt je uit om te pauzeren, te ademen en opnieuw verbinding te maken met wat echt belangrijk is.',
    facilitiesButton: 'Ontdek onze faciliteiten',
    previousImage: 'Vorige afbeelding',
    nextImage: 'Volgende afbeelding',
    carouselNavigation: 'Carrousel navigatie',
    viewFullscreen: 'Bekijk impressie op volledig scherm',
    goToSlide: 'Ga naar slide',
  },

  impressionPolaroids: {
    kicker: 'Een kleine impressie',
    title: 'Een plek om blijvende herinneringen te maken',
    subtitle:
      'Ruimtes om je te focussen, te dwalen, te dutten, te schrijven, te reflecteren en samen te zijn. Hier is een glimp van hoe je retraite zou kunnen aanvoelen.',
  },

  testimonials: {
    sectionTitle: 'Wat onze gasten zeggen',
    items: [
      {
        testimonial:
          'De MakersBarn is pure magie. De combinatie van prachtig platteland, doordachte ruimtes en de sauna maakte onze retraite echt transformerend. We gingen verfrist en diep verbonden naar huis.',
        author: 'Emma K. - Wellness Retraite Organisator',
      },
      {
        testimonial:
          'Dit is de mooiste retraite plek die ik ooit heb meegemaakt. De aandacht voor detail, de natuurlijke omgeving en de rustige sfeer waren precies wat ons team nodig had om weer op te laden.',
        author: 'Marcus T. - Leiderschapscoach',
      },
      {
        testimonial:
          'Ik heb retraites georganiseerd door heel Europa, maar de MakersBarn is echt bijzonder. Het Nederlandse platteland, de warme gastvrijheid en de knusse ruimtes maken het ideaal voor diepgaand, betekenisvol werk.',
        author: 'Sophie L. - Workshop Facilitator',
      },
      {
        testimonial:
          'Ons creatieve team vond precies wat we zochten bij de MakersBarn. De inspirerende omgeving, te midden van weilanden en natuur, hielp ons om creatieve blokkades te doorbreken en ons beste werk te maken.',
        author: 'David R. - Creatief Directeur',
      },
    ],
  },

  team: {
    members: [
      {
        name: 'Nana',
        description:
          'Nana is het brein achter The MakersBarn. Deze plek met zijn rustgevende sfeer is een reflective van haar eigen levensreis en helingsproces. Ze is de person met wie je vanaf het begin contact hebt en degene die ervoor zorgt dat jouw retraite preceis aanvoelt zoals je hem voorstelt. Nana brengt een kalme aanwezigheid gevoed door haar liefde voor natuur, yoga, mindful leven en genieten van kleine creatieve momenten. Ze begrijpt wat retraitebegeleiders nodig hebben en ondersteund op een zorgzame manier.',
      },
      {
        name: 'Benny',
        description:
          'Deels tech wizard, deels keukenliefhebber, Benny creërt graag magie en doet dit zowel op zijn computerscherm als bij het fornuis. Met zijn speelse nieuwsgierigheid is het geen wonder dat de aap zijn spirit animal is. Hij balanceert computerwerk met yoga en mindfulness, is altijd blij met een cocktail, of een leuk gesprek over de dingen die jouw op het moment bezighouden.',
      },
      {
        name: 'Noud',
        description:
          'Noud is de echte Maker van ons: CMO, Chief Maker Officer. Zijn schroeven, spijkers, boompjes en liefde voor de plek zorgt dat alles tip-top in orde is. Wanneer er tijd over is kan je hem regelmatig in de werkplaats aantreffen waar hij met plezier meubels bouwt.',
      },
    ],
  },

  common: {
    logoAlt: "Maker's Barn",
    selectLanguage: 'Kies je taal',
    toggleMenu: 'Menu openen',
    previousImage: 'Vorige afbeelding',
    nextImage: 'Volgende afbeelding',
    closeGallery: 'Galerij sluiten',
    imageNavigation: 'Afbeelding navigatie',
    imageThumbnails: 'Afbeelding miniaturen',
    imageGallery: 'Afbeelding galerij',
    lightbox: {
      closeGallery: 'Galerij sluiten',
      previousImage: 'Vorige afbeelding',
      nextImage: 'Volgende afbeelding',
      imageOf: 'van',
      viewImage: 'Bekijk afbeelding',
      current: 'huidig',
      imageNavigation: 'Afbeelding navigatie',
      imageThumbnails: 'Afbeelding miniaturen',
      keyboardInstructions:
        'Gebruik de pijltjestoetsen links en rechts om tussen afbeeldingen te navigeren. Druk op Escape om de galerij te sluiten.',
    },
  },

  metadata: {
    siteName: "The Maker's Barn",
    siteTitle: "The Maker's Barn - Retraite op het Nederlandse platteland",
    defaultDescription:
      'Geef je retraite de plek die het verdient. 60m²+ praktijkzaal, 14 bedden, 1.3ha+ eigen terrein midden op het Nederlandse platteland.',
    keywords: ['retraite', 'Nederland', 'platteland', 'wellness', 'workshop locatie', 'creatieve retraite'],
  },
} as const
