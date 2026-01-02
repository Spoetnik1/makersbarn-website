import { getServerTranslations } from '@/i18n'
import styles from './FacilitiesStats.module.css'

export async function FacilitiesStats() {
  const t = await getServerTranslations()

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


