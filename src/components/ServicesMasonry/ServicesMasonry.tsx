import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './ServicesMasonry.module.css'

const CATEGORIES = [
  {
    id: 'cat0',
    slugs: ['meditsinskiy', 'sport', 'glubokotkanniy', 'limfaticheskiy'],
    featured: ['meditsinskiy'],
  },
  {
    id: 'cat1',
    slugs: ['massazh-litsa', 'relaks', 'anti-tsellyulit'],
    featured: ['relaks'],
  },
  {
    id: 'cat2',
    slugs: ['dlya-par'],
    featured: ['dlya-par'],
  },
]

const IMAGE_MAP: Record<string, string> = {
  meditsinskiy: '/images/meditsinskiy.jpg',
  'massazh-litsa': '/images/massazh-litsa.jpg',
  'dlya-par': '/images/dlya-par.jpg',
  relaks: '/images/relaks.jpg',
  sport: '/images/sport.jpg',
  glubokotkanniy: '/images/gallery-3.jpg',
  limfaticheskiy: '/images/limfaticheskiy.jpg',
  'anti-tsellyulit': '/images/anti-tsellyulit.jpg',
}

export function ServicesMasonry() {
  let cardIndex = 0

  return (
    <section className={styles.services} data-test-id="services-masonry">
      <motion.h2
        className={styles.heading}
        data-test-id="services-masonry-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.heading" />
      </motion.h2>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className={styles.category}>
          <motion.h3
            className={styles.categoryHeading}
            {...reveal(fadeUp(0, { duration: 0.7, distance: 24 }))}
          >
            <Message id={`services.${cat.id}`} />
          </motion.h3>
          <div className={styles.masonry}>
            {cat.slugs.map((slug) => {
              const idx = cardIndex++
              const isFeatured = cat.featured.includes(slug)
              return (
                <ServiceCard
                  key={slug}
                  slug={slug}
                  image={IMAGE_MAP[slug]}
                  label={`servicesPage.massage.${slug}.title`}
                  index={idx}
                  className={isFeatured ? styles.featured : styles.regular}
                />
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
