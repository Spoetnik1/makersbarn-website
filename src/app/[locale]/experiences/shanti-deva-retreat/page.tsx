import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route, ScheduleDayType } from '@/types'
import { SHANTI_DEVA_RETREAT } from '@/data'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import styles from './page.module.css'

interface ShantiDevaRetreatPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ShantiDevaRetreatPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return generatePageMetadata({
    title: t.shantiDevaRetreat.metaTitle,
    description: t.shantiDevaRetreat.metaDescription,
    path: '/experiences/shanti-deva-retreat',
    locale: validLocale,
  })
}

const ArrowLeftIcon = () => (
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
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
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

const ExternalLinkIcon = ({ className }: { className?: string }) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const LocationIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const CarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
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

const PhoneIcon = ({ className }: { className?: string }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  const yearOptions: Intl.DateTimeFormatOptions = { year: 'numeric' }

  const startFormatted = start.toLocaleDateString('en-US', options)
  const endFormatted = end.toLocaleDateString('en-US', { day: 'numeric' })
  const year = start.toLocaleDateString('en-US', yearOptions)

  return `${startFormatted}-${endFormatted}, ${year}`
}

export default async function ShantiDevaRetreatPage({ params }: ShantiDevaRetreatPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  const retreat = SHANTI_DEVA_RETREAT

  const getActivityLabel = (activityKey: string): string => {
    const activities = t.shantiDevaRetreat.schedule.activities
    return activities[activityKey as keyof typeof activities] || activityKey
  }

  const arrivalSchedule = retreat.schedule.find(s => s.dayType === ScheduleDayType.ARRIVAL)
  const studySchedule = retreat.schedule.find(s => s.dayType === ScheduleDayType.STUDY)
  const finalSchedule = retreat.schedule.find(s => s.dayType === ScheduleDayType.FINAL)

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: t.shantiDevaRetreat.hero.title,
    description: t.shantiDevaRetreat.metaDescription,
    startDate: retreat.dates[0].startDate,
    endDate: retreat.dates[0].endDate,
    location: {
      '@type': 'Place',
      name: "The Maker's Barn",
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Duisterendijk 2',
        addressLocality: 'Wijhe',
        addressCountry: 'NL',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '640',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: retreat.bookingUrl,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Shanti Deva Buddhist Tibetan Retreat Project',
    },
  }

  return (
    <>
      <StructuredData
        data={[
          eventSchema,
          generatePageBreadcrumbs({
            name: t.shantiDevaRetreat.metaTitle,
            path: getLocalizedPath(Route.SHANTI_DEVA_RETREAT, validLocale),
          }),
        ]}
      />

      <div className={styles.retreatPage}>
        {/* Back Link */}
        <Link href={getLocalizedPath(Route.EXPERIENCES, validLocale)} className={styles.backLink}>
          <ArrowLeftIcon />
          {t.shantiDevaRetreat.backToExperiences}
        </Link>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroSubtitle}>{t.shantiDevaRetreat.hero.subtitle}</p>
            <h1 className={styles.heroTitle}>{t.shantiDevaRetreat.hero.title}</h1>
            <p className={styles.heroTeachers}>{t.shantiDevaRetreat.hero.withTeachers}</p>

            <div className={styles.heroMeta}>
              <span className={styles.heroMetaItem}>
                <LocationIcon className={styles.heroMetaIcon} />
                {retreat.location.address}
              </span>
              <span className={styles.heroMetaItem}>
                <ClockIcon className={styles.heroMetaIcon} />
                {t.shantiDevaRetreat.hero.dailyTime}
              </span>
            </div>

            <a
              href={retreat.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroCta}
            >
              {t.shantiDevaRetreat.hero.bookNow}
              <ExternalLinkIcon className={styles.heroCtaIcon} />
            </a>
          </div>
        </section>

        {/* Dates Section */}
        <section className={styles.datesSection}>
          <h2 className={styles.sectionTitle}>{t.shantiDevaRetreat.dates.title}</h2>
          <div className={styles.datesGrid}>
            <div className={styles.dateCard}>
              <p className={styles.dateLabel}>{t.shantiDevaRetreat.dates.firstRetreat}</p>
              <p className={styles.dateRange}>
                {formatDateRange(retreat.dates[0].startDate, retreat.dates[0].endDate)}
              </p>
              <p className={styles.dateDuration}>{t.shantiDevaRetreat.dates.duration}</p>
            </div>
            <div className={styles.dateCard}>
              <p className={styles.dateLabel}>{t.shantiDevaRetreat.dates.secondRetreat}</p>
              <p className={styles.dateRange}>
                {formatDateRange(retreat.dates[1].startDate, retreat.dates[1].endDate)}
              </p>
              <p className={styles.dateDuration}>{t.shantiDevaRetreat.dates.duration}</p>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* Teacher Section */}
        <section className={styles.teacherSection}>
          <div className={styles.teacherContent}>
            <div className={styles.teacherImageWrapper}>
              <Image
                src={retreat.heroImage}
                alt={retreat.teachers[0].name}
                fill
                className={styles.teacherImage}
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
            <div className={styles.teacherText}>
              <h2>{t.shantiDevaRetreat.teacher.sectionTitle}</h2>
              <p className={styles.teacherBio}>{t.shantiDevaRetreat.teacher.biography}</p>
            </div>
          </div>
        </section>

        <div className={styles.divider} />

        {/* Details Section */}
        <section className={styles.detailsSection}>
          <div className={styles.detailsContent}>
            <h2 className={styles.sectionTitle}>{t.shantiDevaRetreat.details.title}</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <h3 className={styles.detailCardTitle}>
                  <LocationIcon className={styles.detailIcon} />
                  {t.shantiDevaRetreat.details.location}
                </h3>
                <p className={styles.detailText}>{t.shantiDevaRetreat.details.locationDescription}</p>
                <p className={styles.detailText}>
                  <strong>{t.shantiDevaRetreat.details.address}:</strong>{' '}
                  <span className={styles.detailAddress}>{retreat.location.address}</span>
                </p>
              </div>
              <div className={styles.detailCard}>
                <h3 className={styles.detailCardTitle}>
                  <CarIcon className={styles.detailIcon} />
                  {t.shantiDevaRetreat.details.accessibility}
                </h3>
                <ul className={styles.accessibilityList}>
                  <li className={styles.accessibilityItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.details.accessibilityItems.carFromZwolle}
                  </li>
                  <li className={styles.accessibilityItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.details.accessibilityItems.freePickup}
                  </li>
                  <li className={styles.accessibilityItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.details.accessibilityItems.sharedTransport}
                  </li>
                </ul>
              </div>
            </div>

            {/* Venue Gallery */}
            <div className={styles.venueGallery}>
              <div className={styles.venueImageLarge}>
                <Image
                  src="/images/practice-rooms-with-mats.jpg"
                  alt="Practice room with yoga mats"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.venueImage}
                />
              </div>
              <div className={styles.venueImageSmall}>
                <Image
                  src="/images/cosmos-outside-wooden-cabin.jpeg"
                  alt="Accommodation cabin"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className={styles.venueImage}
                />
              </div>
              <div className={styles.venueImageSmall}>
                <Image
                  src="/images/pond-complete.jpg"
                  alt="Natural pond surroundings"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className={styles.venueImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className={styles.scheduleSection}>
          <h2 className={styles.sectionTitle}>{t.shantiDevaRetreat.schedule.title}</h2>

          {/* Arrival Day */}
          <div className={styles.scheduleContent}>
            <h3 className={styles.includedCardTitle}>{t.shantiDevaRetreat.schedule.arrivalDay}</h3>
            {arrivalSchedule && (
              <ul className={styles.scheduleList}>
                {arrivalSchedule.items.map((item, index) => (
                  <li key={index} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{item.time}</span>
                    <span className={styles.scheduleActivity}>{getActivityLabel(item.activityKey)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Study Days */}
          <div className={styles.scheduleContent} style={{ marginTop: '2rem' }}>
            <h3 className={styles.includedCardTitle}>{t.shantiDevaRetreat.schedule.studyDays}</h3>
            {studySchedule && (
              <ul className={styles.scheduleList}>
                {studySchedule.items.map((item, index) => (
                  <li key={index} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{item.time}</span>
                    <span className={styles.scheduleActivity}>{getActivityLabel(item.activityKey)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Final Day */}
          <div className={styles.scheduleContent} style={{ marginTop: '2rem' }}>
            <h3 className={styles.includedCardTitle}>{t.shantiDevaRetreat.schedule.finalDay}</h3>
            {finalSchedule && (
              <ul className={styles.scheduleList}>
                {finalSchedule.items.map((item, index) => (
                  <li key={index} className={styles.scheduleItem}>
                    <span className={styles.scheduleTime}>{item.time}</span>
                    <span className={styles.scheduleActivity}>{getActivityLabel(item.activityKey)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.specialActivity}>
            <p className={styles.specialActivityText}>{t.shantiDevaRetreat.schedule.specialActivity}</p>
          </div>
        </section>

        <div className={styles.divider} />

        {/* Included Section */}
        <section className={styles.includedSection}>
          <div className={styles.includedContent}>
            <h2 className={styles.sectionTitle}>{t.shantiDevaRetreat.included.title}</h2>
            <div className={styles.includedGrid}>
              <div className={styles.includedCard}>
                <h3 className={styles.includedCardTitle}>{t.shantiDevaRetreat.included.accommodation}</h3>
                <ul className={styles.includedList}>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.accommodationOptions.doubleRooms}
                  </li>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.accommodationOptions.sharedRooms}
                  </li>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.accommodationOptions.singleRoom}
                  </li>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.accommodationOptions.tentCaravan}
                  </li>
                </ul>
              </div>
              <div className={styles.includedCard}>
                <h3 className={styles.includedCardTitle}>Services</h3>
                <ul className={styles.includedList}>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.services.beddingTowels}
                  </li>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.services.vegetarianMeals}
                  </li>
                  <li className={styles.includedItem}>
                    <CheckIcon className={styles.checkIcon} />
                    {t.shantiDevaRetreat.included.services.farmFacilities}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricingSection}>
          <h2 className={styles.sectionTitle}>{t.shantiDevaRetreat.pricing.title}</h2>
          <div className={styles.pricingCard}>
            <div className={styles.priceHeader}>
              <p className={styles.totalPrice}>{t.shantiDevaRetreat.pricing.totalPrice}</p>
              <p className={styles.priceSubtext}>{t.shantiDevaRetreat.pricing.perParticipant}</p>
            </div>

            <div className={styles.priceDetails}>
              <div className={styles.priceSection}>
                <h3 className={styles.priceSectionTitle}>{t.shantiDevaRetreat.pricing.breakdown}</h3>
                <div className={styles.priceBreakdown}>
                  {retreat.priceBreakdown.map((item, index) => (
                    <div key={index} className={styles.priceRow}>
                      <span className={styles.priceRowLabel}>
                        {t.shantiDevaRetreat.pricing.breakdownItems[item.labelKey as keyof typeof t.shantiDevaRetreat.pricing.breakdownItems]}
                      </span>
                      <span className={styles.priceRowAmount}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.priceSection}>
                <h3 className={styles.priceSectionTitle}>{t.shantiDevaRetreat.pricing.paymentTerms}</h3>
                <ul className={styles.policyList}>
                  <li className={styles.policyItem}>
                    <CheckIcon className={styles.policyIcon} />
                    {t.shantiDevaRetreat.pricing.paymentItems.depositPayment}
                  </li>
                  <li className={styles.policyItem}>
                    <CheckIcon className={styles.policyIcon} />
                    {t.shantiDevaRetreat.pricing.paymentItems.secondPayment}
                  </li>
                </ul>
              </div>

              <div className={styles.priceSection}>
                <h3 className={styles.priceSectionTitle}>{t.shantiDevaRetreat.pricing.cancellation}</h3>
                <ul className={styles.policyList}>
                  <li className={styles.policyItem}>
                    <CheckIcon className={styles.policyIcon} />
                    {t.shantiDevaRetreat.pricing.cancellationItems.fourMonthsRefund}
                  </li>
                  <li className={styles.policyItem}>
                    <CheckIcon className={styles.policyIcon} />
                    {t.shantiDevaRetreat.pricing.cancellationItems.afterFullPayment}
                  </li>
                  <li className={styles.policyItem}>
                    <CheckIcon className={styles.policyIcon} />
                    {t.shantiDevaRetreat.pricing.cancellationItems.replacementRefund}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className={styles.registrationSection}>
          <div className={styles.registrationContent}>
            <h2 className={styles.registrationTitle}>{t.shantiDevaRetreat.registration.title}</h2>
            <p className={styles.registrationSubtitle}>{t.shantiDevaRetreat.registration.subtitle}</p>

            <p className={styles.participantInfo}>{t.shantiDevaRetreat.registration.participantRange}</p>
            <a
              href={retreat.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerButton}
            >
              {t.shantiDevaRetreat.registration.registerButton}
              <ArrowRightIcon className={styles.registerButtonIcon} />
            </a>

            <p className={styles.contactInfo}>{t.shantiDevaRetreat.registration.contact}</p>
            <div className={styles.contactLinks}>
              <a
                href={`https://wa.me/${retreat.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <PhoneIcon className={styles.contactLinkIcon} />
                {t.shantiDevaRetreat.registration.whatsapp}: {retreat.contact.whatsapp}
              </a>
              <a
                href={`mailto:${retreat.contact.email}`}
                className={styles.contactLink}
              >
                <MailIcon className={styles.contactLinkIcon} />
                {t.shantiDevaRetreat.registration.email}: {retreat.contact.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
