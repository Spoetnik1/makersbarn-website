import type { Metadata } from 'next'
import { BookingFormLoader } from '@/components/client/BookingForm'
import { StructuredData } from '@/components/server'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBookingPageSchema, generatePageBreadcrumbs } from '@/lib/structuredData'
import { Route } from '@/types'
import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { getServerTranslations } from '@/i18n'

interface BookPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const t = await getServerTranslations(validLocale)

  return generatePageMetadata({
    title: t.booking.metaTitle,
    description: t.booking.metaDescription,
    path: '/book',
    locale: validLocale,
  })
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)

  return (
    <>
      <StructuredData
        data={[
          generateBookingPageSchema(),
          generatePageBreadcrumbs({ name: 'Book', path: getLocalizedPath(Route.BOOK, validLocale) }),
        ]}
      />
      <BookingFormLoader />
    </>
  )
}
