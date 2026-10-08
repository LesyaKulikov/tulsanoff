import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BlinkText } from '../BlinkText/BlinkText'
import { CtaButton } from '../CtaButton/CtaButton'
import { Message } from '../../i18n/Message'
import { ROUTES } from '../../routes'
import { enter, fadeUp } from '../../animation/variants'
import styles from './Header.module.css'

const NAV_LINKS = [
  { key: 'link0', to: ROUTES.services },
  { key: 'link1', to: ROUTES.certificates },
  { key: 'link2', to: ROUTES.about },
  { key: 'link3', to: ROUTES.contacts },
] as const

export function Header() {
  return (
    <motion.header
      className={styles.header}
      data-test-id="header"
      {...enter(fadeUp(0, { duration: 0.7, distance: -24 }))}
    >
      <nav className={styles.nav} aria-label="main" data-test-id="nav">
        {NAV_LINKS.map((link, i) => (
          <motion.div key={link.key} {...enter(fadeUp(0.18 + i * 0.07, { duration: 0.6, distance: -12 }))}>
            <Link className={styles.navLink} to={link.to} data-test-id={`nav-link-${link.key}`}>
              <BlinkText id={`nav.${link.key}`} />
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className={styles.center} data-test-id="logo">
        <Link to={ROUTES.home}>
          <motion.img
            className={styles.logo}
            src="/images/logo.png"
            alt="TULSANOFF"
            {...enter(fadeUp(0.1, { duration: 0.7, distance: -12 }))}
          />
        </Link>
      </div>

      <motion.div className={styles.right} {...enter(fadeUp(0.34, { duration: 0.6, distance: -12 }))}>
        <button type="button" className={styles.lang} aria-label="Language" data-test-id="lang-toggle">
          <Message id="nav.lang" />
        </button>
        <CtaButton testId="header-cta" />
      </motion.div>
    </motion.header>
  )
}
