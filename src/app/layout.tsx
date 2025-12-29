import type { Metadata } from 'next'
import { Playfair_Display, Quicksand } from 'next/font/google'
import { Navbar } from '@/components/client'
import { Footer } from '@/components/server'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${quicksand.variable}`}>
      <body>
        <div className="layout">
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
