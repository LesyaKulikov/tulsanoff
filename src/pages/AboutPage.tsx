import { Message } from '../i18n/Message'
import styles from './Page.module.css'

export function AboutPage() {
  return (
    <section className={styles.page} data-test-id="about-page">
      <Message id="about.heading" />
    </section>
  )
}
