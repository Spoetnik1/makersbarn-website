'use client'

import { motion } from 'framer-motion'

import { ContactIntent } from '@/types'

import styles from './IntentSelector.module.css'

interface IntentOption {
  value: ContactIntent
  labelKey: 'questionLabel' | 'bookingLabel'
  sublabelKey: 'questionSublabel' | 'bookingSublabel'
}

const INTENT_OPTIONS: IntentOption[] = [
  {
    value: ContactIntent.QUESTION,
    labelKey: 'questionLabel',
    sublabelKey: 'questionSublabel',
  },
  {
    value: ContactIntent.BOOKING,
    labelKey: 'bookingLabel',
    sublabelKey: 'bookingSublabel',
  },
]

interface IntentSelectorProps {
  selectedIntent: ContactIntent
  onIntentChange: (intent: ContactIntent) => void
  labels: {
    questionLabel: string
    questionSublabel: string
    bookingLabel: string
    bookingSublabel: string
  }
  ariaLabel: string
}

export function IntentSelector({
  selectedIntent,
  onIntentChange,
  labels,
  ariaLabel,
}: IntentSelectorProps) {
  const handleKeyDown = (e: React.KeyboardEvent, intent: ContactIntent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const newIntent =
        intent === ContactIntent.QUESTION
          ? ContactIntent.BOOKING
          : ContactIntent.QUESTION
      onIntentChange(newIntent)
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.selector}
        role="tablist"
        aria-label={ariaLabel}
      >
        {INTENT_OPTIONS.map((option) => {
          const isSelected = selectedIntent === option.value

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${option.value}-panel`}
              id={`${option.value}-tab`}
              tabIndex={isSelected ? 0 : -1}
              className={`${styles.option} ${isSelected ? styles.optionActive : ''}`}
              onClick={() => onIntentChange(option.value)}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
            >
              {isSelected && (
                <motion.div
                  layoutId="intent-indicator"
                  className={styles.activeIndicator}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <span className={styles.optionContent}>
                <span className={styles.optionLabel}>
                  {labels[option.labelKey]}
                </span>
                <span className={styles.optionSublabel}>
                  {labels[option.sublabelKey]}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
