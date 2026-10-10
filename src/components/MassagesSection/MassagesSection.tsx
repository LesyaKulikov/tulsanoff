import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Message } from '../../i18n/Message'
import { StudioCard } from '../StudioCard/StudioCard'
import { massageRoute } from '../../routes'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './MassagesSection.module.css'

const GRID = [
  { n: '0', src: '/images/meditsinskiy.jpg', slug: 'meditsinskiy' },
  { n: '1', src: '/images/massazh-litsa.jpg', slug: 'massazh-litsa' },
  { n: '2', src: '/images/limfaticheskiy.jpg', slug: 'limfaticheskiy' },
  { n: '3', src: '/images/sport.jpg', slug: 'sport' },
] as const

const CARDS = [
  { index: 0, slug: 'meditsinskiy' },
  { index: 1, slug: 'massazh-litsa' },
  { index: 2, slug: 'dlya-par' },
] as const

const PHOTO = [
  { n: '0', src: '/images/hero.jpg' },
  { n: '1', src: '/images/gallery-1.jpg' },
] as const

const MotionLink = motion.create(Link)

export function MassagesSection() {
  const cardClass = styles.card
  return (
    <section className={styles.massages} data-test-id="services-massages">
      <motion.h2
        className={styles.heading}
        data-test-id="services-massages-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.heading" />
      </motion.h2>

      <motion.div
        className={styles.hero}
        data-test-id="services-massages-hero"
        {...reveal(scaleIn(0.08, { from: 0.98, distance: 40, duration: 0.95 }))}
      >
        <img className={styles.heroPhoto} src="/images/hero.jpg" alt="" />
        <StudioCard index={CARDS[0].index} className={cardClass} to={massageRoute(CARDS[0].slug)} />
      </motion.div>

      <div className={styles.grid} data-test-id="services-massages-grid">
        {GRID.map((card, i) => (
          <MotionLink
            key={card.n}
            className={styles.tile}
            to={massageRoute(card.slug)}
            data-test-id={`services-massage-${card.n}`}
            {...reveal(fadeUp(0.05 + (i % 3) * 0.09, { duration: 0.75, distance: 30 }))}
          >
            <img className={styles.tilePhoto} src={card.src} alt="" />
            <span className={styles.tileOverlay} />
            <span className={styles.tileLabel}>
              <Message id={`servicesPage.label.${card.n}`} />
            </span>
          </MotionLink>
        ))}
      </div>

      <motion.div className={styles.row} {...reveal(scaleIn(0.1, { from: 0.98, distance: 40, duration: 0.95 }))}>
        <StudioCard index={CARDS[1].index} className={cardClass} to={massageRoute(CARDS[1].slug)} />
        <img className={styles.rowPhoto} src={PHOTO[0].src} alt="" />
      </motion.div>

      <motion.div className={styles.row} {...reveal(scaleIn(0.1, { from: 0.98, distance: 40, duration: 0.95 }))}>
        <img className={styles.rowPhoto} src={PHOTO[1].src} alt="" />
        <StudioCard index={CARDS[2].index} className={cardClass} to={massageRoute(CARDS[2].slug)} />
      </motion.div>
    </section>
  )
}
