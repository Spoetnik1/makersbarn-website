import type { Metadata } from 'next'
import { FacilitiesCarousel } from '@/components/client'
import { FacilitiesStats, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'Facilities',
  description:
    'Explore our unique retreat spaces at MakersBarn. Rent the entire location with private garden, converted hay barn, 23 beds, and all the tranquility you need.',
  path: '/facilities',
})

const FACILITIES_CONTENT = {
  title: 'Facilities',
  intro: `Rent the entire location for your retreat, masterclass, or creative adventures. We offer a private garden,
    converted hay barn, 23 beds, and all the space and tranquility you need.`,
  secondary: `Need extra spaces during your retreat or want to book a separate space for a one-on-one session or
    other intimate gathering? We have these gems that we lovingly offer as your home away from home.`,
} as const

export default function FacilitiesPage() {
  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema({
            type: 'LodgingBusiness',
            image: 'https://themakersbarn.com/images/main-house.jpg',
          }),
          generatePageBreadcrumbs({ name: 'Facilities', path: Route.FACILITIES }),
        ]}
      />
      <div className={styles.facilities}>
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{FACILITIES_CONTENT.title}</h1>
            <p className={styles.intro}>{FACILITIES_CONTENT.intro}</p>
            <p className={`${styles.intro} ${styles.secondary}`}>{FACILITIES_CONTENT.secondary}</p>
          </header>

          <FacilitiesCarousel />
          <FacilitiesStats />
        </section>
      </div>
    </>
  )
}


