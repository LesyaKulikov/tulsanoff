import { Message } from '../../i18n/Message'
import styles from './AboutMasters.module.css'

const CARDS = [
  { n: '0', src: '/images/big-card-a.jpg', align: styles.right },
  { n: '1', src: '/images/big-card-b.jpg', align: styles.left },
] as const

export function AboutMasters() {
  return (
    <section className={styles.masters} data-test-id="about-masters">
      {CARDS.map((card) => (
        <article
          key={card.n}
          className={`${styles.card} ${card.align}`}
          data-test-id={`about-master-${card.n}`}
        >
          <img className={styles.photo} src={card.src} alt="" />
          <div className={styles.text}>
            <h3 className={styles.name}>
              <Message id={`aboutPage.masters.${card.n}.name`} />
            </h3>
            <p className={styles.tagline}>
              <Message id={`aboutPage.masters.${card.n}.tagline`} />
            </p>
            <p className={styles.body}>
              <Message id={`aboutPage.masters.${card.n}.body`} />
            </p>
          </div>
        </article>
      ))}
    </section>
  )
}