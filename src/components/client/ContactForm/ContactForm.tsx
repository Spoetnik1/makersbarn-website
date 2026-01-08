'use client'

import { useState, useCallback, useMemo, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/data'
import { CONTACT_URLS } from '@/constants'
import { submitContactForm } from '@/actions'
import { FormStatus, type ContactFormData } from '@/types'
import { useTranslation } from '@/context'
import styles from './ContactForm.module.css'

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const FORM_FIELD_IDS = {
  NAME: 'contact-name',
  EMAIL: 'contact-email',
  PHONE: 'contact-phone',
  MESSAGE: 'contact-message',
} as const

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA)
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE)
  const [statusMessage, setStatusMessage] = useState<string>('')

  const { t: contact } = useTranslation('contact')
  const { t: common } = useTranslation('common')

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
    <div className={styles.contact}>
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <h1 className={styles.introTitle}>{contact.pageTitle}</h1>
          <p className={styles.introText}>{contact.introText}</p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.formTitle}>{contact.formTitle}</h2>

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
                  role="alert"
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
                alt={common.logoAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.emailAlternative}>
            <p className={styles.emailAlternativeText}>{contact.emailAlternative.text}</p>
            <a href="mailto:info@makersbarn.com" className={styles.emailLink}>
              <EmailIcon />
              info@makersbarn.com
            </a>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <iframe
            src={CONTACT_URLS.MAP_EMBED}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={common.logoAlt}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </section>
    </div>
  )
}

function EmailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

