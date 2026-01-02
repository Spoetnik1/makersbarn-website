/**
 * Centralized site configuration
 * Single source of truth for domain and site identity
 */
export const SITE_CONFIG = {
  name: "The Maker's Barn",
  domain: 'themakersbarn.nl',
  url: 'https://themakersbarn.nl',
  defaultLocale: 'nl_NL',
  alternateLocale: 'en_GB',
} as const

export type SiteConfig = typeof SITE_CONFIG
