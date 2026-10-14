import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIntl } from 'react-intl'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Arrow } from '../components/Arrow/Arrow'
import { Button } from '../components/Button/Button'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'
import { hasMessage, type LocaleKey } from '../i18n/messages'
import { getMassage } from '../massages'
import { ROUTES } from '../routes'
import { reveal, enter, fadeUp, EASE } from '../animation/variants'
import styles from './MassageDetailPage.module.css'

const FACTS = ['classification', 'duration', 'forWhom'] as const

type TabKind = 'prose' | 'chips' | 'numbered'

const TABS: { id: string; kind: TabKind; count: number }[] = [
  { id: 'about', kind: 'prose', count: 2 },
  { id: 'indications', kind: 'chips', count: 3 },
  { id: 'benefits', kind: 'numbered', count: 6 },
  { id: 'approach', kind: 'prose', count: 1 },
]

function TabPanel({ slug, tab }: { slug: string; tab: (typeof TABS)[number] }) {
  const base = `servicesPage.massage.${slug}.content.${tab.id}`
  const items = Array.from({ length: tab.count }, (_, i) => i)
  const enterProps = enter(fadeUp(0.06, { duration: 0.5, distance: 14 }))

  if (tab.kind === 'prose') {
    return (
      <div className={styles.body} data-test-id={`massage-tabpanel-${tab.id}`}>
        {items.map((i) => (
          <motion.p key={i} {...enterProps}>
            <Message id={`${base}.${i}`} />
          </motion.p>
        ))}
      </div>
    )
  }

  if (tab.kind === 'chips') {
    return (
      <div className={styles.body} data-test-id={`massage-tabpanel-${tab.id}`}>
        <p className={styles.lead}>
          <Message id={`${base}.lead`} />
        </p>
        <motion.ul className={styles.chips} {...enterProps}>
          {items.map((i) => (
            <li className={styles.chip} key={i}>
              <Message id={`${base}.${i}`} />
            </li>
          ))}
        </motion.ul>
      </div>
    )
  }

  return (
    <div className={styles.body} data-test-id={`massage-tabpanel-${tab.id}`}>
      <p className={styles.lead}>
        <Message id={`${base}.lead`} />
      </p>
      <motion.ul className={styles.numbered} {...enterProps}>
        {items.map((i) => (
          <li className={styles.item} key={i}>
            <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.itemText}>
              <Message id={`${base}.${i}`} />
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export function MassageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const intl = useIntl()
  const locale = intl.locale as LocaleKey
  const massage = id ? getMassage(id) : undefined
  const [active, setActive] = useState(0)

  if (!massage) {
    return <Navigate to={ROUTES.services} replace />
  }

  const tabs = TABS.filter((tab) =>
    hasMessage(`servicesPage.massage.${massage.id}.content.${tab.id}.0`, locale),
  )
  // The element survives a route change between massages, so an index picked on
  // a previous (richer) massage may no longer exist.
  const activeIndex = Math.min(active, tabs.length - 1)
  const activeTab = tabs[activeIndex]

  return (
    <>
      <section className={styles.detail} data-test-id="massage-detail">
        <motion.div {...reveal(fadeUp(0, { duration: 0.6, distance: 20 }))}>
          <Link className={styles.back} to={ROUTES.services} data-test-id="massage-back">
            <Arrow style={{ transform: 'rotate(180deg)' }} />
            <Message id="servicesPage.detail.back" />
          </Link>
        </motion.div>

        <div className={styles.head}>
          <div className={styles.info}>
            <motion.h1
              className={styles.title}
              data-test-id="massage-title"
              {...reveal(fadeUp(0.08, { duration: 0.85, distance: 36 }))}
            >
              <Message id={`servicesPage.massage.${massage.id}.title`} />
            </motion.h1>

            <motion.div
              className={styles.facts}
              data-test-id="massage-facts"
              {...reveal(fadeUp(0.2, { duration: 0.7, distance: 24 }))}
            >
              {FACTS.map((fact) => (
                <div className={styles.fact} key={fact} data-test-id={`massage-fact-${fact}`}>
                  <span className={styles.factLabel}>
                    <Message id={`servicesPage.detail.${fact}`} />
                  </span>
                  <span className={styles.factValue}>
                    <Message id={`servicesPage.massage.${massage.id}.${fact}`} />
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.img
            className={styles.photo}
            src={massage.image}
            alt=""
            decoding="async"
            fetchPriority="high"
            data-test-id="massage-photo"
            {...reveal(fadeUp(0.1, { duration: 0.9, distance: 44 }))}
          />
        </div>

        {tabs.length > 0 && (
          <motion.div
            className={styles.panel}
            data-test-id="massage-panel"
            {...reveal(fadeUp(0.4, { duration: 0.7, distance: 24 }))}
          >
            <div className={styles.tabs} data-test-id="massage-tabs">
              {tabs.map((tab, i) => (
                <button
                  type="button"
                  key={tab.id}
                  className={i === activeIndex ? styles.tabActive : styles.tab}
                  data-test-id={`massage-tab-${tab.id}`}
                  aria-pressed={i === activeIndex}
                  onClick={() => setActive(i)}
                >
                  <Message id={`servicesPage.detail.tabs.${tab.id}`} />
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab?.id}
                className={styles.tabpanel}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: EASE } }}
              >
                {activeTab && <TabPanel slug={massage.id} tab={activeTab} />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div className={styles.cta} {...reveal(fadeUp(0.54, { duration: 0.7, distance: 24 }))}>
          <Button to={ROUTES.contacts} data-test-id="massage-book">
            <Message id="servicesPage.detail.book" />
            <Arrow />
          </Button>
        </motion.div>
      </section>

      <FaqList />
    </>
  )
}
