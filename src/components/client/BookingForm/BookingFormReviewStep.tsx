import { ChangeEvent, RefObject } from 'react'
import { motion } from 'framer-motion'

import { RetreatType, type BookingFormData } from '@/types'
import { FormField } from '@/components/client/forms'

import { FORM_FIELD_IDS, STEP_VARIANTS, RETREAT_TYPE_KEYS } from './BookingFormConstants'
import styles from './BookingForm.module.css'

function getRetreatTypeLabel(
  retreatType: RetreatType,
  retreatTypeOther: string,
  translations: { privateGroup: string; yoga: string; workshop: string; other: string }
): string {
  if (retreatType === RetreatType.OTHER) {
    return retreatTypeOther || translations.other
  }

  const labelKey = RETREAT_TYPE_KEYS.find((k) => k.value === retreatType)?.labelKey || 'privateGroup'
  return translations[labelKey]
}

function getGroupSizeDisplay(minGroupSize: string, maxGroupSize: string): string {
  if (minGroupSize && maxGroupSize) {
    return `${minGroupSize} - ${maxGroupSize}`
  }
  return minGroupSize || maxGroupSize
}

interface BookingFormReviewStepProps {
  formData: BookingFormData
  errors: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleAnimationComplete: () => void
  stepHeadingRef: RefObject<HTMLHeadingElement | null>
  translations: {
    steps: {
      review: string
    }
    stepDescriptions: {
      review: string
    }
    sections: {
      groupSize: string
      extraInfo: string
    }
    reviewLabels: {
      contact: string
      retreat: string
      group: string
      catering: string
      notProvided: string
    }
    labels: {
      name: string
      email: string
      phone: string
      retreatType: string
      startDate: string
      duration: string
      flexibleDatesText: string
      accommodationPreferences: string
      cateringNeeded: string
      cateringDetails: string
      extraInfo: string
    }
    placeholders: {
      extraInfo: string
    }
    retreatTypes: {
      privateGroup: string
      yoga: string
      workshop: string
      other: string
    }
    cateringOptions: {
      yes: string
      no: string
    }
  }
}

export function BookingFormReviewStep({
  formData,
  errors,
  handleChange,
  handleAnimationComplete,
  stepHeadingRef,
  translations,
}: BookingFormReviewStepProps) {
  return (
    <motion.div
      key="review"
      variants={STEP_VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
      className={styles.stepContent}
    >
      <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{translations.steps.review}</h4>
      <p className={styles.stepDescription}>{translations.stepDescriptions.review}</p>

      <div className={styles.reviewSummary}>
        <div className={styles.reviewSection}>
          <h5 className={styles.reviewSectionTitle}>{translations.reviewLabels.contact}</h5>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewItem}>
              <span className={styles.reviewItemLabel}>{translations.labels.name}</span>
              <span className={styles.reviewItemValue}>{formData.name}</span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewItemLabel}>{translations.labels.email}</span>
              <span className={styles.reviewItemValue}>{formData.email}</span>
            </div>
            {formData.phone && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.labels.phone}</span>
                <span className={styles.reviewItemValue}>{formData.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h5 className={styles.reviewSectionTitle}>{translations.reviewLabels.retreat}</h5>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewItem}>
              <span className={styles.reviewItemLabel}>{translations.labels.retreatType}</span>
              <span className={styles.reviewItemValue}>
                {getRetreatTypeLabel(formData.retreatType, formData.retreatTypeOther, translations.retreatTypes)}
              </span>
            </div>
            <div className={styles.reviewItem}>
              <span className={styles.reviewItemLabel}>{translations.labels.startDate}</span>
              <span className={`${styles.reviewItemValue} ${!formData.startDate ? styles.reviewItemEmpty : ''}`}>
                {formData.startDate || translations.reviewLabels.notProvided}
              </span>
            </div>
            {formData.duration && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.labels.duration}</span>
                <span className={styles.reviewItemValue}>{formData.duration}</span>
              </div>
            )}
            {formData.flexibleDates && formData.flexibleDatesText && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.labels.flexibleDatesText}</span>
                <span className={styles.reviewItemValue}>{formData.flexibleDatesText}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h5 className={styles.reviewSectionTitle}>{translations.reviewLabels.group}</h5>
          <div className={styles.reviewGrid}>
            {(formData.minGroupSize || formData.maxGroupSize) && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.sections.groupSize}</span>
                <span className={styles.reviewItemValue}>
                  {getGroupSizeDisplay(formData.minGroupSize, formData.maxGroupSize)}
                </span>
              </div>
            )}
            {formData.accommodationPreferences && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.labels.accommodationPreferences}</span>
                <span className={styles.reviewItemValue}>{formData.accommodationPreferences}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h5 className={styles.reviewSectionTitle}>{translations.reviewLabels.catering}</h5>
          <div className={styles.reviewGrid}>
            <div className={styles.reviewItem}>
              <span className={styles.reviewItemLabel}>{translations.labels.cateringNeeded}</span>
              <span className={styles.reviewItemValue}>
                {formData.cateringNeeded ? translations.cateringOptions.yes : translations.cateringOptions.no}
              </span>
            </div>
            {formData.cateringNeeded && formData.cateringDetails && (
              <div className={styles.reviewItem}>
                <span className={styles.reviewItemLabel}>{translations.labels.cateringDetails}</span>
                <span className={styles.reviewItemValue}>{formData.cateringDetails}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h4 className={styles.sectionTitle}>{translations.sections.extraInfo}</h4>

      <FormField
        label={translations.labels.extraInfo}
        id={FORM_FIELD_IDS.EXTRA_INFO}
        name="extraInfo"
        as="textarea"
        value={formData.extraInfo}
        onChange={handleChange}
        placeholder={translations.placeholders.extraInfo}
        error={errors.extraInfo}
      />
    </motion.div>
  )
}
