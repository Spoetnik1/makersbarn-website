'use client'

import { memo, type InputHTMLAttributes } from 'react'
import styles from './FormCheckbox.module.css'

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  label: string
  id: string
  error?: string
}

export const FormCheckbox = memo(function FormCheckbox({
  label,
  id,
  error,
  className,
  ...inputProps
}: FormCheckboxProps) {
  const hasError = Boolean(error)

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        <input
          id={id}
          type="checkbox"
          className={`${styles.checkbox} ${hasError ? styles.checkboxError : ''} ${className || ''}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
        <span className={styles.checkmark} />
        <span className={styles.labelText}>{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
})
