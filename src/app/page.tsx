import { redirect } from 'next/navigation'
import { getServerLanguage } from '@/i18n'
import { getLocalizedPath } from '@/lib/routing'

/**
 * Root page redirect handler
 * 
 * Redirects root requests (/) to the appropriate localized path (/en/ or /nl/)
 * based on user preference (cookie/localStorage) or domain detection.
 * Defaults to /en/ if no preference is detected.
 */
export default async function RootRedirect() {
  // Get the user's preferred language from cookie or domain detection
  const language = await getServerLanguage()
  
  // Redirect to the localized home path
  const localizedPath = getLocalizedPath('/', language)
  redirect(localizedPath)
}
