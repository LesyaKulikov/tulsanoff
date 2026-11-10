import { motion } from 'framer-motion'
import { Message } from '../i18n/Message'
import { Arrow } from '../components/Arrow/Arrow'
import { SocialLinks } from '../components/SocialLinks/SocialLinks'
import { CONTACTS_SOCIAL_LINKS, BRANCHES, PHONES, EMAIL, mapsUrl } from '../contacts'
import { reveal, fadeUp } from '../animation/variants'
import styles from './ContactsPage.module.css'

export function ContactsPage() {
  return (
    <section className={styles.page} data-test-id="contacts-page">
      <motion.div
        className={styles.card}
        {...reveal(fadeUp(0, { duration: 0.9, distance: 24 }))}
      >
        <h1 className={styles.heading}>
          <Message id="contacts.heading" />
        </h1>
        <p className={styles.lede}>
          <Message id="contacts.lede" />
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
                  <motion.a
                    className={styles.mapLink}
                    href={mapsUrl(branch.mapQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...reveal(fadeUp(0.12, { duration: 0.7, distance: 16 }))}
                  >
                    <Message id="contacts.mapCta" /> <Arrow />
                  </motion.a>
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
                <a href={`tel:${phone.href}`} dir="ltr">
                  {phone.display}
                </a>
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