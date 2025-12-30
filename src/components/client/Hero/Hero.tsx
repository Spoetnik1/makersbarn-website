'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { IMAGES } from '@/data'
import { HERO_ANIMATION, DEFAULT_LANGUAGE } from '@/constants'
import { getImageAltText } from '@/lib'
import styles from './Hero.module.css'

const HERO_CONTENT = {
  eyebrow: 'Welcome to',
  emphasis: 'the Makers Barn',
  subtitle: 'Your retreat deserves more than',
  subtitleBreak: 'just a venue.',
} as const

export function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src={IMAGES.accommodation.practiceRoomsWithMats}
        alt={getImageAltText(IMAGES.accommodation.practiceRoomsWithMats, DEFAULT_LANGUAGE)}
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
      />

      <div className={styles.content}>
        <motion.h1
          className={styles.headingTop}
          initial={HERO_ANIMATION.heading.initial}
          animate={HERO_ANIMATION.heading.animate}
          transition={HERO_ANIMATION.heading.transition}
        >
          {HERO_CONTENT.eyebrow}{' '}
          <motion.span
            className={styles.headingEmphasis}
            initial={HERO_ANIMATION.emphasis.initial}
            animate={HERO_ANIMATION.emphasis.animate}
            transition={HERO_ANIMATION.emphasis.transition}
          >
            {HERO_CONTENT.emphasis}
          </motion.span>
        </motion.h1>
        <motion.h2
          className={styles.headingBottom}
          initial={HERO_ANIMATION.subheading.initial}
          animate={HERO_ANIMATION.subheading.animate}
          transition={HERO_ANIMATION.subheading.transition}
        >
          {HERO_CONTENT.subtitle}
          <br />
          {HERO_CONTENT.subtitleBreak}
        </motion.h2>
      </div>
    </section>
  )
}
