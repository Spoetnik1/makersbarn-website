import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { TeamGrid, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { IMAGES, IMAGE_ALT_TEXT } from '@/data'
import { CONTACT_URLS } from '@/constants'

import styles from '../../about/page.module.css'

const LOCATION_IMAGES = [
  IMAGES.location.kasteelNijenhuis,
  IMAGES.location.havezateAlerdinckTrees,
  IMAGES.location.havezateAlerdinck,
] as const

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)
  
  return generatePageMetadata({
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    path: '/about',
    locale: validLocale,
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return (
    <>
      <StructuredData
        data={[generatePageBreadcrumbs({ name: t.about.title, path: getLocalizedPath(Route.ABOUT, validLocale) })]}
      />
      <div className={styles.about}>
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.about.title}</h1>
            <p className={styles.intro}>{t.about.intro}</p>
            <p className={styles.intro}>{t.about.secondary}</p>
            <p className={styles.intro}>{t.about.tertiary}</p>
            <p className={`${styles.intro} ${styles.secondary}`}>{t.about.fourth}</p>
          </header>
        </section>

        <section className={styles.team}>
          <div className={styles.teamContainer}>
            <h2 className={styles.teamTitle}>{t.about.teamTitle}</h2>
            <TeamGrid locale={validLocale} />
          </div>
        </section>

        <section id="location" className={styles.surroundings}>
          <div className={styles.surroundingsContent}>
            <h2 className={styles.surroundingsTitle}>{t.location.title}</h2>

            <div className={styles.surroundingsBody}>
              <p>{t.location.intro}</p>
              <p>{t.location.surroundings}</p>
              <p>{t.location.hiking}</p>
              <p>{t.location.cities}</p>
            </div>

            <div className={styles.imageGallery}>
              {LOCATION_IMAGES.map((src) => (
                <div key={src} className={styles.imageWrapper}>
                  <Image
                    src={src}
                    alt={IMAGE_ALT_TEXT[src][validLocale] || ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.locationImage}
                  />
                </div>
              ))}
            </div>

            <div className={styles.mapSection}>
              <div className={styles.mapContainer}>
                <iframe
                  src={CONTACT_URLS.MAP_EMBED}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Makers Barn location"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <p className={styles.ctaText}>{t.about.cta}</p>
          <Link href={getLocalizedPath(Route.CONTACT, validLocale)} className={styles.ctaButton}>
            {t.about.ctaButton}
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
        </section>
      </div>
    </>
  )
}

