import { useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import { massageRoute } from '../../routes'
import { reveal, fadeUp, scaleIn, EASE } from '../../animation/variants'
import styles from './Services.module.css'

const CATS = ['cat0', 'cat1', 'cat2'] as const
const MotionLink = motion.create(Link)

const PANEL_ID = 'services-tabpanel'

const CARDS: ReadonlyArray<ReadonlyArray<{ n: number; src: string; slug: string }>> = [
  [
    { n: 0, src: `${import.meta.env.BASE_URL}images/meditsinskiy.jpg`, slug: 'meditsinskiy' },
    { n: 1, src: `${import.meta.env.BASE_URL}images/limfaticheskiy.jpg`, slug: 'limfaticheskiy' },
    { n: 2, src: `${import.meta.env.BASE_URL}images/sport.jpg`, slug: 'sport' },
  ],
  [
    { n: 3, src: `${import.meta.env.BASE_URL}images/massazh-litsa.jpg`, slug: 'massazh-litsa' },
    { n: 4, src: `${import.meta.env.BASE_URL}images/relaks.jpg`, slug: 'relaks' },
    { n: 5, src: `${import.meta.env.BASE_URL}images/video-frame.jpg`, slug: 'shvedskiy' },
    { n: 6, src: `${import.meta.env.BASE_URL}images/anti-tsellyulit.jpg`, slug: 'anti-tsellyulit' },
  ],
  [{ n: 7, src: `${import.meta.env.BASE_URL}images/dlya-par.jpg`, slug: 'dlya-par' }],
]

export function Services() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  // Switching tabs returns the page to the top so the new grid starts fresh
  // instead of keeping the old offset; the active tab leaves scroll alone.
  const goToCategory = (i: number) => {
    if (i === active) return
    setActive(i)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  // WAI-ARIA tabs pattern: arrows/Home/End move selection between the tabs.
  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const last = CATS.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = active === last ? 0 : active + 1
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        next = active === 0 ? last : active - 1
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = last
        break
      default:
        return
    }
    event.preventDefault()
    goToCategory(next)
    // preventScroll keeps focus from racing our own smooth scroll.
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus({ preventScroll: true })
  }

  return (
    <section className={styles.services} data-test-id="services">
      <motion.h2
        id="services-heading"
        className={styles.heading}
        data-test-id="services-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="services.heading" />
      </motion.h2>

      <motion.div
        className={styles.categories}
        data-test-id="services-categories"
        role="tablist"
        aria-labelledby="services-heading"
        onKeyDown={handleTabKeyDown}
        {...reveal(fadeUp(0.1, { duration: 0.7, distance: 24 }))}
      >
        {CATS.map((cat, i) => (
          <button
            type="button"
            key={cat}
            role="tab"
            id={`services-tab-${i}`}
            aria-selected={i === active}
            aria-controls={PANEL_ID}
            className={i === active ? styles.categoryActive : styles.category}
            data-test-id={`services-category-${i}`}
            onClick={() => goToCategory(i)}
          >
            <Message id={`services.${cat}`} />
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`services-tab-${active}`}
          className={styles.grid}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
        >
          {CARDS[active].map((card, i) => (
            <MotionLink
              key={card.n}
              to={massageRoute(card.slug)}
              className={styles.card}
              data-test-id={`service-card-${card.n}`}
              {...reveal(scaleIn(i * 0.08, { from: 0.97, distance: 34, duration: 0.85 }))}
            >
              <div
                className={styles.media}
                data-test-id={`service-card-${card.n}-media`}
              >
                <img
                  className={styles.photo}
                  src={card.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  data-test-id={`service-card-${card.n}-photo`}
                  style={
                    card.slug === 'limfaticheskiy'
                      ? { objectPosition: 'center calc(50% + 40px)' }
                      : card.slug === 'dlya-par'
                        ? { objectPosition: 'center calc(50% - 80px)' }
                        : undefined
                  }
                />
                {card.slug === 'sport' && <div className={styles.tint} />}
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
            </MotionLink>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
