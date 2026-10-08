import { motion } from 'framer-motion'
import { reveal, fadeIn } from '../../animation/variants'
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
          <motion.img
            key={i}
            className={styles.tile}
            src={tile.src}
            alt=""
            {...reveal(fadeIn(i * 0.1, 0.9))}
          />
        ))}
      </div>
    </section>
  )
}
