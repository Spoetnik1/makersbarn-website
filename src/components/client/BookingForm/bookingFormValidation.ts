import { notifyBookingStarted } from '@/actions'
import { RetreatType, type PartialBookingContactData } from '@/types'

import { WizardStep } from './BookingFormConstants'

interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

interface ValidateStepParams {
  step: WizardStep
  formData: {
    name: string
    email: string
    retreatType: RetreatType
    retreatTypeOther: string
  }
  validation: {
    nameRequired: string
    emailRequired: string
    emailInvalid: string
    retreatTypeOtherRequired: string
  }
}

export function validateStep({ step, formData, validation }: ValidateStepParams): ValidationResult {
  const errors: Record<string, string> = {}

  if (step === WizardStep.CONTACT) {
    if (!formData.name.trim()) {
      errors.name = validation.nameRequired
    }
    if (!formData.email.trim()) {
      errors.email = validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = validation.emailInvalid
    }
  }

  if (step === WizardStep.RETREAT) {
    if (formData.retreatType === RetreatType.OTHER && !formData.retreatTypeOther.trim()) {
      errors.retreatTypeOther = validation.retreatTypeOtherRequired
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

interface NotifyContactParams {
  formData: {
    name: string
    email: string
    phone: string
  }
  onNotified: () => void
}

export function notifyContactStep({ formData, onNotified }: NotifyContactParams): void {
  const contactData: PartialBookingContactData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone || undefined,
  }
  void notifyBookingStarted(contactData).then(onNotified)
}
