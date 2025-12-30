import Image from 'next/image'
import Link from 'next/link'
import { HERO_DETAILS_CONTENT, HERO_META_ITEMS } from '@/constants/hero'
import { IMAGES } from '@/data'
import styles from './HeroDetails.module.css'

const META_SEPARATOR = '\u2022' // bullet point

export function HeroDetails() {
  return (
    <section className={styles.heroDetails}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{HERO_DETAILS_CONTENT.title}</h2>

          <p className={styles.subtitle}>{HERO_DETAILS_CONTENT.subtitle}</p>

          <p className={styles.body}>{HERO_DETAILS_CONTENT.body}</p>

          <div className={styles.actions}>
            <Link
              href={HERO_DETAILS_CONTENT.primaryCta.href}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {HERO_DETAILS_CONTENT.primaryCta.label}
            </Link>
            <Link
              href={HERO_DETAILS_CONTENT.secondaryCta.href}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              {HERO_DETAILS_CONTENT.secondaryCta.label}
            </Link>
          </div>

          <div className={styles.meta}>
            {HERO_META_ITEMS.map((item, index) => (
              <span key={item}>
                {item}
                {index < HERO_META_ITEMS.length - 1 && (
                  <span className={styles.metaSeparator}>{META_SEPARATOR}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.imageWrap} aria-hidden="true">
          <div className={styles.imageArch}>
            <Image
              src={IMAGES.accommodation.hayHouseBench}
              alt=""
              fill
              sizes="(max-width: 960px) 360px, 420px"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
