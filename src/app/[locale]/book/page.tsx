import { redirect } from 'next/navigation'

import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { Route, ContactIntent } from '@/types'

interface BookPageProps {
  params: Promise<{ locale: string }>
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)
  const contactPath = getLocalizedPath(Route.CONTACT, validLocale)

  redirect(`${contactPath}#${ContactIntent.BOOKING}`)
}
