'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Route } from '@/types'
import styles from './error.module.css'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.description}>
        We apologize for the inconvenience. Please try again or return to the homepage.
      </p>
      <div className={styles.actions}>
        <button onClick={reset} className={styles.button}>
          Try again
        </button>
        <Link href={Route.HOME} className={styles.link}>
          Return Home
        </Link>
      </div>
    </div>
  )
}
