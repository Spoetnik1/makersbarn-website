import { MetadataRoute } from 'next'

import { Route, Language  } from '@/types'
import { SITE_CONFIG } from '@/constants/site'
import { getLocalizedPath } from '@/lib/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // Define all pages with their priorities and change frequencies
  const pageRoutes = [
    {
      path: Route.HOME,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      path: Route.ABOUT,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      path: Route.FACILITIES,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      path: Route.CONTACT,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Generate entries for each route in each language
  const routes: MetadataRoute.Sitemap = []
  
  for (const pageRoute of pageRoutes) {
    for (const locale of Object.values(Language) as Language[]) {
      const localizedPath = getLocalizedPath(pageRoute.path, locale)
      routes.push({
        url: `${baseUrl}${localizedPath}`,
        lastModified: new Date(),
        changeFrequency: pageRoute.changeFrequency,
        priority: pageRoute.priority,
      })
    }
  }

  return routes
}

