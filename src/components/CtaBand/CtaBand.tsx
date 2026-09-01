import styles from './CtaBand.module.css'

export function CtaBand() {
  return (
    <section className={styles.cta} data-test-id="cta-band">
      <iframe
        className={styles.map}
        title="Map"
        src="https://www.google.com/maps?q=Odem+St+8+Petah+Tikva&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-test-id="cta-band-map"
      />
    </section>
  )
}
