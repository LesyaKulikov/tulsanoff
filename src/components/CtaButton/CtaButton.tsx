import { Arrow } from '../Arrow/Arrow'
import { Button } from '../Button/Button'
import { Message } from '../../i18n/Message'
import { WHATSAPP_URL } from '../../contacts'

interface CtaButtonProps {
  messageId?: string
  testId?: string
}

/**
 * The booking CTA. It opens the studio's WhatsApp line rather than the contacts
 * page: booking happens in chat, so the button hands the user straight to it.
 * External, so it renders a plain `<a>` (`href` branch of `Button`) in a new tab
 * to keep the site open behind it.
 */
export function CtaButton({ messageId = 'nav.cta', testId }: CtaButtonProps) {
  return (
    <Button href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-test-id={testId}>
      <Message id={messageId} />
      <Arrow />
    </Button>
  )
}
