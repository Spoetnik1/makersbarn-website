'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { FACILITIES_OPTIONS } from '@/data'
import { SPRING_OPTIONS, DRAG_BUFFER, DEFAULT_LANGUAGE } from '@/constants'
import { FacilitiesOption } from '@/types'
import { getImageAltText } from '@/lib'
import styles from './FacilitiesCarousel.module.css'

function scrollToOption(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

interface FacilitiesDetailProps {
  option: FacilitiesOption
  index: number
}

const FacilitiesDetailSection = memo(function FacilitiesDetailSection({
  option,
  index,
}: FacilitiesDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = option.images && option.images.length > 0 ? option.images : [option.image]
  const isReversed = index % 2 === 1
  const dragX = useMotionValue(0)

  useEffect(() => {
    dragX.set(0)
  }, [currentIndex, dragX])

  const onDragEnd = useCallback(() => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && currentIndex < images.length - 1) {
      setCurrentIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && currentIndex > 0) {
      setCurrentIndex((pv) => pv - 1)
    }
  }, [dragX, currentIndex, images.length])

  const content = (
    <div className={styles.detailContent}>
      <span className={styles.detailBar} aria-hidden="true" />
      <h2 className={styles.detailTitle}>{option.title}</h2>
      <p className={styles.detailBody}>{option.description}</p>
      {option.features && option.features.length > 0 && (
        <ul className={styles.detailFeatures}>
          {option.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
    </div>
  )

  const media = (
    <div className={styles.detailMedia}>
      <div className={styles.carouselContainer}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${currentIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className={styles.carouselTrack}
        >
          {images.map((imgSrc, idx) => (
            <motion.div
              key={imgSrc}
              animate={{ scale: currentIndex === idx ? 0.95 : 0.85 }}
              transition={SPRING_OPTIONS}
              className={styles.carouselImage}
            >
              <Image
                src={imgSrc}
                alt={getImageAltText(imgSrc, DEFAULT_LANGUAGE)}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={styles.carouselImageInner}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {images.length > 1 && (
        <div className={styles.carouselDots} role="tablist" aria-label={`${option.title} image navigation`}>
          {images.map((imgSrc, i) => (
            <button
              key={imgSrc}
              type="button"
              className={`${styles.carouselDot} ${i === currentIndex ? styles.carouselDotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-selected={i === currentIndex}
              role="tab"
            />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <section id={option.id} className={styles.detailBand}>
      <article
        className={`${styles.detail} ${isReversed ? styles.detailReversed : ''}`}
        style={{ backgroundColor: option.color }}
      >
        {isReversed ? (
          <>
            {media}
            {content}
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </article>
    </section>
  )
})

export function FacilitiesCarousel() {
  return (
    <>
      <div className={styles.grid}>
        {FACILITIES_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={styles.card}
            onClick={() => scrollToOption(option.id)}
          >
            <span
              className={styles.cardBar}
              style={{ backgroundColor: option.color }}
              aria-hidden="true"
            />
            <div className={styles.cardImageWrapper}>
              <Image
                src={option.image}
                alt={option.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardText}>
              <p className={styles.cardTitle}>{option.title}</p>
            </div>
          </button>
        ))}
      </div>

      <section className={styles.details}>
        {FACILITIES_OPTIONS.map((option, index) => (
          <FacilitiesDetailSection key={option.id} option={option} index={index} />
        ))}
      </section>
    </>
  )
}

