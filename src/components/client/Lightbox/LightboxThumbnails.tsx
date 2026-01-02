'use client'

import { memo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LIGHTBOX_ANIMATION, LIGHTBOX_LAYOUT } from './constants'
import type { LightboxThumbnailsProps } from './types'
import styles from './Lightbox.module.css'

export const LightboxThumbnails = memo(function LightboxThumbnails({
  images,
  currentIndex,
  onThumbnailClick,
  isVisible,
}: LightboxThumbnailsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Scroll active thumbnail into view
  useEffect(() => {
    const activeThumbnail = thumbnailRefs.current[currentIndex]
    if (activeThumbnail && containerRef.current) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [currentIndex])

  return (
    <motion.div
      ref={containerRef}
      className={styles.thumbnails}
      role="group"
      aria-label="Image thumbnails"
      initial={LIGHTBOX_ANIMATION.controls.hide}
      animate={isVisible ? LIGHTBOX_ANIMATION.controls.show : LIGHTBOX_ANIMATION.controls.hide}
      transition={LIGHTBOX_ANIMATION.controls.transition}
    >
      {images.map((image, index) => {
        const isActive = index === currentIndex
        return (
          <button
            key={image.src}
            ref={(el) => {
              thumbnailRefs.current[index] = el
            }}
            type="button"
            className={`${styles.thumbnail} ${isActive ? styles.thumbnailActive : ''}`}
            onClick={() => onThumbnailClick(index)}
            aria-label={`View ${image.alt}${isActive ? ', current' : ''}`}
            aria-current={isActive ? 'true' : undefined}
            style={{
              width: LIGHTBOX_LAYOUT.thumbnail.width,
              height: LIGHTBOX_LAYOUT.thumbnail.height,
            }}
          >
            <Image
              src={image.thumbnailSrc ?? image.src}
              alt=""
              fill
              sizes={`${LIGHTBOX_LAYOUT.thumbnail.width}px`}
              className={styles.thumbnailImage}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </motion.div>
  )
})
