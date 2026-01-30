'use client'

import { useState, useCallback, useMemo, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { track } from '@vercel/analytics'

import { IMAGES } from '@/data'
import { submitContactForm } from '@/actions'
import { AnalyticsEvent } from '@/constants'
import { FormStatus, type ContactFormData } from '@/types'
import { useTranslation } from '@/context'

import styles from './QuestionForm.module.css'

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const FORM_FIELD_IDS = {
  NAME: 'question-name',
  EMAIL: 'question-email',
  PHONE: 'question-phone',
  MESSAGE: 'question-message',
} as const

export function QuestionForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA)
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const { t: contact } = useTranslation('contact')
  const { t: unifiedContact } = useTranslation('unifiedContact')

  const statusMessages = useMemo(
    () => ({
      [FormStatus.SUCCESS]: contact.messages.success,
      [FormStatus.ERROR]: contact.messages.unexpectedError,
      [FormStatus.LOADING]: contact.messages.loading,
      [FormStatus.IDLE]: '',
    }),
    [contact.messages]
  )

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setStatus(FormStatus.LOADING)
      setStatusMessage(statusMessages[FormStatus.LOADING])

      try {
        const result = await submitContactForm(formData)

        if (result.success) {
          track(AnalyticsEvent.QUESTION_FORM_SUBMITTED)
          setStatus(FormStatus.SUCCESS)
          setStatusMessage(result.message)
          setFormData(INITIAL_FORM_DATA)
        } else {
          setStatus(FormStatus.ERROR)
          setStatusMessage(result.message)
        }
      } catch {
        setStatus(FormStatus.ERROR)
        setStatusMessage(statusMessages[FormStatus.ERROR])
      }
    },
    [formData, statusMessages]
  )

  const isSubmitting = status === FormStatus.LOADING

  return (
    <div className={styles.formContainer}>
      <form onSubmit={(e) => { void handleSubmit(e) }} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={FORM_FIELD_IDS.NAME} className={styles.formLabel}>
            {contact.labels.name}
          </label>
          <input
            id={FORM_FIELD_IDS.NAME}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={contact.placeholders.name}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={FORM_FIELD_IDS.EMAIL} className={styles.formLabel}>
            {contact.labels.email}
          </label>
          <input
            id={FORM_FIELD_IDS.EMAIL}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={contact.placeholders.email}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={FORM_FIELD_IDS.PHONE} className={styles.formLabel}>
            {contact.labels.phone}
          </label>
          <input
            id={FORM_FIELD_IDS.PHONE}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={contact.placeholders.phone}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={FORM_FIELD_IDS.MESSAGE} className={styles.formLabel}>
            {contact.labels.message}
          </label>
          <textarea
            id={FORM_FIELD_IDS.MESSAGE}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={contact.placeholders.message}
            className={styles.formTextarea}
            required
          />
        </div>

        {statusMessage && (
          <div
            className={`${styles.statusMessage} ${
              status === FormStatus.SUCCESS ? styles.statusSuccess : ''
            } ${status === FormStatus.ERROR ? styles.statusError : ''}`}
            role="status"
            aria-live={status === FormStatus.ERROR ? 'assertive' : 'polite'}
          >
            {statusMessage}
          </div>
        )}

        <motion.button
          whileHover={isSubmitting ? {} : { scale: 1.01 }}
          whileTap={isSubmitting ? {} : { scale: 0.99 }}
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? contact.buttons.submitting : contact.buttons.submit}
        </motion.button>
      </form>
      <div className={styles.formImage}>
        <Image
          src={IMAGES.accommodation.hayHouseBench}
          alt={unifiedContact.questionFormImageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={styles.image}
        />
      </div>
    </div>
  )
}
