import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './AboutDescription.module.css'

const BRANCHES = ['0', '1'] as const

const COLUMNS = [
  { n: '0', label: 'education', body: 'education' },
  { n: '1', label: 'scope', body: 'scope' },
  { n: '2', label: 'principle', body: 'principle.body' },
] as const

export function AboutDescription() {
  return (
    <section className={styles.section} data-test-id="about-description">
      <motion.h3
        className={styles.statement}
        data-test-id="about-description-statement"
        {...reveal(fadeUp(0.12, { duration: 0.9, distance: 44 }))}
      >
        <Message
          id="aboutPage.description.statement"
          values={{
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          }}
        />
      </motion.h3>

      <motion.span
        className={styles.line}
        {...reveal(fadeUp(0.18, { duration: 0.7, distance: 14 }))}
      />

      <div className={styles.columns} data-test-id="about-description-columns">
        {COLUMNS.map((col, i) => (
          <motion.div
            className={styles.column}
            key={col.n}
            {...reveal(fadeUp(0.28 + i * 0.08, { duration: 0.8, distance: 26 }))}
          >
            <span className={styles.columnLabel}>
              <Message id={`aboutPage.description.labels.${col.label}`} />
            </span>
            <p className={styles.columnBody}>
              <Message id={`aboutPage.description.${col.body}`} />
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className={styles.philosophy}
        data-test-id="about-description-philosophy"
        {...reveal(fadeUp(0.4, { duration: 0.85, distance: 30 }))}
      >
        <Message id="aboutPage.description.philosophy" />
      </motion.p>

      <motion.div
        className={styles.branches}
        data-test-id="about-description-branches"
        {...reveal(fadeUp(0.52, { duration: 0.8, distance: 22 }))}
      >
        {BRANCHES.map((n) => (
          <span className={styles.branch} key={n}>
            <Message id={`aboutPage.description.branches.${n}`} />
          </span>
        ))}
      </motion.div>
    </section>
  )
}
