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
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="currentColor"/>
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
