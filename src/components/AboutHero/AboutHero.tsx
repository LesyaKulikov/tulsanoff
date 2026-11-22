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
        {/* Below 720px the band becomes a looping marquee (shorter, scrolling
            sideways) so all three scenes pass by; the duplicate copy makes the
            wrap seamless. It reuses the same URL, so it is one fetch, and it is
            display:none on desktop. */}
        <div className={styles.track}>
          <img
            className={styles.photo}
            src={`${import.meta.env.BASE_URL}images/about-hero-strip.jpg`}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
          />
          <img
            className={`${styles.photo} ${styles.clone}`}
            src={`${import.meta.env.BASE_URL}images/about-hero-strip.jpg`}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        </div>
      </motion.div>
    </section>
  )
}
