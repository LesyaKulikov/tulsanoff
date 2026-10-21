import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Message } from '../i18n/Message'
import { reveal, fadeUp } from '../animation/variants'
import { ROUTES } from '../routes'
import styles from './Page.module.css'

export function NotFoundPage() {
  return (
    <motion.section
      className={styles.page}
      data-test-id="not-found-page"
      {...reveal(fadeUp(0.05, { duration: 0.8, distance: 32 }))}
    >
      <h1 className={styles.heading}>
        <Message id="notFound.heading" />
      </h1>
      <p className={styles.body}>
        <Message id="notFound.body" />
      </p>
      <Link className={styles.link} to={ROUTES.home} data-test-id="not-found-home">
        <Message id="notFound.cta" />
      </Link>
    </motion.section>
  )
}
