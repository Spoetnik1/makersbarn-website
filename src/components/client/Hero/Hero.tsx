'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { IMAGES } from '@/data'
import { HERO_ANIMATION } from '@/constants'
import { getImageAltText, getImageBlurData } from '@/lib'
import { useLanguage, useTranslation } from '@/context'
import styles from './Hero.module.css'

export function Hero() {
  const { language } = useLanguage()
  const { t: hero } = useTranslation('hero')

  return (
    <section className={styles.hero}>
      <Image
        src={IMAGES.accommodation.practiceRoomsWithMats}
        alt={getImageAltText(IMAGES.accommodation.practiceRoomsWithMats, language)}
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
        placeholder="blur"
        blurDataURL={getImageBlurData(IMAGES.accommodation.practiceRoomsWithMats)}
      />

      <div className={styles.content}>
        <motion.h1
          className={styles.headingTop}
          initial={HERO_ANIMATION.heading.initial}
          animate={HERO_ANIMATION.heading.animate}
          transition={HERO_ANIMATION.heading.transition}
        >
          {hero.eyebrow}{' '}
          <motion.span
            className={styles.headingEmphasis}
            initial={HERO_ANIMATION.emphasis.initial}
            animate={HERO_ANIMATION.emphasis.animate}
            transition={HERO_ANIMATION.emphasis.transition}
          >
            {hero.emphasis}
          </motion.span>
        </motion.h1>
        <motion.h2
          className={styles.headingBottom}
          initial={HERO_ANIMATION.subheading.initial}
          animate={HERO_ANIMATION.subheading.animate}
          transition={HERO_ANIMATION.subheading.transition}
        >
          {hero.subtitle}
          <br />
          {hero.subtitleBreak}
        </motion.h2>
      </div>
    </section>
  )
}
