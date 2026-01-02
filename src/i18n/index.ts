// Types
export type {
  Dictionary,
  Dictionaries,
  NavTranslations,
  HeroTranslations,
  HeroDetailsTranslations,
  ContactTranslations,
  FooterTranslations,
  AboutTranslations,
  FacilitiesTranslations,
  TestimonialsTranslations,
  TeamTranslations,
  CommonTranslations,
  MetadataTranslations,
  TranslationKey,
} from './types'

// Dictionaries
export { dictionaries, getDictionary, en, nl } from './dictionaries'

// Server utilities
export { getServerLanguage, getServerTranslations, getTranslations } from './server'
