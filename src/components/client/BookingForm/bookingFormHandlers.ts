import { track } from '@vercel/analytics'

import { AnalyticsEvent } from '@/constants'
import { FormStatus, type BookingFormData } from '@/types'

import { FIELD_TO_STEP, WizardStep } from './BookingFormConstants'

interface SubmitSuccessParams {
  translatedMessage: string
  retreatType: string
  setStatus: (status: FormStatus) => void
  setStatusMessage: (message: string) => void
}

export function handleSubmitSuccess({
  translatedMessage,
  retreatType,
  setStatus,
  setStatusMessage,
}: SubmitSuccessParams) {
  track(AnalyticsEvent.BOOKING_FORM_SUBMITTED, { retreatType })
  setStatus(FormStatus.SUCCESS)
  setStatusMessage(translatedMessage)
}

interface SubmitErrorParams {
  result: { errors?: Record<string, string> }
  translatedMessage: string
  currentStep: WizardStep
  setStatus: (status: FormStatus) => void
  setStatusMessage: (message: string) => void
  setErrors: (errors: Record<string, string>) => void
  setCurrentStep: (step: WizardStep) => void
}

export function handleSubmitError({
  result,
  translatedMessage,
  currentStep,
  setStatus,
  setStatusMessage,
  setErrors,
  setCurrentStep,
}: SubmitErrorParams) {
  setStatus(FormStatus.ERROR)

  if (!result.errors) {
    setStatusMessage(translatedMessage)
    return
  }

  setErrors(result.errors)
  const errorFields = Object.keys(result.errors) as Array<keyof BookingFormData>

  if (errorFields.length === 0) {
    setStatusMessage(translatedMessage)
    return
  }

  const firstErrorField = errorFields[0]
  const targetStep = FIELD_TO_STEP[firstErrorField]

  if (targetStep && targetStep !== currentStep) {
    setCurrentStep(targetStep)
  }

  setStatusMessage(result.errors[firstErrorField])
}
