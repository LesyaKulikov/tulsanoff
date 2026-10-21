import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { BlinkText } from '../BlinkText/BlinkText'
import { CtaButton } from '../CtaButton/CtaButton'
import { Message } from '../../i18n/Message'
import { useLocale } from '../../i18n/localeContext'
import { nextLocale, switcherLabel } from '../../i18n/messages'
import { ROUTES } from '../../routes'
import { enter, fadeUp, EASE } from '../../animation/variants'
import styles from './Header.module.css'

const NAV_LINKS = [
  { key: 'link0', to: ROUTES.services },
  { key: 'link1', to: ROUTES.certificates },
  { key: 'link2', to: ROUTES.about },
  { key: 'link3', to: ROUTES.contacts },
] as const

export function Header() {
  const { locale, toggleLocale } = useLocale()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastPath, setLastPath] = useState(location.pathname)

  // Entrance delays would otherwise leave the nav invisible for ~1s for users
  // who have asked their OS to reduce motion.
  const reduce = useReducedMotion()
  const delay = (d: number) => (reduce ? 0 : d)
  const target = nextLocale(locale)

  // Navigating from the open panel must close it, otherwise the user lands on
  // the new page with the menu still covering it. Adjusted during render (the
  // React-sanctioned alternative to a setState-in-effect) so the menu closes
  // in the same pass as the navigation.
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMenuOpen(false)
  }

  return (
    <motion.header
      className={styles.header}
      data-test-id="header"
      {...enter(fadeUp(0, { duration: 0.7, distance: -24 }))}
    >
      <nav className={styles.nav} aria-label="primary" data-test-id="nav">
        {NAV_LINKS.map((link, i) => (
          <motion.div key={link.key} {...enter(fadeUp(delay(0.18 + i * 0.07), { duration: 0.6, distance: -12 }))}>
            <NavLink
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
              to={link.to}
              data-test-id={`nav-link-${link.key}`}
            >
              <BlinkText id={`nav.${link.key}`} />
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className={styles.center} data-test-id="logo">
        <NavLink to={ROUTES.home} end aria-label="TULSANOFF">
          <motion.img
            className={styles.logo}
            src="/images/logo.png"
            alt="TULSANOFF"
            {...enter(fadeUp(delay(0.1), { duration: 0.7, distance: -12 }))}
          />
        </NavLink>
      </div>

      <motion.div className={styles.right} {...enter(fadeUp(delay(0.34), { duration: 0.6, distance: -12 }))}>
        <button
          type="button"
          className={styles.lang}
          onClick={toggleLocale}
          lang={target === 'he-IL' ? 'he' : 'ru'}
          data-test-id="lang-toggle"
        >
          <span aria-hidden="true">{switcherLabel(target)}</span>
          <span className="srOnly">
            <Message id="nav.langLabel" />
          </span>
        </button>

        <span className={styles.cta}>
          <CtaButton testId="header-cta" />
        </span>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          data-test-id="menu-toggle"
        >
          <span className="srOnly">
            <Message id="nav.menuLabel" />
          </span>
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className={styles.menu}
            aria-label="primary"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
            data-test-id="mobile-menu"
          >
            <ul className={styles.menuList}>
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `${styles.menuLink} ${styles.menuLinkActive}` : styles.menuLink
                    }
                    to={link.to}
                    data-test-id={`mobile-nav-link-${link.key}`}
                  >
                    <Message id={`nav.${link.key}`} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
