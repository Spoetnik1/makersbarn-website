import { Metadata } from 'next'

const SITE_NAME = "The Maker's Barn"
const SITE_URL = 'https://themakersbarn.com'
const DEFAULT_DESCRIPTION = 'Your retreat deserves more than just a venue. 60m²+ practice hall, 14 beds, 1.3ha+ private land in the Dutch countryside.'

interface PageMetadataParams {
  title: string
  description?: string
  path?: string
  image?: string
}

export function generatePageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/main-house.jpg',
}: PageMetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${image}` }],
      locale: 'en_GB',
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: 'nl_NL',
    siteName: SITE_NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
}
