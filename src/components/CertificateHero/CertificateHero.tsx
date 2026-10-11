import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { ROUTES } from '../../routes'
import { Arrow } from '../Arrow/Arrow'
import { Button } from '../Button/Button'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './CertificateHero.module.css'

export function CertificateHero() {
  return (
    <section className={styles.hero} data-test-id="certificates-hero">
      <div className={styles.band}>
        <motion.img
          className={styles.photo}
          src="/images/spa-bleed.webp"
          alt=""
          decoding="async"
          fetchPriority="high"
          {...reveal(scaleIn(0, { from: 1.06, distance: 0, duration: 1.2 }))}
        />
        <article className={styles.card} data-test-id="certificates-hero-card">
          <motion.h2 className={styles.title} {...reveal(fadeUp(0.12, { duration: 0.85, distance: 32 }))}>
            <Message id="certificates.hero.title" />
          </motion.h2>
          <motion.p className={styles.discount} {...reveal(fadeUp(0.2, { duration: 0.8, distance: 28 }))}>
            <Message id="certificates.hero.discount" />
          </motion.p>
          <motion.p className={styles.body} {...reveal(fadeUp(0.28, { duration: 0.8, distance: 24 }))}>
            <Message id="certificates.hero.body" />
          </motion.p>
          <motion.div className={styles.bottom} {...reveal(fadeUp(0.36, { duration: 0.7, distance: 24 }))}>
            <Button to={ROUTES.contacts} data-test-id="certificates-hero-cta">
              <Message id="certificates.hero.cta" />
              <Arrow />
            </Button>
          </motion.div>
        </article>
      </div>
    </section>
  )
}
