import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { IMAGES, IMAGE_ALT_TEXT } from '@/data'
import { CONTACT_URLS } from '@/constants'
import styles from '../../location/page.module.css'

const LOCATION_IMAGES = [
  IMAGES.location.kasteelNijenhuis,
  IMAGES.location.havezateAlerdinckTrees,
  IMAGES.location.havezateAlerdinck,
] as const

interface LocationPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return generatePageMetadata({
    title: t.location.metaTitle,
    description: t.location.metaDescription,
    path: '/location',
    locale: validLocale,
  })
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema({
            type: 'LodgingBusiness',
          }),
          generatePageBreadcrumbs({ name: t.location.title, path: getLocalizedPath(Route.LOCATION, validLocale) }),
        ]}
      />
      <div className={styles.location}>
        <article className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.location.title}</h1>
          </header>

          <div className={styles.body}>
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
                  alt={IMAGE_ALT_TEXT[src]?.[validLocale] || ''}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.image}
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

          <footer className={styles.cta}>
            <p className={styles.ctaText}>{t.location.cta}</p>
            <Link href={getLocalizedPath(Route.CONTACT, validLocale)} className={styles.ctaButton}>
              {t.location.ctaButton}
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
        </article>
      </div>
    </>
  )
}
