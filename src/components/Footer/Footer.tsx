import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Footer.module.css'

const COLS = [
  { key: 'addresses', items: ['0', '1'] },
  { key: 'contacts', items: ['0', '1', '2', '3'] },
  { key: 'nav', items: ['0', '1', '2', '3'] },
] as const

const SOCIALS: { alt: string; src?: string }[] = [
  { alt: 'footer.social.igAlt', src: '/images/social-icon-2.png' },
  { alt: 'footer.social.fbAlt', src: '/images/social-icon-3.png' },
  { alt: 'footer.social.waAlt' },
]

export function Footer() {
  return (
    <footer className={styles.footer} data-test-id="footer">
      <div className={styles.columns}>
        {COLS.map((col) => (
          <nav key={col.key} data-test-id={`footer-col-${col.key}`}>
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
          </nav>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.socials}>
          {SOCIALS.map((social, i) => (
            <a
              key={i}
              className={styles.social}
              href="#"
              aria-label={social.alt}
              data-test-id={`footer-social-${i}`}
            >
              {social.src ? (
                <img src={social.src} alt="" />
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2c-3 0-5.5 2.2-5.5 5.2 0 1.2.4 2.3 1 3.3L4 20.5h4l1-3h6l1 3h4l-3.5-10c.6-1 1-2.2 1-3.3C17.5 4.2 15 2 12 2z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </a>
          ))}
        </div>

        <a className={styles.bookBtn} href="#cta" data-test-id="footer-book">
          <Message id="footer.cta" />
          <Arrow />
        </a>
      </div>
    </footer>
  )
}
