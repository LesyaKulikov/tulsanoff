import type { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { resolveMessage } from './messages'

interface MessageProps {
  id: string
  values?: Record<string, ReactNode | ((chunks: ReactNode) => ReactNode)>
}

/**
 * Renders the localized message for `id`. When the message is missing from the
 * locale file or its value is empty, it falls back to rendering the id itself.
 *
 * Message ids are sectioned and semantic (e.g. `footer.contact.phone`), so this
 * fallback doubles as an incomplete-content checklist while copy is being
 * authored. See docs/adr/0001-i18n-message-id-fallback.md.
 */
export function Message({ id, values }: MessageProps) {
  const intl = useIntl()
  const raw = resolveMessage(id, intl.locale)

  if (typeof raw === 'string' && raw.length > 0) {
    return <>{intl.formatMessage({ id }, values)}</>
  }

  return <>{id}</>
}
