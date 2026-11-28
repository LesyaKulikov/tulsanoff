import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useIntl } from 'react-intl'
import { Quiz } from './Quiz'
import styles from './QuizModal.module.css'

interface QuizModalProps {
  open: boolean
  onClose: () => void
}

export function QuizModal({ open, onClose }: QuizModalProps) {
  const intl = useIntl()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const closeButton = dialogRef.current?.querySelector<HTMLButtonElement>('[data-test-id="quiz-modal-close"]')
    closeButton?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled):not([tabindex="-1"]), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) {
        e.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (
        !e.shiftKey &&
        (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))
      ) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-question"
        tabIndex={-1}
        data-test-id="quiz-modal"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label={intl.formatMessage({ id: 'a11y.close' })}
          data-test-id="quiz-modal-close"
        >
          ×
        </button>
        <Quiz />
      </div>
    </div>,
    document.body,
  )
}