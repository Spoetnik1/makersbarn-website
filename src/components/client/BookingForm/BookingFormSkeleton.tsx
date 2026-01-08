'use client'

import Link from 'next/link'
import { useTranslation } from '@/context'
import { Route } from '@/types'
import { BOOKING_ANCHOR_ID } from '@/constants'
import styles from './BookingForm.module.css'
import skeletonStyles from './BookingFormSkeleton.module.css'

const TOTAL_STEPS = 4

/**
 * Loading skeleton for BookingForm
 * Shows actual static content (title, steps, alert) with skeleton placeholders for form fields.
 * This prevents hydration mismatch from browser extensions (e.g., LastPass)
 * that inject DOM elements into form inputs.
 */
export function BookingFormSkeleton() {
  const { t: booking } = useTranslation('booking')

  return (
    <div className={styles.booking}>
      <section id={BOOKING_ANCHOR_ID} className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            {/* Progress Indicator - Real content */}
            <div className={styles.progressContainer}>
              <h1 className={styles.pageTitle}>{booking.pageTitle}</h1>
              <nav aria-label={booking.progressLabel}>
                <ol className={styles.progressSteps}>
                  {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                    const step = i + 1
                    const isActive = step === 1
                    const stepLabel =
                      step === 1 ? booking.steps.contact :
                      step === 2 ? booking.steps.retreat :
                      step === 3 ? booking.steps.details :
                      booking.steps.review
                    return (
                      <li
                        key={step}
                        className={`${styles.progressStep} ${isActive ? styles.progressStepActive : ''}`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className={styles.progressNumber} aria-hidden="true">{step}</span>
                        <span className={styles.progressLabel}>
                          {stepLabel}
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </div>

            {/* Step Content */}
            <div className={styles.stepContent}>
              {/* Info alert - Real content */}
              <div className={styles.infoAlert} role="note">
                <h5 className={styles.infoAlertTitle}>
                  <InfoIcon />
                  {booking.alert.title}
                </h5>
                <p className={styles.infoAlertDescription}>
                  {booking.alert.description}
                </p>
                <div className={styles.infoAlertLinks}>
                  <Link href={Route.EXPERIENCES} className={styles.infoAlertLink}>
                    {booking.alert.joinRetreatLink}
                  </Link>
                  <Link href={Route.CONTACT} className={styles.infoAlertLink}>
                    {booking.alert.contactLink}
                  </Link>
                </div>
              </div>

              <h4 className={styles.sectionTitle}>{booking.sections.contact}</h4>
              <p className={styles.stepDescription}>{booking.stepDescriptions.contact}</p>

              {/* Form fields skeleton */}
              <div className={skeletonStyles.skeleton}>
                <div className={skeletonStyles.fieldSkeleton}>
                  <div className={skeletonStyles.labelSkeleton} />
                  <div className={skeletonStyles.inputSkeleton} />
                </div>

                <div className={skeletonStyles.fieldGroup}>
                  <div className={skeletonStyles.fieldSkeleton}>
                    <div className={skeletonStyles.labelSkeleton} />
                    <div className={skeletonStyles.inputSkeleton} />
                  </div>
                  <div className={skeletonStyles.fieldSkeleton}>
                    <div className={skeletonStyles.labelSkeleton} />
                    <div className={skeletonStyles.inputSkeleton} />
                  </div>
                </div>
              </div>
            </div>

            {/* Button skeleton */}
            <div className={styles.buttonGroup}>
              <div className={skeletonStyles.buttonSkeleton} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}
