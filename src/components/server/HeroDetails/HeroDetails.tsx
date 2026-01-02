import Image from 'next/image'
import Link from 'next/link'
import { Route } from '@/types'
import { IMAGES } from '@/data'
import { getImageBlurData } from '@/lib'
import { getServerTranslations } from '@/i18n'
import styles from './HeroDetails.module.css'

const META_SEPARATOR = '\u2022' // bullet point

export async function HeroDetails() {
  const t = await getServerTranslations()

  return (
    <section className={styles.heroDetails}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.title}>{t.heroDetails.title}</h2>

          <p className={styles.subtitle}>{t.heroDetails.subtitle}</p>

          <p className={styles.body}>{t.heroDetails.body}</p>

          <div className={styles.actions}>
            <Link
              href={Route.FACILITIES}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {t.heroDetails.primaryCtaLabel}
            </Link>
            <Link
              href={Route.CONTACT}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              {t.heroDetails.secondaryCtaLabel}
            </Link>
          </div>

          <div className={styles.meta}>
            {t.heroDetails.metaItems.map((item, index) => (
              <span key={item}>
                {item}
                {index < t.heroDetails.metaItems.length - 1 && (
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
              placeholder="blur"
              blurDataURL={getImageBlurData(IMAGES.accommodation.hayHouseBench)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
