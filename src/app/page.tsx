import dynamic from 'next/dynamic'
import { Hero } from '@/components/client'
import { HeroDetails, FacilitiesStats, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'

const ImpressionCarousel = dynamic(
  () => import('@/components/client/ImpressionCarousel').then((mod) => mod.ImpressionCarousel)
)

const Testimonials = dynamic(
  () => import('@/components/client/Testimonials').then((mod) => mod.Testimonials)
)

const ImpressionPolaroids = dynamic(
  () => import('@/components/client/ImpressionPolaroids').then((mod) => mod.ImpressionPolaroids)
)

export const metadata = generatePageMetadata({
  title: 'Home',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema(),
          generatePageBreadcrumbs({ name: 'Home', path: Route.HOME }),
        ]}
      />
      <Hero />
      <HeroDetails />
      <FacilitiesStats />
      <ImpressionCarousel />
      <Testimonials />
      <ImpressionPolaroids />
    </>
  )
}
