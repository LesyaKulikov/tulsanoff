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
          src={`${import.meta.env.BASE_URL}images/Free_Business_Card_Mockup_2@2x.jpg`}"
          alt=""
          decoding="async"
          fetchPriority="high"
          {...reveal(scaleIn(0, { from: 1.06, distance: 0, duration: 1.2 }))}
        />
      </div>

      <article className={styles.card} data-test-id="certificates-hero-card">
        <motion.h2 className={styles.title} {...reveal(fadeUp(0.12, { duration: 0.85, distance: 32 }))}>
          <Message id="certificates.hero.title" />
        </motion.h2>
        <motion.p className={styles.type} {...reveal(fadeUp(0.16, { duration: 0.85, distance: 28 }))}>
          <Message id="certificates.hero.type" />
        </motion.p>
        <motion.p className={styles.body} {...reveal(fadeUp(0.2, { duration: 0.8, distance: 24 }))}>
          <Message
            id="certificates.hero.body"
            values={{
              gift: (chunks) => <span className={styles.nowrap}>{chunks}</span>,
            }}
          />
        </motion.p>
        <motion.ul className={styles.benefits} {...reveal(fadeUp(0.24, { duration: 0.8, distance: 20 }))}>
          <li><Message id="certificates.hero.benefit.0" /></li>
          <li><Message id="certificates.hero.benefit.1" /></li>
          <li><Message id="certificates.hero.benefit.2" /></li>
          <li><Message id="certificates.hero.benefit.3" /></li>
        </motion.ul>
        <motion.div className={styles.bottom} {...reveal(fadeUp(0.36, { duration: 0.7, distance: 24 }))}>

          <Button to={ROUTES.contacts} data-test-id="certificates-hero-cta">
            <Message id="certificates.hero.cta" />
            <Arrow />
          </Button>
        </motion.div>
      </article>
    </section>
  )
}