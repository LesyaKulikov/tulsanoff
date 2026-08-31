import { Message } from '../../i18n/Message'
import styles from './Masters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg' },
  { n: '1', src: '/images/big-card-b.jpg' },
] as const

export function Masters() {
  return (
    <section className={styles.masters} data-test-id="masters">
      <h2 className={styles.heading} data-test-id="masters-heading">
        <Message id="masters.heading" />
      </h2>

      <div className={styles.grid}>
        {CARDS.map((card) => (
          <article key={card.n} className={styles.card} data-test-id={`master-card-${card.n}`}>
            <img className={styles.photo} src={card.src} alt="" />
            <div className={styles.overlay} />
            <div className={styles.text}>
              <h3 className={styles.name}>
                <Message id={`masters.${card.n}.name`} />
              </h3>
              <p className={styles.note}>
                <Message id={`masters.${card.n}.note`} />
              </p>
              <a className={styles.cta} href="#cta" data-test-id={`master-card-${card.n}-cta`}>
                <Message id={`masters.${card.n}.cta`} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
