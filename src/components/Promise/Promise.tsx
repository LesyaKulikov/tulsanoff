import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Promise.module.css'

export function Promise() {
  return (
    <section className={styles.promise} data-test-id="promise">
      <motion.span
        className={styles.mark}
        data-test-id="promise-mark"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 20 }))}
      >
        <Message id="promise.body" />
      </motion.span>
      <motion.h2
        className={styles.title}
        data-test-id="promise-title"
        {...reveal(fadeUp(0.12, { duration: 0.9, distance: 44 }))}
      >
        <Message
          id="promise.title"
          values={{
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          }}
        />
      </motion.h2>
      <motion.div
        className={styles.line}
        {...reveal(fadeUp(0.22, { duration: 0.7, distance: 16 }))}
      />
    </section>
  )
}
