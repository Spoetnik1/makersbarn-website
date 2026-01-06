import type { Metadata } from 'next'
import Link from 'next/link'
import { FacilitiesCarousel } from '@/components/client'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { SITE_CONFIG } from '@/constants/site'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import styles from '../../facilities/page.module.css'

interface FacilitiesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FacilitiesPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)
  
  return generatePageMetadata({
    title: t.facilities.metaTitle,
    description: t.facilities.metaDescription,
    path: '/facilities',
    locale: validLocale,
  })
}

export default async function FacilitiesPage({ params }: FacilitiesPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema({
            type: 'LodgingBusiness',
            image: `${SITE_CONFIG.url}/images/main-house.jpg`,
          }),
          generatePageBreadcrumbs({ name: t.facilities.title, path: getLocalizedPath(Route.FACILITIES, validLocale) }),
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
          <Link href={getLocalizedPath(Route.CONTACT, validLocale)} className={styles.ctaButton}>
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

