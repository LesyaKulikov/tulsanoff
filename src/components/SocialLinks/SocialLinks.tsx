import { useIntl } from 'react-intl'
import { resolveMessage } from '../../i18n/messages'
import { type SocialLink } from '../../contacts'

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
  facebook: (
    <svg width="16" height="26" viewBox="0 0 320 512" fill="none" aria-hidden="true">
      <path
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
        fill="currentColor"
      />
    </svg>
  ),
}

interface SocialLinksProps {
  /** Which channels to render; each consumer passes its own row. */
  links: readonly SocialLink[]
  /** Base class applied to each item; the consumer owns the visual treatment. */
  className?: string
  /** `data-test-id` prefix, so multiple sets stay addressable. */
  testIdPrefix: string
}

export function SocialLinks({ links, className, testIdPrefix }: SocialLinksProps) {
  const intl = useIntl()

  return (
    <>
      {links.map((social) => {
        const label = resolveMessage(social.labelId, intl.locale) ?? social.key
        const testId = `${testIdPrefix}-${social.key}`

        // No public URL → render a labelled, non-interactive icon. A bare `<a>`
        // with an empty href would fall back to the homepage (the original bug).
        if (!social.href) {
          return (
            <span
              key={social.key}
              role="img"
              aria-label={label}
              className={className}
              data-test-id={testId}
            >
              {ICONS[social.icon]}
            </span>
          )
        }

        return (
          <a
            key={social.key}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label={label}
            data-test-id={testId}
          >
            {ICONS[social.icon]}
          </a>
        )
      })}
    </>
  )
}
