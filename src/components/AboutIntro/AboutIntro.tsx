import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './AboutIntro.module.css'

export function AboutIntro() {
  return (
    <section className={styles.intro} data-test-id="about-intro">
      <motion.div className={styles.card} {...reveal(scaleIn(0, { from: 0.98, distance: 40, duration: 0.9 }))}>
        <div className={styles.brand}>
          <h2 className={styles.title} data-test-id="about-intro-brand">
            <Message id="aboutPage.intro.brand" />
          </h2>
          <p className={styles.tagline} data-test-id="about-intro-tagline">
            <Message id="aboutPage.intro.tagline" />
          </p>
        </div>
        <motion.p
          className={styles.body}
          data-test-id="about-intro-body"
          {...reveal(fadeUp(0.2, { duration: 0.8, distance: 28 }))}
        >
          <Message id="aboutPage.intro.body" />
        </motion.p>
      </motion.div>
    </section>
  )
}
