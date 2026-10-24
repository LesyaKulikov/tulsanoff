import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { CONTACTS_SOCIAL_LINKS, BRANCHES, PHONES, EMAIL, mapsUrl } from '../../contacts'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './ContactsV3.module.css'

export function ContactsV3() {
  return (
    <section className={styles.page} data-test-id="contacts-v3">
      <motion.div
        className={styles.card}
        {...reveal(fadeUp(0, { duration: 0.9, distance: 24 }))}
      >
        <p className={styles.eyebrow}>
          <Message id="contacts.heading" />
        </p>
        <h1 className={styles.heading}>Контакты</h1>
        <p className={styles.lede}>
          Две студии — Петах-Тиква и Рамат-Ган. Приезжайте или напишите нам — подберём время
          и мастера под ваш запрос.
        </p>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>
            <Message id="contacts.branches.heading" />
          </p>
          <div className={styles.branchList}>
            {BRANCHES.map((branch) => (
              <div key={branch.key} className={styles.branch}>
                <div className={styles.branchRow}>
                  <h3 className={styles.branchName}>
                    <Message id={branch.nameId} />
                  </h3>
                  <a
                    className={styles.mapLink}
                    href={mapsUrl(branch.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Message id="contacts.mapCta" /> →
                  </a>
                </div>
                <p className={styles.address}>
                  <Message id={branch.addressId} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>
            <Message id="contacts.reach.heading" />
          </p>
          <div className={styles.contactRows}>
            {PHONES.map((phone) => (
              <p key={phone.href} className={styles.contactRow}>
                <a href={`tel:${phone.href}`}>{phone.display}</a>
              </p>
            ))}
            <p className={styles.contactRow}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>
        </div>

        <div className={styles.socialRow}>
          <SocialLinks
            links={CONTACTS_SOCIAL_LINKS}
            className={styles.social}
            testIdPrefix="contacts-social"
          />
        </div>
      </motion.div>
    </section>
  )
}