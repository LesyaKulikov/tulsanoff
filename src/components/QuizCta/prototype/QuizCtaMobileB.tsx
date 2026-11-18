import { motion } from 'framer-motion'
import { Message } from '../../../i18n/Message'
import { Button } from '../../Button/Button'
import { Arrow } from '../../Arrow/Arrow'
import { useQuizModal } from '../../Quiz/useQuizModal'
import { reveal, fadeUp, scaleIn } from '../../../animation/variants'
import styles from './QuizCtaMobileB.module.css'

/**
 * PROTOTYPE variant B — accent ticket. A mint coupon with a punched "30 секунд"
 * stub and a perforated seam; no photo, type does the work.
 */
export function QuizCtaMobileB() {
  const { openQuiz } = useQuizModal()

  return (
    <section className={styles.root} data-test-id="quiz-cta-b-mobile-b">
      <motion.div
        className={styles.ticket}
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <div className={styles.stub}>
          <motion.span
            className={styles.seconds}
            {...reveal(scaleIn(0.14, { from: 0.8, distance: 12, duration: 0.7 }))}
          >
            30
          </motion.span>
          <span className={styles.unit}>секунд</span>
        </div>

        <div className={styles.perf} aria-hidden="true" />

        <div className={styles.body}>
          <span className={styles.eyebrow}>Подбор за 30 секунд</span>
          <h2 className={styles.heading}>
            <Message id="quiz.heading" />
          </h2>
          <p className={styles.intro}>
            <Message id="quiz.intro" />
          </p>
          <Button
            variant="primary"
            className={styles.cta}
            onClick={openQuiz}
            data-test-id="quiz-cta-b-mobile-b-btn"
          >
            <Message id="quiz.heading" />
            <Arrow />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
