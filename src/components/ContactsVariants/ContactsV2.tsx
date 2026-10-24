import { motion } from 'framer-motion'
import { useIntl } from 'react-intl'
import { Message } from '../../i18n/Message'
import { resolveMessage } from '../../i18n/messages'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { CONTACTS_SOCIAL_LINKS, BRANCHES, PHONES, EMAIL, mapsUrl } from '../../contacts'
import { reveal, fadeIn, fadeUp } from '../../animation/variants'
import styles from './ContactsV2.module.css'

const MAP_BRANCH = BRANCHES[0]

export function ContactsV2() {
  const intl = useIntl()
  const mapTitle = resolveMessage('cta.mapTitle', intl.locale) ?? 'TULSANOFF on Google Maps'

  return (
    <div className={styles.page} data-test-id="contacts-v2">
      <motion.div className={styles.mapBand} {...reveal(fadeIn(0, 0.6))}>
        <iframe
          className={styles.mapFrame}
          title={mapTitle}
          src={`https://www.google.com/maps?q=${MAP_BRANCH.mapQuery}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <motion.div className={styles.mapOverlay} {...reveal(fadeUp(0.15, { duration: 0.7, distance: 20 }))}>
          <p className={styles.eyebrow}>
            <Message id="contacts.heading" />
          </p>
          <h1 className={styles.heading}>Контакты</h1>
          <p className={styles.phone}>
            <a href={`tel:${PHONES[0].href}`}>{PHONES[0].display}</a>
          </p>
          <a
            className={styles.mapCta}
            href={mapsUrl(MAP_BRANCH.mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Message id="contacts.mapCta" /> →
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.body}>
        <p className={styles.sectionTitle}>
          <Message id="contacts.branches.heading" />
        </p>
        <div className={styles.branches}>
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={branch.key}
              className={styles.branchRow}
              {...reveal(fadeUp(0.1 + i * 0.08, { duration: 0.7, distance: 24 }))}
            >
              <div className={styles.branchInfo}>
                <h3 className={styles.branchName}>
                  <Message id={branch.nameId} />
                </h3>
                <p className={styles.address}>
                  <Message id={branch.addressId} />
                </p>
              </div>
              <a
                className={styles.mapCta}
                href={mapsUrl(branch.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Message id="contacts.mapCta" />
              </a>
            </motion.div>
          ))}
        </div>

        <div className={styles.reach}>
          <div className={styles.reachGroup}>
            <span className={styles.reachLabel}>Телефоны</span>
            {PHONES.map((phone) => (
              <span key={phone.href} className={styles.reachValue}>
                <a href={`tel:${phone.href}`}>{phone.display}</a>
              </span>
            ))}
          </div>
          <div className={styles.reachGroup}>
            <span className={styles.reachLabel}>Email</span>
            <span className={styles.reachValue}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </span>
          </div>
          <div className={styles.reachGroup}>
            <span className={styles.reachLabel}>Соцсети</span>
            <div className={styles.socialRow}>
              <SocialLinks
                links={CONTACTS_SOCIAL_LINKS}
                className={styles.social}
                testIdPrefix="contacts-social"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}