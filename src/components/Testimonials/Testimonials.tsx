import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './Testimonials.module.css'

const REVIEWS = [
  { n: '0', src: '/images/avatar-1.png' },
  { n: '1', src: '/images/avatar-2.png' },
  { n: '2', src: '/images/avatar-3.png' },
] as const

function Stars() {
  return (
    <div className={styles.stars} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6L12 2z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className={styles.testimonials} data-test-id="testimonials">
      <motion.h2
        className={styles.heading}
        data-test-id="testimonials-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="testimonials.heading" />
      </motion.h2>

      <div className={styles.row}>
        {REVIEWS.map((review, i) => (
          <motion.article
            key={review.n}
            className={styles.card}
            data-test-id={`review-card-${review.n}`}
            {...reveal(scaleIn(i * 0.1, { from: 0.98, distance: 36, duration: 0.9 }))}
          >
            <img className={styles.avatar} src={review.src} alt="" />
            <div className={styles.meta}>
              <span className={styles.name}>
                <Message id={`testimonials.${review.n}.name`} />
              </span>
              <Stars />
              <p className={styles.body}>
                <Message id={`testimonials.${review.n}.body`} />
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
