import { ChangeEvent, RefObject } from 'react'
import { motion } from 'framer-motion'

import { RetreatType } from '@/types'
import { DURATION } from '@/constants'
import { FormField, FormSelect, FormCheckbox, FormDatePicker, FormFieldGroup } from '@/components/client/forms'

import { FORM_FIELD_IDS, STEP_VARIANTS } from './BookingFormConstants'
import styles from './BookingForm.module.css'

interface DateRange {
  start: Date
  end: Date
}

interface BookingFormRetreatStepProps {
  formData: {
    retreatType: RetreatType
    retreatTypeOther: string
    startDate: string
    duration: string
    flexibleDates: boolean
    flexibleDatesText: string
  }
  errors: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleAnimationComplete: () => void
  stepHeadingRef: RefObject<HTMLHeadingElement | null>
  retreatTypeOptions: Array<{ value: RetreatType; label: string }>
  blockedDateRanges: DateRange[]
  translations: {
    sections: {
      retreat: string
      dates: string
    }
    stepDescriptions: {
      retreat: string
    }
    labels: {
      retreatType: string
      retreatTypeOther: string
      startDate: string
      duration: string
      flexibleDates: string
      flexibleDatesText: string
    }
    placeholders: {
      retreatTypeOther: string
      selectDate: string
      duration: string
      flexibleDatesText: string
    }
    helpText: {
      startDate: string
      duration: string
    }
    datePicker: {
      unavailable: string
      dateUnavailable: string
    }
  }
}

export function BookingFormRetreatStep({
  formData,
  errors,
  handleChange,
  handleAnimationComplete,
  stepHeadingRef,
  retreatTypeOptions,
  blockedDateRanges,
  translations,
}: BookingFormRetreatStepProps) {
  const showRetreatTypeOther = formData.retreatType === RetreatType.OTHER

  return (
    <motion.div
      key="retreat"
      variants={STEP_VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
      className={styles.stepContent}
    >
      <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{translations.sections.retreat}</h4>
      <p className={styles.stepDescription}>{translations.stepDescriptions.retreat}</p>

      <FormSelect
        label={translations.labels.retreatType}
        id={FORM_FIELD_IDS.RETREAT_TYPE}
        name="retreatType"
        value={formData.retreatType}
        onChange={handleChange}
        options={retreatTypeOptions}
        error={errors.retreatType}
        required
      />

      {showRetreatTypeOther && (
        <div className={styles.conditionalField}>
          <FormField
            label={translations.labels.retreatTypeOther}
            id={FORM_FIELD_IDS.RETREAT_TYPE_OTHER}
            name="retreatTypeOther"
            type="text"
            value={formData.retreatTypeOther}
            onChange={handleChange}
            placeholder={translations.placeholders.retreatTypeOther}
            error={errors.retreatTypeOther}
            required
          />
        </div>
      )}

      <h4 className={styles.sectionTitle}>{translations.sections.dates}</h4>

      <FormFieldGroup columns={2}>
        <FormDatePicker
          label={translations.labels.startDate}
          id={FORM_FIELD_IDS.START_DATE}
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          blockedRanges={blockedDateRanges}
          error={errors.startDate}
          helpText={translations.helpText.startDate}
          placeholder={translations.placeholders.selectDate}
          unavailableLabel={translations.datePicker.unavailable}
          dateUnavailableError={translations.datePicker.dateUnavailable}
        />

        <FormField
          label={translations.labels.duration}
          id={FORM_FIELD_IDS.DURATION}
          name="duration"
          type="number"
          min={DURATION.MIN}
          max={DURATION.MAX}
          value={formData.duration}
          onChange={handleChange}
          placeholder={translations.placeholders.duration}
          error={errors.duration}
          helpText={translations.helpText.duration}
        />
      </FormFieldGroup>

      <FormCheckbox
        label={translations.labels.flexibleDates}
        id={FORM_FIELD_IDS.FLEXIBLE_DATES}
        name="flexibleDates"
        checked={formData.flexibleDates}
        onChange={handleChange}
      />

      {formData.flexibleDates && (
        <div className={styles.conditionalField}>
          <FormField
            label={translations.labels.flexibleDatesText}
            id={FORM_FIELD_IDS.FLEXIBLE_DATES_TEXT}
            name="flexibleDatesText"
            as="textarea"
            value={formData.flexibleDatesText}
            onChange={handleChange}
            placeholder={translations.placeholders.flexibleDatesText}
            error={errors.flexibleDatesText}
          />
        </div>
      )}
    </motion.div>
  )
}
