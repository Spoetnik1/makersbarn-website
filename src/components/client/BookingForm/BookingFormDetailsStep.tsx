import { ChangeEvent, RefObject } from 'react'
import { motion } from 'framer-motion'

import { GROUP_SIZE } from '@/constants'
import { FormField, FormFieldGroup } from '@/components/client/forms'

import { FORM_FIELD_IDS, STEP_VARIANTS } from './BookingFormConstants'
import styles from './BookingForm.module.css'

interface BookingFormDetailsStepProps {
  formData: {
    minGroupSize: string
    maxGroupSize: string
    accommodationPreferences: string
    cateringNeeded: boolean
    cateringDetails: string
  }
  errors: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleAnimationComplete: () => void
  stepHeadingRef: RefObject<HTMLHeadingElement | null>
  setCateringNeeded: (value: boolean) => void
  translations: {
    sections: {
      groupSize: string
      accommodation: string
    }
    stepDescriptions: {
      details: string
    }
    labels: {
      minGroupSize: string
      maxGroupSize: string
      accommodationPreferences: string
      cateringNeeded: string
      cateringDetails: string
    }
    placeholders: {
      minGroupSize: string
      maxGroupSize: string
      accommodationPreferences: string
      cateringDetails: string
    }
    cateringOptions: {
      yes: string
      no: string
    }
  }
}

export function BookingFormDetailsStep({
  formData,
  errors,
  handleChange,
  handleAnimationComplete,
  stepHeadingRef,
  setCateringNeeded,
  translations,
}: BookingFormDetailsStepProps) {
  const showCateringDetails = formData.cateringNeeded

  return (
    <motion.div
      key="details"
      variants={STEP_VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
      className={styles.stepContent}
    >
      <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{translations.sections.groupSize}</h4>
      <p className={styles.stepDescription}>{translations.stepDescriptions.details}</p>

      <FormFieldGroup columns={2}>
        <FormField
          label={translations.labels.minGroupSize}
          id={FORM_FIELD_IDS.MIN_GROUP_SIZE}
          name="minGroupSize"
          type="number"
          min={GROUP_SIZE.MIN}
          max={GROUP_SIZE.MAX}
          value={formData.minGroupSize}
          onChange={handleChange}
          placeholder={translations.placeholders.minGroupSize}
          error={errors.minGroupSize}
        />

        <FormField
          label={translations.labels.maxGroupSize}
          id={FORM_FIELD_IDS.MAX_GROUP_SIZE}
          name="maxGroupSize"
          type="number"
          min={GROUP_SIZE.MIN}
          max={GROUP_SIZE.MAX}
          value={formData.maxGroupSize}
          onChange={handleChange}
          placeholder={translations.placeholders.maxGroupSize}
          error={errors.maxGroupSize}
        />
      </FormFieldGroup>

      <h4 className={styles.sectionTitle}>{translations.sections.accommodation}</h4>

      <FormField
        label={translations.labels.accommodationPreferences}
        id={FORM_FIELD_IDS.ACCOMMODATION}
        name="accommodationPreferences"
        as="textarea"
        value={formData.accommodationPreferences}
        onChange={handleChange}
        placeholder={translations.placeholders.accommodationPreferences}
        error={errors.accommodationPreferences}
      />

      <div className={styles.toggleGroup}>
        <span id="catering-label" className={styles.toggleLabel}>{translations.labels.cateringNeeded}</span>
        <div
          className={styles.toggleButtons}
          role="radiogroup"
          aria-labelledby="catering-label"
        >
          <button
            type="button"
            role="radio"
            aria-checked={formData.cateringNeeded}
            className={`${styles.toggleButton} ${formData.cateringNeeded ? styles.toggleButtonActive : ''}`}
            onClick={() => setCateringNeeded(true)}
          >
            {translations.cateringOptions.yes}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={!formData.cateringNeeded}
            className={`${styles.toggleButton} ${!formData.cateringNeeded ? styles.toggleButtonActive : ''}`}
            onClick={() => setCateringNeeded(false)}
          >
            {translations.cateringOptions.no}
          </button>
        </div>
      </div>

      {showCateringDetails && (
        <div className={styles.conditionalField}>
          <FormField
            label={translations.labels.cateringDetails}
            id={FORM_FIELD_IDS.CATERING_DETAILS}
            name="cateringDetails"
            as="textarea"
            value={formData.cateringDetails}
            onChange={handleChange}
            placeholder={translations.placeholders.cateringDetails}
            error={errors.cateringDetails}
          />
        </div>
      )}
    </motion.div>
  )
}
