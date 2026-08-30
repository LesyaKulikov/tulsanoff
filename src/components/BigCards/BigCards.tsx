import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './BigCards.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg' },
  { n: '1', src: '/images/big-card-b.jpg' },
] as const

export function BigCards() {
  return (
    <section className={styles.bigCards}>
      <h2 className={styles.heading}>
        <Message id="bigCards.heading" />
      </h2>

      <div className={styles.grid}>
        {CARDS.map((card) => (
          <article key={card.n} className={styles.card}>
            <img className={styles.photo} src={card.src} alt="" />
            <div className={styles.overlay} />
            <div className={styles.text}>
              <h3 className={styles.title}>
                <Message id={`bigCards.${card.n}.title`} />
              </h3>
              <p className={styles.subtitle}>
                <Message id={`bigCards.${card.n}.subtitle`} />
              </p>
              <Button variant="inverse" href="#cta">
                <Message id={`bigCards.${card.n}.cta`} />
                <Arrow color="#000" />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
