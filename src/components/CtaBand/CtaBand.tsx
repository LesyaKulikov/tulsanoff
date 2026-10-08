import { motion } from 'framer-motion'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './CtaBand.module.css'

export function CtaBand() {
  return (
    <motion.section
      className={styles.cta}
      data-test-id="cta-band"
      {...reveal(fadeUp(0, { duration: 0.9, distance: 40 }))}
    >
      <iframe
        className={styles.map}
        title="Map"
        src="https://www.google.com/maps?q=Odem+St+8+Petah+Tikva&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-test-id="cta-band-map"
      />
    </motion.section>
  )
}
