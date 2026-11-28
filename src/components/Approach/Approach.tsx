import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { useIntl } from 'react-intl'
import { reveal, fadeUp, EASE } from '../../animation/variants'
import styles from './Approach.module.css'

const STEPS = ['0', '1', '2'] as const

export function Approach() {
  const intl = useIntl()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [rotationPaused, setRotationPaused] = useState(false)

  useEffect(() => {
    if (rotationPaused || reduce) return
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 5000)
    return () => clearInterval(id)
  }, [active, reduce, rotationPaused])

  const handleTouchStart = (e: React.TouchEvent) => {
    setRotationPaused(true)
    setTouchStart(e.touches[0].clientX)
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (Math.abs(diff) > 50) {
      if (diff < 0) setActive((a) => (a + 1) % STEPS.length)
      else setActive((a) => (a - 1 + STEPS.length) % STEPS.length)
    }
    setTouchStart(null)
  }

  return (
    <section
      className={styles.approach}
      data-test-id="approach"
      role="region"
      aria-roledescription={intl.formatMessage({ id: 'a11y.carousel' })}
      aria-label={intl.formatMessage({ id: 'a11y.approachCarousel' })}
    >
      <div
        className={styles.carousel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live={rotationPaused || reduce ? 'polite' : 'off'}
        onFocus={(event) => {
          if (
            event.target instanceof HTMLElement &&
            event.target.matches(':focus-visible') &&
            (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget))
          ) {
            setRotationPaused(true)
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            className={styles.card}
            data-test-id={`approach-step-${STEPS[active]}`}
            role="group"
            aria-roledescription={intl.formatMessage({ id: 'a11y.carouselSlideRole' })}
            aria-label={intl.formatMessage(
              { id: 'a11y.carouselPosition' },
              { current: active + 1, total: STEPS.length },
            )}
            onMouseEnter={() => setRotationPaused(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.num}>
              <Message id={`approach.${STEPS[active]}.num`} />
            </span>
            <h2 className={styles.title}>
              <Message id={`approach.${STEPS[active]}.title`} />
            </h2>
            <p className={styles.body}>
              <Message id={`approach.${STEPS[active]}.body`} />
            </p>
          </motion.article>
        </AnimatePresence>
        <div className={styles.dots}>
          {STEPS.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              initial={false}
              animate={{
                width: i === active ? 28 : 8,
              }}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => {
                setRotationPaused(true)
                setActive(i)
              }}
              aria-label={intl.formatMessage({ id: 'a11y.carouselSlide' }, { slide: i + 1 })}
              aria-current={i === active ? 'true' : undefined}
              transition={{ width: { duration: 0.65, ease: EASE } }}
            />
          ))}
          {!reduce && (
            <button
              type="button"
              className={styles.rotationControl}
              onClick={() => setRotationPaused((paused) => !paused)}
            >
              <Message id={rotationPaused ? 'a11y.resumeCarousel' : 'a11y.pauseCarousel'} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.gridDesktop}>
        {STEPS.map((n, i) => (
          <motion.article
            key={n}
            className={styles.card}
            data-test-id={`approach-step-${n}`}
            {...reveal(fadeUp(0.1 + i * 0.1, { duration: 0.85, distance: 40 }))}
          >
            <span className={styles.num}>
              <Message id={`approach.${n}.num`} />
            </span>
            <h2 className={styles.title}>
              <Message id={`approach.${n}.title`} />
            </h2>
            <p className={styles.body}>
              <Message id={`approach.${n}.body`} />
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
