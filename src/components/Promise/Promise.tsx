import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './Promise.module.css'

export function Promise() {
  return (
    <section className={styles.promise} data-test-id="promise">
      <div className={styles.band}>
        <motion.img
          className={styles.lead}
          src="/images/promise-lead.jpg"
          alt=""
          data-test-id="promise-media-lead"
          {...reveal(fadeUp(0, { duration: 0.9, distance: 36 }))}
        />

        <div className={styles.copy} data-test-id="promise-copy">
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
          <motion.p
            className={styles.body}
            data-test-id="promise-body"
            {...reveal(fadeUp(0.24, { duration: 0.8, distance: 28 }))}
          >
            <Message id="promise.body" />
          </motion.p>
        </div>
      </div>
    </section>
  )
}
