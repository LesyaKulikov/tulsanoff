import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Footer.module.css'

const COLS = ['col1', 'col2', 'col3'] as const
const LINK_IDS = ['0', '1', '2', '3'] as const

const SOCIALS: { alt: string; src?: string }[] = [
  { alt: 'footer.social.igAlt', src: '/images/social-icon-2.png' },
  { alt: 'footer.social.fbAlt', src: '/images/social-icon-3.png' },
  { alt: 'footer.social.waAlt' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        {COLS.map((col) => (
          <nav key={col}>
            <h3 className={styles.columnHeading}>
              <Message id={`footer.${col}.heading`} />
            </h3>
            <ul className={styles.linkList}>
              {LINK_IDS.map((n) => (
                <li key={n} className={styles.link}>
                  <Message id={`footer.${col}.${n}`} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.socials}>
          {SOCIALS.map((social, i) => (
            <a key={i} className={styles.social} href="#" aria-label={social.alt}>
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

        <Button variant="primary">
          <Message id="footer.cta" />
          <Arrow />
        </Button>
      </div>
    </footer>
  )
}
