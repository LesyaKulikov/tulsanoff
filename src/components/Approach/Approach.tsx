import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Approach.module.css'

const STEPS = ['0', '1', '2'] as const

export function Approach() {
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 6000)
    return () => clearInterval(id)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
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
    <section className={styles.approach} data-test-id="approach">
      <div className={styles.carousel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait">
          <motion.article
            key={active}
            className={styles.card}
            data-test-id={`approach-step-${STEPS[active]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.num}>
              <Message id={`approach.${STEPS[active]}.num`} />
            </span>
            <h3 className={styles.title}>
              <Message id={`approach.${STEPS[active]}.title`} />
            </h3>
            <p className={styles.body}>
              <Message id={`approach.${STEPS[active]}.body`} />
            </p>
          </motion.article>
        </AnimatePresence>
        <div className={styles.dots}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`slide ${i + 1}`}
            />
          ))}
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
            <h3 className={styles.title}>
              <Message id={`approach.${n}.title`} />
            </h3>
            <p className={styles.body}>
              <Message id={`approach.${n}.body`} />
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
