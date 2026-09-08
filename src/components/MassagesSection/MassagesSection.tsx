import { Link } from 'react-router-dom'
import { Message } from '../../i18n/Message'
import { StudioCard } from '../StudioCard/StudioCard'
import { massageRoute } from '../../routes'
import styles from './MassagesSection.module.css'

const GRID = [
  { n: '0', src: '/images/gallery-1.jpg', slug: 'relaks' },
  { n: '1', src: '/images/gallery-2.jpg', slug: 'sport' },
  { n: '2', src: '/images/gallery-3.jpg', slug: 'glubokotkanniy' },
  { n: '3', src: '/images/video-frame.jpg', slug: 'shvedskiy' },
  { n: '4', src: '/images/big-card-a.jpg', slug: 'limfaticheskiy' },
  { n: '5', src: '/images/big-card-b.jpg', slug: 'anti-tsellyulit' },
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

export function MassagesSection() {
  const cardClass = styles.card
  return (
    <section className={styles.massages} data-test-id="services-massages">
      <h2 className={styles.heading} data-test-id="services-massages-heading">
        <Message id="servicesPage.heading" />
      </h2>

      <div className={styles.hero} data-test-id="services-massages-hero">
        <img className={styles.heroPhoto} src="/images/hero.jpg" alt="" />
        <StudioCard index={CARDS[0].index} className={cardClass} to={massageRoute(CARDS[0].slug)} />
      </div>

      <div className={styles.grid} data-test-id="services-massages-grid">
        {GRID.map((card) => (
          <Link
            key={card.n}
            className={styles.tile}
            to={massageRoute(card.slug)}
            data-test-id={`services-massage-${card.n}`}
          >
            <img className={styles.tilePhoto} src={card.src} alt="" />
            <span className={styles.tileOverlay} />
            <span className={styles.tileLabel}>
              <Message id={`servicesPage.label.${card.n}`} />
            </span>
          </Link>
        ))}
      </div>

      <div className={styles.row}>
        <StudioCard index={CARDS[1].index} className={cardClass} to={massageRoute(CARDS[1].slug)} />
        <img className={styles.rowPhoto} src={PHOTO[0].src} alt="" />
      </div>

      <div className={styles.row}>
        <img className={styles.rowPhoto} src={PHOTO[1].src} alt="" />
        <StudioCard index={CARDS[2].index} className={cardClass} to={massageRoute(CARDS[2].slug)} />
      </div>
    </section>
  )
}