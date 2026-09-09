import { Message } from '../../i18n/Message'
import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.hero} data-test-id="about-hero">
      <img className={styles.image} src="/images/spa-bleed.png" alt="" />

      <div className={styles.content}>
        <span className={styles.chip} data-test-id="about-hero-chip">
          <Message id="aboutPage.studio.chip" />
        </span>
        <h2 className={styles.heading} data-test-id="about-hero-heading">
          <Message id="aboutPage.studio.heading" />
        </h2>
      </div>
    </section>
  )
}