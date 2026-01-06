import type { Metadata } from 'next'
import { ContactForm } from '@/components/client'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateContactPageSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { getServerTranslations } from '@/i18n'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)
  
  return generatePageMetadata({
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    path: '/contact',
    locale: validLocale,
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  
  return (
    <>
      <StructuredData
        data={[
          generateContactPageSchema(),
          generatePageBreadcrumbs({ name: 'Contact', path: getLocalizedPath(Route.CONTACT, validLocale) }),
        ]}
      />
      <ContactForm />
    </>
  )
}

