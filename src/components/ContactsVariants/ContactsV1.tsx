import { motion } from 'framer-motion'
import { Message } from '../../i18n/Message'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { CONTACTS_SOCIAL_LINKS, BRANCHES, PHONES, EMAIL, mapsUrl } from '../../contacts'
import { reveal, fadeUp } from '../../animation/variants'
import styles from './ContactsV1.module.css'

export function ContactsV1() {
  return (
    <section className={styles.page} data-test-id="contacts-v1">
      <motion.div {...reveal(fadeUp(0, { duration: 0.8, distance: 24 }))}>
        <p className={styles.eyebrow}>
          <Message id="contacts.heading" />
        </p>
        <h1 className={styles.heading}>Контакты</h1>
        <p className={styles.lede}>
          Две студии в Петах-Тикве и Рамат-Гане. Запись по телефону или через мессенджеры —
          ответим в течение часа в рабочее время.
        </p>
      </motion.div>

      <div className={styles.grid}>
        <div>
          <p className={styles.colTitle}>
            <Message id="contacts.branches.heading" />
          </p>
          <div className={styles.branches}>
            {BRANCHES.map((branch) => (
              <motion.article
                key={branch.key}
                className={styles.branch}
                {...reveal(fadeUp(0.1, { duration: 0.7, distance: 24 }))}
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
                >
                  <Message id="contacts.mapCta" /> →
                </a>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <p className={styles.colTitle}>
            <Message id="contacts.reach.heading" />
          </p>
          <div className={styles.reach}>
            <ul className={styles.phoneList}>
              {PHONES.map((phone) => (
                <li key={phone.href} className={styles.phone}>
                  <a href={`tel:${phone.href}`}>{phone.display}</a>
                </li>
              ))}
            </ul>
            <p className={styles.email}>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
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
    </section>
  )
}