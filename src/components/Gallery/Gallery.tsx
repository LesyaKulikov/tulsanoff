import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import styles from './Gallery.module.css'

const ITEMS = [
  { n: '0', src: '/images/gallery-1.jpg' },
  { n: '1', src: '/images/gallery-2.jpg' },
  { n: '2', src: '/images/gallery-3.jpg' },
] as const

export function Gallery() {
  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        {ITEMS.map((item) => (
          <figure key={item.n} className={styles.card}>
            <img className={styles.photo} src={item.src} alt="" />
            <figcaption className={styles.captionBar}>
              <span>
                <Message id={`gallery.${item.n}.caption`} />
              </span>
              <Arrow />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
