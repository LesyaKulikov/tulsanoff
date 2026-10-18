import { CertificateHero } from '../components/CertificateHero/CertificateHero'
import { FaqList } from '../components/FaqList/FaqList'

export function CertificatesPage() {
  return (
    <>
      <CertificateHero />
      <FaqList base="certificates.faq" testId="certificates-faq" />
    </>
  )
}