import { Message } from '../../i18n/Message'
import styles from './Video.module.css'

export function Video() {
  return (
    <section className={styles.video}>
      <h2 className={styles.heading}>
        <Message id="video.heading" />
      </h2>
      <p className={styles.subheading}>
        <Message id="video.subheading" />
      </p>

      <div className={styles.frame}>
        <img className={styles.poster} src="/images/video-frame.jpg" alt="" />
        <div className={styles.play} aria-label="play">
          <span className={styles.triangle} />
        </div>
      </div>
    </section>
  )
}
