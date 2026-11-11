import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIntl } from 'react-intl'
import { Message } from '../../i18n/Message'
import { reveal, enter, fadeUp, scaleIn, EASE } from '../../animation/variants'
import styles from './AboutMasters.module.css'

const CARDS = [
  { n: '0', src: '/tulsanoff/images/big-card-a.jpg' },
  { n: '1', src: '/tulsanoff/images/big-card-b.jpg' },
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
  const intl = useIntl()
  // Roving tabindex: only the selected tab is in the tab order, so Tab moves
  // past the tablist instead of stopping on every tab.
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const base = `about-master-${n}`
  const panelId = `${base}-tabpanel`
  const tabId = (tab: string) => `${base}-tab-${tab}`
  const activeTabId = tabId(TABS[active])

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event
    if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return
    event.preventDefault()

    const last = TABS.length - 1
    const next =
      key === 'ArrowRight'
        ? active === last
          ? 0
          : active + 1
        : key === 'ArrowLeft'
          ? active === 0
            ? last
            : active - 1
          : key === 'Home'
            ? 0
            : last

    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <motion.article
      id={base}
      className={`${styles.panel} ${reverse ? styles.reverse : ''}`}
      data-test-id={base}
      {...reveal(scaleIn(delay, { from: 0.98, distance: 48, duration: 1 }))}
    >
      <div className={styles.media}>
        <img
          className={styles.photo}
          src={src}
          alt={intl.formatMessage({ id: `aboutPage.masters.${n}.name` })}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topline}>
          <span className={styles.index} data-test-id={`${base}-index`}>
            <Message id={`aboutPage.masters.${n}.index`} />
          </span>
        </div>

        <div className={styles.identity}>
          <h3 className={styles.name} id={`${base}-name`} data-test-id={`${base}-name`}>
            <Message id={`aboutPage.masters.${n}.name`} />
          </h3>
          <p className={styles.role} data-test-id={`${base}-role`}>
            <Message id={`aboutPage.masters.${n}.role`} />
          </p>
        </div>

        <span className={styles.rule} />

        <div
          className={styles.tabs}
          role="tablist"
          aria-labelledby={`${base}-name`}
          data-test-id={`${base}-tabs`}
        >
          {TABS.map((tab, i) => (
            <button
              type="button"
              key={tab}
              id={tabId(tab)}
              role="tab"
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              className={i === active ? styles.tabActive : styles.tab}
              data-test-id={`${base}-tab-${tab}`}
              aria-selected={i === active}
              aria-controls={panelId}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
            >
              <Message id={`aboutPage.masters.tabs.${tab}`} />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={panelId}
            role="tabpanel"
            aria-labelledby={activeTabId}
            tabIndex={0}
            className={styles.tabpanel}
            exit={{ opacity: 0, transition: { duration: 0.12, ease: EASE } }}
          >
            {active === 0 && (
              <div className={styles.body}>
                <motion.p
                  data-test-id={`${base}-bio`}
                  {...enter(fadeUp(0, { duration: 0.35, distance: 16 }))}
                >
                  <Message id={`aboutPage.masters.${n}.bio`} />
                </motion.p>
              </div>
            )}
            {active === 1 && (
              <div className={styles.body}>
                <motion.p
                  data-test-id={`${base}-bio2`}
                  {...enter(fadeUp(0, { duration: 0.35, distance: 16 }))}
                >
                  <Message id={`aboutPage.masters.${n}.bio2`} />
                </motion.p>
              </div>
            )}
            {active === 2 && (
              <motion.ul
                className={styles.credentials}
                data-test-id={`${base}-credentials`}
                {...enter(fadeUp(0, { duration: 0.35, distance: 16 }))}
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

        <span className={styles.exp} data-test-id={`${base}-experience`}>
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
