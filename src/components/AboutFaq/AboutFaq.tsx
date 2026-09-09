import { Message } from '../../i18n/Message'
import { Chevron } from '../Chevron/Chevron'
import styles from './AboutFaq.module.css'

const ROW_IDS = ['0', '1', '2', '3', '4'] as const

export function AboutFaq() {
  return (
    <section className={styles.faq} data-test-id="about-faq">
      <h2 className={styles.heading} data-test-id="about-faq-heading">
        <Message id="aboutPage.faq.heading" />
      </h2>

      <div className={styles.panel}>
        {ROW_IDS.map((n) => (
          <div key={n} className={styles.row} data-test-id={`about-faq-row-${n}`}>
            <p className={styles.question}>
              <Message id={`faq.${n}.label`} />
            </p>
            <Chevron />
          </div>
        ))}
      </div>
    </section>
  )
}