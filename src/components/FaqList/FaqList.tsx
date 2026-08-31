import { Message } from '../../i18n/Message'
import { Chevron } from '../Chevron/Chevron'
import styles from './FaqList.module.css'

const ROW_IDS = ['0', '1', '2', '3', '4'] as const
const EXPANDED = '0'

export function FaqList() {
  return (
    <section className={styles.faq} data-test-id="faq">
      <h2 className={styles.heading} data-test-id="faq-heading">
        <Message id="faq.heading" />
      </h2>

      <div className={styles.panel}>
        {ROW_IDS.map((n) => (
          <div key={n} className={`${styles.row} ${n === EXPANDED ? styles.open : ''}`} data-test-id={`faq-row-${n}`}>
            <div className={styles.details}>
              <p className={styles.label}>
                <Message id={`faq.${n}.label`} />
              </p>
              {n === EXPANDED && (
                <p className={styles.body}>
                  <Message id={`faq.${n}.body`} />
                </p>
              )}
            </div>
            <Chevron />
          </div>
        ))}
      </div>
    </section>
  )
}
