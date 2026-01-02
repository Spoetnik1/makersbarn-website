'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { LIGHTBOX_ANIMATION } from './constants'
import type { LightboxControlsProps } from './types'
import styles from './Lightbox.module.css'

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PrevIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const NextIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const LightboxControls = memo(function LightboxControls({
  currentIndex,
  totalImages,
  canGoPrevious,
  canGoNext,
  onClose,
  onPrevious,
  onNext,
  isVisible,
}: LightboxControlsProps) {
  return (
    <motion.div
      className={styles.controls}
      initial={LIGHTBOX_ANIMATION.controls.hide}
      animate={isVisible ? LIGHTBOX_ANIMATION.controls.show : LIGHTBOX_ANIMATION.controls.hide}
      transition={LIGHTBOX_ANIMATION.controls.transition}
    >
      {/* Close button */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close gallery"
      >
        <CloseIcon />
      </button>

      {/* Counter */}
      <div className={styles.counter} aria-hidden="true">
        <span className={styles.counterCurrent}>{currentIndex + 1}</span>
        <span className={styles.counterSeparator}>/</span>
        <span className={styles.counterTotal}>{totalImages}</span>
      </div>

      {/* Navigation arrows */}
      {totalImages > 1 && (
        <>
          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonPrev}`}
            onClick={onPrevious}
            disabled={!canGoPrevious}
            aria-label="Previous image"
            aria-disabled={!canGoPrevious}
          >
            <PrevIcon />
          </button>

          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next image"
            aria-disabled={!canGoNext}
          >
            <NextIcon />
          </button>
        </>
      )}
    </motion.div>
  )
})
