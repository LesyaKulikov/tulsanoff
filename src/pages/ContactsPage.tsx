import { Message } from '../i18n/Message'
import styles from './Page.module.css'

export function ContactsPage() {
  return (
    <section className={styles.page} data-test-id="contacts-page">
      <Message id="contacts.heading" />
    </section>
  )
}
