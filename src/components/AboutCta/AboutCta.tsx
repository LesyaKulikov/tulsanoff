import styles from './AboutCta.module.css'

export function AboutCta() {
  return (
    <section className={styles.cta} data-test-id="about-cta">
      <img className={styles.image} src="/images/cta-band.png" alt="" />
    </section>
  )
}