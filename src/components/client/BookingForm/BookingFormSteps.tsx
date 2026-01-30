import { ChangeEvent, RefObject } from 'react'
import { AnimatePresence } from 'framer-motion'

import { RetreatType, Language, type BookingFormData } from '@/types'

import { BookingFormContactStep } from './BookingFormContactStep'
import { BookingFormRetreatStep } from './BookingFormRetreatStep'
import { BookingFormDetailsStep } from './BookingFormDetailsStep'
import { BookingFormReviewStep } from './BookingFormReviewStep'
import { WizardStep } from './BookingFormConstants'

interface DateRange {
  start: Date
  end: Date
}

interface BookingFormStepsProps {
  currentStep: WizardStep
  formData: BookingFormData
  errors: Record<string, string>
  hasAnimated: boolean
  stepHeadingRef: RefObject<HTMLHeadingElement | null>
  language: Language
  retreatTypeOptions: Array<{ value: RetreatType; label: string }>
  blockedDateRanges: DateRange[]
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleAnimationComplete: () => void
  setCateringNeeded: (value: boolean) => void
  translations: {
    alert: {
      title: string
      description: string
      joinRetreatLink: string
    }
    sections: {
      contact: string
      retreat: string
      dates: string
      groupSize: string
      accommodation: string
      extraInfo: string
    }
    stepDescriptions: {
      contact: string
      retreat: string
      details: string
      review: string
    }
    steps: {
      review: string
    }
    labels: {
      name: string
      email: string
      phone: string
      retreatType: string
      retreatTypeOther: string
      startDate: string
      duration: string
      flexibleDates: string
      flexibleDatesText: string
      minGroupSize: string
      maxGroupSize: string
      accommodationPreferences: string
      cateringNeeded: string
      cateringDetails: string
      extraInfo: string
    }
    placeholders: {
      name: string
      email: string
      phone: string
      retreatTypeOther: string
      selectDate: string
      duration: string
      flexibleDatesText: string
      minGroupSize: string
      maxGroupSize: string
      accommodationPreferences: string
      cateringDetails: string
      extraInfo: string
    }
    helpText: {
      startDate: string
      duration: string
    }
    datePicker: {
      unavailable: string
      dateUnavailable: string
    }
    cateringOptions: {
      yes: string
      no: string
    }
    retreatTypes: {
      privateGroup: string
      yoga: string
      workshop: string
      other: string
    }
    reviewLabels: {
      contact: string
      retreat: string
      group: string
      catering: string
      notProvided: string
    }
  }
}

export function BookingFormSteps({
  currentStep,
  formData,
  errors,
  hasAnimated,
  stepHeadingRef,
  language,
  retreatTypeOptions,
  blockedDateRanges,
  handleChange,
  handleAnimationComplete,
  setCateringNeeded,
  translations,
}: BookingFormStepsProps) {
  return (
    <AnimatePresence mode="wait">
      {currentStep === WizardStep.CONTACT && (
        <BookingFormContactStep
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          hasAnimated={hasAnimated}
          handleAnimationComplete={handleAnimationComplete}
          stepHeadingRef={stepHeadingRef}
          language={language}
          translations={translations}
        />
      )}

      {currentStep === WizardStep.RETREAT && (
        <BookingFormRetreatStep
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleAnimationComplete={handleAnimationComplete}
          stepHeadingRef={stepHeadingRef}
          retreatTypeOptions={retreatTypeOptions}
          blockedDateRanges={blockedDateRanges}
          translations={translations}
        />
      )}

      {currentStep === WizardStep.DETAILS && (
        <BookingFormDetailsStep
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleAnimationComplete={handleAnimationComplete}
          stepHeadingRef={stepHeadingRef}
          setCateringNeeded={setCateringNeeded}
          translations={translations}
        />
      )}

      {currentStep === WizardStep.REVIEW && (
        <BookingFormReviewStep
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleAnimationComplete={handleAnimationComplete}
          stepHeadingRef={stepHeadingRef}
          translations={translations}
        />
      )}
    </AnimatePresence>
  )
}
