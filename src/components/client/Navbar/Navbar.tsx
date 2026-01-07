'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { GB as EN, NL } from 'country-flag-icons/react/3x2'
import { LANGUAGE_OPTIONS } from '@/constants'
import { IMAGES } from '@/data'
import { Language, Route } from '@/types'
import { useLanguage, useTranslation } from '@/context'
import { getLocalizedPath, replaceLocaleInPath, getLocaleFromPath } from '@/lib/routing'
import styles from './Navbar.module.css'

const FLAG_MAP = {
  [Language.EN]: EN,
  [Language.NL]: NL,
} as const

const FLAG_TITLES = {
  [Language.EN]: 'United Kingdom',
  [Language.NL]: 'Netherlands',
} as const

/**
 * Navigation links with route paths (excluding Contact which is now a CTA)
 * Labels are retrieved from translations
 */
const NAV_ROUTES = [
  { href: Route.HOME, key: 'home' as const },
  { href: Route.ABOUT, key: 'about' as const },
  { href: Route.FACILITIES, key: 'facilities' as const },
  { href: Route.EXPERIENCES, key: 'experiences' as const },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { language } = useLanguage()
  const { t: nav } = useTranslation('nav')
  const { t: common } = useTranslation('common')

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageDropdownOpen((prev) => !prev)
  }, [])

  const router = useRouter()

  const handleLanguageSelect = useCallback((lang: Language) => {
    // Navigate to the same page but with the new locale
    const newPath = replaceLocaleInPath(pathname, lang)
    router.push(newPath)
    setIsLanguageDropdownOpen(false)
  }, [pathname, router])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get current locale from pathname
  const currentLocale = getLocaleFromPath(pathname) || language

  // Check if a route is active (accounting for locale prefix)
  const isActive = (path: string) => {
    const localizedPath = getLocalizedPath(path, currentLocale)
    return pathname === localizedPath || pathname === path
  }

  const CurrentFlag = FLAG_MAP[currentLocale]

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href={getLocalizedPath('/', currentLocale)} className={styles.logo} onClick={closeMenu}>
          <Image
            src={IMAGES.logo}
            alt={common.logoAlt}
            width={100}
            height={50}
            className={styles.logoImg}
            priority
          />
        </Link>

        <div className={`${styles.center} ${isMenuOpen ? styles.centerActive : ''}`}>
          <ul className={styles.menu}>
            {NAV_ROUTES.map((route) => (
              <li key={route.href} className={styles.item}>
                <Link
                  href={getLocalizedPath(route.href, currentLocale)}
                  className={`${styles.link} ${isActive(route.href) ? styles.linkActive : ''}`}
                  onClick={closeMenu}
                >
                  {nav[route.key]}
                </Link>
              </li>
            ))}
            <li className={styles.item}>
              <Link
                href={getLocalizedPath(Route.CONTACT, currentLocale)}
                className={`${styles.link} ${styles.ctaButtonMobile} ${isActive(Route.CONTACT) ? styles.linkActive : ''}`}
                onClick={closeMenu}
              >
                {nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <Link
            href={getLocalizedPath(Route.CONTACT, currentLocale)}
            className={styles.ctaButton}
            onClick={closeMenu}
          >
            {nav.contact}
          </Link>
          <div className={styles.languageWrapper} ref={languageDropdownRef}>
            <button
              className={styles.languageBtn}
              onClick={toggleLanguageDropdown}
              aria-label={common.selectLanguage}
              aria-expanded={isLanguageDropdownOpen}
            >
              <span className={styles.languageFlag}>
                <CurrentFlag title={FLAG_TITLES[currentLocale]} className={styles.flagIcon} />
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className={styles.dropdown}>
                {LANGUAGE_OPTIONS.map((option) => {
                  const FlagComponent = FLAG_MAP[option.code]
                  return (
                    <button
                      key={option.code}
                      className={`${styles.option} ${currentLocale === option.code ? styles.optionActive : ''}`}
                      onClick={() => handleLanguageSelect(option.code)}
                    >
                      <span className={styles.optionFlag}>
                        <FlagComponent
                          title={option.title}
                          className={styles.flagIcon}
                        />
                      </span>
                      <span className={styles.optionText}>{option.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <button
            className={`${styles.toggle} ${isMenuOpen ? styles.toggleActive : ''}`}
            onClick={toggleMenu}
            aria-label={common.toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  )
}
