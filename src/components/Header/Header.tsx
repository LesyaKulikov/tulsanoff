import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Header.module.css'

const NAV_LINKS = ['link0', 'link1', 'link2', 'link3'] as const

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="main">
        {NAV_LINKS.map((link) => (
          <a key={link} className={styles.navLink} href="#">
            <Message id={`nav.${link}`} />
          </a>
        ))}
      </nav>

      <div className={styles.center}>
        <img className={styles.logo} src="/images/logo.png" alt="TULSANOFF" />
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.lang} aria-label="Language">
          <Message id="nav.lang" />
        </button>
        <a className={styles.cta} href="#cta">
          <Message id="nav.cta" />
          <Arrow />
        </a>
      </div>
    </header>
  )
}
