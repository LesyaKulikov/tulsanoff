import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { getMassage } from '../../massages'
import { EASE } from '../../animation/variants'
import styles from './ServicesGrid.module.css'

const CATEGORIES = [
  { id: 'cat0', slugs: ['meditsinskiy', 'limfaticheskiy', 'sport'] },
  { id: 'cat1', slugs: ['massazh-litsa', 'relaks', 'shvedskiy', 'anti-tsellyulit'] },
  { id: 'cat2', slugs: ['dlya-par'] },
] as const

export function ServicesGrid() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={styles.services} data-test-id="services-grid">
      <h2
        className={styles.heading}
        data-test-id="services-grid-heading"
      >
        <Message id="servicesPage.heading" />
      </h2>

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
