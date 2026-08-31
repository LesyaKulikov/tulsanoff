import { useRef, useState, useCallback, useEffect } from 'react'
import { Button } from '../Button/Button'
import { Arrow } from '../Arrow/Arrow'
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
        <div className={styles.left}>
          <span className={styles.chip} data-test-id="hero-chip">
            <Message id="hero.chip" />
          </span>
          <h1 className={styles.title} data-test-id="hero-title">
            <Message id="hero.title" />
          </h1>
        </div>

        <div className={styles.right}>
          <Button variant="primary" href="#cta" data-test-id="hero-cta">
            <Message id="hero.cta" />
            <Arrow />
          </Button>
          <p className={styles.note} data-test-id="hero-note">
            <Message id="hero.note" />
          </p>
        </div>
      </div>
    </section>
  )
}
