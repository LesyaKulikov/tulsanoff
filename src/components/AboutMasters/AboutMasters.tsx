import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, enter, fadeUp, scaleIn, EASE } from '../../animation/variants'
import styles from './AboutMasters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg' },
  { n: '1', src: '/images/big-card-b.jpg' },
] as const

const TABS = ['about', 'training', 'qualifications'] as const

const CREDENTIALS = ['0', '1', '2', '3'] as const

interface MasterCardProps {
  n: string
  src: string
  reverse: boolean
  delay: number
}

function MasterCard({ n, src, reverse, delay }: MasterCardProps) {
  const [active, setActive] = useState(0)

  return (
    <motion.article
      className={`${styles.panel} ${reverse ? styles.reverse : ''}`}
      data-test-id={`about-master-${n}`}
      {...reveal(scaleIn(delay, { from: 0.98, distance: 48, duration: 1 }))}
    >
      <div className={styles.media}>
        <img className={styles.photo} src={src} alt="" loading="lazy" decoding="async" />
      </div>

      <div className={styles.content}>
        <div className={styles.topline}>
          <span className={styles.index} data-test-id={`about-master-${n}-index`}>
            <Message id={`aboutPage.masters.${n}.index`} />
          </span>
        </div>

        <div className={styles.identity}>
          <h3 className={styles.name} data-test-id={`about-master-${n}-name`}>
            <Message id={`aboutPage.masters.${n}.name`} />
          </h3>
          <p className={styles.role} data-test-id={`about-master-${n}-role`}>
            <Message id={`aboutPage.masters.${n}.role`} />
          </p>
        </div>

        <span className={styles.rule} />

        <div className={styles.tabs} data-test-id={`about-master-${n}-tabs`}>
          {TABS.map((tab, i) => (
            <button
              type="button"
              key={tab}
              className={i === active ? styles.tabActive : styles.tab}
              data-test-id={`about-master-${n}-tab-${tab}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <Message id={`aboutPage.masters.tabs.${tab}`} />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.tabpanel}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
          >
            {active === 0 && (
              <div className={styles.body}>
                <motion.p
                  data-test-id={`about-master-${n}-bio`}
                  {...enter(fadeUp(0.06, { duration: 0.6, distance: 16 }))}
                >
                  <Message id={`aboutPage.masters.${n}.bio`} />
                </motion.p>
              </div>
            )}
            {active === 1 && (
              <div className={styles.body}>
                <motion.p
                  data-test-id={`about-master-${n}-bio2`}
                  {...enter(fadeUp(0.06, { duration: 0.6, distance: 16 }))}
                >
                  <Message id={`aboutPage.masters.${n}.bio2`} />
                </motion.p>
              </div>
            )}
            {active === 2 && (
              <motion.ul
                className={styles.credentials}
                data-test-id={`about-master-${n}-credentials`}
                {...enter(fadeUp(0.06, { duration: 0.6, distance: 16 }))}
              >
                {CREDENTIALS.map((c) => (
                  <li className={styles.credential} key={c}>
                    <Message id={`aboutPage.masters.${n}.credentials.${c}`} />
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </AnimatePresence>

        <span className={styles.exp} data-test-id={`about-master-${n}-experience`}>
          <span className={styles.expValue}>
            <Message id={`aboutPage.masters.${n}.experience`} />
          </span>
          <span className={styles.expLabel}>
            <Message id={`aboutPage.masters.${n}.experienceLabel`} />
          </span>
        </span>
      </div>
    </motion.article>
  )
}

export function AboutMasters() {
  return (
    <section className={styles.masters} data-test-id="about-masters">
      <motion.h2
        className={styles.heading}
        data-test-id="about-masters-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="aboutPage.masters.heading" />
      </motion.h2>

      <div className={styles.list}>
        {CARDS.map((card, i) => (
          <MasterCard
            key={card.n}
            n={card.n}
            src={card.src}
            reverse={i % 2 === 1}
            delay={i * 0.12}
          />
        ))}
      </div>
    </section>
  )
}
