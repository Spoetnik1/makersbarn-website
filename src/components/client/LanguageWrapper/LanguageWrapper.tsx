'use client'

import { type ReactNode } from 'react'
import { LanguageProvider } from '@/context'
import { Language } from '@/types'

interface LanguageWrapperProps {
  children: ReactNode
  initialLanguage: Language
}

/**
 * Client wrapper component for LanguageProvider
 * Used in layout.tsx to wrap the app with language context
 */
export function LanguageWrapper({ children, initialLanguage }: LanguageWrapperProps) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {children}
    </LanguageProvider>
  )
}
