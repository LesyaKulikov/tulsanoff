import { motion } from 'framer-motion'
import { Message } from '../../../i18n/Message'
import { Button } from '../../Button/Button'
import { Arrow } from '../../Arrow/Arrow'
import { useQuizModal } from '../../Quiz/useQuizModal'
import { reveal, fadeUp, scaleIn } from '../../../animation/variants'
import styles from './QuizCtaMobileA.module.css'

/**
 * PROTOTYPE variant A — photo-forward. Full-bleed image with an accent pill,
 * and a glass card that overlaps the photo so the CTA sits on the image.
 */
export function QuizCtaMobileA() {
  const { openQuiz } = useQuizModal()

  return (
    <section className={styles.root} data-test-id="quiz-cta-b-mobile-a">
      <motion.div
        className={styles.media}
        {...reveal(scaleIn(0, { from: 1.05, distance: 16, duration: 0.9 }))}
      >
        <img
          className={styles.photo}
          src={`${import.meta.env.BASE_URL}images/quiz-cta.webp`}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className={styles.scrim} />
        <span className={styles.badge}>Подбор за 30 секунд</span>
      </motion.div>

      <motion.div
        className={styles.card}
        {...reveal(fadeUp(0.14, { duration: 0.8, distance: 28 }))}
      >
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
          data-test-id="quiz-cta-b-mobile-a-btn"
        >
          <Message id="quiz.heading" />
          <Arrow />
        </Button>
      </motion.div>
    </section>
  )
}
