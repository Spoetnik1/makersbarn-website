'use client'

import { motion } from 'framer-motion'

import { CONTACT_URLS } from '@/constants'
import { useTranslation } from '@/context'

import { WhatsAppIcon } from '../icons'

import styles from './FloatingWhatsApp.module.css'

const ICON_SIZE = 28

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: 2,
      ease: 'easeInOut' as const,
      delay: 1,
    },
  },
}

const hoverAnimation = {
  scale: 1.08,
  transition: { duration: 0.2 },
}

const tapAnimation = {
  scale: 0.95,
}

export function FloatingWhatsApp() {
  const { t: common } = useTranslation('common')

  return (
    <motion.a
      href={CONTACT_URLS.WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingButton}
      aria-label={common.floatingWhatsApp.ariaLabel}
      title={common.floatingWhatsApp.tooltip}
      initial={pulseAnimation.initial}
      animate={pulseAnimation.animate}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      <WhatsAppIcon size={ICON_SIZE} />
    </motion.a>
  )
}
