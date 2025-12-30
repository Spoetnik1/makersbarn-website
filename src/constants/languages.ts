import { Language, LanguageOption } from '@/types'

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: Language.EN, label: 'English', title: 'United Kingdom' },
  { code: Language.NL, label: 'Nederlands', title: 'Netherlands' },
]

export const DEFAULT_LANGUAGE = Language.EN

/**
 * HTML lang attribute values for proper locale specification
 * Used in <html lang="..."> for SEO and accessibility
 */
export const LANG_ATTRIBUTES: Record<Language, string> = {
  [Language.EN]: 'en-GB',
  [Language.NL]: 'nl-NL',
}
