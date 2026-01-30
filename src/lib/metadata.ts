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
  ogTitle?: string // Optional custom Open Graph title for social sharing
}

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/open-graph-preview-image.png',
  imageWidth = 1200,
  imageHeight = 630,
  locale = DEFAULT_LANGUAGE,
  ogTitle,
}: PageMetadataParams): Metadata {
  // For home page, use just the site name. For other pages, use "Site Name | Page Name"
  const isHomePage = path === '' || path === '/'
  const fullTitle = isHomePage ? SITE_NAME : `${SITE_NAME} | ${title}`
  // Use custom OG title if provided, otherwise use the page title
  const ogTitleFinal = ogTitle || fullTitle
  
  // Generate localized path for the current locale
  const localizedPath = getLocalizedPath(path, locale)
  // Normalize URL: ensure no trailing slash (except for root) and consistent format
  const normalizedPath = localizedPath === '/' ? '/' : localizedPath.replace(/\/$/, '')
  const url = `${SITE_URL}${normalizedPath}`
  
  // Generate alternate language URLs for hreflang tags
  const alternateLanguages: Record<string, string> = {}
  for (const lang of Object.values(Language) as Language[]) {
    const altPath = getLocalizedPath(path, lang)
    // Normalize alternate URLs to match canonical format
    const normalizedAltPath = altPath === '/' ? '/' : altPath.replace(/\/$/, '')
    alternateLanguages[lang] = `${SITE_URL}${normalizedAltPath}`
  }

  // Build Open Graph image with required properties for WhatsApp
  const ogImage = {
    url: `${SITE_URL}${image}`,
    width: imageWidth,
    height: imageHeight,
    alt: ogTitleFinal,
  }

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    openGraph: {
      title: ogTitleFinal,
      description,
      url,
      siteName: SITE_NAME,
      images: [ogImage],
      locale: OG_LOCALE_MAP[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitleFinal,
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
    default: SITE_NAME,
    template: `${SITE_NAME} | %s`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['retreat', 'retraite', 'huren', 'rent', 'organize', 'organiseren', 'natuur', 'nature', 'yoga'],
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
