'use client'

import { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/data'
import { CONTACT_URLS, ANCHOR_IDS } from '@/constants'
import styles from './ContactForm.module.css'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const INITIAL_FORM_DATA: FormData = {
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

const FORM_LABELS = {
  name: 'Hi! My name is...',
  email: 'and you can reach me at...',
  phone: 'or call me at...',
  message: "I'd love to ask about...",
} as const

const FORM_PLACEHOLDERS = {
  name: 'Your name...',
  email: 'Your email...',
  phone: 'Your phone number...',
  message: 'Whatever your heart desires :)',
} as const

const SUCCESS_MESSAGE = 'Thank you for your message! We will get back to you soon.'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // TODO: Implement actual form submission
      alert(SUCCESS_MESSAGE)
      setFormData(INITIAL_FORM_DATA)
    },
    []
  )

  return (
    <div className={styles.contact}>
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <h1 className={styles.introTitle}>Get in Touch</h1>
          <p className={styles.introText}>
            We&apos;d love to hear from you! Whether you&apos;re planning a retreat, workshop, or
            just want to learn more about Maker&apos;s Barn, we&apos;re here to help. Choose the way
            that works best for&nbsp;you:
          </p>
          <div className={styles.introOptions}>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>WhatsApp</strong>
                <p className={styles.optionDesc}>Send us a quick message for instant communication</p>
              </div>
              <a
                href={CONTACT_URLS.WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.introButton} ${styles.whatsappButton}`}
              >
                <WhatsAppIcon />
                Get in touch on WhatsApp
              </a>
            </div>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>Schedule a Call</strong>
                <p className={styles.optionDesc}>Let&apos;s have a conversation and discuss your needs</p>
              </div>
              <a href={CONTACT_URLS.PHONE} className={`${styles.introButton} ${styles.callButton}`}>
                Plan a Call
              </a>
            </div>
            <div className={styles.introOption}>
              <div className={styles.optionHeader}>
                <strong>Contact Form</strong>
                <p className={styles.optionDesc}>Fill out the form below and we&apos;ll get back to you</p>
              </div>
              <a href={`#${ANCHOR_IDS.CONTACT_FORM}`} className={`${styles.introButton} ${styles.formButton}`}>
                Go to Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id={ANCHOR_IDS.CONTACT_FORM} className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3 className={styles.formTitle}>Contact us</h3>

              <div className={styles.formGroup}>
                <label htmlFor={FORM_FIELD_IDS.NAME} className={styles.formLabel}>
                  {FORM_LABELS.name}
                </label>
                <input
                  id={FORM_FIELD_IDS.NAME}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={FORM_PLACEHOLDERS.name}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={FORM_FIELD_IDS.EMAIL} className={styles.formLabel}>
                  {FORM_LABELS.email}
                </label>
                <input
                  id={FORM_FIELD_IDS.EMAIL}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={FORM_PLACEHOLDERS.email}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={FORM_FIELD_IDS.PHONE} className={styles.formLabel}>
                  {FORM_LABELS.phone}
                </label>
                <input
                  id={FORM_FIELD_IDS.PHONE}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={FORM_PLACEHOLDERS.phone}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={FORM_FIELD_IDS.MESSAGE} className={styles.formLabel}>
                  {FORM_LABELS.message}
                </label>
                <textarea
                  id={FORM_FIELD_IDS.MESSAGE}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={FORM_PLACEHOLDERS.message}
                  className={styles.formTextarea}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className={styles.submitButton}
              >
                Submit
              </motion.button>
            </form>
            <div className={styles.formImage}>
              <Image
                src={IMAGES.accommodation.hayHouseBench}
                alt="Maker's Barn"
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
            title="Maker's Barn Location"
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
