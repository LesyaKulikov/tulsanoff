import { useState } from 'react'
import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import styles from './Services.module.css'

const CATS = ['cat0', 'cat1', 'cat2'] as const
const CARDS = [
  { n: '0', src: '/images/gallery-1.jpg' },
  { n: '1', src: '/images/gallery-2.jpg' },
  { n: '2', src: '/images/gallery-3.jpg' },
] as const

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section className={styles.services} data-test-id="services">
      <h2 className={styles.heading} data-test-id="services-heading">
        <Message id="services.heading" />
      </h2>

      <div className={styles.categories} data-test-id="services-categories">
        {CATS.map((cat, i) => (
          <button
            type="button"
            key={cat}
            className={i === active ? styles.categoryActive : styles.category}
            data-test-id={`services-category-${i}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <Message id={`services.${cat}`} />
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {CARDS.map((card) => (
          <a key={card.n} href="#" className={styles.card} data-test-id={`service-card-${card.n}`}>
            <img className={styles.photo} src={card.src} alt="" />
            <span className={styles.overlay} />
            <span className={styles.labelBar}>
              <span className={styles.label}>
                <Message id={`services.${card.n}.label`} />
              </span>
              <span className={styles.arrow}>
                <Arrow style={{ width: 28, height: 28 }} />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}