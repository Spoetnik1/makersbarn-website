import { Language } from '@/types'
import { DEFAULT_LANGUAGE } from '@/constants'

/**
 * Cookie name for storing language preference
 */
export const LANGUAGE_COOKIE_NAME = 'NEXT_LOCALE'

/**
 * localStorage key for storing language preference
 */
export const LANGUAGE_STORAGE_KEY = 'makersbarn_language'

/**
 * Cookie max age in seconds (1 year)
 */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/**
 * Domain patterns for language detection (TLD suffixes)
 */
const DUTCH_DOMAIN_PATTERNS = ['.nl'] as const

/**
 * Allowed hostnames for domain detection (security whitelist)
 */
const ALLOWED_HOSTS = [
  'makersbarn.com',
  'makersbarn.nl',
  'www.makersbarn.com',
  'www.makersbarn.nl',
  'localhost',
  '127.0.0.1',
] as const

/**
 * Validates if a value is a valid Language enum value
 */
export function isValidLanguage(value: unknown): value is Language {
  return Object.values(Language).includes(value as Language)
}

/**
 * Validates hostname against allowed hosts whitelist
 */
export function isAllowedHost(hostname: string): boolean {
  const lowerHostname = hostname.toLowerCase().split(':')[0] // Remove port
  return ALLOWED_HOSTS.some(
    (allowed) => lowerHostname === allowed || lowerHostname.endsWith(`.${allowed}`)
  )
}

/**
 * Detects language from hostname based on domain TLD
 * .nl domains default to Dutch, all others to English
 * Only processes whitelisted hosts for security
 */
export function detectLanguageFromDomain(hostname: string): Language {
  const lowerHostname = hostname.toLowerCase().split(':')[0] // Remove port

  // Only detect from whitelisted hosts
  if (!isAllowedHost(hostname)) {
    return DEFAULT_LANGUAGE
  }

  for (const pattern of DUTCH_DOMAIN_PATTERNS) {
    if (lowerHostname.endsWith(pattern)) {
      return Language.NL
    }
  }

  return DEFAULT_LANGUAGE
}

/**
 * Parses language from cookie string (server-side)
 * Returns null if cookie not found or invalid
 */
export function getLanguageFromCookieString(cookieString: string): Language | null {
  const cookies = cookieString.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    if (key && value) {
      try {
        acc[key] = decodeURIComponent(value)
      } catch {
        // Handle malformed percent-encoded values (e.g., %ZZ)
        acc[key] = value
      }
    }
    return acc
  }, {})

  const languageValue = cookies[LANGUAGE_COOKIE_NAME]

  if (languageValue && isValidLanguage(languageValue)) {
    return languageValue
  }

  return null
}

/**
 * Creates a Set-Cookie header value for language preference
 */
export function createLanguageCookieValue(language: Language): string {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${LANGUAGE_COOKIE_NAME}=${language}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`
}

/**
 * Gets language from localStorage (client-side only)
 * Returns null if not available or invalid
 */
export function getLanguageFromLocalStorage(): Language | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    if (stored && isValidLanguage(stored)) {
      return stored
    }
  } catch {
    // localStorage may be unavailable (private browsing, etc.)
  }

  return null
}

/**
 * Saves language to localStorage (client-side only)
 */
export function setLanguageToLocalStorage(language: Language): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Sets language cookie from client-side
 */
export function setLanguageCookie(language: Language): void {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = createLanguageCookieValue(language)
}

/**
 * Gets language from document.cookie (client-side)
 */
export function getLanguageFromDocumentCookie(): Language | null {
  if (typeof document === 'undefined') {
    return null
  }

  return getLanguageFromCookieString(document.cookie)
}

/**
 * Resolves the effective language using priority:
 * 1. localStorage (user preference)
 * 2. Cookie (server-synced preference)
 * 3. Domain detection
 * 4. DEFAULT_LANGUAGE fallback
 */
export function resolveLanguage(
  hostname: string,
  cookieString?: string
): Language {
  // Priority 1: Check localStorage (only on client)
  const localStorageLanguage = getLanguageFromLocalStorage()
  if (localStorageLanguage) {
    return localStorageLanguage
  }

  // Priority 2: Check cookie
  if (cookieString) {
    const cookieLanguage = getLanguageFromCookieString(cookieString)
    if (cookieLanguage) {
      return cookieLanguage
    }
  }

  // Priority 3: Detect from domain
  return detectLanguageFromDomain(hostname)
}
