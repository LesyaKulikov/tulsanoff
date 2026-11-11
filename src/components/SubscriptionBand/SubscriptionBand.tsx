import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { CtaButton } from '../CtaButton/CtaButton'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './SubscriptionBand.module.css'

export function SubscriptionBand() {
  return (
    <section className={styles.plan} data-test-id="services-plan">
      <motion.div
        className={styles.band}
        data-test-id="services-plan-band"
        {...reveal(fadeUp(0, { duration: 0.95, distance: 48 }))}
      >
        <img className={styles.photo} src={`${import.meta.env.BASE_URL}images/plan-band.jpg`} alt="" loading="lazy" decoding="async" />
        <div className={styles.glow} />

        <div className={styles.inner} data-test-id="services-plan-inner">
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
            <p className={styles.note}>
              <Message id="servicesPage.plan.note" />
            </p>
            <div className={styles.bottom}>
              <CtaButton testId="services-plan-cta" />
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  )
}
