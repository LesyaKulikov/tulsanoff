import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Message } from '../i18n/Message'
import { ROUTES } from '../routes'
import styles from './LegalPage.module.css'

type LegalSection = 'privacy' | 'terms' | 'accessibility'

interface LegalPageProps {
  section: LegalSection
}

const CONTENT: Record<LegalSection, readonly string[]> = {
  privacy: [
    'legal.privacy.intro',
    'legal.privacy.data',
    'legal.privacy.localStorage',
    'legal.privacy.thirdParty',
    'legal.privacy.externalLinks',
    'legal.privacy.tracking',
    'legal.privacy.contact',
  ],
  terms: [
    'legal.terms.intro',
    'legal.terms.information',
    'legal.terms.appointments',
    'legal.terms.externalLinks',
    'legal.terms.operator',
  ],
  accessibility: [
    'legal.accessibility.intro',
    'legal.accessibility.measures',
    'legal.accessibility.limitations',
    'legal.accessibility.studio',
    'legal.accessibility.contact',
  ],
}

export function LegalPage({ section }: LegalPageProps) {
  const intl = useIntl()
  const titleId = `legal.${section}.title`
  const title = intl.formatMessage({ id: titleId })

  useEffect(() => {
    document.title = `${title} | TULSANOFF`
    return () => {
      document.title = 'TULSANOFF'
    }
  }, [title])

  return (
    <article className={styles.page} data-test-id={`legal-${section}`}>
      <Link className={styles.back} to={ROUTES.home}>
        <Message id="legal.back" />
      </Link>
      <h1 className={styles.heading}>
        <Message id={titleId} />
      </h1>
      <div className={styles.content}>
        {CONTENT[section].map((id) => (
          <p key={id}>
            <Message id={id} />
          </p>
        ))}
      </div>
    </article>
  )
}
