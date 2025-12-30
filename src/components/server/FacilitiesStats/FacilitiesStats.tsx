import { FACILITIES_STATS } from '@/data'
import styles from './FacilitiesStats.module.css'

export function FacilitiesStats() {
  return (
    <section className={styles.stats}>
      {FACILITIES_STATS.map((stat) => (
        <div key={stat.number} className={styles.item}>
          <div className={styles.number}>{stat.number}</div>
          <div className={styles.description}>{stat.description}</div>
        </div>
      ))}
    </section>
  )
}

