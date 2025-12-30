import type { Metadata } from 'next'
import { ContactForm } from '@/components/client'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateContactPageSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description:
    "Get in touch with MakersBarn. We'd love to hear from you about planning your retreat, workshop, or creative gathering.",
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          generateContactPageSchema(),
          generatePageBreadcrumbs({ name: 'Contact', path: Route.CONTACT }),
        ]}
      />
      <ContactForm />
    </>
  )
}
