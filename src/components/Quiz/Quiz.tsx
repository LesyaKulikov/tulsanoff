import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { CtaButton } from '../CtaButton/CtaButton'
import { getMassage } from '../../massages'
import { massageRoute } from '../../routes'
import { EASE } from '../../animation/variants'
import styles from './Quiz.module.css'

type Category = 'health' | 'beauty' | 'relax'
type Pressure = 'soft' | 'moderate' | 'intensive'

interface Option {
  id: string
  labelId: string
}

const CATEGORIES: Option[] = [
  { id: 'health', labelId: 'quiz.step1.option.health' },
  { id: 'beauty', labelId: 'quiz.step1.option.beauty' },
  { id: 'relax', labelId: 'quiz.step1.option.relax' },
]

const SITUATIONS: Record<Category, Option[]> = {
  health: [
    { id: 'sedentary', labelId: 'quiz.step2.health.sedentary' },
    { id: 'chronic', labelId: 'quiz.step2.health.chronic' },
    { id: 'sport', labelId: 'quiz.step2.health.sport' },
  ],
  beauty: [
    { id: 'edema', labelId: 'quiz.step2.beauty.edema' },
    { id: 'zones', labelId: 'quiz.step2.beauty.zones' },
  ],
  relax: [
    { id: 'face', labelId: 'quiz.step2.relax.face' },
    { id: 'maxrelax', labelId: 'quiz.step2.relax.maxrelax' },
    { id: 'fullbody', labelId: 'quiz.step2.relax.fullbody' },
  ],
}

const PRESSURES: Option[] = [
  { id: 'soft', labelId: 'quiz.step3.option.soft' },
  { id: 'moderate', labelId: 'quiz.step3.option.moderate' },
  { id: 'intensive', labelId: 'quiz.step3.option.intensive' },
]

const STEP_TITLES = [
  'quiz.step1.title',
  'quiz.step2.title',
  'quiz.step3.title',
] as const

function computeResult(category: Category, situation: string, pressure: Pressure): string {
  if (category === 'health') {
    if (situation === 'chronic') {
      if (pressure === 'intensive') return 'meditsinskiy'
      if (pressure === 'moderate') return 'shvedskiy'
      return 'relaks'
    }
    if (situation === 'sport') {
      if (pressure === 'intensive') return 'sport'
      if (pressure === 'moderate') return 'shvedskiy'
      return 'relaks'
    }
    // sedentary
    if (pressure === 'intensive') return 'meditsinskiy'
    if (pressure === 'moderate') return 'shvedskiy'
    return 'relaks'
  }
  if (category === 'beauty') {
    if (situation === 'edema') {
      return pressure === 'intensive' ? 'anti-tsellyulit' : 'limfaticheskiy'
    }
    return pressure === 'soft' ? 'limfaticheskiy' : 'anti-tsellyulit'
  }
  // relax
  if (situation === 'face') return 'massazh-litsa'
  if (situation === 'maxrelax') return 'relaks'
  return pressure === 'soft' ? 'relaks' : 'shvedskiy'
}

export function Quiz() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState<Category | null>(null)
  const [situation, setSituation] = useState<string | null>(null)
  const [pressure, setPressure] = useState<Pressure | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const currentAnswer =
    step === 0 ? category : step === 1 ? situation : pressure

  const handleSelect = (id: string) => {
    let nextCategory = category
    let nextSituation = situation
    let nextPressure = pressure
    if (step === 0) {
      setCategory(id as Category)
      nextCategory = id as Category
    } else if (step === 1) {
      setSituation(id)
      nextSituation = id
    } else {
      setPressure(id as Pressure)
      nextPressure = id as Pressure
    }

    // Advance automatically: selecting an answer moves to the next step
    // (or computes the result on the last step) without an extra "continue" click.
    window.setTimeout(() => {
      if (step < 2) {
        setStep((s) => s + 1)
      } else if (nextCategory && nextSituation && nextPressure) {
        setResult(computeResult(nextCategory, nextSituation, nextPressure))
      }
    }, 220)
  }

  const handleBack = () => {
    if (result) {
      setResult(null)
      return
    }
    if (step > 0) setStep((s) => s - 1)
  }

  const handleRestart = () => {
    setStep(0)
    setCategory(null)
    setSituation(null)
    setPressure(null)
    setResult(null)
  }

  const options: Option[] =
    step === 0
      ? CATEGORIES
      : step === 1 && category
        ? SITUATIONS[category]
        : step === 2
          ? PRESSURES
          : []

  const resultMassage = result ? getMassage(result) : undefined

  return (
    <div className={styles.quiz} data-test-id="quiz">
      <AnimatePresence mode="wait">
        {result && resultMassage ? (
          <motion.div
            key="result"
            className={styles.result}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          >
            <p className={styles.resultEyebrow}>
              <Message id="quiz.result.subtitle" />
            </p>
            <h2 className={styles.resultTitle}>
              <Message id="quiz.result.title" />
            </h2>
            <div className={styles.resultCard}>
              <img
                className={styles.resultPhoto}
                src={resultMassage.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className={styles.resultBody}>
                <h3 className={styles.resultName}>
                  <Message id={`servicesPage.massage.${result}.title`} />
                </h3>
                <p className={styles.resultDesc}>
                  <Message id={`servicesPage.massage.${result}.description`} />
                </p>
                <div className={styles.resultActions}>
                  <Button to={massageRoute(result)} variant="primary" data-test-id="quiz-result-details">
                    <Message id="quiz.result.details" />
                    <Arrow />
                  </Button>
                  <CtaButton messageId="quiz.result.book" testId="quiz-result-book" />
                </div>
              </div>
            </div>
            <button type="button" className={styles.restart} onClick={handleRestart} data-test-id="quiz-restart">
              <Message id="quiz.restart" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            className={styles.step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          >
            <div className={styles.progress}>
              <span className={styles.progressText}>
                <Message id="quiz.progress" values={{ current: step + 1, total: 3 }} />
              </span>
              <div className={styles.progressBar} aria-hidden="true">
                <div
                  className={styles.progressFill}
                  style={{ width: `${((step + 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <h2 className={styles.question}>
              <Message id={STEP_TITLES[step]} />
            </h2>

            <div className={styles.options} role="radiogroup" aria-label="quiz-options">
              {options.map((opt) => {
                const selected = currentAnswer === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={selected ? `${styles.option} ${styles.optionSelected}` : styles.option}
                    onClick={() => handleSelect(opt.id)}
                    data-test-id={`quiz-option-${opt.id}`}
                  >
                    <span className={styles.optionLabel}>
                      <Message id={opt.labelId} />
                    </span>
                  </button>
                )
              })}
            </div>

            <div className={styles.nav}>
              {step > 0 && (
                <button type="button" className={styles.backBtn} onClick={handleBack} data-test-id="quiz-back">
                  <Message id="quiz.back" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Quiz