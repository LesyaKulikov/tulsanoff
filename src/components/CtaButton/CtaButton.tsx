import { Arrow } from '../Arrow/Arrow'
import { Button } from '../Button/Button'
import { Message } from '../../i18n/Message'
import { ROUTES } from '../../routes'

interface CtaButtonProps {
  messageId?: string
  testId?: string
}

export function CtaButton({ messageId = 'nav.cta', testId }: CtaButtonProps) {
  return (
    <Button to={ROUTES.contacts} data-test-id={testId}>
      <Message id={messageId} />
      <Arrow />
    </Button>
  )
}
