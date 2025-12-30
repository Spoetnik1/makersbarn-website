import { Route } from '@/types'
import { FOOTER_ADDRESS, FOOTER_EMAIL, SOCIAL_LINKS } from '@/constants/footer'
import { CONTACT_PHONE_NUMBER } from '@/constants/contact'
import { SITE_CONFIG } from '@/constants/site'

const SITE_NAME = SITE_CONFIG.name
const SITE_URL = SITE_CONFIG.url

export interface OrganizationSchema {
  '@context': string
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    email: string
    areaServed: string
    availableLanguage: string[]
  }
  sameAs: string[]
}

export interface LocalBusinessSchema {
  '@context': string
  '@type': 'LocalBusiness' | 'LodgingBusiness'
  name: string
  image: string
  '@id': string
  url: string
  telephone: string
  email: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude?: number
    longitude?: number
  }
  priceRange?: string
  amenityFeature?: Array<{
    '@type': 'LocationFeatureSpecification'
    name: string
    value: boolean | string
  }>
}

export interface WebSiteSchema {
  '@context': string
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  publisher: {
    '@id': string
  }
  potentialAction?: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface BreadcrumbListSchema {
  '@context': string
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export interface ContactPageSchema {
  '@context': string
  '@type': 'ContactPage'
  name: string
  url: string
  description: string
  mainEntity: {
    '@type': 'Organization'
    '@id': string
    name: string
    telephone: string
    email: string
    address: {
      '@type': 'PostalAddress'
      streetAddress: string
      addressLocality: string
      postalCode: string
      addressCountry: string
    }
  }
}

/**
 * Generates Organization schema for the business
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const socialUrls = SOCIAL_LINKS.map((link) => link.url)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/tmb-logo.webp`,
    description:
      'A countryside retreat venue in the Netherlands offering accommodation, practice spaces, and creative workshops.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: FOOTER_ADDRESS.street,
      addressLocality: FOOTER_ADDRESS.city,
      postalCode: FOOTER_ADDRESS.postalCode,
      addressCountry: FOOTER_ADDRESS.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_PHONE_NUMBER,
      contactType: 'Customer Service',
      email: FOOTER_EMAIL,
      areaServed: 'NL',
      availableLanguage: ['en', 'nl'],
    },
    sameAs: socialUrls,
  }
}

/**
 * Generates LocalBusiness schema for facilities/retreat venue
 */
export function generateLocalBusinessSchema(options?: {
  type?: 'LocalBusiness' | 'LodgingBusiness'
  image?: string
  priceRange?: string
  amenities?: Array<{ name: string; value: boolean | string }>
  geo?: { latitude: number; longitude: number }
}): LocalBusinessSchema {
  const {
    type = 'LodgingBusiness',
    image = `${SITE_URL}/images/main-house.jpg`,
    priceRange,
    amenities = [
      { name: 'Practice Hall', value: true },
      { name: 'Sauna', value: true },
      { name: 'Hot Tub', value: true },
      { name: 'Outdoor Shower', value: true },
      { name: 'Private Land', value: '1.3 hectares' },
      { name: 'Facilities Capacity', value: '14 beds' },
    ],
    geo,
  } = options || {}

  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: SITE_NAME,
    image,
    '@id': `${SITE_URL}#business`,
    url: SITE_URL,
    telephone: CONTACT_PHONE_NUMBER,
    email: FOOTER_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: FOOTER_ADDRESS.street,
      addressLocality: FOOTER_ADDRESS.city,
      postalCode: FOOTER_ADDRESS.postalCode,
      addressCountry: FOOTER_ADDRESS.country,
    },
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude,
    }
  }

  if (priceRange) {
    schema.priceRange = priceRange
  }

  if (amenities.length > 0) {
    schema.amenityFeature = amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: amenity.value,
    }))
  }

  return schema
}

/**
 * Generates WebSite schema with organization reference
 */
export function generateWebSiteSchema(options?: {
  searchAction?: boolean
  searchUrlTemplate?: string
}): WebSiteSchema {
  const { searchAction = false, searchUrlTemplate } = options || {}

  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Your retreat deserves more than just a venue. 60m²+ practice hall, 14 beds, 1.3ha+ private land in the Dutch countryside.',
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
  }

  if (searchAction && searchUrlTemplate) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrlTemplate,
      },
      'query-input': 'required name=search_term_string',
    }
  }

  return schema
}

/**
 * Generates BreadcrumbList schema for navigation
 */
export function generateBreadcrumbListSchema(
  items: Array<{ name: string; path: string }>
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

/**
 * Helper to generate breadcrumbs for a specific page
 */
export function generatePageBreadcrumbs(
  currentPage: { name: string; path: Route | string }
): BreadcrumbListSchema {
  const items = [
    { name: 'Home', path: Route.HOME },
    { name: currentPage.name, path: currentPage.path },
  ]

  return generateBreadcrumbListSchema(items)
}

/**
 * Generates ContactPage schema for contact pages
 */
export function generateContactPageSchema(): ContactPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact | ${SITE_NAME}`,
    url: `${SITE_URL}/contact`,
    description:
      "Get in touch with MakersBarn. We'd love to hear from you about planning your retreat, workshop, or creative gathering.",
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      telephone: CONTACT_PHONE_NUMBER,
      email: FOOTER_EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: FOOTER_ADDRESS.street,
        addressLocality: FOOTER_ADDRESS.city,
        postalCode: FOOTER_ADDRESS.postalCode,
        addressCountry: FOOTER_ADDRESS.country,
      },
    },
  }
}

