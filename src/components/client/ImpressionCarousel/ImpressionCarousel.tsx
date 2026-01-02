'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { CAROUSEL_IMAGES } from '@/data'
import { SPRING_OPTIONS, DRAG_BUFFER, DEFAULT_LANGUAGE } from '@/constants'
import { getImageAltText } from '@/lib'
import { Lightbox, type LightboxImage } from '../Lightbox'
import styles from './ImpressionCarousel.module.css'

const AUTO_DELAY_MS = 10000

const CAROUSEL_CONTENT = {
  kicker: 'A little impression',
  title: 'Slow down, look around.',
  subtitle:
    'Discover the beauty of slow living. Each moment here invites you to pause, breathe, and reconnect with what truly matters.',
} as const

export function ImpressionCarousel() {
  const [imgIndex, setImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)

  // Convert to Lightbox format - memoized to prevent unnecessary context updates
  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      CAROUSEL_IMAGES.map((src, idx) => ({
        src,
        alt: `Impression ${idx + 1}`,
      })),
    []
  )

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get()

      // Don't auto-rotate if lightbox is open
      if (x === 0 && !lightboxOpen) {
        setImgIndex((pv) => (pv === CAROUSEL_IMAGES.length - 1 ? 0 : pv + 1))
      }
    }, AUTO_DELAY_MS)

    return () => clearInterval(intervalRef)
  }, [dragX, lightboxOpen])

  const onDragEnd = useCallback(() => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && imgIndex < CAROUSEL_IMAGES.length - 1) {
      setImgIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1)
    }
  }, [dragX, imgIndex])

  const handleImageClick = useCallback(() => {
    setLightboxOpen(true)
  }, [])

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handleLightboxImageChange = useCallback((newIndex: number) => {
    setImgIndex(newIndex)
  }, [])

  const handlePrevious = useCallback(() => {
    setImgIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setImgIndex((prev) => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1))
  }, [])

  return (
    <section className={styles.carousel}>
      <div className={styles.header}>
        <p className={styles.kicker}>{CAROUSEL_CONTENT.kicker}</p>
        <h2 className={styles.title}>{CAROUSEL_CONTENT.title}</h2>
        <p className={styles.subtitle}>{CAROUSEL_CONTENT.subtitle}</p>
      </div>

      <div className={styles.container}>
        {/* Navigation Arrows */}
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={handleNext}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${imgIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className={styles.track}
        >
          {CAROUSEL_IMAGES.map((imgSrc, idx) => (
            <motion.div
              key={imgSrc}
              ref={idx === imgIndex ? triggerRef : undefined}
              animate={{ scale: imgIndex === idx ? 0.95 : 0.85 }}
              transition={SPRING_OPTIONS}
              className={`${styles.image} ${styles.imageClickable}`}
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleImageClick()
                }
              }}
              aria-label={`View impression ${idx + 1} in fullscreen`}
              aria-haspopup="dialog"
            >
              <Image
                src={imgSrc}
                alt={getImageAltText(imgSrc, DEFAULT_LANGUAGE)}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className={styles.imageInner}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.dots} role="group" aria-label="Carousel navigation">
          {CAROUSEL_IMAGES.map((imgSrc, idx) => (
            <button
              key={imgSrc}
              type="button"
              onClick={() => setImgIndex(idx)}
              className={`${styles.dot} ${idx === imgIndex ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${idx + 1}${idx === imgIndex ? ', current' : ''}`}
              aria-current={idx === imgIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={imgIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onImageChange={handleLightboxImageChange}
        loop={true}
        triggerRef={triggerRef}
      />
    </section>
  )
}
