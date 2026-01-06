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
import { useRouter, usePathname } from 'next/navigation'
import { Language } from '@/types'
import { DEFAULT_LANGUAGE, LANG_ATTRIBUTES } from '@/constants'
import { getDictionary } from '@/i18n/dictionaries'
import type { Dictionary } from '@/i18n/types'
import {
  getLanguageFromLocalStorage,
  setLanguageToLocalStorage,
  setLanguageCookie,
} from '@/lib/language'
import { getLocaleFromPath, replaceLocaleInPath } from '@/lib/routing'

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
  const router = useRouter()
  const pathname = usePathname()
  
  // Get locale from URL path, fallback to initialLanguage
  const urlLocale = getLocaleFromPath(pathname) || initialLanguage
  const [language, setLanguageState] = useState<Language>(urlLocale)
  const [isHydrated, setIsHydrated] = useState(false)

  // Sync language state with URL locale when pathname changes
  useEffect(() => {
    const urlLocale = getLocaleFromPath(pathname)
    if (urlLocale && urlLocale !== language) {
      setLanguageState(urlLocale)
      // Sync storage to match URL
      setLanguageToLocalStorage(urlLocale)
      setLanguageCookie(urlLocale)
    }
  }, [pathname, language])

  // On mount, check if localStorage has a different preference
  // But prioritize URL locale over localStorage
  useEffect(() => {
    const urlLocale = getLocaleFromPath(pathname)
    const storedLanguage = getLanguageFromLocalStorage()

    // If URL has a locale, use it (highest priority)
    if (urlLocale) {
      setLanguageState(urlLocale)
      // Sync storage to match URL
      setLanguageToLocalStorage(urlLocale)
      setLanguageCookie(urlLocale)
    } else if (storedLanguage && storedLanguage !== language) {
      // No locale in URL, but localStorage has preference
      // This shouldn't happen in normal flow, but handle it gracefully
      setLanguageState(storedLanguage)
      setLanguageCookie(storedLanguage)
    } else if (!storedLanguage) {
      // No localStorage, sync it with current language
      setLanguageToLocalStorage(language)
    }

    // Mark hydration complete after localStorage check
    setIsHydrated(true)
  }, [])

  // Sync HTML lang attribute when language changes
  useEffect(() => {
    if (isHydrated && typeof document !== 'undefined') {
      document.documentElement.lang = LANG_ATTRIBUTES[language]
    }
  }, [language, isHydrated])

  // Update language and navigate to new URL with locale
  const setLanguage = useCallback((newLanguage: Language) => {
    // Navigate to the same page but with the new locale
    const newPath = replaceLocaleInPath(pathname, newLanguage)
    router.push(newPath)
    // State will be updated by the useEffect that watches pathname
  }, [pathname, router])

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
