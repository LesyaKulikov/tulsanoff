import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './LoyaltyCard.module.css'

export function LoyaltyCard() {
  return (
    <section className={styles.loyalty} data-test-id="services-loyalty">
      <motion.h2
        className={styles.heading}
        data-test-id="services-loyalty-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.loyalty.heading" />
      </motion.h2>

      <motion.p
        className={styles.number}
        data-test-id="services-loyalty-number"
        {...reveal(fadeUp(0.1, { duration: 0.85, distance: 40 }))}
      >
        <Message id="servicesPage.loyalty.number" />
      </motion.p>
      <motion.p
        className={styles.note}
        data-test-id="services-loyalty-note"
        {...reveal(fadeUp(0.18, { duration: 0.75, distance: 28 }))}
      >
        <Message id="servicesPage.loyalty.note" />
      </motion.p>

      <motion.div {...reveal(fadeUp(0.26, { duration: 0.7, distance: 24 }))}>
        <Button to="/contacts" className={styles.cta} data-test-id="services-loyalty-cta">
          <Message id="servicesPage.loyalty.cta" />
        </Button>
      </motion.div>
    </section>
  )
}
