import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Header.module.css'

const NAV_LINKS = ['link0', 'link1', 'link2', 'link3'] as const

export function Header() {
  return (
    <header className={styles.header} data-test-id="header">
      <nav className={styles.nav} aria-label="main" data-test-id="nav">
        {NAV_LINKS.map((link) => (
          <a key={link} className={styles.navLink} href="#" data-test-id={`nav-link-${link}`}>
            <Message id={`nav.${link}`} />
          </a>
        ))}
      </nav>

      <div className={styles.center} data-test-id="logo">
        <img className={styles.logo} src="/images/logo.png" alt="TULSANOFF" />
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.lang} aria-label="Language" data-test-id="lang-toggle">
          <Message id="nav.lang" />
        </button>
        <a className={styles.cta} href="#cta" data-test-id="header-cta">
          <Message id="nav.cta" />
          <Arrow />
        </a>
      </div>
    </header>
  )
}
