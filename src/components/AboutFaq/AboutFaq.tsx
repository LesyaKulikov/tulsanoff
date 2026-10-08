import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Chevron } from '../Chevron/Chevron'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './AboutFaq.module.css'

const ROW_IDS = ['0', '1', '2', '3', '4'] as const

export function AboutFaq() {
  return (
    <section className={styles.faq} data-test-id="about-faq">
      <motion.h2
        className={styles.heading}
        data-test-id="about-faq-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="aboutPage.faq.heading" />
      </motion.h2>

      <div className={styles.panel}>
        {ROW_IDS.map((n, i) => (
          <motion.div
            key={n}
            className={styles.row}
            data-test-id={`about-faq-row-${n}`}
            {...reveal(fadeUp(0.08 + i * 0.07, { duration: 0.7, distance: 28 }))}
          >
            <p className={styles.question}>
              <Message id={`faq.${n}.label`} />
            </p>
            <Chevron />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
