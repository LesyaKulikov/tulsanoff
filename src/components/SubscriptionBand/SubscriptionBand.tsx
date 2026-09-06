import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import styles from './SubscriptionBand.module.css'

export function SubscriptionBand() {
  return (
    <section className={styles.plan} data-test-id="services-plan">
      <div className={styles.band} data-test-id="services-plan-band">
        <img className={styles.photo} src="/images/spa-bleed.png" alt="" />
        <div className={styles.glow} />

        <h2 className={styles.heading} data-test-id="services-plan-heading">
          <Message id="servicesPage.plan.heading" />
        </h2>

        <article className={styles.card} data-test-id="services-plan-card">
          <h3 className={styles.title}>
            <Message id="servicesPage.plan.title" />
          </h3>
          <p className={styles.type}>
            <Message id="servicesPage.plan.type" />
          </p>
          <p className={styles.body}>
            <Message id="servicesPage.plan.body" />
          </p>
          <div className={styles.bottom}>
            <span className={styles.price}>
              <Message id="servicesPage.plan.price" />
            </span>
            <Button variant="inverse" to="/contacts" data-test-id="services-plan-cta">
              <Message id="servicesPage.more" />
            </Button>
          </div>
        </article>
      </div>
    </section>
  )
}