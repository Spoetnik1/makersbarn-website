import { LanguageWrapper, Navbar } from '@/components/client'
import { Footer } from '@/components/server'
import { getValidLocale } from '@/lib/locale'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

/**
 * Locale-aware layout for all pages under [locale] route
 * 
 * This layout:
 * - Validates the locale from URL params
 * - Wraps the app with LanguageWrapper to provide language context
 * - Includes common layout components (Navbar, Footer)
 * - Sets the HTML lang attribute via LanguageContext (client-side)
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)

  return (
    <LanguageWrapper initialLanguage={validLocale}>
      <Navbar />
      {children}
      <Footer locale={validLocale} />
    </LanguageWrapper>
  )
}

