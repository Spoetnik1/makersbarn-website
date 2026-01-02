import { Language } from '@/types'

/**
 * Navigation translations
 */
export interface NavTranslations {
  home: string
  about: string
  facilities: string
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
  secondary: string
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
