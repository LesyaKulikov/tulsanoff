import { Message } from '../../i18n/Message'
import styles from './Story.module.css'

export function Story() {
  return (
    <section className={styles.story}>
      <h2 className={styles.heading}>
        <Message id="story.heading" />
      </h2>
      <p className={styles.subheading}>
        <Message id="story.subheading" />
      </p>

      <div className={styles.frame}>
        <img className={styles.poster} src="/images/video-frame.jpg" alt="" />
        <button type="button" className={styles.play} aria-label="Play video">
          <span className={styles.triangle} />
        </button>
      </div>
    </section>
  )
}
