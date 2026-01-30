import { motion } from 'framer-motion'

import { WizardStep } from './BookingFormConstants'
import styles from './BookingForm.module.css'

interface BookingFormNavigationProps {
  currentStep: WizardStep
  isSubmitting: boolean
  handlePrevStep: () => void
  handleNextStep: () => void
  translations: {
    buttons: {
      back: string
      next: string
      submit: string
      submitting: string
    }
  }
}

export function BookingFormNavigation({
  currentStep,
  isSubmitting,
  handlePrevStep,
  handleNextStep,
  translations,
}: BookingFormNavigationProps) {
  const isLastStep = currentStep === WizardStep.REVIEW

  return (
    <div className={styles.buttonGroup}>
      {currentStep > WizardStep.CONTACT && (
        <motion.button
          key="back-button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          className={styles.backButton}
          onClick={handlePrevStep}
          disabled={isSubmitting}
        >
          {translations.buttons.back}
        </motion.button>
      )}

      {!isLastStep ? (
        <motion.button
          key="next-button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          className={styles.nextButton}
          onClick={() => { void handleNextStep() }}
          disabled={isSubmitting}
        >
          {translations.buttons.next}
        </motion.button>
      ) : (
        <motion.button
          key="submit-button"
          whileHover={isSubmitting ? {} : { scale: 1.01 }}
          whileTap={isSubmitting ? {} : { scale: 0.99 }}
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? translations.buttons.submitting : translations.buttons.submit}
        </motion.button>
      )}
    </div>
  )
}
