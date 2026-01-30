import { redirect } from 'next/navigation'

import { getValidLocale } from '@/lib/locale'
import { getLocalizedPath } from '@/lib/routing'
import { Route } from '@/types'

interface SurroundingsPageProps {
  params: Promise<{ locale: string }>
}

export default async function SurroundingsPage({ params }: SurroundingsPageProps) {
  const { locale } = await params
  const validLocale = getValidLocale(locale)

  redirect(getLocalizedPath(Route.ABOUT, validLocale))
}
