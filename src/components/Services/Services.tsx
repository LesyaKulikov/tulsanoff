import { Message } from '../../i18n/Message'
import { ServiceIcon } from '../ServiceIcon/ServiceIcon'
import styles from './Services.module.css'

const SERVICE_IDS = ['0', '1', '2'] as const

export function Services() {
  return (
    <section className={styles.services}>
      <h2 className={styles.heading}>
        <Message id="services.heading" />
      </h2>

      <div className={styles.grid}>
        {SERVICE_IDS.map((n) => (
          <article key={n} className={styles.card}>
            <ServiceIcon />
            <h3 className={styles.cardTitle}>
              <Message id={`services.${n}.title`} />
            </h3>
            <p className={styles.cardBody}>
              <Message id={`services.${n}.body`} />
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
