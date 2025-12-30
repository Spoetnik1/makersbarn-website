import { MetadataRoute } from 'next'
import { Route } from '@/types'

const SITE_URL = 'https://themakersbarn.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  // Define all pages with their priorities and change frequencies
  const routes = [
    {
      url: `${baseUrl}${Route.HOME}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}${Route.ABOUT}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${Route.FACILITIES}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}${Route.CONTACT}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return routes
}

