import { motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Arrow } from '../components/Arrow/Arrow'
import { Button } from '../components/Button/Button'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'
import { getMassage } from '../massages'
import { ROUTES } from '../routes'
import { reveal, fadeUp } from '../animation/variants'
import styles from './MassageDetailPage.module.css'

const DETAIL_ROWS = ['classification', 'duration', 'forWhom'] as const

export function MassageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const massage = id ? getMassage(id) : undefined

  if (!massage) {
    return <Navigate to={ROUTES.services} replace />
  }

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
            <motion.p
              className={styles.subtitle}
              data-test-id="massage-subtitle"
              {...reveal(fadeUp(0.16, { duration: 0.8, distance: 28 }))}
            >
              <Message id={`servicesPage.massage.${massage.id}.subtitle`} />
            </motion.p>
            <motion.p
              className={styles.description}
              data-test-id="massage-description"
              {...reveal(fadeUp(0.24, { duration: 0.8, distance: 24, opacity: 0.92 }))}
            >
              <Message id={`servicesPage.massage.${massage.id}.description`} />
            </motion.p>
          </div>
          <motion.img
            className={styles.photo}
            src={massage.image}
            alt=""
            data-test-id="massage-photo"
            {...reveal(fadeUp(0.1, { duration: 0.9, distance: 44 }))}
          />
        </div>

        <div className={styles.rows} data-test-id="massage-detail-rows">
          {DETAIL_ROWS.map((row, i) => (
            <motion.div
              key={row}
              className={styles.row}
              data-test-id={`massage-row-${row}`}
              {...reveal(fadeUp(0.3 + i * 0.08, { duration: 0.7, distance: 24 }))}
            >
              <span className={styles.rowLabel}>
                <Message id={`servicesPage.detail.${row}`} />
              </span>
              <span className={styles.rowValue}>
                <Message id={`servicesPage.massage.${massage.id}.${row}`} />
              </span>
            </motion.div>
          ))}
        </div>

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
