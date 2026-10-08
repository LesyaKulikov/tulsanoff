import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { reveal, fadeUp, scaleIn } from '../../animation/variants'
import styles from './Story.module.css'

export function Story() {
  return (
    <section className={styles.story} data-test-id="story">
      <motion.h2
        className={styles.heading}
        data-test-id="story-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="story.heading" />
      </motion.h2>
      <motion.p
        className={styles.subheading}
        data-test-id="story-subheading"
        {...reveal(fadeUp(0.1, { duration: 0.8, distance: 24 }))}
      >
        <Message id="story.subheading" />
      </motion.p>

      <motion.div
        className={styles.frame}
        data-test-id="story-frame"
        {...reveal(scaleIn(0.18, { from: 0.97, distance: 40, duration: 1 }))}
      >
        <img className={styles.poster} src="/images/video-frame.jpg" alt="" />
        <button type="button" className={styles.play} aria-label="Play video" data-test-id="story-play">
          <span className={styles.triangle} />
        </button>
      </motion.div>
    </section>
  )
}
