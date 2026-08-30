import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Message id="nav.note" />
      </div>

      <div className={styles.center}>
        <img className={styles.logo} src="/images/logo.png" alt="TULSANOFF" />
      </div>

      <div className={styles.right}>
        <span className={styles.pill}>
          <Message id="nav.pill" />
        </span>
        <Button variant="primary" href="#cta">
          <Message id="nav.cta" />
          <Arrow />
        </Button>
      </div>
    </header>
  )
}
