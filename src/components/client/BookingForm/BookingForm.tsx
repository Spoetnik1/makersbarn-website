'use client'

import { BOOKING_ANCHOR_ID } from '@/constants'
import { FormStatus } from '@/types'
import { useTranslation, useLanguage } from '@/context'

import { BookingFormProgress } from './BookingFormProgress'
import { BookingFormSteps } from './BookingFormSteps'
import { BookingFormNavigation } from './BookingFormNavigation'
import { BookingFormSuccess } from './BookingFormSuccess'
import { useBookingForm } from './useBookingForm'
import styles from './BookingForm.module.css'

export function BookingForm() {
  const { t: booking } = useTranslation('booking')
  const { language } = useLanguage()

  const {
    formData,
    currentStep,
    status,
    statusMessage,
    errors,
    hasAnimated,
    stepHeadingRef,
    retreatTypeOptions,
    blockedDateRanges,
    handleChange,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    handleNewRequest,
    handleAnimationComplete,
    setCateringNeeded,
  } = useBookingForm({
    bookingMessages: booking.messages,
    bookingValidation: booking.validation,
    retreatTypes: booking.retreatTypes,
  })

  const isSubmitting = status === FormStatus.LOADING
  const isSuccess = status === FormStatus.SUCCESS

  return (
    <div className={styles.booking}>
      <section id={BOOKING_ANCHOR_ID} className={styles.formSection}>
        <div className={styles.formWrapper}>
          {isSuccess ? (
            <BookingFormSuccess handleNewRequest={handleNewRequest} translations={booking} />
          ) : (
          <form onSubmit={(e) => { void handleSubmit(e) }} className={styles.form}>
            <BookingFormProgress
              currentStep={currentStep}
              stepLabels={booking.steps}
              progressLabel={booking.progressLabel}
            />

            <BookingFormSteps
              currentStep={currentStep}
              formData={formData}
              errors={errors}
              hasAnimated={hasAnimated}
              stepHeadingRef={stepHeadingRef}
              language={language}
              retreatTypeOptions={retreatTypeOptions}
              blockedDateRanges={blockedDateRanges}
              handleChange={handleChange}
              handleAnimationComplete={handleAnimationComplete}
              setCateringNeeded={setCateringNeeded}
              translations={booking}
            />

            {statusMessage && status === FormStatus.ERROR && (
              <div
                className={`${styles.statusMessage} ${styles.statusError}`}
                role="alert"
              >
                {statusMessage}
              </div>
            )}

            <BookingFormNavigation
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
              translations={booking}
            />
          </form>
          )}
        </div>
      </section>
    </div>
  )
}
