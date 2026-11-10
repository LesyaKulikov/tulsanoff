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

/** `footer.addresses.*` maps to its branch's Google Maps page. */
const ADDRESS_ROUTES: Record<string, string> = {
  '0': mapsUrl(BRANCHES[0].mapQuery),
  '1': mapsUrl(BRANCHES[1].mapQuery),
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
              data-test-id={`footer-col-${col.key}`}
              {...reveal(fadeUp(i * 0.1, { duration: 0.75, distance: 30 }))}
            >
              <h3 className={styles.columnHeading}>
                <Message id={`footer.${col.key}.heading`} />
              </h3>
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

                  const href = col.kind === 'addresses' ? ADDRESS_ROUTES[n] : CONTACT_ROUTES[n]
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
