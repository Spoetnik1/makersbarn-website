import Image from 'next/image'

import { TEAM_MEMBERS } from '@/data'
import { getServerTranslations, getServerLanguage } from '@/i18n'
import { Language } from '@/types'

import styles from './TeamGrid.module.css'

interface TeamGridProps {
  locale?: Language
}

export async function TeamGrid({ locale }: TeamGridProps = {}) {
  const language = locale || await getServerLanguage()
  const t = await getServerTranslations(language)

  // Merge translated descriptions with images from TEAM_MEMBERS
  const members = TEAM_MEMBERS.map((member) => {
    const translatedMember = t.team.members.find((tm) => tm.name === member.name)
    return {
      ...member,
      description: translatedMember?.description || member.description,
    }
  })

  return (
    <div className={styles.grid}>
      {members.map((member) => (
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
