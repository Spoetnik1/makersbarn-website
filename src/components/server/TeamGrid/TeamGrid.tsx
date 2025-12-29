import Image from 'next/image'
import { TEAM_MEMBERS } from '@/data'
import styles from './TeamGrid.module.css'

export function TeamGrid() {
  return (
    <div className={styles.grid}>
      {TEAM_MEMBERS.map((member) => (
        <article key={member.name} className={styles.member}>
          <div className={styles.imageWrapper}>
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 280px, 33vw"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.description}>{member.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
