import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { useLocale } from '../../i18n/localeContext'
import { CtaButton } from '../CtaButton/CtaButton'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { HERO_SOCIAL_LINKS } from '../../contacts'
import { enter, fadeUp } from '../../animation/variants'
import styles from './Hero.module.css'


const VIDEOS = ['/hero-video1.mp4', '/hero-video2.mp4']

export function Hero() {
  const { locale } = useLocale()
  const isRu = locale === 'ru-RU'
  const [activeVideo, setActiveVideo] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const failedRef = useRef([false, false])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Next clip that hasn't failed to load, or `from` when every clip has failed.
  const advancePast = useCallback((from: number): number => {
    for (let step = 1; step <= VIDEOS.length; step++) {
      const next = (from + step) % VIDEOS.length
      if (!failedRef.current[next]) return next
    }
    return from
  }, [])

  useEffect(() => {
    const video = videoRefs.current[activeVideo]
    if (video && showVideo && !prefersReducedMotion) {
      video.play().catch(() => {})
    }
  }, [activeVideo, showVideo, prefersReducedMotion])

  // Browsers pause autoplaying video when the tab is hidden or the OS enters a
  // power-saving state. Nothing restarts it otherwise, so the hero would freeze
  // mid-clip until a state change. Resume the active clip when we regain focus.
  useEffect(() => {
    if (prefersReducedMotion) return
    const resume = () => {
      if (document.visibilityState !== 'visible') return
      const video = videoRefs.current[activeVideo]
      if (video && showVideo && video.paused) video.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('focus', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('focus', resume)
    }
  }, [activeVideo, showVideo, prefersReducedMotion])

  const handleLoaded = useCallback(() => {
    // Reduced motion keeps the static hero.jpg poster instead of the crossfading video.
    if (prefersReducedMotion) return
    // Reveal as soon as the *first* clip is playable. Requiring every clip to load
    // meant one slow or missing file left the whole hero stuck on the static poster.
    if (!showVideo) setShowVideo(true)
  }, [prefersReducedMotion, showVideo])

  const handleEnded = useCallback(() => {
    setActiveVideo((prev) => advancePast(prev))
  }, [advancePast])

  const handleError = useCallback(
    (index: number) => {
      failedRef.current[index] = true
      // Every clip broken: fall back to the static poster, not a blank layer.
      if (failedRef.current.every(Boolean)) {
        setShowVideo(false)
        return
      }
      // Otherwise skip past the broken clip, but only if it's the one on screen.
      setActiveVideo((prev) => (prev === index ? advancePast(prev) : prev))
    },
    [advancePast],
  )

  return (
    <section className={styles.hero} data-test-id="hero">
      <img
        className={`${styles.background} ${showVideo ? styles.hidden : ''}`}
        src="/tulsanoff/images/hero.jpg"
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
            poster="/tulsanoff/images/hero.jpg"
            aria-hidden="true"
            muted
            playsInline
            onCanPlay={handleLoaded}
            onError={() => handleError(i)}
            onEnded={i === activeVideo ? handleEnded : undefined}
          />
        ))}
      </div>
      <div className={styles.scrim} />

      <div className={styles.content}>
        <div className={styles.topGroup}>
          <motion.span className={styles.chip} data-test-id="hero-chip" {...enter(fadeUp(0.15, { duration: 0.7, distance: 24 }))}>
            <Message id="hero.chip" />
          </motion.span>
          <div className={styles.titleRow}>
            <motion.h1
              className={`${styles.title} ${isRu ? styles.titleOriginal : ''}`}
              data-test-id="hero-title"
              {...enter(fadeUp(0.28, { duration: 0.9, distance: 44 }))}
            >
              <Message id="hero.title" />
            </motion.h1>
          </div>
        </div>
        <div className={styles.bottomRow}>
          <motion.div className={styles.cta} {...enter(fadeUp(0.62, { duration: 0.7, distance: 24 }))}>
            <CtaButton testId="hero-cta" />
          </motion.div>
          <motion.div className={styles.socials} {...enter(fadeUp(0.5, { duration: 0.7, distance: 24 }))}>
            <SocialLinks
              links={HERO_SOCIAL_LINKS}
              className={styles.socialBtn}
              testIdPrefix="hero-social"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
