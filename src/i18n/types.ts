import { Language } from '@/types'

/**
 * Navigation translations
 */
export interface NavTranslations {
  home: string
  about: string
  facilities: string
  experiences: string
  location: string
  contact: string
}

/**
 * Hero section translations
 */
export interface HeroTranslations {
  eyebrow: string
  emphasis: string
  subtitle: string
  subtitleBreak: string
}

/**
 * Hero details section translations
 */
export interface HeroDetailsTranslations {
  title: string
  subtitle: string
  body: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  metaItems: readonly string[]
}

/**
 * Contact form translations
 */
export interface ContactTranslations {
  pageTitle: string
  metaTitle: string
  metaDescription: string
  introText: string
  formTitle: string
  options: {
    whatsapp: {
      title: string
      description: string
      buttonText: string
    }
    email: {
      title: string
      description: string
      buttonText: string
    }
    form: {
      title: string
      description: string
      buttonText: string
    }
  }
  labels: {
    name: string
    email: string
    phone: string
    message: string
  }
  placeholders: {
    name: string
    email: string
    phone: string
    message: string
  }
  buttons: {
    submit: string
    submitting: string
  }
  messages: {
    success: string
    emailFailed: string
    unexpectedError: string
    validationError: string
    rateLimited: string
    loading: string
  }
}

/**
 * Footer translations
 */
export interface FooterTranslations {
  getInTouch: string
  followUs: string
  tagline: string
  copyright: string
}

/**
 * About page translations
 */
export interface AboutTranslations {
  title: string
  intro: string
  secondary: string
  tertiary: string
  fourth: string
  teamTitle: string
  metaTitle: string
  metaDescription: string
}

/**
 * Facilities page translations
 */
export interface FacilitiesTranslations {
  title: string
  intro: string
  metaTitle: string
  metaDescription: string
  stats: readonly {
    number: string
    description: string
  }[]
  categories: {
    groupAccommodation: string
    workshopSpace: string
    outdoors: string
  }
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
  carousel: {
    previousImage: string
    nextImage: string
    viewFullscreen: string
    goToImage: string
    imageNavigation: string
  }
  items: {
    hayHouse: {
      title: string
      description: string
      features: readonly string[]
    }
    cosmos: {
      title: string
      description: string
      features: readonly string[]
    }
    horizon: {
      title: string
      description: string
      features: readonly string[]
    }
    sauna: {
      title: string
      description: string
    }
    pond: {
      title: string
      description: string
    }
    inBetween: {
      title: string
      description: string
      features: readonly string[]
    }
  }
}

/**
 * Impression carousel section translations
 */
export interface ImpressionCarouselTranslations {
  kicker: string
  title: string
  subtitle: string
  facilitiesButton: string
  previousImage: string
  nextImage: string
  carouselNavigation: string
  viewFullscreen: string
  goToSlide: string
}

/**
 * Impression polaroids section translations
 */
export interface ImpressionPolaroidsTranslations {
  kicker: string
  title: string
  subtitle: string
}

/**
 * Testimonials section translations
 */
export interface TestimonialsTranslations {
  sectionTitle: string
  items: readonly {
    testimonial: string
    author: string
  }[]
}

/**
 * Team member translations
 */
export interface TeamTranslations {
  members: readonly {
    name: string
    description: string
  }[]
}

/**
 * Common/shared translations
 */
export interface CommonTranslations {
  logoAlt: string
  selectLanguage: string
  toggleMenu: string
  previousImage: string
  nextImage: string
  closeGallery: string
  imageNavigation: string
  imageThumbnails: string
  imageGallery: string
  lightbox: {
    closeGallery: string
    previousImage: string
    nextImage: string
    imageOf: string
    viewImage: string
    current: string
    imageNavigation: string
    imageThumbnails: string
    keyboardInstructions: string
  }
}

/**
 * Metadata translations for SEO
 */
export interface MetadataTranslations {
  siteName: string
  siteTitle: string
  defaultDescription: string
  keywords: readonly string[]
}

/**
 * Experiences page translations
 */
export interface ExperiencesTranslations {
  metaTitle: string
  metaDescription: string
  title: string
  intro: string
  createExperience: {
    title: string
    subtitle: string
  }
  soloRetreat: {
    title: string
    description: string
    features: readonly string[]
    ctaLabel: string
  }
  accommodation: {
    title: string
    description: string
    features: readonly string[]
    platforms: {
      airbnb: string
      natuurhuisje: string
    }
  }
  togetherRetreat: {
    title: string
    description: string
    features: readonly string[]
    ctaLabel: string
  }
  featuredRetreats: {
    title: string
    subtitle: string
    bookNow: string
    spotsLeft: string
    fullyBooked: string
  }
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

/**
 * Location page translations
 */
export interface LocationTranslations {
  metaTitle: string
  metaDescription: string
  title: string
  intro: string
  categories: {
    attractions: string
    food: string
    hiking: string
    wellness: string
    cities: string
  }
  carousel: {
    previousImage: string
    nextImage: string
    viewFullscreen: string
    goToImage: string
    imageNavigation: string
  }
  items: {
    kasteelHetNijenhuis: {
      title: string
      description: string
      features: readonly string[]
    }
    bokkersMillBakery: {
      title: string
      description: string
      features: readonly string[]
    }
    deJongheLeeuw: {
      title: string
      description: string
      features: readonly string[]
    }
    overeschOrganic: {
      title: string
      description: string
      features: readonly string[]
    }
    huismanFarm: {
      title: string
      description: string
      features: readonly string[]
    }
    duurseWaarden: {
      title: string
      description: string
      features: readonly string[]
    }
    havezateDenAlerdinck: {
      title: string
      description: string
    }
    sallandseHeuvelrug: {
      title: string
      description: string
    }
    biking: {
      title: string
      description: string
      features: readonly string[]
    }
    saunaSwoll: {
      title: string
      description: string
      features: readonly string[]
    }
    zwolle: {
      title: string
      description: string
      features: readonly string[]
    }
    hanzesteden: {
      title: string
      description: string
      features: readonly string[]
    }
  }
  ctaTitle: string
  ctaSubtitle: string
  ctaButton: string
}

/**
 * Complete dictionary structure for a single language
 */
export interface Dictionary {
  nav: NavTranslations
  hero: HeroTranslations
  heroDetails: HeroDetailsTranslations
  contact: ContactTranslations
  footer: FooterTranslations
  about: AboutTranslations
  facilities: FacilitiesTranslations
  experiences: ExperiencesTranslations
  location: LocationTranslations
  impressionCarousel: ImpressionCarouselTranslations
  impressionPolaroids: ImpressionPolaroidsTranslations
  testimonials: TestimonialsTranslations
  team: TeamTranslations
  common: CommonTranslations
  metadata: MetadataTranslations
}

/**
 * Type-safe dictionary collection indexed by language
 */
export type Dictionaries = Record<Language, Dictionary>

/**
 * Type utility for extracting nested keys from dictionary
 * Enables autocomplete for translation keys like 'nav.home', 'contact.labels.name'
 */
export type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends readonly unknown[]
        ? `${Prefix}${K}`
        : T[K] extends object
          ? NestedKeyOf<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
          : `${Prefix}${K}`
    }[keyof T & string]
  : never

/**
 * All possible translation keys
 */
export type TranslationKey = NestedKeyOf<Dictionary>
