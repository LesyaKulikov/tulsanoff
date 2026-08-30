import { Message } from '../../i18n/Message'
import styles from './Stats.module.css'

const STAT_IDS = ['0', '1', '2'] as const

export function Stats() {
  return (
    <section className={styles.stats}>
      <h2 className={styles.heading}>
        <Message id="stats.heading" />
      </h2>

      <div className={styles.row}>
        {STAT_IDS.map((n) => (
          <div key={n} className={styles.stat}>
            <div className={`${styles.value} ${n === '0' ? styles.mint : ''}`}>
              <Message id={`stats.${n}.value`} />
            </div>
            <div
              className={`${styles.underline} ${n === '0' ? styles.mintLine : styles.whiteLine}`}
            />
            <p className={styles.label}>
              <Message id={`stats.${n}.label`} />
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
