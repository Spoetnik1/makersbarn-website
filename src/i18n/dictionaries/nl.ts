import type { Dictionary } from '../types'

/**
 * Dutch translations
 */
export const nl: Dictionary = {
  nav: {
    home: 'Home',
    about: 'Over ons',
    facilities: 'Faciliteiten',
    contact: 'Contact',
  },

  hero: {
    eyebrow: 'Welkom bij',
    emphasis: 'the Makers Barn',
    subtitle: 'Jouw retreat verdient meer dan',
    subtitleBreak: 'alleen een locatie.',
  },

  heroDetails: {
    title: 'Een warme, intieme plek voor retreats en bijeenkomsten',
    subtitle: 'Midden op het Nederlandse platteland, omringd door natuur.',
    body: 'Een retreat plek die aanvoelt als thuis, te midden van weilanden en weidse luchten. Ingericht voor diepgaand, transformerend werk met gemak, warmte en schoonheid. Geschikt voor maximaal 20 personen.',
    primaryCtaLabel: 'Bekijk de ruimtes',
    secondaryCtaLabel: 'Plan je retreat',
    metaItems: [
      'Plek voor kleine groepen',
      'Sauna & natuur op loopafstand',
      'Midden op het Nederlandse platteland',
    ],
  },

  contact: {
    pageTitle: 'Neem contact op',
    introText:
      'Leuk dat je contact wilt opnemen! Of je nu een retreat of workshop wilt plannen, of gewoon meer wilt weten over de Makers Barn - we horen graag van je. Kies wat het beste bij je past:',
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
      message: 'Ik wil graag weten...',
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
    tagline: 'Waar creativiteit tot rust komt',
    copyright: "Maker's Barn. Alle rechten voorbehouden.",
  },

  about: {
    title: 'Over ons',
    intro: `Welkom bij de MakersBarn, een plek waar creativiteit, vakmanschap en verbinding samenkomen. Midden op het platteland hebben we een oude hooischuur omgetoverd tot een bruisende ruimte voor retreats, workshops en creatieve bijeenkomsten. Ons doel? Een plek creëren waar makers, kunstenaars en dromers kunnen samenkomen, creëren en inspiratie opdoen.`,
    secondary: `We geloven in de kracht van met je handen werken, de schoonheid van natuurlijke materialen en het belang van plekken waar je kunt groeien - zowel alleen als samen. Of je nu een retreat organiseert, een workshop geeft of gewoon op zoek bent naar een rustige plek om aan je project te werken: bij de MakersBarn kun je je ideeën tot leven brengen.`,
    teamTitle: 'Maak kennis met het team',
    metaTitle: 'Over ons',
    metaDescription:
      'Maak kennis met het team achter de MakersBarn. Een plek waar makers, kunstenaars en dromers samenkomen en inspiratie vinden.',
  },

  facilities: {
    title: 'Faciliteiten',
    intro: `Huur de hele locatie voor je retreat, masterclass of creatieve uitjes. We hebben een eigen tuin, een verbouwde hooischuur, 23 bedden en alle ruimte en rust die je nodig hebt.`,
    secondary: `Heb je extra ruimte nodig tijdens je retreat? Of wil je een aparte plek boeken voor een een-op-een sessie of andere intieme bijeenkomst? We hebben een paar pareltjes die we graag met je delen als thuis-weg-van-huis.`,
    metaTitle: 'Faciliteiten',
    metaDescription:
      'Ontdek onze unieke retreat ruimtes bij de MakersBarn. Huur de hele locatie met eigen tuin, verbouwde hooischuur, 23 bedden en alle rust die je nodig hebt.',
    stats: [
      { number: '60m²+', description: 'Ruime praktijkzaal' },
      { number: '14', description: 'Bedden verdeeld over 6 gezellige kamers' },
      { number: '1.3ha+', description: 'Eigen terrein met zwemvijver, sauna en vuurplaats' },
    ],
    categories: {
      groupAccommodation: 'Groepsaccommodatie',
      workshopSpace: 'Workshopruimte',
      outdoors: 'Buiten',
    },
    items: {
      hayHouse: {
        title: 'Het betoverende Hooihuis',
        description:
          'Een prachtig verbouwde hooischuur met 23 comfortabele bedden, verdeeld over twee voormalige stallen. Ideaal voor retreats, workshops en creatieve bijeenkomsten.',
        features: ['Keuken', 'Badkamer', '23 bedden in twee voormalige stallen', 'Grote gemeenschappelijke ruimte'],
      },
      cosmos: {
        title: 'De Cosmos',
        description:
          'Een knusse workshopruimte voor kleinere sessies, masterclasses en een-op-een werk. Ideaal voor intieme bijeenkomsten en gespecialiseerde workshops.',
        features: ['Workshopruimte', 'Comfortabele zithoek', 'Veel natuurlijk licht'],
      },
      horizon: {
        title: 'Horizon',
        description:
          'Uitgestrekte buitenruimte om te connecten met de natuur en inspiratie op te doen in de open lucht. Ideaal voor reflectie, workshops buiten en genieten van het platteland.',
      },
      sauna: {
        title: 'Sauna & bubbelbad',
        description:
          'Ontspan en kom tot rust in onze eigen sauna en bubbelbad. De perfecte manier om bij te komen na een dag vol creativiteit of workshops.',
      },
      pond: {
        title: 'Zwemvijver',
        description:
          'Een natuurlijke zwemvijver omringd door groen en lokale dieren. Heerlijk voor een frisse duik of om te genieten van de rust van de natuur.',
      },
      inBetween: {
        title: 'En alles daartussen',
        description:
          'Verschillende ruimtes verspreid over ons terrein: van knusse zolderkamers tot comfortabele kamers met eigen badkamer. Flexibele plekken die zich aanpassen aan jouw wensen.',
        features: ['Keuken', 'Badkamer', 'Twee eenpersoonsbedden of een tweepersoonsbed', 'Eigen badkamer mogelijk'],
      },
    },
  },

  testimonials: {
    sectionTitle: 'Wat onze gasten zeggen',
    items: [
      {
        testimonial:
          'De MakersBarn is pure magie. De combinatie van prachtig platteland, doordachte ruimtes en de sauna maakte onze retreat echt transformerend. We gingen verfrist en diep verbonden naar huis.',
        author: 'Emma K. - Wellness Retreat Organisator',
      },
      {
        testimonial:
          'Dit is de mooiste retreat plek die ik ooit heb meegemaakt. De aandacht voor detail, de natuurlijke omgeving en de rustige sfeer waren precies wat ons team nodig had om weer op te laden.',
        author: 'Marcus T. - Leiderschapscoach',
      },
      {
        testimonial:
          'Ik heb retreats georganiseerd door heel Europa, maar de MakersBarn is echt bijzonder. Het Nederlandse platteland, de warme gastvrijheid en de knusse ruimtes maken het ideaal voor diepgaand, betekenisvol werk.',
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
          'Het brein achter de MakersBarn. Zij doet de meeste communicatie, dus waarschijnlijk is zij de eerste die je spreekt.',
      },
      {
        name: 'Benny',
        description:
          'Benny heeft een passie voor IT en zit vaak achter zijn computer om aan verschillende projecten te werken. Klussen met zijn handen doet hij graag als afwisseling, dus het leven bij de MakersBarn past hem perfect.',
      },
      {
        name: 'Noud',
        description:
          'Noud is onze echte Maker: CMO, Chief Maker Officer. Hij ontdekte dat een zaag en boormachine meer zijn ding zijn dan een toetsenbord. Houdt de boel goed bij, is vaak in de buurt, en timmert meubels als hij tijd over heeft.',
      },
    ],
  },

  common: {
    logoAlt: "Maker's Barn",
    selectLanguage: 'Kies je taal',
    toggleMenu: 'Menu openen',
  },

  metadata: {
    siteName: "The Maker's Barn",
    siteTitle: "The Maker's Barn - Retreat op het Nederlandse platteland",
    defaultDescription:
      'Jouw retreat verdient meer dan alleen een locatie. 60m²+ praktijkzaal, 14 bedden, 1.3ha+ eigen terrein midden op het Nederlandse platteland.',
    keywords: ['retreat', 'Nederland', 'platteland', 'wellness', 'workshop locatie', 'creatieve retreat'],
  },
} as const
