import type { Metadata } from 'next'
import { Playfair_Display, Quicksand } from 'next/font/google'
import { LanguageWrapper, Navbar } from '@/components/client'
import { Footer, StructuredData } from '@/components/server'
import { baseMetadata } from '@/lib/metadata'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structuredData'
import { LANG_ATTRIBUTES, DEFAULT_LANGUAGE } from '@/constants/languages'
import { getServerLanguage } from '@/i18n'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})

export const metadata: Metadata = baseMetadata

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const language = await getServerLanguage()
  const langAttribute = LANG_ATTRIBUTES[language] || LANG_ATTRIBUTES[DEFAULT_LANGUAGE]

  return (
    <html lang={langAttribute} className={`${playfair.variable} ${quicksand.variable}`}>
      <body>
        <StructuredData data={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        <LanguageWrapper initialLanguage={language}>
          <div className="layout">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </LanguageWrapper>
      </body>
    </html>
  )
}
