'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import { Language } from '@/types'
import { DEFAULT_LANGUAGE } from '@/constants'
import { getDictionary } from '@/i18n/dictionaries'
import type { Dictionary } from '@/i18n/types'
import {
  getLanguageFromLocalStorage,
  setLanguageToLocalStorage,
  setLanguageCookie,
} from '@/lib/language'

/**
 * Context value shape for language state and operations
 */
interface LanguageContextValue {
  /** Current active language */
  language: Language
  /** Update language (persists to cookie + localStorage) */
  setLanguage: (language: Language) => void
  /** Full dictionary for current language */
  dictionary: Dictionary
  /** Whether hydration with localStorage check is complete */
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

interface LanguageProviderProps {
  children: ReactNode
  /** Initial language from server (read from cookie) */
  initialLanguage?: Language
}

/**
 * Provider component for language state management
 *
 * Handles:
 * - Initial language from server (via cookie)
 * - localStorage override (user preference)
 * - Syncing changes to both cookie and localStorage
 */
export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const [isHydrated, setIsHydrated] = useState(false)

  // On mount, check if localStorage has a different preference
  useEffect(() => {
    const storedLanguage = getLanguageFromLocalStorage()

    if (storedLanguage && storedLanguage !== language) {
      // User has a stored preference that differs from server
      setLanguageState(storedLanguage)
      // Sync cookie to match localStorage
      setLanguageCookie(storedLanguage)
    } else if (!storedLanguage) {
      // No localStorage, sync it with current language
      setLanguageToLocalStorage(language)
    }

    // Mark hydration complete after localStorage check
    setIsHydrated(true)
  }, [])

  // Update language and persist to both storage mechanisms
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage)
    setLanguageToLocalStorage(newLanguage)
    setLanguageCookie(newLanguage)
  }, [])

  // Get dictionary for current language
  const dictionary = useMemo(() => getDictionary(language), [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      dictionary,
      isHydrated,
    }),
    [language, setLanguage, dictionary, isHydrated]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook to access language context
 *
 * @throws Error if used outside LanguageProvider
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}

/**
 * Hook to get translations for a specific namespace
 *
 * @example
 * const { t } = useTranslation('nav')
 * t.home // "Home" or "Home" depending on language
 */
export function useTranslation<K extends keyof Dictionary>(
  namespace: K
): { t: Dictionary[K]; language: Language; isHydrated: boolean } {
  const { dictionary, language, isHydrated } = useLanguage()

  return {
    t: dictionary[namespace],
    language,
    isHydrated,
  }
}
