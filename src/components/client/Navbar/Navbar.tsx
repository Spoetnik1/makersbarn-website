'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { GB as EN, NL } from 'country-flag-icons/react/3x2'
import { LANGUAGE_OPTIONS } from '@/constants'
import { IMAGES } from '@/data'
import { Language, Route } from '@/types'
import { useLanguage, useTranslation } from '@/context'
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
 * Navigation links with route paths
 * Labels are retrieved from translations
 */
const NAV_ROUTES = [
  { href: Route.HOME, key: 'home' as const },
  { href: Route.ABOUT, key: 'about' as const },
  { href: Route.FACILITIES, key: 'facilities' as const },
  { href: Route.CONTACT, key: 'contact' as const },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { language, setLanguage } = useLanguage()
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

  const handleLanguageSelect = useCallback((lang: Language) => {
    setLanguage(lang)
    setIsLanguageDropdownOpen(false)
  }, [setLanguage])

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

  const isActive = (path: string) => pathname === path

  const CurrentFlag = FLAG_MAP[language]

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src={IMAGES.logo}
            alt={common.logoAlt}
            width={100}
            height={50}
            className={styles.logoImg}
            priority
          />
        </Link>

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

        <div className={`${styles.center} ${isMenuOpen ? styles.centerActive : ''}`}>
          <ul className={styles.menu}>
            {NAV_ROUTES.map((route) => (
              <li key={route.href} className={styles.item}>
                <Link
                  href={route.href}
                  className={`${styles.link} ${isActive(route.href) ? styles.linkActive : ''}`}
                  onClick={closeMenu}
                >
                  {nav[route.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.languageWrapper} ref={languageDropdownRef}>
            <button
              className={styles.languageBtn}
              onClick={toggleLanguageDropdown}
              aria-label={common.selectLanguage}
              aria-expanded={isLanguageDropdownOpen}
            >
              <span className={styles.languageFlag}>
                <CurrentFlag title={FLAG_TITLES[language]} className={styles.flagIcon} />
              </span>
            </button>

            {isLanguageDropdownOpen && (
              <div className={styles.dropdown}>
                {LANGUAGE_OPTIONS.map((option) => {
                  const FlagComponent = FLAG_MAP[option.code]
                  return (
                    <button
                      key={option.code}
                      className={`${styles.option} ${language === option.code ? styles.optionActive : ''}`}
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
        </div>
      </div>
    </nav>
  )
}
