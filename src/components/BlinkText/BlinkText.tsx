import { Fragment, type CSSProperties } from 'react'
import { useIntl } from 'react-intl'
import { resolveMessage, type LocaleKey } from '../../i18n/messages'
import styles from './BlinkText.module.css'

interface BlinkTextProps {
  id?: string
  text?: string
}

export function BlinkText({ id, text }: BlinkTextProps) {
  const intl = useIntl()
  const content = text ?? (id ? (resolveMessage(id, intl.locale as LocaleKey) ?? id) : '')
  let step = 0

  return (
    <>
      <span className={styles.blink} aria-hidden="true">
        {Array.from(content).map((letter, i) => {
          if (letter.trim() === '') {
            return <Fragment key={i}>{' '}</Fragment>
          }
          step += 1
          const delay = step / 20 + (step % 2 === 0 ? -0.1 : 0.05)
          const style: CSSProperties = { transitionDelay: `${delay}s` }
          return (
            <span key={i} className={styles.letter}>
              <span className={styles.out} style={style}>
                {letter}
              </span>
              <span className={styles.in} style={style}>
                {letter}
              </span>
            </span>
          )
        })}
      </span>
      <span className={styles.srOnly}>{content}</span>
    </>
  )
}
