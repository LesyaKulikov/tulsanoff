import { Message } from '../../i18n/Message'
import { ROUTES } from '../../routes'
import { Arrow } from '../Arrow/Arrow'
import { Button } from '../Button/Button'
import styles from './CertificateHero.module.css'

export function CertificateHero() {
  return (
    <section className={styles.hero} data-test-id="certificates-hero">
      <div className={styles.band}>
        <img className={styles.photo} src="/images/spa-bleed.png" alt="" />
        <article className={styles.card} data-test-id="certificates-hero-card">
          <h2 className={styles.title}>
            <Message id="certificates.hero.title" />
          </h2>
          <p className={styles.discount}>
            <Message id="certificates.hero.discount" />
          </p>
          <p className={styles.body}>
            <Message id="certificates.hero.body" />
          </p>
          <div className={styles.bottom}>
            <Button to={ROUTES.contacts} data-test-id="certificates-hero-cta">
              <Message id="certificates.hero.cta" />
              <Arrow />
            </Button>
          </div>
        </article>
      </div>
    </section>
  )
}