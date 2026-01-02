import { cookies, headers } from 'next/headers'
import { Language } from '@/types'
import { DEFAULT_LANGUAGE } from '@/constants'
import {
  LANGUAGE_COOKIE_NAME,
  isValidLanguage,
  detectLanguageFromDomain,
} from '@/lib/language'
import { getDictionary } from './dictionaries'
import type { Dictionary } from './types'

/**
 * Gets the current language from server context
 * Priority: Cookie > Domain detection > Default
 *
 * Use this in Server Components and Server Actions
 */
export async function getServerLanguage(): Promise<Language> {
  const cookieStore = await cookies()
  const headerStore = await headers()

  // Try to get language from cookie
  const languageCookie = cookieStore.get(LANGUAGE_COOKIE_NAME)
  if (languageCookie && isValidLanguage(languageCookie.value)) {
    return languageCookie.value
  }

  // Fall back to domain detection
  const host = headerStore.get('host') || ''
  return detectLanguageFromDomain(host)
}

/**
 * Gets the translation dictionary for the current server context
 *
 * Use this in Server Components to get translations
 */
export async function getServerTranslations(): Promise<Dictionary> {
  const language = await getServerLanguage()
  return getDictionary(language)
}

/**
 * Synchronous version for use cases where async is not available
 * Requires explicit language parameter
 */
export function getTranslations(language: Language = DEFAULT_LANGUAGE): Dictionary {
  return getDictionary(language)
}
