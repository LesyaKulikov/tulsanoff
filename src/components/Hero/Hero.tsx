import { useRef, useState, useCallback, useEffect } from 'react'
import { Message } from '../../i18n/Message'
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
        <span className={styles.chip} data-test-id="hero-chip">
          <Message id="hero.chip" />
        </span>
        <div className={styles.titleRow}>
          <h1 className={styles.title} data-test-id="hero-title">
            <Message id="hero.title" />
          </h1>
          <div className={styles.socials}>
            <a
              href="https://t.me/"
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
              href="https://instagram.com/youraccount"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
              data-test-id="hero-social-instagram"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
