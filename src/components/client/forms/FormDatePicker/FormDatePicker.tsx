'use client'

import { memo, useState, useRef, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, isWithinInterval } from 'date-fns'
import type { DateRange } from '@/types'
import styles from './FormDatePicker.module.css'

interface FormDatePickerProps {
  label: string
  id: string
  name?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  blockedRanges?: DateRange[]
  helpText?: string
  /** i18n strings for date picker UI */
  placeholder?: string
  unavailableLabel?: string
  dateUnavailableError?: string
}

const DEFAULT_PLACEHOLDER = 'Select a date'
const DEFAULT_UNAVAILABLE_LABEL = 'Unavailable'
const DEFAULT_DATE_UNAVAILABLE_ERROR = 'This date is not available'

export const FormDatePicker = memo(function FormDatePicker({
  label,
  id,
  name,
  error,
  required,
  blockedRanges = [],
  helpText,
  value,
  onChange,
  placeholder = DEFAULT_PLACEHOLDER,
  unavailableLabel = DEFAULT_UNAVAILABLE_LABEL,
  dateUnavailableError = DEFAULT_DATE_UNAVAILABLE_ERROR,
}: FormDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hasError = Boolean(error)

  // Track client-side mount to avoid hydration mismatch with Date objects
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Parse value to Date
  const selectedDate = value ? new Date(value) : undefined

  // Create disabled date matcher for react-day-picker
  // Only calculate on client to avoid hydration mismatch
  const disabledDays = useMemo(() => {
    if (!isMounted) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return [
      { before: today },
      ...blockedRanges.map((range) => ({
        from: range.start,
        to: range.end,
      })),
    ]
  }, [isMounted, blockedRanges])

  // Check if a date is blocked
  const isDateBlocked = useCallback(
    (date: Date): boolean => {
      return blockedRanges.some((range) =>
        isWithinInterval(date, { start: range.start, end: range.end })
      )
    },
    [blockedRanges]
  )

  // Handle date selection
  const handleSelect = useCallback(
    (date: Date | undefined) => {
      if (date && onChange) {
        const formattedDate = format(date, 'yyyy-MM-dd')
        const syntheticEvent = {
          target: {
            name: name || id,
            value: formattedDate,
            type: 'text',
          },
        } as ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
      setIsOpen(false)
      triggerRef.current?.focus()
    },
    [onChange, name, id]
  )

  // Close on outside click or escape key - combined for atomic cleanup
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // Focus trap for dialog - traps Tab navigation and focuses first element on open
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return

    const dropdown = dropdownRef.current
    const focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusableElements = dropdown.querySelectorAll<HTMLElement>(focusableSelector)
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    // Focus first element when dialog opens
    const focusTimer = setTimeout(() => {
      firstFocusable?.focus()
    }, 0)

    const handleTabTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstFocusable) {
          event.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastFocusable) {
          event.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    dropdown.addEventListener('keydown', handleTabTrap)

    return () => {
      clearTimeout(focusTimer)
      dropdown.removeEventListener('keydown', handleTabTrap)
    }
  }, [isOpen])

  // Check if selected value is blocked (only after mount to avoid hydration mismatch)
  const isValueBlocked = useMemo(() => {
    if (!isMounted || !selectedDate) return false
    return isDateBlocked(selectedDate)
  }, [isMounted, selectedDate, isDateBlocked])

  // Format display value (only after mount to avoid hydration mismatch with locale)
  const displayValue = useMemo(() => {
    if (!isMounted || !selectedDate) return ''
    return format(selectedDate, 'MMM d, yyyy')
  }, [isMounted, selectedDate])

  return (
    <div className={styles.field} ref={containerRef}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={`${styles.input} ${hasError || isValueBlocked ? styles.inputError : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-invalid={hasError || isValueBlocked}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
      >
        <span className={displayValue ? styles.inputValue : styles.inputPlaceholder}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown} role="dialog" aria-label="Choose date">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={disabledDays}
            modifiers={{
              blocked: blockedRanges.map((range) => ({
                from: range.start,
                to: range.end,
              })),
            }}
            modifiersClassNames={{
              blocked: styles.blockedDay,
              disabled: styles.disabledDay,
              selected: styles.selectedDay,
              today: styles.todayDay,
            }}
            classNames={{
              root: styles.calendar,
              months: styles.months,
              month: styles.month,
              month_caption: styles.caption,
              caption_label: styles.captionLabel,
              nav: styles.nav,
              button_previous: styles.navButton,
              button_next: styles.navButton,
              weekdays: styles.weekdays,
              weekday: styles.weekday,
              weeks: styles.weeks,
              week: styles.week,
              day: styles.day,
              day_button: styles.dayButton,
              outside: styles.outsideDay,
            }}
            showOutsideDays
            fixedWeeks
          />
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={styles.legendBlocked} />
              {unavailableLabel}
            </span>
          </div>
        </div>
      )}

      {helpText && !error && !isValueBlocked && (
        <p id={`${id}-help`} className={styles.helpText}>
          {helpText}
        </p>
      )}
      {(error || isValueBlocked) && (
        <p id={`${id}-error`} className={styles.error} role="alert">
          {error || dateUnavailableError}
        </p>
      )}
    </div>
  )
})

function CalendarIcon() {
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
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
