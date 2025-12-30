'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { CAROUSEL_IMAGES } from '@/data'
import { SPRING_OPTIONS, DRAG_BUFFER, DEFAULT_LANGUAGE } from '@/constants'
import { getImageAltText } from '@/lib'
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
  const dragX = useMotionValue(0)

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get()

      if (x === 0) {
        setImgIndex((pv) => (pv === CAROUSEL_IMAGES.length - 1 ? 0 : pv + 1))
      }
    }, AUTO_DELAY_MS)

    return () => clearInterval(intervalRef)
  }, [dragX])

  const onDragEnd = useCallback(() => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && imgIndex < CAROUSEL_IMAGES.length - 1) {
      setImgIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1)
    }
  }, [dragX, imgIndex])

  return (
    <section className={styles.carousel}>
      <div className={styles.header}>
        <p className={styles.kicker}>{CAROUSEL_CONTENT.kicker}</p>
        <h2 className={styles.title}>{CAROUSEL_CONTENT.title}</h2>
        <p className={styles.subtitle}>{CAROUSEL_CONTENT.subtitle}</p>
      </div>

      <div className={styles.container}>
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
              animate={{ scale: imgIndex === idx ? 0.95 : 0.85 }}
              transition={SPRING_OPTIONS}
              className={styles.image}
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

        <div className={styles.dots} role="tablist" aria-label="Carousel navigation">
          {CAROUSEL_IMAGES.map((imgSrc, idx) => (
            <button
              key={imgSrc}
              onClick={() => setImgIndex(idx)}
              className={`${styles.dot} ${idx === imgIndex ? styles.dotActive : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={idx === imgIndex}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
