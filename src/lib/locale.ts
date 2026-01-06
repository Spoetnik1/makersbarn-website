import { Language } from '@/types'
import { DEFAULT_LANGUAGE } from '@/constants'

/**
 * Validates if a string is a valid locale (Language enum value)
 * Type guard function that narrows the type to Language
 */
export function isValidLocale(locale: string): locale is Language {
  return Object.values(Language).includes(locale as Language)
}

/**
 * Gets a valid locale from a string or null value
 * Returns the locale if valid, otherwise falls back to DEFAULT_LANGUAGE
 */
export function getValidLocale(locale: string | null): Language {
  if (locale && isValidLocale(locale)) {
    return locale
  }
  return DEFAULT_LANGUAGE
}

