import type { Metadata } from 'next'
import { AccommodationCarousel } from '@/components/client'
import { AccommodationStats } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'Accommodation',
  description:
    'Explore our unique retreat spaces at MakersBarn. Rent the entire location with private garden, converted hay barn, 23 beds, and all the tranquility you need.',
  path: '/accommodation',
})

const ACCOMMODATION_CONTENT = {
  title: 'Accommodation',
  intro: `Rent the entire location for your retreat, masterclass, or creative adventures. We offer a private garden,
    converted hay barn, 23 beds, and all the space and tranquility you need.`,
  secondary: `Need extra spaces during your retreat or want to book a separate space for a one-on-one session or
    other intimate gathering? We have these gems that we lovingly offer as your home away from home.`,
} as const

export default function AccommodationPage() {
  return (
    <div className={styles.accommodation}>
      <section className={styles.hero}>
        <header className={styles.header}>
          <h1 className={styles.title}>{ACCOMMODATION_CONTENT.title}</h1>
          <p className={styles.intro}>{ACCOMMODATION_CONTENT.intro}</p>
          <p className={`${styles.intro} ${styles.secondary}`}>{ACCOMMODATION_CONTENT.secondary}</p>
        </header>

        <AccommodationCarousel />
        <AccommodationStats />
      </section>
    </div>
  )
}
