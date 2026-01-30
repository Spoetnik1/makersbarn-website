'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'

import { LIGHTBOX_ANIMATION } from './constants'
import type { LightboxDotsProps } from './types'
import styles from './Lightbox.module.css'

export const LightboxDots = memo(function LightboxDots({
  totalImages,
  currentIndex,
  onDotClick,
  isVisible,
  translations,
}: LightboxDotsProps) {
  return (
    <motion.div
      className={styles.dots}
      role="group"
      aria-label={translations.imageNavigation}
      initial={LIGHTBOX_ANIMATION.controls.hide}
      animate={isVisible ? LIGHTBOX_ANIMATION.controls.show : LIGHTBOX_ANIMATION.controls.hide}
      transition={LIGHTBOX_ANIMATION.controls.transition}
    >
      {Array.from({ length: totalImages }).map((_, index) => {
        const isActive = index === currentIndex
        return (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
            onClick={() => onDotClick(index)}
            aria-label={`${translations.viewImage} ${index + 1} ${translations.imageOf} ${totalImages}${isActive ? `, ${translations.current}` : ''}`}
            aria-current={isActive ? 'true' : undefined}
          />
        )
      })}
    </motion.div>
  )
})
