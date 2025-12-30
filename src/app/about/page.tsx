import type { Metadata } from 'next'
import { TeamGrid, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Meet the team behind MakersBarn. Learn about our mission to create a sanctuary where makers, artists, and dreamers can connect and find inspiration.',
  path: '/about',
})

const ABOUT_CONTENT = {
  title: 'About Us',
  intro: `Welcome to MakersBarn, a place where creativity, craftsmanship, and community come together.
    Nestled in the heart of the countryside, we've transformed a historic hay barn into a vibrant
    space for retreats, workshops, and creative gatherings. Our mission is to provide a sanctuary
    where makers, artists, and dreamers can connect, create, and find inspiration.`,
  secondary: `We believe in the power of hands-on creation, the beauty of natural materials, and the
    importance of spaces that nurture both individual growth and collective experiences.
    Whether you're planning a retreat, hosting a workshop, or simply seeking a peaceful
    place to work on your next project, MakersBarn offers the perfect environment to bring
    your vision to life.`,
  teamTitle: 'Meet the Team',
} as const

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[generatePageBreadcrumbs({ name: 'About Us', path: Route.ABOUT })]}
      />
      <div className={styles.about}>
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{ABOUT_CONTENT.title}</h1>
            <p className={styles.intro}>{ABOUT_CONTENT.intro}</p>
            <p className={`${styles.intro} ${styles.secondary}`}>{ABOUT_CONTENT.secondary}</p>
          </header>
        </section>

        <section className={styles.team}>
          <div className={styles.teamContainer}>
            <h2 className={styles.teamTitle}>{ABOUT_CONTENT.teamTitle}</h2>
            <TeamGrid />
          </div>
        </section>
      </div>
    </>
  )
}
