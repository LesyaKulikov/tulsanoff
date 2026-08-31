import { Message } from '../../i18n/Message'
import styles from './Approach.module.css'

const STEPS = ['0', '1', '2'] as const

export function Approach() {
  return (
    <section className={styles.approach} data-test-id="approach">
      <p className={styles.note} data-test-id="approach-note">
        <Message id="approach.note" />
      </p>
      <div className={styles.grid}>
        {STEPS.map((n) => (
          <article key={n} className={styles.card} data-test-id={`approach-step-${n}`}>
            <span className={styles.num}>
              <Message id={`approach.${n}.num`} />
            </span>
            <h3 className={styles.title}>
              <Message id={`approach.${n}.title`} />
            </h3>
            <p className={styles.body}>
              <Message id={`approach.${n}.body`} />
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
