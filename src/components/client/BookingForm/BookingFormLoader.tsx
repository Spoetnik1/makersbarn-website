'use client'

import dynamic from 'next/dynamic'
import { BookingFormSkeleton } from './BookingFormSkeleton'

/**
 * Client-side loader for BookingForm with SSR disabled
 *
 * This prevents hydration mismatch errors caused by browser extensions
 * (e.g., LastPass, 1Password) that inject DOM elements into form fields.
 * When hydration fails, React regenerates the component tree on the client,
 * which resets all form state and causes user input to disappear.
 *
 * By using ssr: false, the form only renders on the client side,
 * eliminating the hydration step entirely.
 */
const BookingForm = dynamic(
  () => import('./BookingForm').then((mod) => mod.BookingForm),
  {
    ssr: false,
    loading: () => <BookingFormSkeleton />,
  }
)

export function BookingFormLoader() {
  return <BookingForm />
}
