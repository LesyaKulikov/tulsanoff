import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { useQuizModal } from '../Quiz/useQuizModal'
import { reveal, fadeUp } from '../../animation/variants'
import servicesStyles from '../Services/Services.module.css'

export function QuizCtaB() {
  const { openQuiz } = useQuizModal()
  return (
    <motion.section
      data-test-id="quiz-cta-b"
      {...reveal(fadeUp(0, { duration: 0.8, distance: 24 }))}
      style={{
        margin: '64px var(--gutter)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 420,
        overflow: 'hidden',
        border: '1px solid var(--glass-edge)',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #1a2a16 0%, #0a1209 100%)',
          overflow: 'hidden',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/quiz-cta.webp`}
          alt=""
          aria-hidden="true"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 70%',
            filter: 'brightness(0.85) saturate(1.05)',
          }}
        />

      </div>
      <div
        style={{
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
          background: 'var(--panel)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <span
          style={{
            color: 'var(--accent)',
            fontSize: 13,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Подбор за 30 секунд
        </span>
        <h2 className={servicesStyles.heading} style={{ color: 'var(--text)', margin: 0 }}>
          <Message id="quiz.heading" />
        </h2>
        <p style={{ opacity: 0.8, fontSize: 17, lineHeight: 1.6, margin: 0, maxWidth: '48ch' }}>
          <Message id="quiz.intro" />
        </p>
        <div>
          <Button variant="primary" onClick={openQuiz} data-test-id="quiz-cta-b-btn">
            <Message id="quiz.heading" />
            <Arrow />
          </Button>
        </div>
      </div>
    </motion.section>
  )
}