import styles from './AboutGallery.module.css'

const TILES = [
  { src: '/images/gallery-1.jpg' },
  { src: '/images/gallery-2.jpg' },
  { src: '/images/gallery-3.jpg' },
  { src: '/images/gallery-2.jpg' },
] as const

export function AboutGallery() {
  return (
    <section className={styles.gallery} data-test-id="about-gallery">
      <div className={styles.strip}>
        {TILES.map((tile, i) => (
          <img key={i} className={styles.tile} src={tile.src} alt="" />
        ))}
      </div>
    </section>
  )
}