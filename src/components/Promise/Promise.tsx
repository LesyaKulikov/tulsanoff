import { Message } from '../../i18n/Message'
import styles from './Promise.module.css'

export function Promise() {
  return (
    <section className={styles.promise} data-test-id="promise">
      <div className={styles.band}>
        <img
          className={styles.lead}
          src="/images/big-card-a.jpg"
          alt=""
          data-test-id="promise-media-lead"
        />

        <div className={styles.copy} data-test-id="promise-copy">
          <h2 className={styles.title} data-test-id="promise-title">
            <Message
              id="promise.title"
              values={{
                accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
              }}
            />
          </h2>
          <p className={styles.body} data-test-id="promise-body">
            <Message id="promise.body" />
          </p>
        </div>
      </div>
    </section>
  )
}
