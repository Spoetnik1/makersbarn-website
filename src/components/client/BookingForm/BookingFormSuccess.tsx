import Link from 'next/link'

import { Route } from '@/types'

import { SuccessIcon } from './BookingFormIcons'
import styles from './BookingForm.module.css'

interface BookingFormSuccessProps {
  handleNewRequest: () => void
  translations: {
    success: {
      title: string
      subtitle: string
      description: string
      whatNext: string
      steps: readonly string[]
      homeButton: string
      newRequestButton: string
    }
  }
}

export function BookingFormSuccess({ handleNewRequest, translations }: BookingFormSuccessProps) {
  return (
    <div className={styles.successScreen}>
      <div className={styles.successIconWrapper}>
        <SuccessIcon />
      </div>
      <h1 className={styles.successTitle}>{translations.success.title}</h1>
      <p className={styles.successSubtitle}>{translations.success.subtitle}</p>
      <p className={styles.successDescription}>{translations.success.description}</p>

      <div className={styles.successNextSteps}>
        <h2 className={styles.successNextStepsTitle}>{translations.success.whatNext}</h2>
        <ul className={styles.successStepsList}>
          {translations.success.steps.map((step, index) => (
            <li key={index} className={styles.successStep}>
              <span className={styles.successStepNumber}>{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.successActions}>
        <Link href={Route.HOME} className={styles.successSecondaryButton}>
          {translations.success.homeButton}
        </Link>
        <button
          type="button"
          className={styles.successPrimaryButton}
          onClick={handleNewRequest}
        >
          {translations.success.newRequestButton}
        </button>
      </div>
    </div>
  )
}
