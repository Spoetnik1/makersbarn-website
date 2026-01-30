'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { CONTACT_URLS, CONTACT_EMAIL } from '@/constants'
import { ContactIntent } from '@/types'
import { useTranslation } from '@/context'

import { BookingForm } from '../BookingForm'

import { IntentSelector } from './IntentSelector'
import { QuestionForm } from './QuestionForm'
import styles from './UnifiedContact.module.css'

const CONTENT_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
} as const

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/**
 * Get initial intent from URL hash (SSR-safe)
 */
function parseContactIntent(hash: string): ContactIntent {
  const values = Object.values(ContactIntent) as string[]
  if (values.includes(hash)) {
    return hash as ContactIntent
  }
  return ContactIntent.QUESTION
}

function getInitialIntent(): ContactIntent {
  if (typeof window !== 'undefined') {
    return parseContactIntent(window.location.hash.slice(1))
  }
  return ContactIntent.QUESTION
}

export function UnifiedContact() {
  const [intent, setIntent] = useState<ContactIntent>(getInitialIntent)
  const [hasInitialized, setHasInitialized] = useState(false)

  const { t: unifiedContact } = useTranslation('unifiedContact')
  const { t: contact } = useTranslation('contact')

  // Handle hash changes after initial mount
  useEffect(() => {
    const handleHashChange = () => {
      setIntent(parseContactIntent(window.location.hash.slice(1)))
    }

    // Mark as initialized after first render
    setHasInitialized(true)

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update URL hash when intent changes (after initialization)
  useEffect(() => {
    if (hasInitialized) {
      window.history.replaceState(null, '', `#${intent}`)
    }
  }, [intent, hasInitialized])

  const handleIntentChange = useCallback((newIntent: ContactIntent) => {
    setIntent(newIntent)
  }, [])

  return (
    <div className={styles.page}>
      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <h1 className={styles.introTitle}>{unifiedContact.pageTitle}</h1>
          <p className={styles.introText}>{unifiedContact.pageSubtitle}</p>
        </div>
      </section>

      {/* Intent Selector */}
      <section className={styles.selectorSection}>
        <IntentSelector
          selectedIntent={intent}
          onIntentChange={handleIntentChange}
          labels={unifiedContact.intentSelector}
          ariaLabel={unifiedContact.selectorAriaLabel}
        />
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          <AnimatePresence mode="wait">
            {intent === ContactIntent.QUESTION ? (
              <motion.div
                key="question"
                role="tabpanel"
                id="question-panel"
                aria-labelledby="question-tab"
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <QuestionForm />
              </motion.div>
            ) : (
              <motion.div
                key="booking"
                role="tabpanel"
                id="booking-panel"
                aria-labelledby="booking-tab"
                variants={CONTENT_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.bookingWrapper}
              >
                <BookingForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Alternatives - Only show for question mode */}
          {intent === ContactIntent.QUESTION && (
            <div className={styles.contactAlternatives}>
              <div className={styles.alternativeRow}>
                <p className={styles.alternativeText}>{contact.emailAlternative.text}</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className={styles.alternativeLink}>
                  <EmailIcon />
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className={styles.alternativeRow}>
                <p className={styles.alternativeText}>{contact.whatsappAlternative.text}</p>
                <a
                  href={CONTACT_URLS.WHATSAPP}
                  className={styles.alternativeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <iframe
            src={CONTACT_URLS.MAP_EMBED}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={unifiedContact.mapTitle}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </section>
    </div>
  )
}
