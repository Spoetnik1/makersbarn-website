'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, useMotionValue, type MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { CAROUSEL_IMAGES } from '@/data'
import { SPRING_OPTIONS, DRAG_BUFFER } from '@/constants'
import { getImageAltText } from '@/lib'
import { useTranslation, useLanguage } from '@/context'
import { Route, Language } from '@/types'
import { getLocalizedPath } from '@/lib/routing'

import { Lightbox, type LightboxImage } from '../Lightbox'

import styles from './ImpressionCarousel.module.css'

interface CarouselTrackProps {
  imgIndex: number
  dragX: MotionValue<number>
  onDragEnd: () => void
  visibleIndices: number[]
  handleImageClick: () => void
  triggerRef: React.RefObject<HTMLDivElement | null>
  language: Language
  t: ReturnType<typeof useTranslation<'impressionCarousel'>>['t']
}

function CarouselTrack({
  imgIndex,
  dragX,
  onDragEnd,
  visibleIndices,
  handleImageClick,
  triggerRef,
  language,
  t,
}: CarouselTrackProps) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x: dragX }}
      animate={{ translateX: `-${imgIndex * 100}%` }}
      transition={SPRING_OPTIONS}
      onDragEnd={onDragEnd}
      className={styles.track}
    >
      {CAROUSEL_IMAGES.map((imgSrc, idx) => {
        const isVisible = visibleIndices.includes(idx)
        if (!isVisible) {
          return (
            <div
              key={imgSrc}
              className={styles.image}
              aria-hidden="true"
            />
          )
        }

        return (
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
            aria-label={`${t.viewFullscreen} ${idx + 1}`}
            aria-haspopup="dialog"
          >
            <Image
              src={imgSrc}
              alt={getImageAltText(imgSrc, language)}
              fill
              sizes="100vw"
              className={styles.imageInner}
              priority={idx === imgIndex}
              loading={idx === imgIndex ? undefined : 'lazy'}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function ImpressionCarousel() {
  const [imgIndex, setImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const { t, language } = useTranslation('impressionCarousel')
  const { language: currentLanguage } = useLanguage()

  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      CAROUSEL_IMAGES.map((src, idx) => ({
        src,
        alt: `Impression ${idx + 1}`,
      })),
    []
  )

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

  const visibleIndices = useMemo(() => {
    const indices = [imgIndex]
    const nextIndex = imgIndex === CAROUSEL_IMAGES.length - 1 ? 0 : imgIndex + 1
    indices.push(nextIndex)
    return indices
  }, [imgIndex])

  return (
    <section className={styles.carousel}>
      <div className={styles.header}>
        <p className={styles.kicker}>{t.kicker}</p>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.container}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={handlePrevious}
          aria-label={t.previousImage}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={handleNext}
          aria-label={t.nextImage}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <CarouselTrack
          imgIndex={imgIndex}
          dragX={dragX}
          onDragEnd={onDragEnd}
          visibleIndices={visibleIndices}
          handleImageClick={handleImageClick}
          triggerRef={triggerRef}
          language={language}
          t={t}
        />

        <div className={styles.dots} role="group" aria-label={t.carouselNavigation}>
          {CAROUSEL_IMAGES.map((imgSrc, idx) => (
            <button
              key={imgSrc}
              type="button"
              onClick={() => setImgIndex(idx)}
              className={`${styles.dot} ${idx === imgIndex ? styles.dotActive : ''}`}
              aria-label={`${t.goToSlide} ${idx + 1}`}
              aria-current={idx === imgIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={imgIndex}
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        onImageChange={handleLightboxImageChange}
        loop={true}
        triggerRef={triggerRef}
      />

      <div className={styles.footer}>
        <Link href={getLocalizedPath(Route.FACILITIES, currentLanguage)} className={styles.facilitiesButton}>
          {t.facilitiesButton}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
