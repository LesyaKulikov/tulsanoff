import { useSearchParams } from 'react-router-dom'
import { Approach } from '../components/Approach/Approach'
import { Services } from '../components/Services/Services'
import { Masters } from '../components/Masters/Masters'
import { FaqList } from '../components/FaqList/FaqList'
import { Hero } from '../components/Hero/Hero'
import { Promise } from '../components/Promise/Promise'
import { QuizCtaB } from '../components/QuizCta/QuizCtaB'
// PROTOTYPE: dev-only switcher for the quiz CTA mobile variants.
import { PrototypeSwitcher } from '../components/PrototypeSwitcher/PrototypeSwitcher'

export function HomePage() {
  const [searchParams] = useSearchParams()
  const quizVariant = searchParams.get('variant') === 'B' ? 'B' : 'A'

  return (
    <>
      <Hero />
      <Promise />
      <Approach />
      <Services />
      <QuizCtaB mobileVariant={quizVariant} />
      <Masters />
      <FaqList />
      {import.meta.env.DEV && (
        <PrototypeSwitcher
          variants={['A', 'B']}
          current={quizVariant}
          labels={{ A: 'Photo + card', B: 'Accent ticket' }}
        />
      )}
    </>
  )
}
