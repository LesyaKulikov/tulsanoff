import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './AboutMasters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg', align: styles.right },
  { n: '1', src: '/images/big-card-b.jpg', align: styles.left },
] as const

export function AboutMasters() {
  return (
    <section className={styles.masters} data-test-id="about-masters">
      {CARDS.map((card, i) => (
        <motion.article
          key={card.n}
          className={`${styles.card} ${card.align}`}
          data-test-id={`about-master-${card.n}`}
          {...reveal(scaleIn(i * 0.12, { from: 0.98, distance: 48, duration: 1 }))}
        >
          <img className={styles.photo} src={card.src} alt="" />
          <div className={styles.text}>
            <h3 className={styles.name}>
              <Message id={`aboutPage.masters.${card.n}.name`} />
            </h3>
            <p className={styles.tagline}>
              <Message id={`aboutPage.masters.${card.n}.tagline`} />
            </p>
            <motion.p
              className={styles.body}
              {...reveal(fadeUp(0.15, { duration: 0.8, distance: 24 }))}
            >
              <Message id={`aboutPage.masters.${card.n}.body`} />
            </motion.p>
          </div>
        </motion.article>
      ))}
    </section>
  )
}
