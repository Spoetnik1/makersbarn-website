import { CheckIcon } from './BookingFormIcons'
import { WizardStep, TOTAL_STEPS, getStepLabel } from './BookingFormConstants'
import styles from './BookingForm.module.css'

interface BookingFormProgressProps {
  currentStep: WizardStep
  stepLabels: {
    contact: string
    retreat: string
    details: string
    review: string
  }
  progressLabel: string
}

export function BookingFormProgress({ currentStep, stepLabels, progressLabel }: BookingFormProgressProps) {
  return (
    <div className={styles.progressContainer}>
      <nav aria-label={progressLabel}>
        <ol className={styles.progressSteps}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const step = (i + 1) as WizardStep
            const isActive = step === currentStep
            const isCompleted = step < currentStep
            const stepLabel = getStepLabel(step, stepLabels)
            return (
              <li
                key={step}
                className={`${styles.progressStep} ${isActive ? styles.progressStepActive : ''} ${isCompleted ? styles.progressStepCompleted : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={styles.progressNumber} aria-hidden="true">
                  {isCompleted ? (
                    <CheckIcon />
                  ) : (
                    step
                  )}
                </span>
                <span className={styles.progressLabel}>
                  {stepLabel}
                </span>
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
