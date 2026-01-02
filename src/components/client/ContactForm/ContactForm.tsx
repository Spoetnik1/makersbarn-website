'use client'

import { useState, useCallback, useMemo, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/data'
import { CONTACT_URLS, ANCHOR_IDS } from '@/constants'
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
          <div className={styles.introOptions}>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>{contact.options.whatsapp.title}</strong>
                <p className={styles.optionDesc}>{contact.options.whatsapp.description}</p>
              </div>
              <a
                href={CONTACT_URLS.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.introButton} ${styles.whatsappButton}`}
              >
                <WhatsAppIcon />
                {contact.options.whatsapp.buttonText}
              </a>
            </div>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>{contact.options.email.title}</strong>
                <p className={styles.optionDesc}>{contact.options.email.description}</p>
              </div>
              <a href="mailto:info@makersbarn.com" className={`${styles.introButton} ${styles.callButton}`}>
                <EmailIcon />
                {contact.options.email.buttonText}
              </a>
            </div>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>{contact.options.form.title}</strong>
                <p className={styles.optionDesc}>{contact.options.form.description}</p>
              </div>
              <a href={`#${ANCHOR_IDS.CONTACT_FORM}`} className={`${styles.introButton} ${styles.formButton}`}>
                <ClipboardIcon />
                {contact.options.form.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id={ANCHOR_IDS.CONTACT_FORM} className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3 className={styles.formTitle}>{contact.formTitle}</h3>

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

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
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

function ClipboardIcon() {
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
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  )
}
