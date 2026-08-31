import { Message } from '../../i18n/Message'
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
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
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
      <h2 className={styles.heading} data-test-id="testimonials-heading">
        <Message id="testimonials.heading" />
      </h2>

      <div className={styles.row}>
        {REVIEWS.map((review) => (
          <article key={review.n} className={styles.card} data-test-id={`review-card-${review.n}`}>
            <div className={styles.top}>
              <img className={styles.avatar} src={review.src} alt="" />
              <span className={styles.name}>
                <Message id={`testimonials.${review.n}.name`} />
              </span>
            </div>
            <Stars />
            <p className={styles.body}>
              <Message id={`testimonials.${review.n}.body`} />
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
