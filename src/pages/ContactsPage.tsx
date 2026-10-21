import { motion } from 'framer-motion'
import { Message } from '../i18n/Message'
import { SocialLinks } from '../components/SocialLinks/SocialLinks'
import { reveal, fadeUp } from '../animation/variants'
import { BRANCHES, EMAIL, PHONES, mapsUrl } from '../contacts'
import styles from './ContactsPage.module.css'

export function ContactsPage() {
  return (
    <motion.section className={styles.page} data-test-id="contacts-page">
      <motion.h1
        className={styles.heading}
        data-test-id="contacts-heading"
        {...reveal(fadeUp(0, { duration: 0.8, distance: 32 }))}
      >
        <Message id="contacts.heading" />
      </motion.h1>

      <motion.h2 className={styles.subheading} {...reveal(fadeUp(0.06, { duration: 0.7, distance: 24 }))}>
        <Message id="contacts.branches.heading" />
      </motion.h2>

      <div className={styles.branches}>
        {BRANCHES.map((branch, i) => (
          <motion.article
            key={branch.key}
            className={styles.branch}
            data-test-id={`contacts-branch-${branch.key}`}
            {...reveal(fadeUp(0.12 + i * 0.08, { duration: 0.7, distance: 28 }))}
          >
            <h3 className={styles.branchName}>
              <Message id={branch.nameId} />
            </h3>
            <p className={styles.address}>
              <Message id={branch.addressId} />
            </p>
            <a
              className={styles.mapLink}
              href={mapsUrl(branch.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              data-test-id={`contacts-branch-map-${branch.key}`}
            >
              <Message id="contacts.mapCta" />
            </a>
          </motion.article>
        ))}
      </div>

      <motion.h2 className={styles.subheading} {...reveal(fadeUp(0.28, { duration: 0.7, distance: 24 }))}>
        <Message id="contacts.reach.heading" />
      </motion.h2>

      <motion.div className={styles.reach} {...reveal(fadeUp(0.34, { duration: 0.7, distance: 28 }))}>
        <ul className={styles.list}>
          {PHONES.map((phone) => (
            <li key={phone.href} className={styles.item}>
              <a href={`tel:${phone.href}`} data-test-id={`contacts-tel-${phone.href}`}>
                {phone.display}
              </a>
            </li>
          ))}
          <li className={styles.item}>
            <a href={`mailto:${EMAIL}`} data-test-id="contacts-email">
              {EMAIL}
            </a>
          </li>
        </ul>

        <div className={styles.socials}>
          <SocialLinks className={styles.social} testIdPrefix="contacts-social" />
        </div>
      </motion.div>
    </motion.section>
  )
}
