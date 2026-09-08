import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import styles from './StudioCard.module.css'

interface StudioCardProps {
  index: number
  className?: string
  to?: string
}

export function StudioCard({ index, className, to }: StudioCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')} data-test-id={`service-card-${index}`}>
      <h3 className={styles.title}>
        <Message id={`servicesPage.card.${index}.title`} />
      </h3>
      <p className={styles.type}>
        <Message id={`servicesPage.card.${index}.type`} />
      </p>
      <p className={styles.body}>
        <Message id={`servicesPage.card.${index}.body`} />
      </p>
      <Button variant="inverse" to={to ?? '/contacts'} className={styles.cta} data-test-id={`service-card-${index}-cta`}>
        <Message id="servicesPage.more" />
      </Button>
    </article>
  )
}