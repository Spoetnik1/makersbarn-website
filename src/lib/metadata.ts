import { Metadata } from 'next'
import { SITE_CONFIG } from '@/constants/site'
import { DEFAULT_LANGUAGE } from '@/constants'
import { Language } from '@/types'
import { getLocalizedPath } from './routing'

const SITE_NAME = SITE_CONFIG.name
const SITE_URL = SITE_CONFIG.url
const DEFAULT_DESCRIPTION = 'Give your retreat the place it deserves. 60m²+ practice hall, 14 beds, 1.3ha+ private land in the Dutch countryside.'

/**
 * Maps Language enum to OpenGraph locale format
 */
const OG_LOCALE_MAP: Record<Language, string> = {
  [Language.EN]: 'en_GB',
  [Language.NL]: 'nl_NL',
}

interface PageMetadataParams {
  title: string
  description?: string
  path?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  locale?: Language
}

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/main-house.jpg',
  imageWidth = 1200,
  imageHeight = 630,
  locale = DEFAULT_LANGUAGE,
}: PageMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  
  // Generate localized path for the current locale
  const localizedPath = getLocalizedPath(path, locale)
  const url = `${SITE_URL}${localizedPath}`
  
  // Generate alternate language URLs for hreflang tags
  const alternateLanguages: Record<string, string> = {}
  for (const lang of Object.values(Language) as Language[]) {
    const altPath = getLocalizedPath(path, lang)
    alternateLanguages[lang] = `${SITE_URL}${altPath}`
  }

  // Build Open Graph image with required properties for WhatsApp
  const ogImage = {
    url: `${SITE_URL}${image}`,
    width: imageWidth,
    height: imageHeight,
    alt: fullTitle,
  }

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: OG_LOCALE_MAP[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },
  }
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Dutch Countryside Retreat`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['retreat', 'Netherlands', 'countryside', 'wellness', 'workshop venue', 'creative retreat'],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.defaultLocale,
    alternateLocale: SITE_CONFIG.alternateLocale,
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
}
