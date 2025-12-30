import type { Metadata } from 'next'
import { FacilitiesCarousel } from '@/components/client'
import { FacilitiesStats, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { SITE_CONFIG } from '@/constants/site'
import { getServerTranslations } from '@/i18n'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'Facilities',
  description:
    'Explore our unique retreat spaces at MakersBarn. Rent the entire location with private garden, converted hay barn, 23 beds, and all the tranquility you need.',
  path: '/facilities',
})

export default async function FacilitiesPage() {
  const t = await getServerTranslations()

  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema({
            type: 'LodgingBusiness',
            image: `${SITE_CONFIG.url}/images/main-house.jpg`,
          }),
          generatePageBreadcrumbs({ name: t.facilities.title, path: Route.FACILITIES }),
        ]}
      />
      <div className={styles.facilities}>
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.facilities.title}</h1>
            <p className={styles.intro}>{t.facilities.intro}</p>
            <p className={`${styles.intro} ${styles.secondary}`}>{t.facilities.secondary}</p>
          </header>

          <FacilitiesCarousel />
          <FacilitiesStats />
        </section>
      </div>
    </>
  )
}


