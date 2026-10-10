import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { MASSAGES } from '../../massages'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './ServicesGrid.module.css'

export function ServicesGrid() {
  return (
    <section className={styles.services} data-test-id="services-grid">
      <motion.h2
        className={styles.heading}
        data-test-id="services-grid-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.heading" />
      </motion.h2>
      <div className={styles.grid}>
        {MASSAGES.map((m, i) => (
          <ServiceCard
            key={m.id}
            slug={m.id}
            image={m.image}
            label={`servicesPage.massage.${m.id}.title`}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
