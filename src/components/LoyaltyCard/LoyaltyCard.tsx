import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { Button } from '../Button/Button'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './LoyaltyCard.module.css'

export function LoyaltyCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let bounds: DOMRect | null = null

    const rotateToMouse = (e: PointerEvent) => {
      if (!bounds) return
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

      glow.style.backgroundImage = `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `
    }

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect()
      card.style.transition = 'none'
      document.addEventListener('pointermove', rotateToMouse)
    }

    const onMouseLeave = () => {
      document.removeEventListener('pointermove', rotateToMouse)
      card.style.transition = 'transform 0.45s ease-out'
      card.style.transform = ''
      glow.style.backgroundImage = ''
    }

    card.addEventListener('mouseenter', onMouseEnter)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('pointermove', rotateToMouse)
      card.removeEventListener('mouseenter', onMouseEnter)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section className={styles.loyalty} data-test-id="services-loyalty">
      <motion.div className={styles.stage} {...reveal(fadeUp(0, { duration: 0.9, distance: 48 }))}>
        <div ref={cardRef} className={styles.card} data-test-id="services-loyalty-card">
          <img
            className={styles.image}
            src="/images/loyalty-card.jpg"
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
        {...reveal(fadeUp(0.1, { duration: 0.7, distance: 20 }))}
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
        {...reveal(fadeUp(0.32, { duration: 0.75, distance: 24 }))}
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
        <Button to="/contacts" className={styles.cta} data-test-id="services-loyalty-cta">
          <Message id="servicesPage.loyalty.cta" />
        </Button>
      </motion.div>
    </section>
  )
}
