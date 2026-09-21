import { useState } from 'react'
import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import { massageRoute } from '../../routes'
import styles from './Services.module.css'

const CATS = ['cat0', 'cat1', 'cat2'] as const

const CARDS: ReadonlyArray<ReadonlyArray<{ n: number; src: string; slug: string }>> = [
  [
    { n: 0, src: '/images/gallery-1.jpg', slug: 'meditsinskiy' },
    { n: 1, src: '/images/gallery-2.jpg', slug: 'limfaticheskiy' },
    { n: 2, src: '/images/gallery-3.jpg', slug: 'sport' },
  ],
  [
    { n: 3, src: '/images/big-card-a.jpg', slug: 'massazh-litsa' },
    { n: 4, src: '/images/hero.jpg', slug: 'relaks' },
    { n: 5, src: '/images/video-frame.jpg', slug: 'shvedskiy' },
    { n: 6, src: '/images/big-card-b.jpg', slug: 'anti-tsellyulit' },
  ],
  [{ n: 7, src: '/images/gallery-1.jpg', slug: 'dlya-par' }],
]

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
        {CARDS[active].map((card) => (
          <a
            key={card.n}
            href={massageRoute(card.slug)}
            className={styles.card}
            data-test-id={`service-card-${card.n}`}
          >
            <div
              className={styles.media}
              data-test-id={`service-card-${card.n}-media`}
            >
              <img
                className={styles.photo}
                src={card.src}
                alt=""
                data-test-id={`service-card-${card.n}-photo`}
              />
              <span
                className={styles.overlay}
                data-test-id={`service-card-${card.n}-overlay`}
              />
            </div>
            <span
              className={styles.labelBar}
              data-test-id={`service-card-${card.n}-label-bar`}
            >
              <span className={styles.label} data-test-id={`service-card-${card.n}-label`}>
                <Message id={`services.${card.n}.label`} />
              </span>
              <span className={styles.arrow} data-test-id={`service-card-${card.n}-arrow`}>
                <Arrow style={{ width: 28, height: 28 }} />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}