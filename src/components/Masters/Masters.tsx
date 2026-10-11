import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './Masters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg' },
  { n: '1', src: '/images/big-card-b.jpg' },
] as const

export function Masters() {
  return (
    <section className={styles.masters} data-test-id="masters">
      <motion.h2
        className={styles.heading}
        data-test-id="masters-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="masters.heading" />
      </motion.h2>

      <div className={styles.grid}>
        {CARDS.map((card, i) => (
          <motion.article
            key={card.n}
            className={styles.card}
            data-test-id={`master-card-${card.n}`}
            {...reveal(scaleIn(i * 0.12, { from: 0.97, distance: 44, duration: 0.95 }))}
          >
            <img className={styles.photo} src={card.src} alt="" loading="lazy" decoding="async" />
            <div className={styles.overlay} />
            <div className={styles.text}>
              <h3 className={styles.name}>
                <Message id={`masters.${card.n}.name`} />
              </h3>
              <p className={styles.role}>
                <Message id={`masters.${card.n}.role`} />
              </p>
            </div>
            <div className={styles.hoverOverlay} />
            <div className={styles.hoverLink}>
              <span className={styles.hoverText}>
                <Message id={`masters.${card.n}.cta`} />
              </span>
              <Arrow style={{ width: 16, height: 16 }} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
