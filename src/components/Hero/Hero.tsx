import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <img className={styles.background} src="/images/hero.jpg" alt="" />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <span className={styles.chip}>
          <Message id="hero.chip" />
        </span>
        <h1 className={styles.title}>
          <Message id="hero.title" />
        </h1>
        <Button variant="primary" href="#cta">
          <Message id="hero.cta" />
          <Arrow />
        </Button>
      </div>

      <p className={styles.note}>
        <Message id="hero.note" />
      </p>
    </section>
  )
}
