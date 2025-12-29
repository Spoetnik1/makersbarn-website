import type { Metadata } from 'next'
import { ContactForm } from '@/components/client'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    "Get in touch with MakersBarn. We'd love to hear from you about planning your retreat, workshop, or creative gathering.",
  path: '/contact',
})

export default function ContactPage() {
  return <ContactForm />
}
