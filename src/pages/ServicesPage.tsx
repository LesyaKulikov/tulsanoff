import { useSearchParams } from 'react-router-dom'
import { ServicesGrid } from '../components/ServicesGrid/ServicesGrid'
import { ServicesMasonry } from '../components/ServicesMasonry/ServicesMasonry'
import { SubscriptionBand } from '../components/SubscriptionBand/SubscriptionBand'
import { LoyaltyCard } from '../components/LoyaltyCard/LoyaltyCard'
import { FaqList } from '../components/FaqList/FaqList'
import { Message } from '../i18n/Message'
import { Button } from '../components/Button/Button'
import { Arrow } from '../components/Arrow/Arrow'
import { useQuizModal } from '../components/Quiz/useQuizModal'

export function ServicesPage() {
  const { openQuiz } = useQuizModal()
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
      <div style={{ padding: '24px var(--gutter) 0', display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="primary" onClick={openQuiz} data-test-id="services-quiz-link">
          <Message id="quiz.heading" />
          <Arrow />
        </Button>
      </div>
      <SubscriptionBand />
      <LoyaltyCard />
      <FaqList />
    </div>
  )
}
