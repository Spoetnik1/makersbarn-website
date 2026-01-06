import dynamic from 'next/dynamic'
import { Hero } from '@/components/client'
import { HeroDetails, FacilitiesStats, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { getServerTranslations } from '@/i18n'

const ImpressionCarousel = dynamic(
  () => import('@/components/client/ImpressionCarousel').then((mod) => mod.ImpressionCarousel)
)

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)
  
  return generatePageMetadata({
    title: t.nav.home,
    description: t.metadata.defaultDescription,
    path: '/',
    locale: validLocale,
  })
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const localizedHomePath = getLocalizedPath('/', validLocale)

  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema(),
          generatePageBreadcrumbs({ name: 'Home', path: localizedHomePath }),
        ]}
      />
      <Hero />
      <HeroDetails locale={validLocale} />
      <FacilitiesStats locale={validLocale} />
      <ImpressionCarousel />
    </>
  )
}

