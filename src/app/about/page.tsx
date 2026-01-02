import type { Metadata } from 'next'
import { TeamGrid, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getServerTranslations } from '@/i18n'
import styles from './page.module.css'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description:
    'Meet the team behind MakersBarn. Learn about our mission to create a sanctuary where makers, artists, and dreamers can connect and find inspiration.',
  path: '/about',
})

export default async function AboutPage() {
  const t = await getServerTranslations()

  return (
    <>
      <StructuredData
        data={[generatePageBreadcrumbs({ name: t.about.title, path: Route.ABOUT })]}
      />
      <div className={styles.about}>
        <section className={styles.hero}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t.about.title}</h1>
            <p className={styles.intro}>{t.about.intro}</p>
            <p className={`${styles.intro} ${styles.secondary}`}>{t.about.secondary}</p>
          </header>
        </section>

        <section className={styles.team}>
          <div className={styles.teamContainer}>
            <h2 className={styles.teamTitle}>{t.about.teamTitle}</h2>
            <TeamGrid />
          </div>
        </section>
      </div>
    </>
  )
}
