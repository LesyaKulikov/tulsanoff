import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.hero} data-test-id="about-hero">
      {/* Purely decorative band → no alt text. The page still needs a real h1,
          so the heading lives here, visually hidden, without changing the
          mockup's visuals. */}
      <h1 className="srOnly">
        <Message id="about.heading" />
      </h1>

      <motion.div className={styles.band} {...reveal(fadeUp(0, { duration: 0.9, distance: 24 }))}>
        <img
          className={styles.photo}
          src=`${import.meta.env.BASE_URL}images/about-hero-strip.jpg`"
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>
    </section>
  )
}
