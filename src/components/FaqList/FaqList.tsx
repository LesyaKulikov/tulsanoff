import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, EASE } from '../../animation/variants'
import styles from './FaqList.module.css'

const ROW_IDS = ['0', '1', '2', '3'] as const

interface FaqListProps {
  /**
   * Message-id prefix for the heading and rows, e.g. `certificates.faq` renders
   * `certificates.faq.heading` and `certificates.faq.<n>.{label,body}`. Defaults
   * to the shared `faq` block used by the home and services pages.
   */
  base?: string
  /** Row keys to render, in order. Defaults to the four shared rows. */
  rowIds?: readonly string[]
  /** `data-test-id` for the section, so multiple lists stay addressable. */
  testId?: string
}

export function FaqList({ base = 'faq', rowIds = ROW_IDS, testId = 'faq' }: FaqListProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className={styles.faq} data-test-id={testId}>
      <motion.h2
        className={styles.heading}
        data-test-id={`${testId}-heading`}
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id={`${base}.heading`} />
      </motion.h2>

      <div className={styles.panel}>
        {rowIds.map((n, i) => {
          const isOpen = open === n
          return (
            <motion.div
              key={n}
              className={`${styles.row} ${isOpen ? styles.open : ''}`}
              data-test-id={`${testId}-row-${n}`}
              onClick={() => setOpen(isOpen ? null : n)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpen(isOpen ? null : n)
                }
              }}
              aria-expanded={isOpen}
              {...reveal(fadeUp(0.08 + i * 0.07, { duration: 0.7, distance: 28 }))}
            >
              <div className={styles.details}>
                <p className={styles.label}>
                  <Message id={`${base}.${n}.label`} />
                </p>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.bodyWrap}
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p className={styles.body}>
                        <Message id={`${base}.${n}.body`} />
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
