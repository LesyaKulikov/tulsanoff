import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { CtaButton } from '../CtaButton/CtaButton'
import { Message } from '../../i18n/Message'
import { resolveMessage, type LocaleKey } from '../../i18n/messages'
import { ROUTES } from '../../routes'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Footer.module.css'

const FOOTER_ROUTES = [ROUTES.services, ROUTES.certificates, ROUTES.about, ROUTES.contacts] as const

const COLS = [
  { key: 'addresses', items: ['0', '1'] },
  { key: 'contacts', items: ['0', '1', '2', '3'] },
  { key: 'nav', items: ['0', '1', '2', '3'] },
] as const

const SOCIALS: { alt: string; href?: string; icon: ReactNode }[] = [
  {
    alt: 'footer.social.tgAlt',
    href: 'https://t.me/tulsanoff_massage_studio',
    icon: (
      <svg width="28" height="32" viewBox="0 0 448 512" fill="none" aria-hidden="true">
        <path
          d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    alt: 'footer.social.igAlt',
    href: 'https://www.instagram.com/tulsanoff_massage?stkn=MTZ0YWk5cjNqOGgzeg==',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 1H16.5A6.5 6.5 0 0 1 23 7.5V16.5A6.5 6.5 0 0 1 16.5 23H7.5A6.5 6.5 0 0 1 1 16.5V7.5A6.5 6.5 0 0 1 7.5 1ZM12 7.1A4.9 4.9 0 1 0 12 16.9A4.9 4.9 0 1 0 12 7.1ZM12 8.65A3.35 3.35 0 1 0 12 15.35A3.35 3.35 0 1 0 12 8.65ZM17.2 5.4A1.4 1.4 0 1 0 17.2 8.2A1.4 1.4 0 1 0 17.2 5.4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    alt: 'footer.social.fbAlt',
    icon: (
      <svg width="16" height="26" viewBox="0 0 320 512" fill="none" aria-hidden="true">
        <path
          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

export function Footer() {
  const intl = useIntl()

  return (
    <footer className={styles.footer} data-test-id="footer">
      <div className={styles.columns}>
        {COLS.map((col, i) =>
          col.key === 'nav' ? (
            <motion.nav
              key={col.key}
              data-test-id={`footer-col-${col.key}`}
              {...reveal(fadeUp(i * 0.1, { duration: 0.75, distance: 30 }))}
            >
              <h3 className={styles.columnHeading}>
                <Message id={`footer.${col.key}.heading`} />
              </h3>
              <ul className={styles.linkList}>
                {col.items.map((n, j) => (
                  <li key={n} className={styles.link} data-test-id={`footer-${col.key}-${n}`}>
                    <Link to={FOOTER_ROUTES[j]}>
                      <Message id={`footer.${col.key}.${n}`} />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : (
            <motion.nav
              key={col.key}
              data-test-id={`footer-col-${col.key}`}
              {...reveal(fadeUp(i * 0.1, { duration: 0.75, distance: 30 }))}
            >
              <h3 className={styles.columnHeading}>
                <Message id={`footer.${col.key}.heading`} />
              </h3>
              <ul className={styles.linkList}>
                {col.items.map((n) => (
                  <li key={n} className={styles.link} data-test-id={`footer-${col.key}-${n}`}>
                    <Message id={`footer.${col.key}.${n}`} />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ),
        )}
      </div>

      <motion.div className={styles.bottom} {...reveal(fadeUp(0.3, { duration: 0.75, distance: 30 }))}>
        <div className={styles.socials}>
          {SOCIALS.map((social, i) => {
            const label = resolveMessage(social.alt, intl.locale as LocaleKey) ?? social.alt
            const props = {
              className: styles.social,
              'aria-label': label,
              'data-test-id': `footer-social-${i}`,
            }
            return social.href ? (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" {...props}>
                {social.icon}
              </a>
            ) : (
              <Link key={i} to={ROUTES.home} {...props}>
                {social.icon}
              </Link>
            )
          })}
        </div>

          <CtaButton messageId="footer.cta" testId="footer-book" />
        </motion.div>
      </footer>
  )
}
