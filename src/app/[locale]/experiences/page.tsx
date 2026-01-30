import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateLocalBusinessSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route, ExperienceType, BookingPlatform, Language } from '@/types'
import { SITE_CONFIG } from '@/constants/site'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { EXPERIENCE_OFFERS, FEATURED_RETREATS } from '@/data'

import styles from '../../experiences/page.module.css'

interface ExperiencesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ExperiencesPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return generatePageMetadata({
    title: t.experiences.metaTitle,
    description: t.experiences.metaDescription,
    path: '/experiences',
    locale: validLocale,
  })
}

const CheckIcon = () => (
  <svg
    className={styles.featureIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
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
)

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

function getOfferContent(type: ExperienceType, t: Awaited<ReturnType<typeof getServerTranslations>>) {
  switch (type) {
    case ExperienceType.SOLO_RETREAT:
      return {
        title: t.experiences.soloRetreat.title,
        description: t.experiences.soloRetreat.description,
        features: t.experiences.soloRetreat.features,
        ctaLabel: t.experiences.soloRetreat.ctaLabel,
      }
    case ExperienceType.ACCOMMODATION:
      return {
        title: t.experiences.accommodation.title,
        description: t.experiences.accommodation.description,
        features: t.experiences.accommodation.features,
        platforms: t.experiences.accommodation.platforms,
      }
    case ExperienceType.TOGETHER_RETREAT:
      return {
        title: t.experiences.togetherRetreat.title,
        description: t.experiences.togetherRetreat.description,
        features: t.experiences.togetherRetreat.features,
        ctaLabel: t.experiences.togetherRetreat.ctaLabel,
      }
  }
}

interface OfferCardProps {
  offer: typeof EXPERIENCE_OFFERS[number]
  t: Awaited<ReturnType<typeof getServerTranslations>>
}

function OfferCard({ offer, t }: OfferCardProps) {
  const content = getOfferContent(offer.type, t)

  return (
    <article className={styles.offerCard}>
      <div className={styles.offerImageWrapper}>
        <Image
          src={offer.image}
          alt={content.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={styles.offerImage}
        />
      </div>

      <div className={styles.offerContent}>
        <h3 className={styles.offerTitle}>{content.title}</h3>
        <p className={styles.offerDescription}>{content.description}</p>

        <ul className={styles.featuresList}>
          {content.features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>

        {offer.externalUrl && 'ctaLabel' in content && (
          <a
            href={offer.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.offerCta}
          >
            {content.ctaLabel}
            <ArrowIcon className={styles.offerCtaIcon} />
          </a>
        )}

        {offer.bookingLinks && 'platforms' in content && content.platforms && (
          <div className={styles.bookingLinks}>
            {offer.bookingLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.bookingLink} ${
                  link.platform === BookingPlatform.AIRBNB
                    ? styles.bookingLinkAirbnb
                    : styles.bookingLinkNatuurhuisje
                }`}
              >
                {link.platform === BookingPlatform.AIRBNB
                  ? content.platforms.airbnb
                  : content.platforms.natuurhuisje}
                <ExternalLinkIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

interface FeaturedRetreatCardProps {
  retreat: typeof FEATURED_RETREATS[number]
  validLocale: Language
  t: Awaited<ReturnType<typeof getServerTranslations>>
}

function FeaturedRetreatCard({ retreat, validLocale, t }: FeaturedRetreatCardProps) {
  return (
    <article className={styles.featuredCard}>
      <div className={styles.featuredImageWrapper}>
        <Image
          src={retreat.image}
          alt={retreat.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={styles.featuredImage}
        />
      </div>

      <div className={styles.featuredContent}>
        <h3 className={styles.featuredTitle}>{retreat.title}</h3>
        <p className={styles.featuredDate}>{retreat.dateRange}</p>

        {(() => {
          if (retreat.internalUrl) {
            return (
              <Link
                href={getLocalizedPath(retreat.internalUrl, validLocale)}
                className={styles.featuredCta}
              >
                {t.experiences.featuredRetreats.bookNow}
                <ArrowIcon className={styles.featuredCtaIcon} />
              </Link>
            )
          }
          if (retreat.externalUrl) {
            return (
              <a
                href={retreat.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.featuredCta}
              >
                {t.experiences.featuredRetreats.bookNow}
                <ExternalLinkIcon />
              </a>
            )
          }
          return null
        })()}
      </div>
    </article>
  )
}

export default async function ExperiencesPage({ params }: ExperiencesPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return (
    <>
      <StructuredData
        data={[
          generateLocalBusinessSchema({
            type: 'LodgingBusiness',
            image: `${SITE_CONFIG.url}/images/cosmos-outside-wooden-cabin.jpeg`,
          }),
          generatePageBreadcrumbs({
            name: t.experiences.title,
            path: getLocalizedPath(Route.EXPERIENCES, validLocale),
          }),
        ]}
      />

      <div className={styles.experiences}>
        {/* Create Your Own Experience Section */}
        <section className={styles.offersSection}>
          <header className={styles.sectionHeader}>
            <h1 className={styles.sectionTitle}>{t.experiences.createExperience.title}</h1>
            <p className={styles.sectionSubtitle}>{t.experiences.createExperience.subtitle}</p>
          </header>

          <div className={styles.offersGrid}>
            {EXPERIENCE_OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} t={t} />
            ))}
          </div>

          <div className={styles.alternativeOption}>
            <span className={styles.alternativeText}>{t.experiences.createExperience.alternativeText}</span>
            <Link href={getLocalizedPath(Route.CONTACT, validLocale)} className={styles.alternativeLink}>
              {t.experiences.createExperience.alternativeCta}
              <ArrowIcon className={styles.alternativeLinkIcon} />
            </Link>
          </div>
        </section>

        <div className={styles.divider} />

        {/* Featured Retreats Section */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t.experiences.featuredRetreats.title}</h2>
            <p className={styles.sectionSubtitle}>{t.experiences.featuredRetreats.subtitle}</p>
          </div>

          <div className={styles.featuredGrid}>
            {FEATURED_RETREATS.map((retreat) => (
              <FeaturedRetreatCard key={retreat.id} retreat={retreat} validLocale={validLocale} t={t} />
            ))}
          </div>
        </section>

        <hr className={styles.divider} />

        {/* CTA Footer */}
        <footer className={styles.ctaFooter}>
          <h2 className={styles.ctaTitle}>{t.experiences.ctaTitle}</h2>
          <p className={styles.ctaSubtitle}>{t.experiences.ctaSubtitle}</p>
          <Link href={getLocalizedPath(Route.CONTACT, validLocale)} className={styles.ctaButton}>
            {t.experiences.ctaButton}
            <ArrowIcon />
          </Link>
        </footer>
      </div>
    </>
  )
}
