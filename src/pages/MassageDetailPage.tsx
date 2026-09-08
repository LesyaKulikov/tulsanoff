import { Link, Navigate, useParams } from 'react-router-dom'
import { Arrow } from '../components/Arrow/Arrow'
import { Button } from '../components/Button/Button'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'
import { getMassage } from '../massages'
import { ROUTES } from '../routes'
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
        <Link className={styles.back} to={ROUTES.services} data-test-id="massage-back">
          <Arrow style={{ transform: 'rotate(180deg)' }} />
          <Message id="servicesPage.detail.back" />
        </Link>

        <div className={styles.head}>
          <div className={styles.info}>
            <h1 className={styles.title} data-test-id="massage-title">
              <Message id={`servicesPage.massage.${massage.id}.title`} />
            </h1>
            <p className={styles.subtitle} data-test-id="massage-subtitle">
              <Message id={`servicesPage.massage.${massage.id}.subtitle`} />
            </p>
            <p className={styles.description} data-test-id="massage-description">
              <Message id={`servicesPage.massage.${massage.id}.description`} />
            </p>
          </div>
          <img className={styles.photo} src={massage.image} alt="" data-test-id="massage-photo" />
        </div>

        <div className={styles.rows} data-test-id="massage-detail-rows">
          {DETAIL_ROWS.map((row) => (
            <div key={row} className={styles.row} data-test-id={`massage-row-${row}`}>
              <span className={styles.rowLabel}>
                <Message id={`servicesPage.detail.${row}`} />
              </span>
              <span className={styles.rowValue}>
                <Message id={`servicesPage.massage.${massage.id}.${row}`} />
              </span>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Button to={ROUTES.contacts} data-test-id="massage-book">
            <Message id="servicesPage.detail.book" />
            <Arrow />
          </Button>
        </div>
      </section>

      <FaqList />
    </>
  )
}