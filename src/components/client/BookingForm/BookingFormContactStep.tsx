import { ChangeEvent, RefObject } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Route, Language } from '@/types'
import { getLocalizedPath } from '@/lib/routing'
import { FormField, FormFieldGroup } from '@/components/client/forms'

import { InfoIcon } from './BookingFormIcons'
import { FORM_FIELD_IDS, STEP_VARIANTS } from './BookingFormConstants'
import styles from './BookingForm.module.css'

interface BookingFormContactStepProps {
  formData: {
    name: string
    email: string
    phone: string
  }
  errors: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  hasAnimated: boolean
  handleAnimationComplete: () => void
  stepHeadingRef: RefObject<HTMLHeadingElement | null>
  language: Language
  translations: {
    alert: {
      title: string
      description: string
      joinRetreatLink: string
    }
    sections: {
      contact: string
    }
    stepDescriptions: {
      contact: string
    }
    labels: {
      name: string
      email: string
      phone: string
    }
    placeholders: {
      name: string
      email: string
      phone: string
    }
  }
}

export function BookingFormContactStep({
  formData,
  errors,
  handleChange,
  hasAnimated,
  handleAnimationComplete,
  stepHeadingRef,
  language,
  translations,
}: BookingFormContactStepProps) {
  return (
    <motion.div
      key="contact"
      variants={STEP_VARIANTS}
      initial={hasAnimated ? 'enter' : false}
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleAnimationComplete}
      className={styles.stepContent}
    >
      <div className={styles.infoAlert} role="note">
        <h5 className={styles.infoAlertTitle}>
          <InfoIcon />
          {translations.alert.title}
        </h5>
        <p className={styles.infoAlertDescription}>
          {translations.alert.description}
        </p>
        <div className={styles.infoAlertLinks}>
          <Link href={getLocalizedPath(Route.EXPERIENCES, language)} className={styles.infoAlertLink}>
            {translations.alert.joinRetreatLink}
          </Link>
        </div>
      </div>

      <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{translations.sections.contact}</h4>
      <p className={styles.stepDescription}>{translations.stepDescriptions.contact}</p>

      <FormField
        label={translations.labels.name}
        id={FORM_FIELD_IDS.NAME}
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder={translations.placeholders.name}
        error={errors.name}
        required
      />

      <FormFieldGroup columns={2}>
        <FormField
          label={translations.labels.email}
          id={FORM_FIELD_IDS.EMAIL}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={translations.placeholders.email}
          error={errors.email}
          required
        />

        <FormField
          label={translations.labels.phone}
          id={FORM_FIELD_IDS.PHONE}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={translations.placeholders.phone}
          error={errors.phone}
        />
      </FormFieldGroup>
    </motion.div>
  )
}
