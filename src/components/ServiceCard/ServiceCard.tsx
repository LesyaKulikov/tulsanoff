import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Message } from '../../i18n/Message'
import { Arrow } from '../Arrow/Arrow'
import { massageRoute } from '../../routes'
import { reveal, scaleIn } from '../../animation/variants'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  slug: string
  image: string
  label: string
  index?: number
  className?: string
  objectPosition?: string
}

export function ServiceCard({ slug, image, label, index = 0, className, objectPosition }: ServiceCardProps) {
  return (
    <motion.div
      className={`${styles.card} ${className || ''}`}
      data-test-id={`service-card-${slug}`}
      {...reveal(scaleIn(index * 0.06, { from: 0.97, distance: 34, duration: 0.85 }))}
    >
      <Link to={massageRoute(slug)} className={styles.link}>
        <div className={styles.media}>
          <img
            className={styles.photo}
            src={image}
            alt=""
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
        <span className={styles.labelBar}>
          <span className={styles.label}>
            <Message id={label} />
          </span>
          <span className={styles.arrow}>
            <Arrow style={{ width: 28, height: 28 }} />
          </span>
        </span>
      </Link>
    </motion.div>
  )
}
