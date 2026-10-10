import { Approach } from '../components/Approach/Approach'
import { Services } from '../components/Services/Services'
import { Masters } from '../components/Masters/Masters'
import { FaqList } from '../components/FaqList/FaqList'
import { Hero } from '../components/Hero/Hero'
import { Promise } from '../components/Promise/Promise'

export function HomePage() {
  return (
    <>
      <Hero />
      <Promise />
      <Approach />
      <Services />
      <Masters />
      <FaqList />
    </>
  )
}
