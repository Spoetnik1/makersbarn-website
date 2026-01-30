'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Route } from '@/types'
import { createLogger } from '@/lib'

import styles from './error.module.css'

const logger = createLogger('error-boundary')

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error('Unhandled error in error boundary', {
      name: error.name,
      message: error.message,
      digest: error.digest,
    })
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
