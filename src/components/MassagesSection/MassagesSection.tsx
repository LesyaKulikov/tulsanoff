import { Message } from '../../i18n/Message'
import { StudioCard } from '../StudioCard/StudioCard'
import styles from './MassagesSection.module.css'

const GRID = [
  { n: '0', src: '/images/gallery-1.jpg' },
  { n: '1', src: '/images/gallery-2.jpg' },
  { n: '2', src: '/images/gallery-3.jpg' },
  { n: '3', src: '/images/video-frame.jpg' },
  { n: '4', src: '/images/big-card-a.jpg' },
  { n: '5', src: '/images/big-card-b.jpg' },
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
        <StudioCard index={0} className={cardClass} />
      </div>

      <div className={styles.grid} data-test-id="services-massages-grid">
        {GRID.map((card) => (
          <article key={card.n} className={styles.tile} data-test-id={`services-massage-${card.n}`}>
            <img className={styles.tilePhoto} src={card.src} alt="" />
            <span className={styles.tileOverlay} />
            <span className={styles.tileLabel}>
              <Message id={`servicesPage.label.${card.n}`} />
            </span>
          </article>
        ))}
      </div>

      <div className={styles.row}>
        <StudioCard index={1} className={cardClass} />
        <img className={styles.rowPhoto} src={PHOTO[0].src} alt="" />
      </div>

      <div className={styles.row}>
        <img className={styles.rowPhoto} src={PHOTO[1].src} alt="" />
        <StudioCard index={2} className={cardClass} />
      </div>
    </section>
  )
}