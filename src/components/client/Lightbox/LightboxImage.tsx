'use client'

import { memo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { LIGHTBOX_ANIMATION } from './constants'
import type { LightboxImageProps, NavigationDirection } from './types'
import styles from './Lightbox.module.css'

function getAnimationVariants(direction: NavigationDirection) {
  if (direction === 'next') {
    return LIGHTBOX_ANIMATION.slideNext
  }
  if (direction === 'prev') {
    return LIGHTBOX_ANIMATION.slidePrev
  }
  return LIGHTBOX_ANIMATION.image
}

export const LightboxImage = memo(function LightboxImage({
  image,
  isActive,
  direction,
  onLoad,
  onError,
}: LightboxImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const variants = getAnimationVariants(direction)

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true)
  }, [image.src])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setIsLoading(false)
    onError?.()
  }, [onError])

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.figure
          key={image.src}
          className={styles.imageContainer}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={LIGHTBOX_ANIMATION.image.transition}
        >
          {/* Loading Spinner */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                className={styles.loadingContainer}
                initial={LIGHTBOX_ANIMATION.fade.initial}
                animate={LIGHTBOX_ANIMATION.fade.animate}
                exit={LIGHTBOX_ANIMATION.fade.exit}
                transition={LIGHTBOX_ANIMATION.fade.transition}
              >
                <div className={styles.loadingSpinner} aria-hidden="true" />
                <span className={styles.srOnly}>Loading image...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className={styles.image}
            priority
            onLoad={handleLoad}
            onError={handleError}
          />
          {image.caption && (
            <figcaption className={styles.caption}>{image.caption}</figcaption>
          )}
        </motion.figure>
      )}
    </AnimatePresence>
  )
})
