import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './AboutHero.module.css'

const STRIP_COPIES = 3

export function AboutHero() {
  const stripSrc = `${import.meta.env.BASE_URL}images/about-hero-strip.jpg`

  return (
    <section className={styles.hero} data-test-id="about-hero">
      {/* Purely decorative band → no alt text. The page still needs a real h1,
          so the heading lives here, visually hidden, without changing the
          mockup's visuals. */}
      <h1 className="srOnly">
        <Message id="about.heading" />
      </h1>

      <motion.div className={styles.band} {...reveal(fadeUp(0, { duration: 0.9, distance: 24 }))}>
        <div className={styles.track}>
          {Array.from({ length: STRIP_COPIES }, (_, index) => (
            <img
              key={index}
              className={styles.photo}
              src={stripSrc}
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : undefined}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
