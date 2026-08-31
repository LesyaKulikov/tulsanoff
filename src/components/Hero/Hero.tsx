import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} data-test-id="hero">
      <img className={styles.background} src="/images/hero.jpg" alt="" />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.chip} data-test-id="hero-chip">
            <Message id="hero.chip" />
          </span>
          <h1 className={styles.title} data-test-id="hero-title">
            <Message id="hero.title" />
          </h1>
        </div>

        <div className={styles.right}>
          <Button variant="primary" href="#cta" data-test-id="hero-cta">
            <Message id="hero.cta" />
            <Arrow />
          </Button>
          <p className={styles.note} data-test-id="hero-note">
            <Message id="hero.note" />
          </p>
        </div>
      </div>
    </section>
  )
}