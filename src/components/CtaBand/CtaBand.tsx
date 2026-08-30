import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
import { Message } from '../../i18n/Message'
import styles from './CtaBand.module.css'

export function CtaBand() {
  return (
    <section className={styles.cta} id="cta">
      <img className={styles.background} src="/images/cta-band.png" alt="" />
      <div className={styles.scrim} />

      <div className={styles.content}>
        <h2 className={styles.heading}>
          <Message id="cta.heading" />
        </h2>
        <p className={styles.body}>
          <Message id="cta.body" />
        </p>
        <Button variant="primary">
          <Message id="cta.button" />
          <Arrow />
        </Button>
      </div>
    </section>
  )
}
