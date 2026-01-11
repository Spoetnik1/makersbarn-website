import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getServerLanguage } from '@/i18n'
import { getLocalizedPath } from '@/lib/routing'
import { generatePageMetadata } from '@/lib/metadata'
import { DEFAULT_LANGUAGE } from '@/constants'
import { SITE_CONFIG } from '@/constants/site'

/**
 * Root page redirect handler
 * 
 * Redirects root requests (/) to the appropriate localized path (/en/ or /nl/)
 * based on user preference (cookie/localStorage) or domain detection.
 * Defaults to /en/ if no preference is detected.
 * 
 * This page has metadata to ensure canonical tags are set even though it redirects,
 * preventing "Duplicate without user-selected canonical" errors in Google Search Console.
 */
export async function generateMetadata(): Promise<Metadata> {
  // Use default language for canonical URL to ensure consistency
  // The actual redirect will go to the user's preferred language
  const defaultLocale = DEFAULT_LANGUAGE
  const defaultLocalizedPath = getLocalizedPath('/', defaultLocale)
  const canonicalUrl = `${SITE_CONFIG.url}${defaultLocalizedPath}`
  
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function RootRedirect() {
  // Get the user's preferred language from cookie or domain detection
  const language = await getServerLanguage()
  
  // Redirect to the localized home path
  const localizedPath = getLocalizedPath('/', language)
  redirect(localizedPath)
}
