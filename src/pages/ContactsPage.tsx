import { motion } from 'framer-motion'
import { Message } from '../i18n/Message'
import { reveal, fadeUp } from '../animation/variants'
import styles from './Page.module.css'

export function ContactsPage() {
  return (
    <motion.section
      className={styles.page}
      data-test-id="contacts-page"
      {...reveal(fadeUp(0.05, { duration: 0.8, distance: 32 }))}
    >
      <Message id="contacts.heading" />
    </motion.section>
  )
}
