import { CertificateHero } from '../components/CertificateHero/CertificateHero'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'

export function CertificatesPage() {
  return (
    <div data-test-id="certificates-page">
      {/* CertificateHero renders this copy as a visible h2 (design), so the
          page-level h1 stays visually hidden for the document outline. */}
      <h1 className="srOnly">
        <Message id="certificates.hero.title" />
      </h1>
      <CertificateHero />
      <FaqList base="certificates.faq" testId="certificates-faq" />
    </div>
  )
}
