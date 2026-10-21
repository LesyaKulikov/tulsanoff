import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { ServiceCard } from '../ServiceCard/ServiceCard'
import { getMassage } from '../../massages'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './ServicesMasonry.module.css'

const CATEGORIES = [
  {
    id: 'cat0',
    slugs: ['meditsinskiy', 'sport', 'limfaticheskiy'],
    featured: ['meditsinskiy'],
  },
  {
    id: 'cat1',
    slugs: ['massazh-litsa', 'relaks', 'shvedskiy', 'anti-tsellyulit'],
    featured: ['relaks'],
  },
  {
    id: 'cat2',
    slugs: ['dlya-par'],
    featured: ['dlya-par'],
  },
]

export function ServicesMasonry() {
  return (
    <section className={styles.services} data-test-id="services-masonry">
      <motion.h2
        className={styles.heading}
        data-test-id="services-masonry-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="servicesPage.heading" />
      </motion.h2>
      {CATEGORIES.map((cat, catIndex) => {
        // Stagger index is derived from the map positions, never mutated while rendering.
        const baseIndex = CATEGORIES.slice(0, catIndex).reduce((n, c) => n + c.slugs.length, 0)
        return (
          <div key={cat.id} className={styles.category}>
            <motion.h3
              className={styles.categoryHeading}
              {...reveal(fadeUp(0, { duration: 0.7, distance: 24, opacity: 0.6 }))}
            >
              <Message id={`services.${cat.id}`} />
            </motion.h3>
            <div className={styles.masonry}>
              {cat.slugs.map((slug, slugIndex) => {
                const massage = getMassage(slug)
                if (!massage) return null
                const isFeatured = cat.featured.includes(slug)
                return (
                  <ServiceCard
                    key={slug}
                    slug={slug}
                    image={massage.image}
                    label={`servicesPage.massage.${slug}.title`}
                    index={baseIndex + slugIndex}
                    className={isFeatured ? styles.featured : styles.regular}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}
