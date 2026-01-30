import { Language } from '@/types'
import { getServerTranslations } from '@/i18n'

import styles from './FacilitiesStats.module.css'

interface FacilitiesStatsProps {
  locale?: Language
}

export async function FacilitiesStats({ locale }: FacilitiesStatsProps = {}) {
  const t = await getServerTranslations(locale)

  return (
    <section className={styles.stats}>
      {t.facilities.stats.map((stat) => (
        <div key={stat.number} className={styles.item}>
          <div className={styles.number}>{stat.number}</div>
          <div className={styles.description}>{stat.description}</div>
        </div>
      ))}
    </section>
  )
}


