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
          <div className={styles.lede}>
            <h2 className={styles.title} data-test-id="promise-title">
              <Message id="promise.title" />
            </h2>
            <p className={styles.tagline} data-test-id="promise-tagline">
              <Message id="promise.tagline" />
            </p>
          </div>
          <p className={styles.body} data-test-id="promise-body">
            <Message id="promise.body" />
          </p>
        </div>

        <img
          className={styles.trail}
          src="/images/big-card-b.jpg"
          alt=""
          data-test-id="promise-media-trail"
        />
      </div>
    </section>
  )
}
