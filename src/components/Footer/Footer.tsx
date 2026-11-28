import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CtaButton } from '../CtaButton/CtaButton'
import { Message } from '../../i18n/Message'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { FOOTER_SOCIAL_LINKS } from '../../contacts'
import { EMAIL, PHONES, BRANCHES, mapsUrl } from '../../contacts'
import { ROUTES } from '../../routes'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Footer.module.css'

const FOOTER_ROUTES = [ROUTES.services, ROUTES.certificates, ROUTES.about, ROUTES.contacts] as const
const LEGAL_LINKS = [
  { key: 'privacy', to: ROUTES.privacy },
  { key: 'terms', to: ROUTES.terms },
  { key: 'accessibility', to: ROUTES.accessibility },
] as const

type Column = { key: string; kind: 'nav' | 'addresses' | 'contacts'; items: readonly string[] }

const COLS: readonly Column[] = [
  { key: 'addresses', kind: 'addresses', items: ['0', '1'] },
  { key: 'contacts', kind: 'contacts', items: ['0', '1', '2', '3'] },
  { key: 'nav', kind: 'nav', items: ['0', '1', '2', '3'] },
]

/** `footer.contacts.*` is laid out as label, phone, phone, email. */
const CONTACT_ROUTES: Record<string, string> = {
  '1': `tel:${PHONES[0].href}`,
  '2': `tel:${PHONES[1].href}`,
  '3': `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`,
}

export function Footer() {
  return (
    <footer className={styles.footer} data-test-id="footer">
      <div className={styles.columns}>
        {COLS.map((col, i) => {
          // Only the link column is navigation; addresses and phone numbers are
          // content, and marking them as `nav` landmarks gives screen readers a
          // list of three unnamed navigations.
          const Wrapper = col.kind === 'nav' ? motion.nav : motion.div
          return (
            <Wrapper
              key={col.key}
              aria-labelledby={col.kind === 'nav' ? 'footer-nav-heading' : undefined}
              data-test-id={`footer-col-${col.key}`}
              {...reveal(fadeUp(i * 0.1, { duration: 0.75, distance: 30 }))}
            >
              <h2
                id={col.kind === 'nav' ? 'footer-nav-heading' : undefined}
                className={styles.columnHeading}
              >
                <Message id={`footer.${col.key}.heading`} />
              </h2>
              <ul className={styles.linkList}>
                {col.items.map((n, j) => {
                  const id = `footer.${col.key}.${n}`

                  // Router links, external/tel:/mailto: links and plain text are
                  // three different things and must not share an element type —
                  // rendering a route through <a href> would full-page-reload.
                  if (col.kind === 'nav') {
                    return (
                      <li key={n} className={styles.item} data-test-id={`footer-${col.key}-${n}`}>
                        <Link to={FOOTER_ROUTES[j]} className={styles.link}>
                          <Message id={id} />
                        </Link>
                      </li>
                    )
                  }

                  const addressBranch =
                    col.kind === 'addresses' ? BRANCHES.find((branch) => branch.addressId === id) : undefined
                  const href =
                    col.kind === 'addresses'
                      ? addressBranch
                        ? mapsUrl(addressBranch.mapQuery)
                        : undefined
                      : CONTACT_ROUTES[n]
                  if (href) {
                    const isPhone = col.kind === 'contacts' && (n === '1' || n === '2')
                    return (
                      <li key={n} className={styles.item} data-test-id={`footer-${col.key}-${n}`}>
                        <a href={href} className={styles.link} dir={isPhone ? 'ltr' : undefined}>
                          <Message id={id} />
                        </a>
                      </li>
                    )
                  }

                  return (
                    <li key={n} className={styles.item} data-test-id={`footer-${col.key}-${n}`}>
                      <Message id={id} />
                    </li>
                  )
                })}
              </ul>
            </Wrapper>
          )
        })}
      </div>

      <div className={styles.legalNotice} data-test-id="footer-legal">
        <p className={styles.disclaimer}>
          <Message id="footer.disclaimer" />
        </p>
        <nav className={styles.legalNav} aria-labelledby="footer-legal-heading">
          <h2 id="footer-legal-heading" className="srOnly">
            <Message id="footer.legal.heading" />
          </h2>
          {LEGAL_LINKS.map(({ key, to }) => (
            <Link
              key={key}
              className={styles.legalLink}
              to={to}
              data-test-id={`footer-legal-${key}`}
            >
              <Message id={`footer.legal.${key}`} />
            </Link>
          ))}
        </nav>
      </div>

      <motion.div className={styles.bottom} {...reveal(fadeUp(0.3, { duration: 0.75, distance: 30 }))}>
        <div className={styles.socials}>
          <SocialLinks
            links={FOOTER_SOCIAL_LINKS}
            className={styles.social}
            testIdPrefix="footer-social"
          />
        </div>

        <CtaButton messageId="footer.cta" testId="footer-book" />
      </motion.div>
    </footer>
  )
}
