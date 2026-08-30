import type { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { resolveMessage, type LocaleKey } from './messages'

interface MessageProps {
  id: string
  values?: Record<string, ReactNode>
}

/**
 * Renders the localized message for `id`. When the message is missing from the
 * locale file or its value is empty, it falls back to rendering the id itself.
 *
 * Message ids are sectioned and semantic (e.g. `footer.contact.phone`), so this
 * fallback doubles as an incomplete-content checklist while copy is being authored.
 */
export function Message({ id, values }: MessageProps) {
  const intl = useIntl()
  const raw = resolveMessage(id, intl.locale as LocaleKey)

  if (typeof raw === 'string' && raw.length > 0) {
    return <>{intl.formatMessage({ id }, values)}</>
  }

  return <>{id}</>
}
