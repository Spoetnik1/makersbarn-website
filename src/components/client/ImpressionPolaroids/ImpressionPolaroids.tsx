'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { POLAROID_IMAGES, IMAGES } from '@/data'
import { cn } from '@/lib/cn'
import styles from './ImpressionPolaroids.module.css'

const POLAROIDS_CONTENT = {
  kicker: 'A little impression',
  title: 'A place to create lasting memories',
  subtitle:
    'Spaces to focus, wander, nap, write, reflect, and be together. Here\'s a glimpse of what your retreat might feel like.',
} as const

const CARD_POSITIONS = [
  { rotate: '6deg', top: '15%', left: '25%', width: 'w-36 md:w-56' },
  { rotate: '12deg', top: '35%', left: '60%', width: 'w-24 md:w-48' },
  { rotate: '-6deg', top: '15%', left: '40%', width: 'w-52 md:w-80' },
  { rotate: '8deg', top: '40%', left: '40%', width: 'w-48 md:w-72' },
  { rotate: '18deg', top: '15%', left: '65%', width: 'w-40 md:w-64' },
  { rotate: '-3deg', top: '28%', left: '55%', width: 'w-24 md:w-48' },
  { rotate: '-8deg', top: '48%', left: '20%', width: 'w-32 md:w-60' },
  { rotate: '10deg', top: '52%', left: '70%', width: 'w-28 md:w-52' },
] as const

interface CardProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  src: string
  alt: string
  top: string
  left: string
  rotate: string
  className?: string
}

function Card({ containerRef, src, alt, top, left, rotate, className }: CardProps) {
  const [zIndex, setZIndex] = useState(0)

  const updateZIndex = useCallback(() => {
    const els = document.querySelectorAll(`.${styles.dragElement}`)
    let maxZIndex = -Infinity

    els.forEach((el) => {
      const z = parseInt(window.getComputedStyle(el).getPropertyValue('z-index'))
      if (!isNaN(z) && z > maxZIndex) {
        maxZIndex = z
      }
    })

    setZIndex(maxZIndex + 1)
  }, [])

  return (
    <motion.div
      onMouseDown={updateZIndex}
      style={{ top, left, rotate, zIndex }}
      className={cn(styles.dragElement, className)}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 150px, 250px"
        className={styles.image}
      />
    </motion.div>
  )
}

export function ImpressionPolaroids() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.kicker}>{POLAROIDS_CONTENT.kicker}</p>
        <h2 className={styles.title}>{POLAROIDS_CONTENT.title}</h2>
        <p className={styles.subtitle}>{POLAROIDS_CONTENT.subtitle}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.backgroundLogo}>
          <Image src={IMAGES.logo} alt="Makers Barn Logo" width={400} height={200} />
        </div>
        <div className={styles.cardsContainer} ref={containerRef}>
          {POLAROID_IMAGES.map((img, idx) => (
            <Card
              key={img.src}
              containerRef={containerRef}
              src={img.src}
              alt={img.alt}
              rotate={CARD_POSITIONS[idx].rotate}
              top={CARD_POSITIONS[idx].top}
              left={CARD_POSITIONS[idx].left}
              className={CARD_POSITIONS[idx].width}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
