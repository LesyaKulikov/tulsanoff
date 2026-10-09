import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.hero} data-test-id="about-hero">
      <img className={styles.image} src="/images/about-hero.webp" alt="" />

      <div className={styles.content}>
        <motion.span
          className={styles.chip}
          data-test-id="about-hero-chip"
          {...reveal(fadeUp(0.05, { duration: 0.7, distance: 24 }))}
        >
          <Message id="aboutPage.studio.chip" />
        </motion.span>
        <motion.h2
          className={styles.heading}
          data-test-id="about-hero-heading"
          {...reveal(fadeUp(0.15, { duration: 0.85, distance: 36 }))}
        >
          <Message id="aboutPage.studio.heading" />
        </motion.h2>
      </div>
    </section>
  )
}
