import { useIntl } from 'react-intl'
import { resolveMessage } from '../../i18n/messages'
import { SOCIAL_LINKS, type SocialLink } from '../../contacts'

const ICONS: Record<SocialLink['icon'], React.ReactNode> = {
  telegram: (
    <svg width="28" height="32" viewBox="0 0 448 512" fill="none" aria-hidden="true">
      <path
        d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"
        fill="currentColor"
      />
    </svg>
  ),
  instagram: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 1H16.5A6.5 6.5 0 0 1 23 7.5V16.5A6.5 6.5 0 0 1 16.5 23H7.5A6.5 6.5 0 0 1 1 16.5V7.5A6.5 6.5 0 0 1 7.5 1ZM12 7.1A4.9 4.9 0 1 0 12 16.9A4.9 4.9 0 1 0 12 7.1ZM12 8.65A3.35 3.35 0 1 0 12 15.35A3.35 3.35 0 1 0 12 8.65ZM17.2 5.4A1.4 1.4 0 1 0 17.2 8.2A1.4 1.4 0 1 0 17.2 5.4Z"
        fill="currentColor"
      />
    </svg>
  ),
  whatsapp: (
    <svg width="26" height="26" viewBox="0 0 448 512" fill="none" aria-hidden="true">
      <path
        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
        fill="currentColor"
      />
    </svg>
  ),
}

interface SocialLinksProps {
  /** Base class applied to each anchor; the consumer owns the visual treatment. */
  className?: string
  /** `data-test-id` prefix, so multiple sets stay addressable. */
  testIdPrefix: string
}

export function SocialLinks({ className, testIdPrefix }: SocialLinksProps) {
  const intl = useIntl()

  return (
    <>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          aria-label={resolveMessage(social.labelId, intl.locale) ?? social.key}
          data-test-id={`${testIdPrefix}-${social.key}`}
        >
          {ICONS[social.icon]}
        </a>
      ))}
    </>
  )
}
