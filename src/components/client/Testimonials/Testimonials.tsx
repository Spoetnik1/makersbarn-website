'use client'

import React, { useRef, useState, useCallback, memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/data'
import { CardPosition } from '@/types'
import { useTranslation } from '@/context'
import styles from './Testimonials.module.css'

const CARD_POSITIONS: CardPosition[] = ['front', 'second', 'third', 'back']

const DRAG_THRESHOLD = 150

const POSITION_CONFIG = {
  front: { x: '0%', rotateZ: '-8deg', zIndex: 3 },
  second: { x: '25%', rotateZ: '-3deg', zIndex: 2 },
  third: { x: '50%', rotateZ: '3deg', zIndex: 1 },
  back: { x: '75%', rotateZ: '8deg', zIndex: 0 },
} as const

interface CardProps {
  imgUrl: string
  testimonial: string
  author: string
  position: CardPosition
  onShuffle: () => void
}

const Card = memo(function Card({ imgUrl, testimonial, author, position, onShuffle }: CardProps) {
  const mousePosRef = useRef(0)

  const onDragStart = useCallback((e: MouseEvent | TouchEvent | PointerEvent) => {
    mousePosRef.current = 'clientX' in e ? e.clientX : 0
  }, [])

  const onDragEnd = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent) => {
      const clientX = 'clientX' in e ? e.clientX : 0
      const diff = mousePosRef.current - clientX

      if (diff > DRAG_THRESHOLD) {
        onShuffle()
      }

      mousePosRef.current = 0
    },
    [onShuffle]
  )

  const config = POSITION_CONFIG[position]
  const draggable = position === 'front'

  return (
    <motion.div
      style={{ zIndex: config.zIndex }}
      animate={{ rotate: config.rotateZ, x: config.x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{ duration: 0.35 }}
      className={`${styles.card} ${draggable ? styles.cardDraggable : ''}`}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={imgUrl}
          alt={`Image of ${author}`}
          fill
          sizes="128px"
          className={styles.image}
        />
      </div>
      <span className={styles.quote}>&ldquo;{testimonial}&rdquo;</span>
      <span className={styles.author}>{author}</span>
    </motion.div>
  )
})

/**
 * Image mapping for testimonials
 * Uses team images for testimonial cards
 */
const TESTIMONIAL_IMAGES = [
  IMAGES.team.nana,
  IMAGES.team.benny,
  IMAGES.team.noud,
  IMAGES.team.nana,
]

export function Testimonials() {
  const [order, setOrder] = useState<CardPosition[]>([...CARD_POSITIONS])
  const { t: testimonials } = useTranslation('testimonials')

  const handleShuffle = useCallback(() => {
    setOrder((prev) => {
      const copy = [...prev]
      const last = copy.pop()
      if (last) copy.unshift(last)
      return copy
    })
  }, [])

  // Combine translations with images
  const testimonialItems = useMemo(
    () =>
      testimonials.items.map((item, idx) => ({
        ...item,
        imgUrl: TESTIMONIAL_IMAGES[idx] || TESTIMONIAL_IMAGES[0],
      })),
    [testimonials.items]
  )

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{testimonials.sectionTitle}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.cardsWrapper}>
          {testimonialItems.map((testimonial, idx) => (
            <Card
              key={testimonial.author}
              imgUrl={testimonial.imgUrl}
              testimonial={testimonial.testimonial}
              author={testimonial.author}
              position={order[idx]}
              onShuffle={handleShuffle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
