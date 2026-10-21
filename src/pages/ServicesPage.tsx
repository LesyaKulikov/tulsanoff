import { useSearchParams } from 'react-router-dom'
import { ServicesGrid } from '../components/ServicesGrid/ServicesGrid'
import { ServicesMasonry } from '../components/ServicesMasonry/ServicesMasonry'
import { SubscriptionBand } from '../components/SubscriptionBand/SubscriptionBand'
import { LoyaltyCard } from '../components/LoyaltyCard/LoyaltyCard'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'

export function ServicesPage() {
  const [searchParams] = useSearchParams()
  // Any value other than `masonry` falls back to the default grid instead of
  // accepting arbitrary `?layout=` values.
  const layout = searchParams.get('layout') === 'masonry' ? 'masonry' : 'grid'

  return (
    <div data-test-id="services-page">
      {/* The visible headings below are h2s; the page still needs one h1. */}
      <h1 className="srOnly">
        <Message id="servicesPage.heading" />
      </h1>
      {layout === 'masonry' ? <ServicesMasonry /> : <ServicesGrid />}
      <SubscriptionBand />
      <LoyaltyCard />
      <FaqList />
    </div>
  )
}
