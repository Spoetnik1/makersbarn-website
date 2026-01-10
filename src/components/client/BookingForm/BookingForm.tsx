'use client'

import { useState, useCallback, useMemo, useRef, useEffect, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { getBlockedDateRanges, BOOKING_ANCHOR_ID, GROUP_SIZE, DURATION } from '@/constants'
import { submitBookingForm, notifyBookingStarted } from '@/actions'
import { FormStatus, RetreatType, Route, type BookingFormData, type PartialBookingContactData } from '@/types'
import { useTranslation, useLanguage } from '@/context'
import { getLocalizedPath } from '@/lib/routing'
import { FormField, FormFieldGroup, FormSelect, FormCheckbox, FormDatePicker } from '@/components/client/forms'
import styles from './BookingForm.module.css'

const INITIAL_FORM_DATA: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  startDate: '',
  duration: '',
  flexibleDates: false,
  flexibleDatesText: '',
  minGroupSize: '',
  maxGroupSize: '',
  retreatType: RetreatType.PRIVATE_GROUP,
  retreatTypeOther: '',
  accommodationPreferences: '',
  cateringNeeded: false,
  cateringDetails: '',
  extraInfo: '',
}

const FORM_FIELD_IDS = {
  NAME: 'booking-name',
  EMAIL: 'booking-email',
  PHONE: 'booking-phone',
  START_DATE: 'booking-start-date',
  DURATION: 'booking-duration',
  FLEXIBLE_DATES: 'booking-flexible-dates',
  FLEXIBLE_DATES_TEXT: 'booking-flexible-text',
  MIN_GROUP_SIZE: 'booking-min-group',
  MAX_GROUP_SIZE: 'booking-max-group',
  RETREAT_TYPE: 'booking-retreat-type',
  RETREAT_TYPE_OTHER: 'booking-retreat-other',
  ACCOMMODATION: 'booking-accommodation',
  CATERING_NEEDED: 'booking-catering-needed',
  CATERING_DETAILS: 'booking-catering-details',
  EXTRA_INFO: 'booking-extra-info',
} as const

// Retreat type options without labels - labels come from i18n
const RETREAT_TYPE_KEYS = [
  { value: RetreatType.PRIVATE_GROUP, labelKey: 'privateGroup' as const },
  { value: RetreatType.YOGA, labelKey: 'yoga' as const },
  { value: RetreatType.WORKSHOP, labelKey: 'workshop' as const },
  { value: RetreatType.OTHER, labelKey: 'other' as const },
]

enum WizardStep {
  CONTACT = 1,
  RETREAT = 2,
  DETAILS = 3,
  REVIEW = 4,
}

const TOTAL_STEPS = 4

// Map field names to wizard steps for error navigation (type-safe)
const FIELD_TO_STEP: Partial<Record<keyof BookingFormData, WizardStep>> = {
  name: WizardStep.CONTACT,
  email: WizardStep.CONTACT,
  phone: WizardStep.CONTACT,
  retreatType: WizardStep.RETREAT,
  retreatTypeOther: WizardStep.RETREAT,
  startDate: WizardStep.RETREAT,
  duration: WizardStep.RETREAT,
  flexibleDates: WizardStep.RETREAT,
  flexibleDatesText: WizardStep.RETREAT,
  minGroupSize: WizardStep.DETAILS,
  maxGroupSize: WizardStep.DETAILS,
  accommodationPreferences: WizardStep.DETAILS,
  cateringNeeded: WizardStep.DETAILS,
  cateringDetails: WizardStep.DETAILS,
  extraInfo: WizardStep.REVIEW,
}

// Animation variants - defined outside component to avoid recreation
const STEP_VARIANTS = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
} as const

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA)
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.CONTACT)
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasNotifiedStart, setHasNotifiedStart] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Ref for focus management on step transitions
  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const previousStepRef = useRef<WizardStep>(currentStep)

  const { t: booking } = useTranslation('booking')
  const { language } = useLanguage()

  // Focus management: move focus to step heading when step changes
  useEffect(() => {
    if (previousStepRef.current !== currentStep && hasAnimated) {
      // Small delay to ensure animation has started and element is rendered
      const timer = setTimeout(() => {
        stepHeadingRef.current?.focus()
      }, 50)
      previousStepRef.current = currentStep
      return () => clearTimeout(timer)
    }
  }, [currentStep, hasAnimated])

  const statusMessages = useMemo(
    () => ({
      [FormStatus.SUCCESS]: booking.messages.success,
      [FormStatus.ERROR]: booking.messages.unexpectedError,
      [FormStatus.LOADING]: booking.messages.loading,
      [FormStatus.IDLE]: '',
    }),
    [booking.messages]
  )

  // Build retreat type options with i18n labels (memoized)
  const retreatTypeOptions = useMemo(
    () =>
      RETREAT_TYPE_KEYS.map((option) => ({
        value: option.value,
        label: booking.retreatTypes[option.labelKey],
      })),
    [booking.retreatTypes]
  )

  // Get blocked date ranges (memoized to prevent hydration mismatch)
  const blockedDateRanges = useMemo(() => getBlockedDateRanges(), [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: newValue }))
    setErrors((prev) => {
      if (prev[name]) {
        const { [name]: _, ...rest } = prev
        return rest
      }
      return prev
    })
  }, [])

  const validateStep = useCallback((step: WizardStep): boolean => {
    const newErrors: Record<string, string> = {}

    // Only validate contact info - everything else is optional to capture intent
    if (step === WizardStep.CONTACT) {
      if (!formData.name.trim()) {
        newErrors.name = booking.validation.nameRequired
      }
      if (!formData.email.trim()) {
        newErrors.email = booking.validation.emailRequired
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = booking.validation.emailInvalid
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, booking.validation])

  const handleNextStep = useCallback(async () => {
    if (!validateStep(currentStep)) {
      return
    }

    // On step 1 completion, send partial booking notification
    if (currentStep === WizardStep.CONTACT && !hasNotifiedStart) {
      const contactData: PartialBookingContactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
      }
      // Fire and forget - don't block the user
      notifyBookingStarted(contactData).then(() => {
        setHasNotifiedStart(true)
      })
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => (prev + 1) as WizardStep)
    }
  }, [currentStep, validateStep, formData, hasNotifiedStart])

  const handlePrevStep = useCallback(() => {
    if (currentStep > WizardStep.CONTACT) {
      setCurrentStep((prev) => (prev - 1) as WizardStep)
    }
  }, [currentStep])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!validateStep(currentStep)) {
        return
      }

      setStatus(FormStatus.LOADING)
      setStatusMessage(statusMessages[FormStatus.LOADING])
      setErrors({})

      try {
        const result = await submitBookingForm(formData)
        // Map messageCode to i18n translation
        const messageKey = result.messageCode as keyof typeof booking.messages
        const translatedMessage = booking.messages[messageKey] || booking.messages.unexpectedError

        if (result.success) {
          setStatus(FormStatus.SUCCESS)
          setStatusMessage(translatedMessage)
          // Don't reset form - stay on success screen
        } else {
          setStatus(FormStatus.ERROR)
          if (result.errors) {
            setErrors(result.errors)
            // Navigate to the step containing the first error
            const errorFields = Object.keys(result.errors) as Array<keyof BookingFormData>
            if (errorFields.length > 0) {
              const firstErrorField = errorFields[0]
              const targetStep = FIELD_TO_STEP[firstErrorField]
              if (targetStep && targetStep !== currentStep) {
                setCurrentStep(targetStep)
              }
              // Show specific error message
              setStatusMessage(result.errors[firstErrorField as string])
            } else {
              setStatusMessage(translatedMessage)
            }
          } else {
            setStatusMessage(translatedMessage)
          }
        }
      } catch {
        setStatus(FormStatus.ERROR)
        setStatusMessage(statusMessages[FormStatus.ERROR])
      }
    },
    [formData, statusMessages, currentStep, validateStep, booking.messages]
  )

  const isSubmitting = status === FormStatus.LOADING
  const isSuccess = status === FormStatus.SUCCESS
  const showRetreatTypeOther = formData.retreatType === RetreatType.OTHER
  const showCateringDetails = formData.cateringNeeded

  const handleNewRequest = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(WizardStep.CONTACT)
    setStatus(FormStatus.IDLE)
    setStatusMessage('')
    setErrors({})
    setHasNotifiedStart(false)
  }, [])

  // Enable animations after first render
  const handleAnimationComplete = useCallback(() => {
    if (!hasAnimated) setHasAnimated(true)
  }, [hasAnimated])

  return (
    <div className={styles.booking}>
      <section id={BOOKING_ANCHOR_ID} className={styles.formSection}>
        <div className={styles.formWrapper}>
          {isSuccess ? (
            /* Success Screen */
            <div className={styles.successScreen}>
              <div className={styles.successIconWrapper}>
                <SuccessIcon />
              </div>
              <h1 className={styles.successTitle}>{booking.success.title}</h1>
              <p className={styles.successSubtitle}>{booking.success.subtitle}</p>
              <p className={styles.successDescription}>{booking.success.description}</p>

              <div className={styles.successNextSteps}>
                <h2 className={styles.successNextStepsTitle}>{booking.success.whatNext}</h2>
                <ul className={styles.successStepsList}>
                  {booking.success.steps.map((step, index) => (
                    <li key={index} className={styles.successStep}>
                      <span className={styles.successStepNumber}>{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.successActions}>
                <Link href={Route.HOME} className={styles.successSecondaryButton}>
                  {booking.success.homeButton}
                </Link>
                <button
                  type="button"
                  className={styles.successPrimaryButton}
                  onClick={handleNewRequest}
                >
                  {booking.success.newRequestButton}
                </button>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Progress Indicator */}
            <div className={styles.progressContainer}>
              <nav aria-label={booking.progressLabel}>
                <ol className={styles.progressSteps}>
                  {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                    const step = i + 1
                    const isActive = step === currentStep
                    const isCompleted = step < currentStep
                    const stepLabel =
                      step === WizardStep.CONTACT ? booking.steps.contact :
                      step === WizardStep.RETREAT ? booking.steps.retreat :
                      step === WizardStep.DETAILS ? booking.steps.details :
                      booking.steps.review
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

              <AnimatePresence mode="wait">
                {/* Step 1: Contact Information */}
                {currentStep === WizardStep.CONTACT && (
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
                    {/* Info alert about booking purpose */}
                    <div className={styles.infoAlert} role="note">
                      <h5 className={styles.infoAlertTitle}>
                        <InfoIcon />
                        {booking.alert.title}
                      </h5>
                      <p className={styles.infoAlertDescription}>
                        {booking.alert.description}
                      </p>
                      <div className={styles.infoAlertLinks}>
                        <Link href={getLocalizedPath(Route.EXPERIENCES, language)} className={styles.infoAlertLink}>
                          {booking.alert.joinRetreatLink}
                        </Link>
                      </div>
                    </div>

                    <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{booking.sections.contact}</h4>
                    <p className={styles.stepDescription}>{booking.stepDescriptions.contact}</p>

                    <FormField
                      label={booking.labels.name}
                      id={FORM_FIELD_IDS.NAME}
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={booking.placeholders.name}
                      error={errors.name}
                      required
                    />

                    <FormFieldGroup columns={2}>
                      <FormField
                        label={booking.labels.email}
                        id={FORM_FIELD_IDS.EMAIL}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={booking.placeholders.email}
                        error={errors.email}
                        required
                      />

                      <FormField
                        label={booking.labels.phone}
                        id={FORM_FIELD_IDS.PHONE}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={booking.placeholders.phone}
                        error={errors.phone}
                      />
                    </FormFieldGroup>
                  </motion.div>
                )}

                {/* Step 2: Retreat Details */}
                {currentStep === WizardStep.RETREAT && (
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
                    <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{booking.sections.retreat}</h4>
                    <p className={styles.stepDescription}>{booking.stepDescriptions.retreat}</p>

                    <FormSelect
                      label={booking.labels.retreatType}
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
                          label={booking.labels.retreatTypeOther}
                          id={FORM_FIELD_IDS.RETREAT_TYPE_OTHER}
                          name="retreatTypeOther"
                          type="text"
                          value={formData.retreatTypeOther}
                          onChange={handleChange}
                          placeholder={booking.placeholders.retreatTypeOther}
                          error={errors.retreatTypeOther}
                          required
                        />
                      </div>
                    )}

                    <h4 className={styles.sectionTitle}>{booking.sections.dates}</h4>

                    <FormFieldGroup columns={2}>
                      <FormDatePicker
                        label={booking.labels.startDate}
                        id={FORM_FIELD_IDS.START_DATE}
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        blockedRanges={blockedDateRanges}
                        error={errors.startDate}
                        helpText={booking.helpText.startDate}
                        placeholder={booking.placeholders.selectDate}
                        unavailableLabel={booking.datePicker.unavailable}
                        dateUnavailableError={booking.datePicker.dateUnavailable}
                      />

                      <FormField
                        label={booking.labels.duration}
                        id={FORM_FIELD_IDS.DURATION}
                        name="duration"
                        type="number"
                        min={DURATION.MIN}
                        max={DURATION.MAX}
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder={booking.placeholders.duration}
                        error={errors.duration}
                        helpText={booking.helpText.duration}
                      />
                    </FormFieldGroup>

                    <FormCheckbox
                      label={booking.labels.flexibleDates}
                      id={FORM_FIELD_IDS.FLEXIBLE_DATES}
                      name="flexibleDates"
                      checked={formData.flexibleDates}
                      onChange={handleChange}
                    />

                    {formData.flexibleDates && (
                      <div className={styles.conditionalField}>
                        <FormField
                          label={booking.labels.flexibleDatesText}
                          id={FORM_FIELD_IDS.FLEXIBLE_DATES_TEXT}
                          name="flexibleDatesText"
                          as="textarea"
                          value={formData.flexibleDatesText}
                          onChange={handleChange}
                          placeholder={booking.placeholders.flexibleDatesText}
                          error={errors.flexibleDatesText}
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Group & Additional Details */}
                {currentStep === WizardStep.DETAILS && (
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
                    <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{booking.sections.groupSize}</h4>
                    <p className={styles.stepDescription}>{booking.stepDescriptions.details}</p>

                    <FormFieldGroup columns={2}>
                      <FormField
                        label={booking.labels.minGroupSize}
                        id={FORM_FIELD_IDS.MIN_GROUP_SIZE}
                        name="minGroupSize"
                        type="number"
                        min={GROUP_SIZE.MIN}
                        max={GROUP_SIZE.MAX}
                        value={formData.minGroupSize}
                        onChange={handleChange}
                        placeholder={booking.placeholders.minGroupSize}
                        error={errors.minGroupSize}
                      />

                      <FormField
                        label={booking.labels.maxGroupSize}
                        id={FORM_FIELD_IDS.MAX_GROUP_SIZE}
                        name="maxGroupSize"
                        type="number"
                        min={GROUP_SIZE.MIN}
                        max={GROUP_SIZE.MAX}
                        value={formData.maxGroupSize}
                        onChange={handleChange}
                        placeholder={booking.placeholders.maxGroupSize}
                        error={errors.maxGroupSize}
                      />
                    </FormFieldGroup>

                    <h4 className={styles.sectionTitle}>{booking.sections.accommodation}</h4>

                    <FormField
                      label={booking.labels.accommodationPreferences}
                      id={FORM_FIELD_IDS.ACCOMMODATION}
                      name="accommodationPreferences"
                      as="textarea"
                      value={formData.accommodationPreferences}
                      onChange={handleChange}
                      placeholder={booking.placeholders.accommodationPreferences}
                      error={errors.accommodationPreferences}
                    />

                    <div className={styles.toggleGroup}>
                      <span id="catering-label" className={styles.toggleLabel}>{booking.labels.cateringNeeded}</span>
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
                          onClick={() => setFormData((prev) => ({ ...prev, cateringNeeded: true }))}
                        >
                          {booking.cateringOptions.yes}
                        </button>
                        <button
                          type="button"
                          role="radio"
                          aria-checked={!formData.cateringNeeded}
                          className={`${styles.toggleButton} ${!formData.cateringNeeded ? styles.toggleButtonActive : ''}`}
                          onClick={() => setFormData((prev) => ({ ...prev, cateringNeeded: false, cateringDetails: '' }))}
                        >
                          {booking.cateringOptions.no}
                        </button>
                      </div>
                    </div>

                    {showCateringDetails && (
                      <div className={styles.conditionalField}>
                        <FormField
                          label={booking.labels.cateringDetails}
                          id={FORM_FIELD_IDS.CATERING_DETAILS}
                          name="cateringDetails"
                          as="textarea"
                          value={formData.cateringDetails}
                          onChange={handleChange}
                          placeholder={booking.placeholders.cateringDetails}
                          error={errors.cateringDetails}
                        />
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Review & Extra Info */}
                {currentStep === WizardStep.REVIEW && (
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
                    <h4 ref={stepHeadingRef} tabIndex={-1} className={styles.sectionTitle}>{booking.steps.review}</h4>
                    <p className={styles.stepDescription}>{booking.stepDescriptions.review}</p>

                    {/* Review Summary */}
                    <div className={styles.reviewSummary}>
                      {/* Contact Section */}
                      <div className={styles.reviewSection}>
                        <h5 className={styles.reviewSectionTitle}>{booking.reviewLabels.contact}</h5>
                        <div className={styles.reviewGrid}>
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewItemLabel}>{booking.labels.name}</span>
                            <span className={styles.reviewItemValue}>{formData.name}</span>
                          </div>
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewItemLabel}>{booking.labels.email}</span>
                            <span className={styles.reviewItemValue}>{formData.email}</span>
                          </div>
                          {formData.phone && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.labels.phone}</span>
                              <span className={styles.reviewItemValue}>{formData.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Retreat Section */}
                      <div className={styles.reviewSection}>
                        <h5 className={styles.reviewSectionTitle}>{booking.reviewLabels.retreat}</h5>
                        <div className={styles.reviewGrid}>
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewItemLabel}>{booking.labels.retreatType}</span>
                            <span className={styles.reviewItemValue}>
                              {formData.retreatType === RetreatType.OTHER
                                ? formData.retreatTypeOther || booking.retreatTypes.other
                                : booking.retreatTypes[
                                    RETREAT_TYPE_KEYS.find((k) => k.value === formData.retreatType)?.labelKey || 'privateGroup'
                                  ]}
                            </span>
                          </div>
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewItemLabel}>{booking.labels.startDate}</span>
                            <span className={`${styles.reviewItemValue} ${!formData.startDate ? styles.reviewItemEmpty : ''}`}>
                              {formData.startDate || booking.reviewLabels.notProvided}
                            </span>
                          </div>
                          {formData.duration && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.labels.duration}</span>
                              <span className={styles.reviewItemValue}>{formData.duration}</span>
                            </div>
                          )}
                          {formData.flexibleDates && formData.flexibleDatesText && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.labels.flexibleDatesText}</span>
                              <span className={styles.reviewItemValue}>{formData.flexibleDatesText}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Group Section */}
                      <div className={styles.reviewSection}>
                        <h5 className={styles.reviewSectionTitle}>{booking.reviewLabels.group}</h5>
                        <div className={styles.reviewGrid}>
                          {(formData.minGroupSize || formData.maxGroupSize) && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.sections.groupSize}</span>
                              <span className={styles.reviewItemValue}>
                                {formData.minGroupSize && formData.maxGroupSize
                                  ? `${formData.minGroupSize} - ${formData.maxGroupSize}`
                                  : formData.minGroupSize || formData.maxGroupSize}
                              </span>
                            </div>
                          )}
                          {formData.accommodationPreferences && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.labels.accommodationPreferences}</span>
                              <span className={styles.reviewItemValue}>{formData.accommodationPreferences}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Catering Section */}
                      <div className={styles.reviewSection}>
                        <h5 className={styles.reviewSectionTitle}>{booking.reviewLabels.catering}</h5>
                        <div className={styles.reviewGrid}>
                          <div className={styles.reviewItem}>
                            <span className={styles.reviewItemLabel}>{booking.labels.cateringNeeded}</span>
                            <span className={styles.reviewItemValue}>
                              {formData.cateringNeeded ? booking.cateringOptions.yes : booking.cateringOptions.no}
                            </span>
                          </div>
                          {formData.cateringNeeded && formData.cateringDetails && (
                            <div className={styles.reviewItem}>
                              <span className={styles.reviewItemLabel}>{booking.labels.cateringDetails}</span>
                              <span className={styles.reviewItemValue}>{formData.cateringDetails}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <h4 className={styles.sectionTitle}>{booking.sections.extraInfo}</h4>

                    <FormField
                      label={booking.labels.extraInfo}
                      id={FORM_FIELD_IDS.EXTRA_INFO}
                      name="extraInfo"
                      as="textarea"
                      value={formData.extraInfo}
                      onChange={handleChange}
                      placeholder={booking.placeholders.extraInfo}
                      error={errors.extraInfo}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {statusMessage && status === FormStatus.ERROR && (
                <div
                  className={`${styles.statusMessage} ${styles.statusError}`}
                  role="alert"
                >
                  {statusMessage}
                </div>
              )}

              {/* Navigation Buttons */}
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
                    {booking.buttons.back}
                  </motion.button>
                )}

                {currentStep < TOTAL_STEPS ? (
                  <motion.button
                    key="next-button"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                  >
                    {booking.buttons.next}
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
                    {isSubmitting ? booking.buttons.submitting : booking.buttons.submit}
                  </motion.button>
                )}
            </div>
          </form>
          )}
        </div>
      </section>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
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

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
