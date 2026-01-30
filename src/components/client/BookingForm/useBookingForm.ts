import { useState, useCallback, useMemo, useRef, useEffect, FormEvent, ChangeEvent } from 'react'

import { getBlockedDateRanges } from '@/constants'
import { submitBookingForm } from '@/actions'
import { FormStatus, type BookingFormData } from '@/types'

import {
  INITIAL_FORM_DATA,
  RETREAT_TYPE_KEYS,
  WizardStep,
} from './BookingFormConstants'
import { handleSubmitSuccess, handleSubmitError } from './bookingFormHandlers'
import { validateStep, notifyContactStep } from './bookingFormValidation'

interface UseBookingFormProps {
  bookingMessages: {
    success: string
    unexpectedError: string
    loading: string
    [key: string]: string
  }
  bookingValidation: {
    nameRequired: string
    emailRequired: string
    emailInvalid: string
    retreatTypeOtherRequired: string
  }
  retreatTypes: {
    privateGroup: string
    yoga: string
    workshop: string
    other: string
  }
}

export function useBookingForm({ bookingMessages, bookingValidation, retreatTypes }: UseBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA)
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.CONTACT)
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasNotifiedStart, setHasNotifiedStart] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const stepHeadingRef = useRef<HTMLHeadingElement>(null)
  const previousStepRef = useRef<WizardStep>(currentStep)

  useEffect(() => {
    if (previousStepRef.current !== currentStep && hasAnimated) {
      const timer = setTimeout(() => {
        stepHeadingRef.current?.focus()
      }, 50)
      previousStepRef.current = currentStep
      return () => clearTimeout(timer)
    }
  }, [currentStep, hasAnimated])

  const statusMessages = useMemo(
    () => ({
      [FormStatus.SUCCESS]: bookingMessages.success,
      [FormStatus.ERROR]: bookingMessages.unexpectedError,
      [FormStatus.LOADING]: bookingMessages.loading,
      [FormStatus.IDLE]: '',
    }),
    [bookingMessages]
  )

  const retreatTypeOptions = useMemo(
    () =>
      RETREAT_TYPE_KEYS.map((option) => ({
        value: option.value,
        label: retreatTypes[option.labelKey],
      })),
    [retreatTypes]
  )

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

  const validateCurrentStep = useCallback((step: WizardStep): boolean => {
    const result = validateStep({ step, formData, validation: bookingValidation })
    setErrors(result.errors)
    return result.isValid
  }, [formData, bookingValidation])

  const handleNextStep = useCallback(() => {
    if (!validateCurrentStep(currentStep)) {
      return
    }

    if (currentStep === WizardStep.CONTACT && !hasNotifiedStart) {
      notifyContactStep({
        formData,
        onNotified: () => setHasNotifiedStart(true),
      })
    }

    if ((currentStep as number) < 4) {
      setCurrentStep((prev) => (prev + 1) as WizardStep)
    }
  }, [currentStep, validateCurrentStep, formData, hasNotifiedStart])

  const handlePrevStep = useCallback(() => {
    if (currentStep > WizardStep.CONTACT) {
      setCurrentStep((prev) => (prev - 1) as WizardStep)
    }
  }, [currentStep])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!validateCurrentStep(currentStep)) {
        return
      }

      setStatus(FormStatus.LOADING)
      setStatusMessage(statusMessages[FormStatus.LOADING])
      setErrors({})

      try {
        const result = await submitBookingForm(formData)
        const messageKey = result.messageCode as keyof typeof bookingMessages
        const translatedMessage = bookingMessages[messageKey] || bookingMessages.unexpectedError

        if (result.success) {
          handleSubmitSuccess({
            translatedMessage,
            retreatType: formData.retreatType,
            setStatus,
            setStatusMessage,
          })
        } else {
          handleSubmitError({
            result,
            translatedMessage,
            currentStep,
            setStatus,
            setStatusMessage,
            setErrors,
            setCurrentStep,
          })
        }
      } catch {
        setStatus(FormStatus.ERROR)
        setStatusMessage(statusMessages[FormStatus.ERROR])
      }
    },
    [formData, statusMessages, currentStep, validateCurrentStep, bookingMessages]
  )

  const handleNewRequest = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
    setCurrentStep(WizardStep.CONTACT)
    setStatus(FormStatus.IDLE)
    setStatusMessage('')
    setErrors({})
    setHasNotifiedStart(false)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    if (!hasAnimated) {setHasAnimated(true)}
  }, [hasAnimated])

  const setCateringNeeded = useCallback((value: boolean) => {
    setFormData((prev) => ({ ...prev, cateringNeeded: value, cateringDetails: value ? prev.cateringDetails : '' }))
  }, [])

  return {
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
  }
}
