import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { getMassage } from '../../massages'
import { enter, fadeUp, EASE } from '../../animation/variants'
import styles from './ServicesGrid.module.css'

const CATEGORIES = [
  { id: 'cat0', slugs: ['meditsinskiy', 'limfaticheskiy', 'sport'] },
  { id: 'cat1', slugs: ['massazh-litsa', 'relaks', 'shvedskiy', 'anti-tsellyulit'] },
  { id: 'cat2', slugs: ['dlya-par'] },
] as const

// Persists the open accordion panel across client-side navigation, so returning
// from a massage detail page keeps the panel the user had open instead of
// resetting to the first one.
let rememberedOpen: number | null = 0

export function ServicesGrid() {
  const [open, setOpenState] = useState<number | null>(rememberedOpen)
  const setOpen = (next: number | null) => {
    // oxlint-disable-next-line react(globals)
    rememberedOpen = next
    setOpenState(next)
  }

  return (
    <section className={styles.services} data-test-id="services-grid">
      <motion.h2
        className={styles.heading}
        data-test-id="services-grid-heading"
        {...enter(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.heading" />
      </motion.h2>

      <div className={styles.rows} data-test-id="services-grid-rows">
        {CATEGORIES.map((cat, i) => {
          const isOpen = open === i
          const hero = getMassage(cat.slugs[0])
          const headId = `services-grid-head-${i}`
          const panelId = `services-grid-panel-${i}`
          return (
            <div key={cat.id} className={styles.row} data-test-id={`services-grid-row-${i}`}>
              <button
                type="button"
                id={headId}
                className={isOpen ? styles.headOpen : styles.head}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-test-id={`services-grid-head-${i}`}
              >
                <span className={styles.index}>0{i + 1}</span>
                <span className={styles.title}>
                  <Message id={`services.${cat.id}`} />
                </span>
                <span className={styles.meta}>
                  {hero && (
                    <span className={styles.strip}>
                      <img src={hero.image} alt="" loading="lazy" decoding="async" />
                    </span>
                  )}
                  <span className={styles.plus} aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    id={panelId}
                    role="region"
                    aria-labelledby={headId}
                    className={styles.body}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1, transition: { duration: 0.5, ease: EASE } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                  >
                    <div className={styles.grid}>
                      {cat.slugs.map((slug, j) => {
                        const massage = getMassage(slug)
                        if (!massage) return null
                        return (
                          <ServiceCard
                            key={slug}
                            slug={slug}
                            image={massage.image}
                            label={`servicesPage.massage.${slug}.title`}
                            index={j}
                          />
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
