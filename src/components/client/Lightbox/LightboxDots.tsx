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
}: LightboxDotsProps) {
  return (
    <motion.div
      className={styles.dots}
      role="group"
      aria-label="Image navigation"
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
            aria-label={`View image ${index + 1} of ${totalImages}${isActive ? ', current' : ''}`}
            aria-current={isActive ? 'true' : undefined}
          />
        )
      })}
    </motion.div>
  )
})
