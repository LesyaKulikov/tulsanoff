import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { CtaButton } from '../CtaButton/CtaButton'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { HERO_SOCIAL_LINKS } from '../../contacts'
import { enter, fadeUp } from '../../animation/variants'
import styles from './Hero.module.css'


const VIDEOS = ['/hero-video1.mp4', '/hero-video2.mp4']

export function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const loadedRef = useRef([false, false])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const video = videoRefs.current[activeVideo]
    if (video && showVideo && !prefersReducedMotion) {
      video.play().catch(() => {})
    }
  }, [activeVideo, showVideo, prefersReducedMotion])

  const handleLoaded = useCallback((index: number) => {
    loadedRef.current[index] = true
    // Reduced motion keeps the static hero.jpg poster instead of the crossfading video.
    if (prefersReducedMotion) return
    if (loadedRef.current.every(Boolean) && !showVideo) {
      setShowVideo(true)
    }
  }, [prefersReducedMotion, showVideo])

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
            poster="/images/hero.jpg"
            aria-hidden="true"
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
            <SocialLinks
              links={HERO_SOCIAL_LINKS}
              className={styles.socialBtn}
              testIdPrefix="hero-social"
            />
          </motion.div>
        </div>
        <motion.div className={styles.cta} {...enter(fadeUp(0.62, { duration: 0.7, distance: 24 }))}>
          <CtaButton testId="hero-cta" />
        </motion.div>
      </div>
    </section>
  )
}
