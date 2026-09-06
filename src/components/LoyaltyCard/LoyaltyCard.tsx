import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import styles from './LoyaltyCard.module.css'

export function LoyaltyCard() {
  return (
    <section className={styles.loyalty} data-test-id="services-loyalty">
      <h2 className={styles.heading} data-test-id="services-loyalty-heading">
        <Message id="servicesPage.loyalty.heading" />
      </h2>

      <p className={styles.number} data-test-id="services-loyalty-number">
        <Message id="servicesPage.loyalty.number" />
      </p>
      <p className={styles.note} data-test-id="services-loyalty-note">
        <Message id="servicesPage.loyalty.note" />
      </p>

      <Button to="/contacts" className={styles.cta} data-test-id="services-loyalty-cta">
        <Message id="servicesPage.loyalty.cta" />
      </Button>

      <div className={styles.strip} data-test-id="services-loyalty-strip">
        <img className={styles.stripPhoto} src="/images/cta-band.png" alt="" />
      </div>
    </section>
  )
}