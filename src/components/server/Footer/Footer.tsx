import {
  FOOTER_EMAIL,
  FOOTER_ADDRESS,
  FOOTER_TAGLINE,
  SOCIAL_LINKS,
} from '@/constants/footer'
import { SocialPlatform } from '@/types'
import { InstagramIcon, FacebookIcon, LinkedInIcon } from './SocialIcons'
import styles from './Footer.module.css'

const ICON_MAP: Record<SocialPlatform, React.ComponentType> = {
  [SocialPlatform.INSTAGRAM]: InstagramIcon,
  [SocialPlatform.FACEBOOK]: FacebookIcon,
  [SocialPlatform.LINKEDIN]: LinkedInIcon,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.heading}>Get in Touch</h3>
            <p className={styles.email}>
              <a href={`mailto:${FOOTER_EMAIL}`}>{FOOTER_EMAIL}</a>
            </p>
            <p className={styles.address}>
              {FOOTER_ADDRESS.street}
              <br />
              {FOOTER_ADDRESS.postalCode} {FOOTER_ADDRESS.city}
              <br />
              {FOOTER_ADDRESS.country}
            </p>
          </div>

          <div className={`${styles.section} ${styles.sectionCenter}`}>
            <p className={styles.tagline}>{FOOTER_TAGLINE}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Follow Us</h3>
            <div className={styles.social}>
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.platform]
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={link.ariaLabel}
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Maker&apos;s Barn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
