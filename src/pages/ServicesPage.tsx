import { useSearchParams } from 'react-router-dom'
import { ServicesGrid } from '../components/ServicesGrid/ServicesGrid'
import { ServicesMasonry } from '../components/ServicesMasonry/ServicesMasonry'
import { SubscriptionBand } from '../components/SubscriptionBand/SubscriptionBand'
import { LoyaltyCard } from '../components/LoyaltyCard/LoyaltyCard'

export function ServicesPage() {
  const [searchParams] = useSearchParams()
  const layout = searchParams.get('layout') || 'grid'

  return (
    <>
      {layout === 'masonry' ? <ServicesMasonry /> : <ServicesGrid />}
      <SubscriptionBand />
      <LoyaltyCard />
    </>
  )
}
