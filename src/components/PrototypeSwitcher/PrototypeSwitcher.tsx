import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styles from './PrototypeSwitcher.module.css'

interface PrototypeSwitcherProps {
  variants: string[]
  current: string
  labels?: Record<string, string>
}

/**
 * PROTOTYPE chrome: a fixed pill that cycles the `?variant=` search param.
 * Rendered only in dev (see HomePage). Not part of the design under test.
 */
export function PrototypeSwitcher({ variants, current, labels = {} }: PrototypeSwitcherProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const index = Math.max(0, variants.indexOf(current))

  const go = useCallback(
    (next: number) => {
      const count = variants.length
      const variant = variants[(next % count + count) % count]
      const params = new URLSearchParams(searchParams)
      params.set('variant', variant)
      setSearchParams(params, { replace: true })
    },
    [variants, searchParams, setSearchParams],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }
      if (event.key === 'ArrowLeft') go(index - 1)
      if (event.key === 'ArrowRight') go(index + 1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  return (
    <div className={styles.bar} data-test-id="prototype-switcher">
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(index - 1)}
        aria-label="Previous variant"
      >
        ←
      </button>
      <span className={styles.label}>
        <span className={styles.tag}>Prototype</span>
        {current}
        {labels[current] ? ` · ${labels[current]}` : ''}
      </span>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => go(index + 1)}
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  )
}
