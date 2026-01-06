import type { Metadata } from 'next'
import Link from 'next/link'
import { FacilitiesCarousel } from '@/components/client'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { SITE_CONFIG } from '@/constants/site'
import { getServerTranslations } from '@/i18n'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'Facilities',
  description:
    'Explore our unique retreat spaces at MakersBarn. Rent the entire location with private garden, converted hay barn, 14 beds plus space for tents and campervans.',
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
        </section>

        <footer className={styles.ctaFooter}>
          <h2 className={styles.ctaTitle}>{t.facilities.ctaTitle}</h2>
          <p className={styles.ctaSubtitle}>{t.facilities.ctaSubtitle}</p>
          <Link href={Route.CONTACT} className={styles.ctaButton}>
            {t.facilities.ctaButton}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </footer>
      </div>
    </>
  )
}


