import { useState } from 'react'
import { Message } from '../../i18n/Message'
import styles from './FaqList.module.css'

const ROW_IDS = ['0', '1', '2', '3'] as const

export function FaqList() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className={styles.faq} data-test-id="faq">
      <h2 className={styles.heading} data-test-id="faq-heading">
        <Message id="faq.heading" />
      </h2>

      <div className={styles.panel}>
        {ROW_IDS.map((n) => {
          const isOpen = open === n
          return (
            <div
              key={n}
              className={`${styles.row} ${isOpen ? styles.open : ''}`}
              data-test-id={`faq-row-${n}`}
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
            >
              <div className={styles.details}>
                <p className={styles.label}>
                  <Message id={`faq.${n}.label`} />
                </p>
                {isOpen && (
                  <p className={styles.body}>
                    <Message id={`faq.${n}.body`} />
                  </p>
                )}
              </div>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
