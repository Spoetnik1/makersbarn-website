'use client'

import { memo, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from 'react'
import styles from './FormField.module.css'

interface BaseFieldProps {
  label: string
  id: string
  error?: string
  required?: boolean
  helpText?: string
}

interface InputFieldProps extends BaseFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  as?: 'input'
}

interface TextareaFieldProps extends BaseFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  as: 'textarea'
}

type FormFieldProps = InputFieldProps | TextareaFieldProps

export const FormField = memo(function FormField(props: FormFieldProps) {
  const { label, id, error, required, helpText, as = 'input', ...inputProps } = props

  const inputClassName = as === 'textarea' ? styles.textarea : styles.input
  const hasError = Boolean(error)

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          className={`${inputClassName} ${hasError ? styles.inputError : ''}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={`${inputClassName} ${hasError ? styles.inputError : ''}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {helpText && !error && (
        <p id={`${id}-help`} className={styles.helpText}>
          {helpText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

interface FormFieldGroupProps {
  children: ReactNode
  columns?: 1 | 2 | 3
}

export function FormFieldGroup({ children, columns = 1 }: FormFieldGroupProps) {
  return (
    <div className={`${styles.fieldGroup} ${styles[`columns${columns}`]}`}>
      {children}
    </div>
  )
}
