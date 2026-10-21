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
  const letters = Array.from(content)
  // The stagger step is a pure function of each letter's position among the
  // non-space letters, derived up front so render never mutates a counter.
  const steps = letters.reduce<number[]>((acc, letter, i) => {
    const previous = acc[i - 1] ?? 0
    acc.push(letter.trim() === '' ? previous : previous + 1)
    return acc
  }, [])

  return (
    <>
      <span className={styles.blink} aria-hidden="true">
        {letters.map((letter, i) => {
          if (letter.trim() === '') {
            return <Fragment key={i}>{' '}</Fragment>
          }
          const delay = steps[i] / 20 + (steps[i] % 2 === 0 ? -0.1 : 0.05)
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
