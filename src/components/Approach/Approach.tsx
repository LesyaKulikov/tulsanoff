import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Approach.module.css'

const STEPS = ['0', '1', '2'] as const

export function Approach() {
  return (
    <section className={styles.approach} data-test-id="approach">
      <div className={styles.grid}>
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
