import { Language } from '@/types'
import type { Dictionary, Dictionaries } from '../types'
import { en } from './en'
import { nl } from './nl'

/**
 * All dictionaries indexed by language
 */
export const dictionaries: Dictionaries = {
  [Language.EN]: en,
  [Language.NL]: nl,
}

/**
 * Get dictionary for a specific language
 * Falls back to English if language not found
 */
export function getDictionary(language: Language): Dictionary {
  return dictionaries[language] ?? dictionaries[Language.EN]
}

export { en, nl }
export type { Dictionary }
