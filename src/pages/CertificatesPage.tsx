import { CertificateHero } from '../components/CertificateHero/CertificateHero'
import { FaqList } from '../components/FaqList/FaqList'
import { Testimonials } from '../components/Testimonials/Testimonials'

export function CertificatesPage() {
  return (
    <>
      <CertificateHero />
      <FaqList />
      <Testimonials />
    </>
  )
}