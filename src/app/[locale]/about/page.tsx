import type { Metadata } from 'next'
import { TeamGrid, StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getServerTranslations } from '@/i18n'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import styles from '../../about/page.module.css'

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
            <TeamGrid />
          </div>
        </section>
      </div>
    </>
  )
}

