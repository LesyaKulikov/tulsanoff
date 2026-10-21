import { motion } from 'framer-motion'
import { useIntl } from 'react-intl'
import { Message } from '../../i18n/Message'
import { resolveMessage } from '../../i18n/messages'
import { BRANCHES, mapsUrl } from '../../contacts'
import { reveal, fadeIn } from '../../animation/variants'
import styles from './CtaBand.module.css'

/** The embed shows the first studio branch; the link below opens the same one. */
const MAP_BRANCH = BRANCHES[0]

export function CtaBand() {
  const intl = useIntl()
  // `cta.mapTitle` is not authored in the locale files yet, and a hardcoded
  // English iframe title would be announced as-is in every locale.
  const mapTitle = resolveMessage('cta.mapTitle', intl.locale) ?? 'TULSANOFF on Google Maps'

  // Opacity only: this section wraps a full-viewport map iframe, and
  // animating transform on it is a scroll-jank hotspot.
  return (
    <motion.section
      className={styles.cta}
      data-test-id="cta-band"
      {...reveal(fadeIn(0, 0.6))}
    >
      {/* Escape hatch before the iframe: maps captures arrow-key scrolling, so
          keyboard users need a way out that does not go through it. */}
      <a
        className={styles.mapSkip}
        href={mapsUrl(MAP_BRANCH.mapQuery)}
        target="_blank"
        rel="noopener noreferrer"
        data-test-id="cta-band-map-skip"
      >
        <Message id="contacts.mapCta" />
      </a>

      <iframe
        className={styles.map}
        title={mapTitle}
        src={`https://www.google.com/maps?q=${MAP_BRANCH.mapQuery}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-test-id="cta-band-map"
      />
    </motion.section>
  )
}
