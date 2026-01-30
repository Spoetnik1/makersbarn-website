'use client'

import { memo, useState, useRef, useEffect, useCallback, useMemo, type ChangeEvent } from 'react'
import { DayPicker, type Matcher } from 'react-day-picker'
import { format, isWithinInterval } from 'date-fns'

import type { DateRange } from '@/types'

import { useClickOutside, useEscapeKey, useFocusTrap } from './hooks'
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

interface FormFieldMessagesProps {
  id: string
  error?: string
  helpText?: string
  isValueBlocked: boolean
  dateUnavailableError: string
}

function FormFieldMessages({ id, error, helpText, isValueBlocked, dateUnavailableError }: FormFieldMessagesProps) {
  const hasError = error || isValueBlocked

  if (!hasError && helpText) {
    return (
      <p id={`${id}-help`} className={styles.helpText}>
        {helpText}
      </p>
    )
  }

  if (hasError) {
    return (
      <p id={`${id}-error`} className={styles.error} role="alert">
        {error || dateUnavailableError}
      </p>
    )
  }

  return null
}

interface DatePickerDropdownProps {
  dropdownRef: React.RefObject<HTMLDivElement | null>
  selectedDate?: Date
  onSelect: (date: Date | undefined) => void
  disabledDays: Matcher[]
  blockedRanges: DateRange[]
  unavailableLabel: string
}

function DatePickerDropdown({
  dropdownRef,
  selectedDate,
  onSelect,
  disabledDays,
  blockedRanges,
  unavailableLabel,
}: DatePickerDropdownProps) {
  return (
    <div ref={dropdownRef} className={styles.dropdown} role="dialog" aria-label="Choose date">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelect}
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
  )
}

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
  const disabledDays = useMemo(() => {
    if (!isMounted) {return []}

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
      if (!date || !onChange) {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      const formattedDate = format(date, 'yyyy-MM-dd')
      const syntheticEvent = {
        target: {
          name: name || id,
          value: formattedDate,
          type: 'text',
        },
      } as ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
      setIsOpen(false)
      triggerRef.current?.focus()
    },
    [onChange, name, id]
  )

  // Close handlers
  const handleClose = useCallback(() => setIsOpen(false), [])

  useClickOutside(isOpen, containerRef, handleClose)
  useEscapeKey(isOpen, handleClose, triggerRef)
  useFocusTrap(isOpen, dropdownRef)

  // Computed values
  const isValueBlocked = useMemo(() => {
    return isMounted && selectedDate ? isDateBlocked(selectedDate) : false
  }, [isMounted, selectedDate, isDateBlocked])

  const displayValue = useMemo(() => {
    return isMounted && selectedDate ? format(selectedDate, 'MMM d, yyyy') : ''
  }, [isMounted, selectedDate])

  const ariaDescribedBy = useMemo(() => {
    if (error) {return `${id}-error`}
    if (helpText) {return `${id}-help`}
    return undefined
  }, [error, helpText, id])

  const inputClassName = useMemo(() => {
    return hasError || isValueBlocked ? `${styles.input} ${styles.inputError}` : styles.input
  }, [hasError, isValueBlocked])

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
        className={inputClassName}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-invalid={hasError || isValueBlocked}
        aria-describedby={ariaDescribedBy}
      >
        <span className={displayValue ? styles.inputValue : styles.inputPlaceholder}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon />
      </button>

      {isOpen && (
        <DatePickerDropdown
          dropdownRef={dropdownRef}
          selectedDate={selectedDate}
          onSelect={handleSelect}
          disabledDays={disabledDays}
          blockedRanges={blockedRanges}
          unavailableLabel={unavailableLabel}
        />
      )}

      <FormFieldMessages
        id={id}
        error={error}
        helpText={helpText}
        isValueBlocked={isValueBlocked}
        dateUnavailableError={dateUnavailableError}
      />
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
