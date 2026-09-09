import { Message } from '../../i18n/Message'
import styles from './AboutIntro.module.css'

export function AboutIntro() {
  return (
    <section className={styles.intro} data-test-id="about-intro">
      <div className={styles.card}>
        <div className={styles.brand}>
          <h2 className={styles.title} data-test-id="about-intro-brand">
            <Message id="aboutPage.intro.brand" />
          </h2>
          <p className={styles.tagline} data-test-id="about-intro-tagline">
            <Message id="aboutPage.intro.tagline" />
          </p>
        </div>
        <p className={styles.body} data-test-id="about-intro-body">
          <Message id="aboutPage.intro.body" />
        </p>
      </div>
    </section>
  )
}