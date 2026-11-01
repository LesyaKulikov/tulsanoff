import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIntl } from 'react-intl'
import { Arrow } from '../components/Arrow/Arrow'
import { Button } from '../components/Button/Button'
import { Message } from '../i18n/Message'
import { hasMessage, type LocaleKey } from '../i18n/messages'
import { getMassage } from '../massages'
import { ROUTES } from '../routes'
import { reveal, fadeUp } from '../animation/variants'
import styles from './MassageDetailPage.module.css'

const FACTS = ['classification', 'duration', 'forWhom'] as const

type TabKind = 'prose' | 'chips' | 'numbered'

interface TabDef {
  id: string
  kind: TabKind
  count: number
}

const TABS: TabDef[] = [
  { id: 'about', kind: 'prose', count: 2 },
  { id: 'indications', kind: 'chips', count: 3 },
  { id: 'benefits', kind: 'numbered', count: 6 },
]

function TabPanel({ slug, tab }: { slug: string; tab: TabDef }) {
  const base = `servicesPage.massage.${slug}.content.${tab.id}`
  const items = Array.from({ length: tab.count }, (_, i) => `${base}.${i}`)

  if (tab.kind === 'prose') {
    return (
      <div className={styles.prose}>
        {items.map((id) => (
          <p key={id}>
            <Message id={id} />
          </p>
        ))}
      </div>
    )
  }

  if (tab.kind === 'chips') {
    return (
      <div className={styles.prose}>
        <p className={styles.lead}>
          <Message id={`${base}.lead`} />
        </p>
        <ul className={styles.chips}>
          {items.map((id) => (
            <li className={styles.chip} key={id}>
              <Message id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className={styles.prose}>
      <p className={styles.lead}>
        <Message id={`${base}.lead`} />
      </p>
      <ul className={styles.numbered}>
        {items.map((id, i) => (
          <li className={styles.item} key={id}>
            <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.itemText}>
              <Message id={id} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MassageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const intl = useIntl()
  const locale = intl.locale as LocaleKey
  const massage = id ? getMassage(id) : undefined

  if (!massage) {
    return <Navigate to={ROUTES.services} replace />
  }

  const tabs = TABS.filter((tab) =>
    hasMessage(`servicesPage.massage.${massage.id}.content.${tab.id}.0`, locale),
  )

  return (
    <>
      <section className={styles.page} data-test-id="massage-detail">
        <motion.div {...reveal(fadeUp(0, { duration: 0.6, distance: 20 }))}>
          <Link className={styles.back} to={ROUTES.services} data-test-id="massage-back">
            <Arrow style={{ transform: 'rotate(180deg)' }} />
            <Message id="servicesPage.detail.back" />
          </Link>
        </motion.div>

        <div className={styles.top}>
          <motion.h1
            className={styles.title}
            data-test-id="massage-title"
            {...reveal(fadeUp(0.06, { duration: 0.85, distance: 34 }))}
          >
            <Message id={`servicesPage.massage.${massage.id}.title`} />
          </motion.h1>

          <motion.p
            className={styles.eyebrow}
            {...reveal(fadeUp(0.16, { duration: 0.7, distance: 20 }))}
          >
            <Message id={`servicesPage.massage.${massage.id}.subtitle`} />
          </motion.p>
        </div>

        <div className={tabs.length > 0 ? styles.columns : `${styles.columns} ${styles.columnsSolo}`}>
          <aside className={styles.rail}>
            <motion.img
              className={styles.photo}
              src={massage.image}
              alt=""
              decoding="async"
              fetchPriority="high"
              data-test-id="massage-photo"
              {...reveal(fadeUp(0.1, { duration: 0.9, distance: 32 }))}
            />

            <motion.dl
              className={styles.facts}
              data-test-id="massage-facts"
              {...reveal(fadeUp(0.2, { duration: 0.7, distance: 24 }))}
            >
              {FACTS.map((fact) => (
                <div className={styles.fact} key={fact} data-test-id={`massage-fact-${fact}`}>
                  <dt className={styles.factLabel}>
                    <Message id={`servicesPage.detail.${fact}`} />
                  </dt>
                  <dd className={styles.factValue}>
                    <Message id={`servicesPage.massage.${massage.id}.${fact}`} />
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.div {...reveal(fadeUp(0.3, { duration: 0.7, distance: 24 }))}>
              <Button to={ROUTES.contacts} className={styles.book} data-test-id="massage-book">
                <Message id="servicesPage.detail.book" />
                <Arrow />
              </Button>
            </motion.div>
          </aside>

          {tabs.length > 0 && (
            <div className={styles.content}>
              {tabs.map((tab, i) => (
                <motion.article
                  className={styles.section}
                  key={tab.id}
                  data-test-id={`massage-section-${tab.id}`}
                  {...reveal(fadeUp(0.05 + i * 0.05, { duration: 0.7, distance: 26 }))}
                >
                  <div className={styles.sectionHead}>
                    <h2 className={styles.sectionLabel} data-test-id={`massage-tab-${tab.id}`}>
                      <Message id={`servicesPage.detail.tabs.${tab.id}`} />
                    </h2>
                  </div>
                  <TabPanel slug={massage.id} tab={tab} />
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
