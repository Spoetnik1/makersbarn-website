import { ACCOMMODATION_STATS } from '@/data'
import styles from './AccommodationStats.module.css'

export function AccommodationStats() {
  return (
    <section className={styles.stats}>
      {ACCOMMODATION_STATS.map((stat) => (
        <div key={stat.number} className={styles.item}>
          <div className={styles.number}>{stat.number}</div>
          <div className={styles.description}>{stat.description}</div>
        </div>
      ))}
    </section>
  )
}
