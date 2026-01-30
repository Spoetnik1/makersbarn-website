'use client'

import Image from 'next/image'

import { getImageAltText, getImageBlurData } from '@/lib'
import { useLanguage } from '@/context'

import styles from './ImageGallery.module.css'

const IMAGES = {
  main: '/images/field-walking-women.jpg',
  bottomLeft: '/images/man-in-hammock-looking-on-field.jpg',
  bottomRight: '/images/arial-view.jpg',
} as const

export function ImageGallery() {
  const { language } = useLanguage()

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <Image
            src={IMAGES.main}
            alt={getImageAltText(IMAGES.main, language)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className={styles.image}
            placeholder="blur"
            blurDataURL={getImageBlurData(IMAGES.main)}
          />
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.bottomImage}>
            <Image
              src={IMAGES.bottomLeft}
              alt={getImageAltText(IMAGES.bottomLeft, language)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              placeholder="blur"
              blurDataURL={getImageBlurData(IMAGES.bottomLeft)}
            />
          </div>
          <div className={styles.bottomImage}>
            <Image
              src={IMAGES.bottomRight}
              alt={getImageAltText(IMAGES.bottomRight, language)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              placeholder="blur"
              blurDataURL={getImageBlurData(IMAGES.bottomRight)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

