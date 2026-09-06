import { Message } from '../i18n/Message'
import styles from './Page.module.css'

export function CertificatesPage() {
  return (
    <section className={styles.page} data-test-id="certificates-page">
      <Message id="certificates.heading" />
    </section>
  )
}
