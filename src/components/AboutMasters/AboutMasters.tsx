import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './AboutMasters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg' },
  { n: '1', src: '/images/big-card-b.jpg' },
] as const

export function AboutMasters() {
  return (
    <section className={styles.masters} data-test-id="about-masters">
      <motion.h2
        className={styles.heading}
        data-test-id="about-masters-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="aboutPage.masters.heading" />
      </motion.h2>

      <div className={styles.list}>
        {CARDS.map((card, i) => (
          <motion.article
            key={card.n}
            className={`${styles.panel} ${i % 2 === 1 ? styles.reverse : ''}`}
            data-test-id={`about-master-${card.n}`}
            {...reveal(scaleIn(i * 0.12, { from: 0.98, distance: 48, duration: 1 }))}
          >
            <div className={styles.media}>
              <img className={styles.photo} src={card.src} alt="" loading="lazy" decoding="async" />
            </div>

            <div className={styles.content}>
              <div className={styles.topline}>
                <span className={styles.index} data-test-id={`about-master-${card.n}-index`}>
                  <Message id={`aboutPage.masters.${card.n}.index`} />
                </span>
              </div>

              <div className={styles.identity}>
                <h3 className={styles.name} data-test-id={`about-master-${card.n}-name`}>
                  <Message id={`aboutPage.masters.${card.n}.name`} />
                </h3>
                <p className={styles.role} data-test-id={`about-master-${card.n}-role`}>
                  <Message id={`aboutPage.masters.${card.n}.role`} />
                </p>
              </div>

              <span className={styles.rule} />

              <div className={styles.body}>
                <motion.p
                  data-test-id={`about-master-${card.n}-bio`}
                  {...reveal(fadeUp(0.1, { duration: 0.8, distance: 24 }))}
                >
                  <Message id={`aboutPage.masters.${card.n}.bio`} />
                </motion.p>
                <motion.p {...reveal(fadeUp(0.18, { duration: 0.8, distance: 24 }))}>
                  <Message id={`aboutPage.masters.${card.n}.bio2`} />
                </motion.p>
              </div>

                <span className={styles.exp} data-test-id={`about-master-${card.n}-experience`}>
                  <span className={styles.expValue}>
                    <Message id={`aboutPage.masters.${card.n}.experience`} />
                  </span>
                  <span className={styles.expLabel}>
                    <Message id={`aboutPage.masters.${card.n}.experienceLabel`} />
                  </span>
                </span>
              </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
