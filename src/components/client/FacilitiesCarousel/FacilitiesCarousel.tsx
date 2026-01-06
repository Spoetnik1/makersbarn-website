'use client'

import React, { useState, useEffect, useCallback, memo, useMemo, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { FACILITIES_OPTIONS } from '@/data'
import { SPRING_OPTIONS, DRAG_BUFFER } from '@/constants'
import { FacilitiesOption, Language } from '@/types'
import { getImageAltText } from '@/lib'
import { useTranslation } from '@/context'
import type { FacilitiesTranslations } from '@/i18n/types'

import { Lightbox, type LightboxImage } from '../Lightbox'
import styles from './FacilitiesCarousel.module.css'

// Map facility IDs to translation keys
const FACILITY_TRANSLATION_KEYS: Record<string, keyof FacilitiesTranslations['items']> = {
  'hay-house': 'hayHouse',
  'cosmos': 'cosmos',
  'horizon': 'horizon',
  'sauna': 'sauna',
  'pond': 'pond',
  'in-between': 'inBetween',
} as const

function scrollToOption(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

interface FacilityItemTranslation {
  title: string
  description: string
  features?: readonly string[]
}

interface FacilitiesDetailProps {
  option: FacilitiesOption
  index: number
  language: Language
  carouselTranslations: FacilitiesTranslations['carousel']
  itemTranslation: FacilityItemTranslation
}

const FacilitiesDetailSection = memo(function FacilitiesDetailSection({
  option,
  index,
  language,
  carouselTranslations,
  itemTranslation,
}: FacilitiesDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const images = option.images && option.images.length > 0 ? option.images : [option.image]
  const isReversed = index % 2 === 1
  const dragX = useMotionValue(0)

  // Convert to Lightbox format - memoized to prevent unnecessary context updates
  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      images.map((src, idx) => ({
        src,
        alt: `${itemTranslation.title} - Image ${idx + 1}`,
      })),
    [images, itemTranslation.title]
  )

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

  const handleImageClick = useCallback(() => {
    setLightboxOpen(true)
  }, [])

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handleLightboxImageChange = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex)
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const content = (
    <div className={styles.detailContent}>
      <h2 className={styles.detailTitle}>{itemTranslation.title}</h2>
      <p className={styles.detailBody}>{itemTranslation.description}</p>
      {itemTranslation.features && itemTranslation.features.length > 0 && (
        <ul className={styles.detailFeatures}>
          {itemTranslation.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
    </div>
  )

  const media = (
    <div className={styles.detailMedia}>
      <div className={styles.carouselContainer}>
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={handlePrevious}
              aria-label={carouselTranslations.previousImage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={handleNext}
              aria-label={carouselTranslations.nextImage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
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
              ref={idx === currentIndex ? triggerRef : undefined}
              animate={{ scale: currentIndex === idx ? 0.95 : 0.85 }}
              transition={SPRING_OPTIONS}
              className={`${styles.carouselImage} ${styles.carouselImageClickable}`}
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleImageClick()
                }
              }}
              aria-label={`${carouselTranslations.viewFullscreen} ${itemTranslation.title} ${idx + 1}`}
              aria-haspopup="dialog"
            >
              <Image
                src={imgSrc}
                alt={getImageAltText(imgSrc, language)}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className={styles.carouselImageInner}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {images.length > 1 && (
        <div className={styles.carouselDots} role="group" aria-label={`${itemTranslation.title} ${carouselTranslations.imageNavigation}`}>
          {images.map((imgSrc, i) => (
            <button
              key={imgSrc}
              type="button"
              className={`${styles.carouselDot} ${i === currentIndex ? styles.carouselDotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`${carouselTranslations.goToImage} ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onImageChange={handleLightboxImageChange}
        showThumbnails={images.length > 3}
        loop
        triggerRef={triggerRef}
      />
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
  const { t, language } = useTranslation('facilities')

  // Helper to get translation for a facility
  const getItemTranslation = (id: string): FacilityItemTranslation => {
    const key = FACILITY_TRANSLATION_KEYS[id]
    return t.items[key]
  }

  return (
    <>
      <div className={styles.grid}>
        {FACILITIES_OPTIONS.map((option) => {
          const itemTranslation = getItemTranslation(option.id)
          return (
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
                  alt={itemTranslation.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardText}>
                <p className={styles.cardTitle}>{itemTranslation.title}</p>
              </div>
            </button>
          )
        })}
      </div>

      <section className={styles.details}>
        {FACILITIES_OPTIONS.map((option, index) => (
          <FacilitiesDetailSection
            key={option.id}
            option={option}
            index={index}
            language={language}
            carouselTranslations={t.carousel}
            itemTranslation={getItemTranslation(option.id)}
          />
        ))}
      </section>
    </>
  )
}
