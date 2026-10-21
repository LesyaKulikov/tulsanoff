import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import { reveal, fadeUp } from '../../animation/variants'
import { ROUTES } from '../../routes'
import styles from './LoyaltyCard.module.css'

/** Intrinsic size of public/images/loyalty-card.jpg. Together with
 * `aspect-ratio` on `.card`, this keeps the 3D card (and the CTA below it)
 * from jumping while the image loads. */
const CARD_IMG = { width: 1600, height: 861 } as const

export function LoyaltyCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    // Live queries: toggling OS hover / reduced-motion in settings takes
    // effect without a page reload.
    const hoverMQ = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)')

    let tracking = false

    const rotateToMouse = (e: PointerEvent) => {
      // Re-read on every move: the card can scroll or resize mid-hover, and a
      // stale rect would skew both the tilt axis and the highlight position.
      const bounds = card.getBoundingClientRect()
      const center = {
        x: e.clientX - bounds.left - bounds.width / 2,
        y: e.clientY - bounds.top - bounds.height / 2,
      }
      const distance = Math.max(Math.sqrt(center.x ** 2 + center.y ** 2), 1)

      card.style.transform = `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.min(Math.log(distance) * 2, 14)}deg
        )
      `

      // `center` is already relative to the card's middle, so adding half the
      // card back places the highlight exactly at the cursor. (The old ×2
      // swept it from -0.5w to 1.5w — half of it outside the card, moving at
      // twice the cursor speed.)
      glow.style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x + bounds.width / 2}px
          ${center.y + bounds.height / 2}px,
          rgb(255 255 255 / 33%),
          rgb(0 0 0 / 6%)
        )
      `
    }

    const stopTracking = () => {
      document.removeEventListener('pointermove', rotateToMouse)
      // '' restores the CSS transition so the card eases back to flat.
      card.style.transition = ''
      card.style.transform = ''
      glow.style.backgroundImage = ''
    }

    const onMouseEnter = () => {
      card.style.transition = 'none'
      document.addEventListener('pointermove', rotateToMouse)
    }

    const setTracking = (on: boolean) => {
      if (on === tracking) return
      tracking = on
      if (on) {
        card.addEventListener('mouseenter', onMouseEnter)
        card.addEventListener('mouseleave', stopTracking)
      } else {
        card.removeEventListener('mouseenter', onMouseEnter)
        card.removeEventListener('mouseleave', stopTracking)
        stopTracking()
      }
    }

    const sync = () => setTracking(hoverMQ.matches && !reduceMQ.matches)
    sync()
    hoverMQ.addEventListener('change', sync)
    reduceMQ.addEventListener('change', sync)

    return () => {
      hoverMQ.removeEventListener('change', sync)
      reduceMQ.removeEventListener('change', sync)
      setTracking(false)
    }
  }, [])

  return (
    <section className={styles.loyalty} data-test-id="services-loyalty">
      <motion.div className={styles.stage} {...reveal(fadeUp(0, { duration: 0.9, distance: 48 }))}>
        <div ref={cardRef} className={styles.card} data-test-id="services-loyalty-card">
          <img
            className={styles.image}
            src="/images/loyalty-card.jpg"
            width={CARD_IMG.width}
            height={CARD_IMG.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div ref={glowRef} className={styles.glow} aria-hidden="true" />
        </div>
      </motion.div>

      <motion.span
        className={styles.mark}
        data-test-id="services-loyalty-heading"
        {...reveal(fadeUp(0.1, { duration: 0.7, distance: 20, opacity: 0.6 }))}
      >
        <Message id="servicesPage.loyalty.heading" />
      </motion.span>

      <motion.h2
        className={styles.title}
        data-test-id="services-loyalty-title"
        {...reveal(fadeUp(0.18, { duration: 0.9, distance: 40 }))}
      >
        <Message
          id="servicesPage.loyalty.title"
          values={{
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          }}
        />
      </motion.h2>

      <motion.div className={styles.line} {...reveal(fadeUp(0.26, { duration: 0.6, distance: 16 }))} />

      <motion.p
        className={styles.note}
        data-test-id="services-loyalty-note"
        {...reveal(fadeUp(0.32, { duration: 0.75, distance: 24, opacity: 0.85 }))}
      >
        <Message id="servicesPage.loyalty.note" />
      </motion.p>

      <motion.ul className={styles.perks} {...reveal(fadeUp(0.38, { duration: 0.7, distance: 24 }))}>
        {['0', '1', '2'].map((n) => (
          <li key={n} className={styles.perk} data-test-id={`services-loyalty-perk-${n}`}>
            <Message id={`servicesPage.loyalty.perks.${n}`} />
          </li>
        ))}
      </motion.ul>

      <motion.div {...reveal(fadeUp(0.44, { duration: 0.7, distance: 24 }))}>
        <Button to={ROUTES.contacts} className={styles.cta} data-test-id="services-loyalty-cta">
          <Message id="servicesPage.loyalty.cta" />
        </Button>
      </motion.div>
    </section>
  )
}
