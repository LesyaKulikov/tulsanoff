import { Link } from 'react-router-dom'
import { Arrow } from '../Arrow/Arrow'
import { BlinkText } from '../BlinkText/BlinkText'
import { Button } from '../Button/Button'
import { Message } from '../../i18n/Message'
import { ROUTES } from '../../routes'
import styles from './Header.module.css'

const NAV_LINKS = [
  { key: 'link0', to: ROUTES.services },
  { key: 'link1', to: ROUTES.certificates },
  { key: 'link2', to: ROUTES.about },
  { key: 'link3', to: ROUTES.contacts },
] as const

export function Header() {
  return (
    <header className={styles.header} data-test-id="header">
      <nav className={styles.nav} aria-label="main" data-test-id="nav">
        {NAV_LINKS.map((link) => (
          <Link key={link.key} className={styles.navLink} to={link.to} data-test-id={`nav-link-${link.key}`}>
            <BlinkText id={`nav.${link.key}`} />
          </Link>
        ))}
      </nav>

      <div className={styles.center} data-test-id="logo">
        <Link to={ROUTES.home}>
          <img className={styles.logo} src="/images/logo.png" alt="TULSANOFF" />
        </Link>
      </div>

      <div className={styles.right}>
        <button type="button" className={styles.lang} aria-label="Language" data-test-id="lang-toggle">
          <Message id="nav.lang" />
        </button>
        <Button to={ROUTES.contacts} data-test-id="header-cta">
          <Message id="nav.cta" />
          <Arrow />
        </Button>
      </div>
    </header>
  )
}
