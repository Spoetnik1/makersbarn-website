import type { Metadata } from 'next'
import { Playfair_Display, Quicksand } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { baseMetadata } from '@/lib/metadata'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})

export const metadata: Metadata = baseMetadata

/**
 * Root layout - minimal wrapper for the entire application
 * 
 * This layout handles the basic HTML structure only.
 * Locale-specific logic (language detection, lang attribute, etc.) 
 * is handled in [locale]/layout.tsx
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${quicksand.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
