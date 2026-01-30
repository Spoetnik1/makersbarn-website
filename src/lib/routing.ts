import { Language } from '@/types'

import { isValidLocale } from './locale'

/**
 * Gets a localized path by adding the locale prefix
 * @param path - The path without locale (e.g., '/about' or '/facilities')
 * @param locale - The locale to add (e.g., 'en' or 'nl')
 * @returns The localized path (e.g., '/en/about' or '/nl/facilities')
 */
export function getLocalizedPath(path: string, locale: Language): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  // Remove any existing locale prefix
  const pathWithoutLocale = getPathWithoutLocale(normalizedPath)
  // Add the new locale prefix
  return `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
}

/**
 * Replaces the locale in a path with a new locale
 * @param path - The path that may or may not contain a locale (e.g., '/en/about' or '/about')
 * @param newLocale - The new locale to use
 * @returns The path with the new locale prefix
 */
export function replaceLocaleInPath(path: string, newLocale: Language): string {
  const pathWithoutLocale = getPathWithoutLocale(path)
  return getLocalizedPath(pathWithoutLocale, newLocale)
}

/**
 * Removes the locale prefix from a path
 * @param path - The path that may contain a locale (e.g., '/en/about' or '/nl/facilities')
 * @returns The path without the locale prefix (e.g., '/about' or '/facilities')
 */
export function getPathWithoutLocale(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Split the path into segments
  const segments = normalizedPath.split('/').filter(Boolean)
  
  // If the first segment is a valid locale, remove it
  if (segments.length > 0 && isValidLocale(segments[0])) {
    const pathWithoutLocale = '/' + segments.slice(1).join('/')
    return pathWithoutLocale || '/'
  }
  
  // Return the original path if no locale prefix found
  return normalizedPath
}

/**
 * Extracts the locale from a path
 * @param path - The path that may contain a locale (e.g., '/en/about' or '/nl/facilities')
 * @returns The locale if found, null otherwise
 */
export function getLocaleFromPath(path: string): Language | null {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Split the path into segments
  const segments = normalizedPath.split('/').filter(Boolean)
  
  // Check if the first segment is a valid locale
  if (segments.length > 0 && isValidLocale(segments[0])) {
    return segments[0]
  }
  
  return null
}

