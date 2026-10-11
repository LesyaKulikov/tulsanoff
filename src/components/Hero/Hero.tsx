import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { enter, fadeUp } from '../../animation/variants'
import styles from './Hero.module.css'

const VIDEOS = ['/hero-video1.mp4', '/hero-video2.mp4']

export function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const loadedRef = useRef([false, false])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const video = videoRefs.current[activeVideo]
    if (video && showVideo) {
      video.play().catch(() => {})
    }
  }, [activeVideo, showVideo])

  const handleLoaded = useCallback((index: number) => {
    loadedRef.current[index] = true
    if (loadedRef.current.every(Boolean) && !showVideo) {
      setShowVideo(true)
    }
  }, [showVideo])

  const handleEnded = useCallback(() => {
    setActiveVideo((prev) => (prev + 1) % VIDEOS.length)
  }, [])

  return (
    <section className={styles.hero} data-test-id="hero">
      <img
        className={`${styles.background} ${showVideo ? styles.hidden : ''}`}
        src="/images/hero.jpg"
        alt=""
        decoding="async"
        fetchPriority="high"
      />
      <div className={styles.mediaLayer}>
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el }}
            className={`${styles.video} ${activeVideo === i && showVideo ? styles.active : ''}`}
            src={src}
            muted
            playsInline
            onCanPlay={() => handleLoaded(i)}
            onEnded={i === activeVideo ? handleEnded : undefined}
          />
        ))}
      </div>
      <div className={styles.scrim} />

      <div className={styles.content}>
        <motion.span className={styles.chip} data-test-id="hero-chip" {...enter(fadeUp(0.15, { duration: 0.7, distance: 24 }))}>
          <Message id="hero.chip" />
        </motion.span>
        <div className={styles.titleRow}>
          <motion.h1
            className={styles.title}
            data-test-id="hero-title"
            {...enter(fadeUp(0.28, { duration: 0.9, distance: 44 }))}
          >
            <Message id="hero.title" />
          </motion.h1>
          <motion.div className={styles.socials} {...enter(fadeUp(0.5, { duration: 0.7, distance: 24 }))}>
            <a
              href="https://t.me/tulsanoff_massage_studio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Telegram"
              data-test-id="hero-social-whatsapp"
            >
              <svg width="28" height="32" viewBox="0 0 448 512" fill="none" aria-hidden="true">
                <path
                  d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/tulsanoff_massage?stkn=MTZ0YWk5cjNqOGgzeg=="
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
              data-test-id="hero-social-instagram"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 1H16.5A6.5 6.5 0 0 1 23 7.5V16.5A6.5 6.5 0 0 1 16.5 23H7.5A6.5 6.5 0 0 1 1 16.5V7.5A6.5 6.5 0 0 1 7.5 1ZM12 7.1A4.9 4.9 0 1 0 12 16.9A4.9 4.9 0 1 0 12 7.1ZM12 8.65A3.35 3.35 0 1 0 12 15.35A3.35 3.35 0 1 0 12 8.65ZM17.2 5.4A1.4 1.4 0 1 0 17.2 8.2A1.4 1.4 0 1 0 17.2 5.4Z" fill="currentColor"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
