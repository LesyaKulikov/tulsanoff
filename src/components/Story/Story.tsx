import { Message } from '../../i18n/Message'
import styles from './Story.module.css'

export function Story() {
  return (
    <section className={styles.story} data-test-id="story">
      <h2 className={styles.heading} data-test-id="story-heading">
        <Message id="story.heading" />
      </h2>
      <p className={styles.subheading} data-test-id="story-subheading">
        <Message id="story.subheading" />
      </p>

      <div className={styles.frame} data-test-id="story-frame">
        <img className={styles.poster} src="/images/video-frame.jpg" alt="" />
        <button type="button" className={styles.play} aria-label="Play video" data-test-id="story-play">
          <span className={styles.triangle} />
        </button>
      </div>
    </section>
  )
}
