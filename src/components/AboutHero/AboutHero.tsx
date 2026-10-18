import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.hero} data-test-id="about-hero">
      <div className={styles.band}>
        <img className={styles.photo} src="/images/about-hero-strip.jpg" alt="" decoding="async" fetchPriority="high" />
      </div>
    </section>
  )
}
